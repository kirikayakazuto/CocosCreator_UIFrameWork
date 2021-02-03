import Const from "./Const";

const fs = require('fire-fs');
const axios = require('axios')

module scene {
    export function start() {
        
        let childs = cc.director.getScene().children;
        if(childs.length < 3) return null;
        let NodeRoot = childs[1];

        if(!NodeRoot.getComponent("UIBase")) {
            Editor.warn(`${NodeRoot.name} 没有挂载 UIbase 脚本`);
            return;
        }

        let ProjectDir = Editor.Project.path;
        let ScriptName = `${NodeRoot.name}_Auto`;
        let ScriptPath = `${ProjectDir}/${Const.ScriptsDir}/${ScriptName}.ts`.replace(/\\/g, "/");
        

        let nodeMaps: {[key: string]: string[]} = {}, importMaps: {[key: string]: string} = {};
        findNodes(NodeRoot, nodeMaps,  importMaps);
        
        let _str_import = ``;
        for(let key in importMaps) {
            _str_import += `import ${key} from "${getExportPath(importMaps[key], ScriptPath)}"\n`;
        }
        let _str_content = ``;
        for(let key in nodeMaps) {
            let type = nodeMaps[key][0];
            _str_content += `\t@property(${type})\n\t${key}: ${type} = null;\n`;
        }
        
        let strScript = `
${_str_import}
const {ccclass, property} = cc._decorator;
@ccclass
export default class ${ScriptName} extends cc.Component {
${_str_content} 
}`; 

        checkScriptDir();
        
        fs.writeFileSync(ScriptPath, strScript);

        let dbScriptPath = ScriptPath.replace(Editor.Project.path.replace(/\\/g, "/"), "db:/");
        Editor.assetdb.refresh(dbScriptPath, (err: any, data: any) => {
            if(err) {
                Editor.warn(`刷新脚本失败：${dbScriptPath}`);
                return ;
            }
            // let s = ScriptPath.replace(`${ProjectDir}`, `${ProjectDir}/temp/quick-scripts/dst`).replace(".ts", ".js");            

            let comp = NodeRoot.getComponent(ScriptName);
            if(!comp) {
                if(!cc.js.getClassByName(ScriptName)) {
                    Editor.warn("请在执行一次run");
                    return ;
                } ;
                comp = NodeRoot.addComponent(ScriptName);
            }
            for(let key in nodeMaps) {
                let node = cc.engine.getInstanceById(nodeMaps[key][1]);
                if(nodeMaps[key][0] == 'cc.Node') {
                    comp[key] = node;
                }else {
                    comp[key] = node.getComponent(nodeMaps[key][0]);
                }
            }  
            Editor.log(ScriptName + '.ts 生成成功'); 
            // axios.get("http://localhost:7456/update-db").then(function (res: any) {
                
            // });
        
        });
    }

    /** 计算相对路径 */
    function getExportPath(export_s_: string, current_s: string): string {
        // ----------------格式转换
        export_s_ = export_s_.replace(/\\/g, "/").substr(0, export_s_.lastIndexOf("."));
        current_s = current_s.replace(/\\/g, "/");
        // ----------------准备参数
        let temp1_s = "./";
        let temp1_n: number, temp2_n: number;
        let temp1_ss = export_s_.split("/");
        let temp2_ss = current_s.split("/");
        // ----------------路径转换
        for (temp2_n = 0; temp2_n < temp1_ss.length; ++temp2_n) {
            if (temp1_ss[temp2_n] != temp2_ss[temp2_n]) {
                break;
            }
        }
        for (temp1_n = temp2_n + 1; temp1_n < temp2_ss.length; ++temp1_n) {
            temp1_s += "../";
        }
        for (temp1_n = temp2_n; temp1_n < temp1_ss.length; ++temp1_n) {
            temp1_s += `${temp1_ss[temp1_n]}/`;
        }
        temp1_s = temp1_s.substr(0, temp1_s.length - 1);
        return temp1_s;
    }

    function checkScriptDir() {
        let dir = Editor.Project.path + '/' + Const.ScriptsDir;
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        return dir;
    }

    function findNodes(node: cc.Node, _nodeMaps: {[key: string]: string[]}, _importMaps: {[key: string]: string}) {
        let name = node.name;
        if(checkBindChildren(name)) {
            if(checkNodePrefix(name)) {
                // 获得这个组件的类型 和 名称
                let names = getPrefixNames(name);
                if(names === null || names.length !== 2 || !Const.SeparatorMap[names[0]]) {
                    console.log(names);
                    cc.log(`${name} 命令不规范, 请使用_Label$xxx的格式!, 或者是在SysDefine中没有定义`);
                    return ;
                }
                let type = Const.SeparatorMap[names[0]] || names[0];
                let value = names[1];
                // 进入到这里， 就表示可以绑定了
                if(_nodeMaps[value]) {
                    Editor.log("出现了重名", value);
                }
                _nodeMaps[value] = [];
                _nodeMaps[value][0] = type;
                _nodeMaps[value][1] = node.uuid;

                if(!_importMaps[type] && type.indexOf("cc.") === -1 && node.getComponent(type)) {
                    let componentPath = Editor.remote.assetdb.uuidToFspath(node.getComponent(type).__scriptUuid);
                    componentPath = componentPath.replace(/\s*/g, "").replace(/\\/g, "/");
                    _importMaps[type] = componentPath;
                }
            }
            // 绑定子节点
            node.children.forEach((target: cc.Node) => {
                findNodes(target, _nodeMaps, _importMaps);
            });
        }
    }

    /** 检测前缀是否符合绑定规范 */
    function checkNodePrefix(name: string) {
        if(name[0] !== Const.STANDARD_Prefix) {
            return false;
        }
        return true;
    }
    /** 检查后缀 */
    function checkBindChildren(name: string) {
        if(name[name.length-1] !== Const.STANDARD_End) {
            return true;
        }
        return false;
    }
    /** 获得类型和name */
    function getPrefixNames(name: string) {
        if(name === null) {
            return '';
        }
        return name.substr(1, name.length).split(Const.STANDARD_Separator); 
    }
}
module.exports = scene;