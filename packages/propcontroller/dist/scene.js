"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Const_1 = __importDefault(require("./Const"));
// import PropController, {Controller} from "../../../assets/Script/Common/Components/PropController";
// import PropSelector, {Selector} from "../../../assets/Script/Common/Components/PropSelector";
var fs = require('fire-fs');
var _localSaveFunc = {};
var scene;
(function (scene) {
    /**
     * 入口
     * 1, 查看是否启用了controller, 即检查根结点是否有PropController脚本即可
     * 2, 查找所有PropSelector, 根据所属控制器和所属type, 生成json文件并保持到本地
     * 3, 将json文件绑定到对应的controller中
     *
     */
    function start() {
        var childs = cc.director.getScene().children;
        if (childs.length < 3)
            return null;
        var NodeRoot = childs[1];
        var comPropCtrl = NodeRoot.getComponent("PropController");
        if (!comPropCtrl) {
            Editor.warn(NodeRoot.name + " \u6CA1\u6709\u6302\u8F7D PropController \u811A\u672C");
            return;
        }
        var ProjectDir = Editor.Project.path;
        var ScriptName = NodeRoot.name + "_Auto";
        var ScriptPath = (ProjectDir + "/" + Const_1.default.JsonsDir + "/" + ScriptName + ".json").replace(/\\/g, "/");
        var controllers = comPropCtrl.controllers;
        var coms = NodeRoot.getComponentsInChildren("PropSelector");
        var saveData = {};
        for (var _i = 0, coms_1 = coms; _i < coms_1.length; _i++) {
            var com = coms_1[_i];
            for (var _a = 0, _b = com.selectors; _a < _b.length; _a++) {
                var s = _b[_a];
                var controller = _findController(s.name, controllers);
                if (!controller) {
                    cc.warn("PropController, \u6CA1\u627E\u5230 " + com.node.name + " \u7ED3\u70B9\u4E0A\u7684 " + s.name + " \u63A7\u5236\u5668");
                    continue;
                }
                if (controller.type < 0 || controller.type >= controller.types.length) {
                    cc.warn("PropController, " + controller.name + " \u63A7\u5236\u5668\u7684 type \u8D8A\u754C\u4E86");
                    continue;
                }
                // 保存该selector的属性
                if (s.position) {
                    _savePosition(saveData, com, controller);
                }
            }
        }
        var json = JSON.stringify(saveData);
        checkScriptDir();
        fs.writeFileSync(ScriptPath, json);
        var dbJsonPath = ScriptPath.replace(Editor.Project.path, "db:/");
        Editor.assetdb.refresh(dbJsonPath, function (err, data) {
            cc.log(data[0].uuid, cc.engine.getInstanceById(data[0].uuid));
            cc.assetManager.loadAny({ uuid: data[0].uuid }, function (err, data) {
                comPropCtrl.propertyJson = data;
            });
        });
    }
    scene.start = start;
    function checkScriptDir() {
        var dir = Editor.Project.path + '/' + Const_1.default.JsonsDir;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        return dir;
    }
    function _findController(name, controllers) {
        for (var _i = 0, controllers_1 = controllers; _i < controllers_1.length; _i++) {
            var e = controllers_1[_i];
            if (e.name == name)
                return e;
        }
        return null;
    }
    function _savePosition(saveData, com, controller) {
        saveData['position'] = com.node.position;
    }
    function _saveColor(saveData, com) {
        saveData['color'] = com.node.color;
    }
    function _regiestSaveFunction(prop, func) {
        if (_localSaveFunc[prop]) {
            cc.warn("prop: " + prop + ", \u5DF2\u7ECF\u88AB\u6CE8\u518C\u4E86, \u6B64\u6B21\u6CE8\u518C\u5C06\u4F1A\u8986\u76D6\u4E0A\u6B21\u7684func");
        }
        _localSaveFunc[prop] = func;
    }
})(scene || (scene = {}));
module.exports = scene;
