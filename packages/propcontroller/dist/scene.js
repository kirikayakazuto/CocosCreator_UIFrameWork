"use strict";
var _localSaveFunc = {};
var ROOT_NODE = null;
var NodePathType = 1;
var fs = require('fire-fs');
var path = require("fire-path");
var dirName = "assets/PropComponent";
var scene;
(function (scene) {
    function _checkScriptDir() {
        var dir = path.join(Editor.Project.path, dirName);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }
    function _readFile(path, callback) {
        fs.readFile(path, 'utf8', function (err, data) {
            if (!err) {
                callback(data);
                return;
            }
            Editor.log(path);
            Editor.error(JSON.stringify(err));
            callback(null);
        });
    }
    function copyScript() {
        _checkScriptDir();
        _copyScript("PropController.ts", function () {
            _copyScript("PropSelector.ts", function () {
                Editor.assetdb.refresh("db://" + dirName);
            });
        });
    }
    scene.copyScript = copyScript;
    function _copyScript(scriptName, callback) {
        _readFile(Editor.url("packages://propcontroller/dist/Scripts/" + scriptName), function (data) {
            if (!data)
                return;
            var url = path.join(Editor.Project.path, dirName, scriptName);
            fs.writeFileSync(url, data);
            callback && callback();
        });
    }
    function setState(event, t) {
        var node = cc.director.getScene().getChildByUuid(t.nodeUuid);
        var coms = node.getComponents("PropController");
        for (var _i = 0, coms_1 = coms; _i < coms_1.length; _i++) {
            var com = coms_1[_i];
            if (com.uuid == t.comUuid) {
                com.state = t.state;
            }
        }
    }
    scene.setState = setState;
    function _doSetProp(comPropCtrl, NodeRoot, saveData) {
        var coms = NodeRoot.getComponentsInChildren("PropSelector");
        for (var _i = 0, coms_2 = coms; _i < coms_2.length; _i++) {
            var com = coms_2[_i];
            // 只处理当前状态的控制器属性
            var ctrl = NodeRoot.getComponents("PropController")[com.ctrlId];
            if (!ctrl || ctrl.uid !== comPropCtrl.uid) {
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
     */
    function start() {
        var childs = cc.director.getScene().children;
        if (childs.length < 3)
            return null;
        var NodeRoot = ROOT_NODE = childs[1];
        var comPropCtrls = NodeRoot.getComponents("PropController");
        for (var _i = 0, comPropCtrls_1 = comPropCtrls; _i < comPropCtrls_1.length; _i++) {
            var comPropCtrl = comPropCtrls_1[_i];
            if (!comPropCtrl || !comPropCtrl.open) {
                continue;
            }
            var saveData = {};
            if (!comPropCtrl.uid || comPropCtrl.uid.length <= 0) {
                cc.warn("PropController, \u8BF7\u8BBE\u7F6E PropController \u7684 uid " + comPropCtrl.node.name + " ");
                return;
            }
            if (comPropCtrl.state < 0 || comPropCtrl.state >= comPropCtrl.states.length) {
                cc.warn("PropController, " + comPropCtrl.uid + " \u63A7\u5236\u5668\u8D8A\u754C\u4E86");
                return;
            }
            NodePathType = comPropCtrl.nodePathType;
            if (comPropCtrl.propertyJson) {
                saveData = JSON.parse(comPropCtrl.propertyJson);
            }
            // 把当前状态的数据置空, 重新保存
            saveData[comPropCtrl.state] = {};
            // 删除已经不存在的状态
            for (var e in saveData) {
                if (+e >= comPropCtrl.states.length) { // 表示这个状态已经废弃了
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
    scene.start = start;
    function _getNodePathByName(node, rootNode) {
        var parent = node;
        var path = '';
        while (parent) {
            if (parent.uuid == rootNode.uuid) {
                break;
            }
            path += '/' + parent.name;
            parent = parent.parent;
        }
        return "0:" + path;
    }
    function _getNodePathBySilblineIndex(node, rootNode) {
        var path = '';
        while (node.uuid != rootNode.uuid) {
            path += '/' + node.getSiblingIndex();
            node = node.parent;
        }
        return "1:" + path;
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
        var path = '';
        switch (NodePathType) {
            case cc.NodePathType.Name:
                path = _getNodePathByName(com.node, ROOT_NODE);
                break;
            case cc.NodePathType.SiblingIndex:
                path = _getNodePathBySilblineIndex(com.node, ROOT_NODE);
                break;
        }
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
    function _saveSpriteTexture(saveData, com, controller) {
        if (!com.getComponent(cc.Sprite))
            return;
        var d = _checkSaveData(saveData, com, controller);
        d[cc.PropEmum.Sprite_Texture] = com.getComponent(cc.Sprite).spriteFrame['_uuid'];
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
    _regiestSaveFunction(cc.PropEmum.Sprite_Texture, _saveSpriteTexture);
})(scene || (scene = {}));
module.exports = scene;
