import Const from "./Const";

const fs = require('fire-fs');

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
            _str_import += `import ${key} from "${getImportPath(importMaps[key], ScriptPath)}"\n`;
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
    function getImportPath(exportPath: string, currPath: string): string {
        exportPath = exportPath.replace(/\\/g, "/").substr(0, exportPath.lastIndexOf("."));
        currPath = currPath.replace(/\\/g, "/");
        let tmp = "./";
        let start: number, end: number;
        let exportStr = exportPath.split("/");
        let currStr = currPath.split("/");
        for (end = 0; end < exportStr.length; ++end) {
            if (exportStr[end] != currStr[end]) {
                break;
            }
        }
        for (start = end + 1; start < currStr.length; ++start) {
            tmp += "../";
        }
        for (start = end; start < exportStr.length; ++start) {
            tmp += `${exportStr[start]}/`;
        }
        tmp = tmp.substr(0, tmp.length - 1);
        return tmp;
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
                if(names === null || names.length !== 2) {
                    Editor.log(`${name} 命令不规范, 请使用_Label$xxx的格式!, 或者是在SysDefine中没有定义`);
                    return ;
                }
                let type = Const.SeparatorMap[names[0]] || names[0];
                let value = names[1];
                // 进入到这里， 就表示可以绑定了
                if(_nodeMaps[value]) {
                    Editor.log("出现了重名字段:", value);
                }
                _nodeMaps[value] = [type, node.uuid];

                // 检查是否是自定义组件
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