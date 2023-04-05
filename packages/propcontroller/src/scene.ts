const _localSaveFunc: {[key: number]: (node: cc.Node) => any} = {};

module scene {

    export function setState(event: any, t: any) {
        findNodeByUuid(cc.director.getScene(), t.nodeUuid, (node: cc.Node) => {
            if(!node) {
                Editor.warn(`没找到node? ${t.nodeUuid}`);
                return;
            }
            let coms = node.getComponents("PropController");
            for(const com of coms) {
                if(com.uuid == t.comUuid) {
                    com.state = t.state;
                }
            }
        });
    }

    function findNodeByUuid(root: cc.Node, uuid: string, callback: Function) {
        let uuidNode = root.getChildByUuid(uuid);
        if(uuidNode) {
            callback(uuidNode);
            return;
        }
        for(const node of root.children) {
            findNodeByUuid(node, uuid, callback);
        }
    }

    async function walkNodes(root: cc.Node, pathType: number, callback: Function, path: string) {

        for(const node of root.children) {
            let selector = node.getComponent("PropSelector");
            if(selector) {
                await callback(selector, _makePath(pathType, path, node));
            }
            
            if(node.getComponent("PropController")) continue;

            if(node.childrenCount > 0) {
                await walkNodes(node, pathType, callback, _makePath(pathType, path, node));
            }
        }
    }

    function _makePath(pathType: number, path: string, node: cc.Node) {
        switch(pathType) {
            case (cc as any).NodePathType.Name:
                path += `/${node.name}`;
            break;
            case (cc as any).NodePathType.SiblingIndex:
                path += `/${node.getSiblingIndex()}`;
            break;
        }
        return path;
    }
    
    async function _doSetProp(comPropCtrl: any, saveData: any) {

        let nodeRoot = comPropCtrl.node;
        let pathType = comPropCtrl.nodePathType;

        let map = saveData[comPropCtrl.state];
        if(!map) {
            map = saveData[comPropCtrl.state] = {};
        }
        await walkNodes(nodeRoot, pathType, async (selector: any, path: string) => {
            
            let obj = map[path] = map[path] ?? {};

            // 如果没有选择, 则全部记录
            if(selector.props.length <= 0) {
                for(let key in _localSaveFunc) {
                    let func = _localSaveFunc[key];
                    obj[key] = await func(selector.node);
                }
                return;
            }

            for(const key of selector.props) {
                let func = _localSaveFunc[key];
                obj[key] = await func(selector.node);
                
            }
        }, `${pathType}:`);
    
    }

    /** 
     * 入口
     * 1, 查看是否启用了controller, 即检查根结点是否有PropController脚本即可
     * 2, 查找所有PropSelector, 根据所属控制器和所属type, 生成json文件并保持到本地
     */
    export function start() { 
        let childs = cc.director.getScene().children;
        if(childs.length < 3) return null;
        let NodeRoot = childs[1];
        // 获取所有的controller
        let comPropCtrls = NodeRoot.getComponentsInChildren("PropController");
        
        for(const comPropCtrl of comPropCtrls) {
            if(!comPropCtrl.open) {            
                continue;
            }

            let saveData: {[key: string]: any} = {};
            
            if(!comPropCtrl.uid || comPropCtrl.uid.length <= 0) {
                cc.warn(`PropController, 请设置 node: ${comPropCtrl.node.name} 的 uid `);
                return ;
            }
    
            if(comPropCtrl.state < 0 || comPropCtrl.state >= comPropCtrl.states.length) {
                cc.warn(`PropController, ${comPropCtrl.uid} 控制器越界了`);
                return ;
            }

            if(comPropCtrl.propertyJson) {
                saveData = JSON.parse(comPropCtrl.propertyJson);
            }
            // 把当前状态的数据置空, 重新保存
            saveData[comPropCtrl.state] = {};
            // 删除已经不存在的状态
            for(const e in saveData) {
                if(+e >= comPropCtrl.states.length) {  // 表示这个状态已经废弃了
                    saveData[e] = null;
                    delete saveData[e];
                }
            }

            // 把当前控制器下的
            _doSetProp(comPropCtrl, saveData).then(() => {
                comPropCtrl.propertyJson = JSON.stringify(saveData);
                Editor.log('控制器数据保存成功');
            });
        }
    }


    function _regiestSaveFunction(propId: number, func: (node: cc.Node) => any) {
        if(_localSaveFunc[propId]) {
            cc.warn(`prop: ${propId}, 已经被注册了, 此次注册将会覆盖上次的func`);
            return ;
        }
        _localSaveFunc[propId] = func;
    }

    function _savePosition(node: cc.Node) {
        return node.position;
    }

    function _saveColor(node: cc.Node) {
        return {
            r: node.color.r,
            g: node.color.g,
            b: node.color.b,
            a: node.color.a,
        }
    }

    function _saveScale(node: cc.Node) {
        return {
            scaleX: node.scaleX,
            scaleY: node.scaleY
        }
    }

    function _saveRotation(node: cc.Node) {
        return node.angle;
    }

    function _saveOpacity(node: cc.Node) {
        return node.opacity;
    }

    function _saveSkew(node: cc.Node) {
        return {
            skewX: node.skewX,
            skewY: node.skewY,
        }
    }

    function _saveSize(node: cc.Node) {
        return node.getContentSize();
    }

    function _saveAnchor(node: cc.Node) {
        return {
            anchorX: node.anchorX,
            anchorY: node.anchorY,
        };
    }

    function _saveActive(node: cc.Node) {
        return node.active;
    }

    function _saveLabelString(node: cc.Node) {
        if(!node.getComponent(cc.Label)) return ;
        return node.getComponent(cc.Label).string;
    }

    async function _saveSpriteTexture(node: cc.Node) {
        if(!node.getComponent(cc.Sprite)) return ;
        return new Promise((resolve, reject) => {
            // let uuid = (node.getComponent(cc.Sprite).spriteFrame?.getTexture() as any)["_uuid"];
            let uuid = (node.getComponent(cc.Sprite).spriteFrame as any)["_uuid"];
            if(!uuid) return "";
            (Editor.assetdb as any).queryUrlByUuid(uuid, (error: any, url: string) => {
                if(error) {
                    resolve("");
                    return;
                }
                url = url.replace("db://assets/", "");
                resolve({
                    uuid,
                    url
                }); 
            });
        });
    }

    function _saveAll(node: cc.Node) {
        let coms = node.getComponents(cc.Component);
        let props = {} as any;
        props["node"] = {
            active: node.active,
            position: node.position,
            angle: node.angle,
            scale: {
                scaleX: node.scaleX,
                scaleY: node.scaleY,
            },
            anchor: {
                anchorX: node.anchorX,
                anchorY: node.anchorY,
            },
            size: node.getContentSize(),
            color: {
                r: node.color.r,
                g: node.color.g,
                b: node.color.b,
                a: node.color.a,
            },
            opacity: node.opacity,
            // skew: {
            //     skewX: node.skewX,
            //     skewY: node.skewY,
            // }
        }
        let comsProp = props["coms"] = {} as any;
        for(const com of coms) {
            if(com.name.includes("PropSelector")) continue;
            let prop = comsProp[com.constructor.name] = {} as any; 
            for(let key in com) {
                if(key.startsWith("_")) continue;
                let val = (com as any)[key];
                if(typeof val === "function" || typeof val === "object") continue;
                prop[key] = val;
            }
        }
        return props;
    }
    
    _regiestSaveFunction((cc as any).PropEmum.All, _saveAll);
    _regiestSaveFunction((cc as any).PropEmum.Active, _saveActive);
    _regiestSaveFunction((cc as any).PropEmum.Position, _savePosition);
    _regiestSaveFunction((cc as any).PropEmum.Color, _saveColor);
    _regiestSaveFunction((cc as any).PropEmum.Scale, _saveScale);
    _regiestSaveFunction((cc as any).PropEmum.Rotation, _saveRotation);
    _regiestSaveFunction((cc as any).PropEmum.Opacity, _saveOpacity);
    _regiestSaveFunction((cc as any).PropEmum.Slew, _saveSkew);
    _regiestSaveFunction((cc as any).PropEmum.Size, _saveSize);
    _regiestSaveFunction((cc as any).PropEmum.Anchor, _saveAnchor);
    _regiestSaveFunction((cc as any).PropEmum.Label_String, _saveLabelString);
    _regiestSaveFunction((cc as any).PropEmum.Sprite_Texture, _saveSpriteTexture);
       
}
module.exports = scene;