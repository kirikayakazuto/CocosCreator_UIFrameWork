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
            var ctrl = NodeRoot.getComponents("PropController")[com.ctrlId];
            if (ctrl.uid !== comPropCtrl.uid) {
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
        var comPropCtrls = NodeRoot.getComponents("PropController");
        var _loop_1 = function (comPropCtrl) {
            if (!comPropCtrl || !comPropCtrl.open) {
                return "continue";
            }
            var saveData = {};
            var ProjectDir = Editor.Project.path;
            var ScriptName = NodeRoot.name + "_" + comPropCtrl.uid + "_Auto";
            var ScriptPath = (ProjectDir + "/" + Const_1.default.JsonsDir + "/" + ScriptName + ".json").replace(/\\/g, "/");
            if (!comPropCtrl.uid || comPropCtrl.uid.length <= 0) {
                cc.warn("PropController, \u8BF7\u8BBE\u7F6E PropController \u7684 uid " + comPropCtrl.uid + " ");
                return { value: void 0 };
            }
            if (comPropCtrl.state < 0 || comPropCtrl.state >= comPropCtrl.states.length) {
                cc.warn("PropController, " + comPropCtrl.uid + " \u63A7\u5236\u5668\u8D8A\u754C\u4E86");
                return { value: void 0 };
            }
            _readFile(ScriptPath, function (data) {
                saveData = data;
                // 把当前状态的数据置空
                saveData[comPropCtrl.state] = {};
                // 删除已经不存在的状态
                for (var e in saveData) {
                    if (parseInt(e) >= comPropCtrl.states.length) { // 表示这个状态已经废弃了
                        saveData[e] = null;
                        delete saveData[e];
                    }
                }
                // 把当前控制器下的
                _doSetProp(comPropCtrl, NodeRoot, saveData);
                var json = JSON.stringify(saveData);
                checkScriptDir();
                fs.writeFileSync(ScriptPath, json);
                var dbJsonPath = ScriptPath.replace(ProjectDir, "db:/");
                Editor.assetdb.refresh(dbJsonPath, function (err, data) {
                    cc.assetManager.loadAny({ uuid: data[0].uuid }, function (err, data) {
                        comPropCtrl.propertyJson = data;
                        Editor.log('控制器数据保存成功-', dbJsonPath);
                    });
                });
            });
        };
        for (var _i = 0, comPropCtrls_1 = comPropCtrls; _i < comPropCtrls_1.length; _i++) {
            var comPropCtrl = comPropCtrls_1[_i];
            var state_1 = _loop_1(comPropCtrl);
            if (typeof state_1 === "object")
                return state_1.value;
        }
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
            cc.warn("prop: " + propId + ", \u5DF2\u7ECF\u88AB\u6CE8\u518C\u4E86, \u6B64\u6B21\u6CE8\u518C\u5C06\u4F1A\u8986\u76D6\u4E0A\u6B21\u7684func");
            return;
        }
        _localSaveFunc[propId] = func;
    }
    function _checkSaveData(saveData, com, controller) {
        var state = controller.state;
        var map = saveData[state];
        if (!map)
            map = saveData[state] = {};
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
    function _saveRotation(saveData, com, controller) {
        var d = _checkSaveData(saveData, com, controller);
        d[cc.PropEmum.Rotation] = com.node.angle;
    }
    function _saveOpacity(saveData, com, controller) {
        var d = _checkSaveData(saveData, com, controller);
        d[cc.PropEmum.Opacity] = com.node.opacity;
    }
    function _saveSlew(saveData, com, controller) {
        var d = _checkSaveData(saveData, com, controller);
        d[cc.PropEmum.Slew] = {
            slewX: com.node.slewX,
            slewY: com.node.slewY,
        };
    }
    function _saveSize(saveData, com, controller) {
        var d = _checkSaveData(saveData, com, controller);
        d[cc.PropEmum.Size] = com.node.getContentSize();
    }
    function _saveAnchor(saveData, com, controller) {
        var d = _checkSaveData(saveData, com, controller);
        d[cc.PropEmum.Anchor] = {
            anchorX: com.node.anchorX,
            anchorY: com.node.anchorY,
        };
    }
    function _saveActive(saveData, com, controller) {
        var d = _checkSaveData(saveData, com, controller);
        d[cc.PropEmum.Active] = com.node.active;
    }
    function _saveLabelString(saveData, com, controller) {
        if (!com.getComponent(cc.Label))
            return;
        var d = _checkSaveData(saveData, com, controller);
        d[cc.PropEmum.Label_String] = com.getComponent(cc.Label).string;
    }
    _regiestSaveFunction(cc.PropEmum.Active, _saveActive);
    _regiestSaveFunction(cc.PropEmum.Position, _savePosition);
    _regiestSaveFunction(cc.PropEmum.Color, _saveColor);
    _regiestSaveFunction(cc.PropEmum.Scale, _saveScale);
    _regiestSaveFunction(cc.PropEmum.Rotation, _saveRotation);
    _regiestSaveFunction(cc.PropEmum.Opacity, _saveOpacity);
    _regiestSaveFunction(cc.PropEmum.Slew, _saveSlew);
    _regiestSaveFunction(cc.PropEmum.Size, _saveSize);
    _regiestSaveFunction(cc.PropEmum.Anchor, _saveAnchor);
    _regiestSaveFunction(cc.PropEmum.Label_String, _saveLabelString);
})(scene || (scene = {}));
module.exports = scene;
