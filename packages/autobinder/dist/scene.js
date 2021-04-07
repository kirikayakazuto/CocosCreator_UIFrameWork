"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Const_1 = __importDefault(require("./Const"));
var fs = require('fire-fs');
var scene;
(function (scene) {
    function start() {
        var childs = cc.director.getScene().children;
        if (childs.length < 3)
            return null;
        var NodeRoot = childs[1];
        if (!NodeRoot.getComponent("UIBase")) {
            Editor.warn(NodeRoot.name + " \u6CA1\u6709\u6302\u8F7D UIbase \u811A\u672C");
            return;
        }
        var ProjectDir = Editor.Project.path;
        var ScriptName = NodeRoot.name + "_Auto";
        var ScriptPath = (ProjectDir + "/" + Const_1.default.ScriptsDir + "/" + ScriptName + ".ts").replace(/\\/g, "/");
        var nodeMaps = {}, importMaps = {};
        findNodes(NodeRoot, nodeMaps, importMaps);
        var _str_import = "";
        for (var key in importMaps) {
            _str_import += "import " + key + " from \"" + getImportPath(importMaps[key], ScriptPath) + "\"\n";
        }
        var _str_content = "";
        for (var key in nodeMaps) {
            var type = nodeMaps[key][0];
            _str_content += "\t@property(" + type + ")\n\t" + key + ": " + type + " = null;\n";
        }
        var strScript = "\n" + _str_import + "\nconst {ccclass, property} = cc._decorator;\n@ccclass\nexport default class " + ScriptName + " extends cc.Component {\n" + _str_content + " \n}";
        checkScriptDir();
        fs.writeFileSync(ScriptPath, strScript);
        var dbScriptPath = ScriptPath.replace(Editor.Project.path.replace(/\\/g, "/"), "db:/");
        Editor.assetdb.refresh(dbScriptPath, function (err, data) {
            if (err) {
                Editor.warn("\u5237\u65B0\u811A\u672C\u5931\u8D25\uFF1A" + dbScriptPath);
                return;
            }
            // let s = ScriptPath.replace(`${ProjectDir}`, `${ProjectDir}/temp/quick-scripts/dst`).replace(".ts", ".js");            
            var comp = NodeRoot.getComponent(ScriptName);
            if (!comp) {
                if (!cc.js.getClassByName(ScriptName)) {
                    Editor.warn("请在执行一次run");
                    return;
                }
                ;
                comp = NodeRoot.addComponent(ScriptName);
            }
            for (var key in nodeMaps) {
                var node = cc.engine.getInstanceById(nodeMaps[key][1]);
                if (nodeMaps[key][0] == 'cc.Node') {
                    comp[key] = node;
                }
                else {
                    comp[key] = node.getComponent(nodeMaps[key][0]);
                }
            }
            Editor.log(ScriptName + '.ts 生成成功');
            // axios.get("http://localhost:7456/update-db").then(function (res: any) {
            // });
        });
    }
    scene.start = start;
    /** 计算相对路径 */
    function getImportPath(exportPath, currPath) {
        exportPath = exportPath.replace(/\\/g, "/").substr(0, exportPath.lastIndexOf("."));
        currPath = currPath.replace(/\\/g, "/");
        var tmp = "./";
        var start, end;
        var exportStr = exportPath.split("/");
        var currStr = currPath.split("/");
        for (end = 0; end < exportStr.length; ++end) {
            if (exportStr[end] != currStr[end]) {
                break;
            }
        }
        for (start = end + 1; start < currStr.length; ++start) {
            tmp += "../";
        }
        for (start = end; start < exportStr.length; ++start) {
            tmp += exportStr[start] + "/";
        }
        tmp = tmp.substr(0, tmp.length - 1);
        return tmp;
    }
    function checkScriptDir() {
        var dir = Editor.Project.path + '/' + Const_1.default.ScriptsDir;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        return dir;
    }
    function findNodes(node, _nodeMaps, _importMaps) {
        var name = node.name;
        if (checkBindChildren(name)) {
            if (checkNodePrefix(name)) {
                // 获得这个组件的类型 和 名称
                var names = getPrefixNames(name);
                if (names === null || names.length !== 2) {
                    Editor.log(name + " \u547D\u4EE4\u4E0D\u89C4\u8303, \u8BF7\u4F7F\u7528_Label$xxx\u7684\u683C\u5F0F!, \u6216\u8005\u662F\u5728SysDefine\u4E2D\u6CA1\u6709\u5B9A\u4E49");
                    return;
                }
                var type = Const_1.default.SeparatorMap[names[0]] || names[0];
                var value = names[1];
                // 进入到这里， 就表示可以绑定了
                if (_nodeMaps[value]) {
                    Editor.log("出现了重名字段:", value);
                }
                _nodeMaps[value] = [type, node.uuid];
                // 检查是否是自定义组件
                if (!_importMaps[type] && type.indexOf("cc.") === -1 && node.getComponent(type)) {
                    var componentPath = Editor.remote.assetdb.uuidToFspath(node.getComponent(type).__scriptUuid);
                    componentPath = componentPath.replace(/\s*/g, "").replace(/\\/g, "/");
                    _importMaps[type] = componentPath;
                }
            }
            // 绑定子节点
            node.children.forEach(function (target) {
                findNodes(target, _nodeMaps, _importMaps);
            });
        }
    }
    /** 检测前缀是否符合绑定规范 */
    function checkNodePrefix(name) {
        if (name[0] !== Const_1.default.STANDARD_Prefix) {
            return false;
        }
        return true;
    }
    /** 检查后缀 */
    function checkBindChildren(name) {
        if (name[name.length - 1] !== Const_1.default.STANDARD_End) {
            return true;
        }
        return false;
    }
    /** 获得类型和name */
    function getPrefixNames(name) {
        if (name === null) {
            return '';
        }
        return name.substr(1, name.length).split(Const_1.default.STANDARD_Separator);
    }
})(scene || (scene = {}));
module.exports = scene;
