import Const from "./Const";
// import PropController, {Controller} from "../../../assets/Script/Common/Components/PropController";
// import PropSelector, {Selector} from "../../../assets/Script/Common/Components/PropSelector";
const fs = require('fire-fs');

const _localSaveFunc: {[key: string]: (com: any) => void} = {}
module scene {
    
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
        let NodeRoot = childs[1];

        let comPropCtrl = NodeRoot.getComponent("PropController");
        if(!comPropCtrl) {
            Editor.warn(`${NodeRoot.name} 没有挂载 PropController 脚本`);
            return;
        }

        let ProjectDir = Editor.Project.path;
        let ScriptName = `${NodeRoot.name}_Auto`;
        let ScriptPath = `${ProjectDir}/${Const.JsonsDir}/${ScriptName}.json`.replace(/\\/g, "/");

        let controllers = comPropCtrl.controllers;
        let coms = NodeRoot.getComponentsInChildren("PropSelector");
        let saveData: {[key: string]: any} = {};
        for(const com of coms) {
            for(const s of com.selectors) {
                let controller = _findController(s.name, controllers);
                if(!controller) {
                    cc.warn(`PropController, 没找到 ${com.node.name} 结点上的 ${s.name} 控制器`);
                    continue;
                }
                if(controller.type < 0 || controller.type >= controller.types.length) {
                    cc.warn(`PropController, ${controller.name} 控制器的 type 越界了`);
                    continue;
                }
                // 保存该selector的属性
                if(s.position) {
                    _savePosition(saveData, com, controller);
                }
            }
        }
        let json = JSON.stringify(saveData);
        checkScriptDir();
        
        fs.writeFileSync(ScriptPath, json);

        let dbJsonPath = ScriptPath.replace(Editor.Project.path, "db:/");
        Editor.assetdb.refresh(dbJsonPath, (err: any, data: any) => {
            cc.log(data[0].uuid, cc.engine.getInstanceById(data[0].uuid))
            cc.assetManager.loadAny({uuid: data[0].uuid}, (err: any, data: any) => {
                comPropCtrl.propertyJson = data;
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

    function _findController(name: string, controllers: any[]) {
        for(const e of controllers) {
            if(e.name == name) return e;
        }
        return null;
    }

    function _savePosition(saveData: any, com: any, controller: any) {
        saveData['position'] = com.node.position;
    }

    function _saveColor(saveData: any, com: any) {
        saveData['color'] = com.node.color;
    }


    function _regiestSaveFunction(prop: string, func: (com: any) => void) {
        if(_localSaveFunc[prop]) {
            cc.warn(`prop: ${prop}, 已经被注册了, 此次注册将会覆盖上次的func`);
        }
        _localSaveFunc[prop] = func;
    }
}
module.exports = scene;