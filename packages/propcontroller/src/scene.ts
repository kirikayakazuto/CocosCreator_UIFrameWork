const _localSaveFunc: {[key: number]: (saveData: any, com: any, comPropCtrl: any) => void} = {};
let ROOT_NODE: cc.Node = null as any;
let NodePathType = 1;

const fs = require('fire-fs');
const path = require("fire-path");

const dirName = "assets/PropComponent";

module scene {

    function _checkScriptDir() {
        let dir = path.join(Editor.Project.path, dirName);
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }

    function _readFile(path: string, callback: Function) {
        fs.readFile(path, 'utf8', (err: any, data: string) => {
            if(!err) {
                callback(data);
                return ;
            }
            Editor.log(path)
            Editor.error(JSON.stringify(err));
            callback(null);
        });  
    }

    export function copyScript() {
        _checkScriptDir();
        _copyScript("PropController.ts", () => {
            _copyScript("PropSelector.ts", () => {
                Editor.assetdb.refresh("db://" + dirName);
            });
        });
        
    }

    function _copyScript(scriptName: string, callback: Function ) {
        _readFile(Editor.url("packages://propcontroller/dist/Scripts/" + scriptName), (data: any) => {
            if(!data) return ;
            let url = path.join(Editor.Project.path, dirName, scriptName);
            fs.writeFileSync(url, data);
            callback && callback();
        });
    }

    export function setState(event: any, t: any) {
        let node = cc.director.getScene().getChildByUuid(t.nodeUuid);
        let coms = node.getComponents("PropController");
        for(const com of coms) {
            if(com.uuid == t.comUuid) {
                com.state = t.state;
            }
        }
    }
    
    function _doSetProp(comPropCtrl: any, NodeRoot: cc.Node, saveData: any) {
        let coms = NodeRoot.getComponentsInChildren("PropSelector");
        for(const com of coms) {
            // 只处理当前状态的控制器属性
            let ctrl = NodeRoot.getComponents("PropController")[com.ctrlId];
            if(!ctrl || ctrl.uid !== comPropCtrl.uid) {
                continue;
            }
            
            for(const e of com.props) {
                let func = _localSaveFunc[e];
                func(saveData, com, comPropCtrl);
            }
        }
    }

    /** 
     * 入口
     * 1, 查看是否启用了controller, 即检查根结点是否有PropController脚本即可
     * 2, 查找所有PropSelector, 根据所属控制器和所属type, 生成json文件并保持到本地
     */
    export function start() { 
        let childs = cc.director.getScene().children;
        if(childs.length < 3) return null;
        let NodeRoot = ROOT_NODE = childs[1];

        let comPropCtrls = NodeRoot.getComponents("PropController");
        for(const comPropCtrl of comPropCtrls) {
            if(!comPropCtrl || !comPropCtrl.open) {            
                continue;
            }
            let saveData: {[key: string]: any} = {};
            
            if(!comPropCtrl.uid || comPropCtrl.uid.length <= 0) {
                cc.warn(`PropController, 请设置 PropController 的 uid ${comPropCtrl.node.name} `);
                return ;
            }
    
            if(comPropCtrl.state < 0 || comPropCtrl.state >= comPropCtrl.states.length) {
                cc.warn(`PropController, ${comPropCtrl.uid} 控制器越界了`);
                return ;
            }

            NodePathType = comPropCtrl.nodePathType;

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
            _doSetProp(comPropCtrl, NodeRoot, saveData);
            comPropCtrl.propertyJson = JSON.stringify(saveData);
            Editor.log('控制器数据保存成功');
        }
    }

    function _getNodePathByName(node: cc.Node, rootNode: cc.Node) {
        let parent = node;
        let path = '';
        while(parent) {
            if(parent.uuid == rootNode.uuid) {
                break;
            }
            path += '/' + parent.name;
            parent = parent.parent;
        }
        return "0:" + path;
    }

    function _getNodePathBySilblineIndex(node: cc.Node, rootNode: cc.Node) {
        let path = '';
        while(node.uuid != rootNode.uuid) {
            path += '/' + node.getSiblingIndex();
            node = node.parent;
        }
        return "1:" + path;
    }

    function _regiestSaveFunction(propId: number, func: (saveData: any, com: any, comPropCtrl: any) => void) {
        if(_localSaveFunc[propId]) {
            cc.warn(`prop: ${propId}, 已经被注册了, 此次注册将会覆盖上次的func`);
            return ;
        }
        _localSaveFunc[propId] = func;
    }

    function _checkSaveData(saveData: any, com: any, controller: any) {
        let state = controller.state;
        let map = saveData[state];
        if(!map) map = saveData[state] = {};
        let path = '';
        switch(NodePathType) {
            case (cc as any).NodePathType.Name:
                path = _getNodePathByName(com.node, ROOT_NODE);
                break;
            case (cc as any).NodePathType.SiblingIndex:
                path = _getNodePathBySilblineIndex(com.node, ROOT_NODE);
                break;
        }

        let d = map[path];
        if(!d) d = map[path] = {};
        return d;
    }

    function _savePosition(saveData: any, com: any, controller: any) {
        let d = _checkSaveData(saveData, com, controller);
        d[(cc as any).PropEmum.Position] = com.node.position;
    }

    function _saveColor(saveData: any, com: any, controller: any) {
        let d = _checkSaveData(saveData, com, controller);
        d[(cc as any).PropEmum.Color] = {
            r: com.node.color.r,
            g: com.node.color.g,
            b: com.node.color.b,
            a: com.node.color.a,
        }
    }

    function _saveScale(saveData: any, com: any, controller: any) {
        let d = _checkSaveData(saveData, com, controller);
        d[(cc as any).PropEmum.Scale] = {
            scaleX: com.node.scaleX,
            scaleY: com.node.scaleY
        };
    }

    function _saveRotation(saveData: any, com: any, controller: any) {
        let d = _checkSaveData(saveData, com, controller);
        d[(cc as any).PropEmum.Rotation] = com.node.angle;
    }

    function _saveOpacity(saveData: any, com: any, controller: any) {
        let d = _checkSaveData(saveData, com, controller);
        d[(cc as any).PropEmum.Opacity] = com.node.opacity;
    }

    function _saveSlew(saveData: any, com: any, controller: any) {
        let d = _checkSaveData(saveData, com, controller);
        d[(cc as any).PropEmum.Slew] = {
            slewX: com.node.slewX,
            slewY: com.node.slewY,
        }
    }

    function _saveSize(saveData: any, com: any, controller: any) {
        let d = _checkSaveData(saveData, com, controller);
        d[(cc as any).PropEmum.Size] = com.node.getContentSize();
    }

    function _saveAnchor(saveData: any, com: any, controller: any) {
        let d = _checkSaveData(saveData, com, controller);
        d[(cc as any).PropEmum.Anchor] = {
            anchorX: com.node.anchorX,
            anchorY: com.node.anchorY,
        };
    }

    function _saveActive(saveData: any, com: any, controller: any) {
        let d = _checkSaveData(saveData, com, controller);
        d[(cc as any).PropEmum.Active] = com.node.active;
    }

    function _saveLabelString(saveData: any, com: any, controller: any) {
        if(!com.getComponent(cc.Label)) return ;
        let d = _checkSaveData(saveData, com, controller);
        d[(cc as any).PropEmum.Label_String] = com.getComponent(cc.Label).string;
    }

    function _saveSpriteTexture(saveData: any, com: any, controller: any) {
        if(!com.getComponent(cc.Sprite)) return ;
        let d = _checkSaveData(saveData, com, controller);
        d[(cc as any).PropEmum.Sprite_Texture] = com.getComponent(cc.Sprite).spriteFrame['_uuid'];
    }
    
    _regiestSaveFunction((cc as any).PropEmum.Active, _saveActive);
    _regiestSaveFunction((cc as any).PropEmum.Position, _savePosition);
    _regiestSaveFunction((cc as any).PropEmum.Color, _saveColor);
    _regiestSaveFunction((cc as any).PropEmum.Scale, _saveScale);
    _regiestSaveFunction((cc as any).PropEmum.Rotation, _saveRotation);
    _regiestSaveFunction((cc as any).PropEmum.Opacity, _saveOpacity);
    _regiestSaveFunction((cc as any).PropEmum.Slew, _saveSlew);
    _regiestSaveFunction((cc as any).PropEmum.Size, _saveSize);
    _regiestSaveFunction((cc as any).PropEmum.Anchor, _saveAnchor);
    _regiestSaveFunction((cc as any).PropEmum.Label_String, _saveLabelString);
    _regiestSaveFunction((cc as any).PropEmum.Sprite_Texture, _saveSpriteTexture);
    
    
}
module.exports = scene;