import Const from "./Const";
const fs = require('fire-fs');

const _localSaveFunc: {[key: number]: (saveData: any, com: any, comPropCtrl: any) => void} = {};
let ROOT_NODE: cc.Node = null as any;

module scene {
    
    function _readFile(path: string, callback: Function) {
        fs.readFile(path, 'utf8', (err: any, data: string) => {
            if(!err) {
                callback(JSON.parse(data));
            }else {
                callback({});
            }
        });  
    }
    
    function _doSetProp(comPropCtrl: any, NodeRoot: cc.Node, saveData: any) {
        let coms = NodeRoot.getComponentsInChildren("PropSelector");
        for(const com of coms) {
            // 只处理当前状态的控制器属性
            if(com.ctrlId !== comPropCtrl.id) {
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
     * 3, 将json文件绑定到对应的controller中
     *      
     */
    export function start() { 
        let childs = cc.director.getScene().children;
        if(childs.length < 3) return null;
        let NodeRoot = ROOT_NODE = childs[1];

        let comPropCtrl = NodeRoot.getComponent("PropController");
        if(!comPropCtrl || !comPropCtrl.open) {            
            return;
        }

        let saveData: {[key: string]: any} = {};
        let ProjectDir = Editor.Project.path;
        let ScriptName = `${NodeRoot.name}_${comPropCtrl.id}_Auto`;
        let ScriptPath = `${ProjectDir}/${Const.JsonsDir}/${ScriptName}.json`.replace(/\\/g, "/");
        
        if(!comPropCtrl.id || comPropCtrl.id.length <= 0) {
            cc.warn(`PropController, 请设置 PropController 的 id ${comPropCtrl.id} `);
            return ;
        }

        if(comPropCtrl.state < 0 || comPropCtrl.state >= comPropCtrl.states.length) {
            cc.warn(`PropController, ${comPropCtrl.id} 控制器越界了`);
            return ;
        }

        _readFile(ScriptPath, (data: any) => {
            saveData = data;
            // 把当前状态的数据置空
            saveData[comPropCtrl.state] = {};
            // 删除已经不存在的状态
            for(const e in saveData) {
                if(parseInt(e) >= comPropCtrl.states.length) {  // 表示这个状态已经废弃了
                    saveData[e] = null;
                    delete saveData[e];
                }
            }
            // 把当前控制器下的
            _doSetProp(comPropCtrl, NodeRoot, saveData);

            let json = JSON.stringify(saveData);
            checkScriptDir();
            
            fs.writeFileSync(ScriptPath, json);
            let dbJsonPath = ScriptPath.replace(ProjectDir, "db:/");
            Editor.assetdb.refresh(dbJsonPath, (err: any, data: any) => {
                cc.assetManager.loadAny({uuid: data[0].uuid}, (err: any, data: any) => {
                    comPropCtrl.propertyJson = data;
                    Editor.log('控制器数据保存成功-', dbJsonPath);
                });
            });

        }); 
    }

    function checkScriptDir() {
        let dir = Editor.Project.path + '/' + Const.JsonsDir;
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        return dir;
    }

    function _getNodePath(node: cc.Node, rootNode: cc.Node) {
        let parent = node;
        let path = '';
        while(parent) {
            if(parent.uuid == rootNode.uuid) {
                break;
            }
            path += '/' + parent.name;
            parent = parent.parent;
        }
        return path;
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
        let path = _getNodePath(com.node, ROOT_NODE);
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
    
    
}
module.exports = scene;