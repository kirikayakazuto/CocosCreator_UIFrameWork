"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Const_1 = __importDefault(require("./Const"));
var fs = require('fire-fs');
var _localSaveFunc = {};
var ROOT_NODE = null;
var scene;
(function (scene) {
    function _readFile(path, callback) {
        fs.readFile(path, 'utf8', function (err, data) {
            if (!err) {
                callback(JSON.parse(data));
            }
            else {
                callback({});
            }
        });
    }
    function _doSetProp(comPropCtrl, NodeRoot, saveData) {
        var coms = NodeRoot.getComponentsInChildren("PropSelector");
        for (var _i = 0, coms_1 = coms; _i < coms_1.length; _i++) {
            var com = coms_1[_i];
            // 只处理当前状态的控制器属性
            if (com.ctrlId !== comPropCtrl.id) {
                continue;
            }
            for (var _a = 0, _b = com.props; _a < _b.length; _a++) {
                var e = _b[_a];
                var func = _localSaveFunc[e];
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
    function start() {
        var childs = cc.director.getScene().children;
        if (childs.length < 3)
            return null;
        var NodeRoot = ROOT_NODE = childs[1];
        var comPropCtrl = NodeRoot.getComponent("PropController");
        if (!comPropCtrl) {
            // Editor.warn(`${NodeRoot.name} 没有挂载 PropController 脚本`);
            return;
        }
        var PropEmum = cc.PropEmum;
        _regiestSaveFunction(PropEmum.Position, _savePosition);
        _regiestSaveFunction(PropEmum.Color, _saveColor);
        _regiestSaveFunction(PropEmum.Scale, _saveScale);
        var saveData = {};
        var ProjectDir = Editor.Project.path;
        var ScriptName = NodeRoot.name + "_Auto";
        var ScriptPath = (ProjectDir + "/" + Const_1.default.JsonsDir + "/" + ScriptName + ".json").replace(/\\/g, "/");
        if (comPropCtrl.type < 0 || comPropCtrl.type >= comPropCtrl.types.length) {
            cc.warn("PropController, " + comPropCtrl.id + " \u63A7\u5236\u5668\u7684 type \u8D8A\u754C\u4E86");
            return;
        }
        _readFile(ScriptPath, function (data) {
            saveData = data;
            // 把当前状态的数据置空
            saveData[comPropCtrl.types[comPropCtrl.type]] = {};
            _doSetProp(comPropCtrl, NodeRoot, saveData);
            var json = JSON.stringify(saveData);
            checkScriptDir();
            fs.writeFileSync(ScriptPath, json);
            var dbJsonPath = ScriptPath.replace(ProjectDir, "db:/");
            Editor.assetdb.refresh(dbJsonPath, function (err, data) {
                cc.assetManager.loadAny({ uuid: data[0].uuid }, function (err, data) {
                    comPropCtrl.propertyJson = data;
                });
                // Editor.log('控制器数据保存成功-', dbJsonPath);
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
    function _getNodePath(node, rootNode) {
        var parent = node;
        var path = '';
        while (parent) {
            if (parent.uuid == rootNode.uuid) {
                break;
            }
            path += '/' + parent.name;
            parent = parent.parent;
        }
        return path;
    }
    function _regiestSaveFunction(propId, func) {
        if (_localSaveFunc[propId]) {
            // cc.warn(`prop: ${propId}, 已经被注册了, 此次注册将会覆盖上次的func`);
            return;
        }
        _localSaveFunc[propId] = func;
    }
    function _checkSaveData(saveData, com, controller) {
        var type = controller.types[controller.type];
        var map = saveData[type];
        if (!map)
            map = saveData[type] = {};
        var path = _getNodePath(com.node, ROOT_NODE);
        var d = map[path];
        if (!d)
            d = map[path] = {};
        return d;
    }
    function _savePosition(saveData, com, controller) {
        var d = _checkSaveData(saveData, com, controller);
        d[cc.PropEmum.Position] = com.node.position;
    }
    function _saveColor(saveData, com, controller) {
        var d = _checkSaveData(saveData, com, controller);
        d[cc.PropEmum.Color] = {
            r: com.node.color.r,
            g: com.node.color.g,
            b: com.node.color.b,
            a: com.node.color.a,
        };
    }
    function _saveScale(saveData, com, controller) {
        var d = _checkSaveData(saveData, com, controller);
        d[cc.PropEmum.Scale] = {
            scaleX: com.node.scaleX,
            scaleY: com.node.scaleY
        };
    }
})(scene || (scene = {}));
module.exports = scene;
