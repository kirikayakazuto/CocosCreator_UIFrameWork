var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _localSaveFunc = {};
var scene;
(function (scene) {
    function setState(event, t) {
        findNodeByUuid(cc.director.getScene(), t.nodeUuid, function (node) {
            if (!node) {
                Editor.warn("\u6CA1\u627E\u5230node? ".concat(t.nodeUuid));
                return;
            }
            var coms = node.getComponents("PropController");
            for (var _i = 0, coms_1 = coms; _i < coms_1.length; _i++) {
                var com = coms_1[_i];
                if (com.uuid == t.comUuid) {
                    com.state = t.state;
                }
            }
        });
    }
    scene.setState = setState;
    function findNodeByUuid(root, uuid, callback) {
        var uuidNode = root.getChildByUuid(uuid);
        if (uuidNode) {
            callback(uuidNode);
            return;
        }
        for (var _i = 0, _a = root.children; _i < _a.length; _i++) {
            var node = _a[_i];
            findNodeByUuid(node, uuid, callback);
        }
    }
    function walkNodes(root, pathType, callback, path) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, node, selector;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = root.children;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        node = _a[_i];
                        selector = node.getComponent("PropSelector");
                        if (!selector) return [3 /*break*/, 3];
                        return [4 /*yield*/, callback(selector, _makePath(pathType, path, node))];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        if (node.getComponent("PropController"))
                            return [3 /*break*/, 5];
                        if (!(node.childrenCount > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, walkNodes(node, pathType, callback, _makePath(pathType, path, node))];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    function _makePath(pathType, path, node) {
        switch (pathType) {
            case cc.NodePathType.Name:
                path += "/".concat(node.name);
                break;
            case cc.NodePathType.SiblingIndex:
                path += "/".concat(node.getSiblingIndex());
                break;
        }
        return path;
    }
    function _doSetProp(comPropCtrl, saveData) {
        return __awaiter(this, void 0, void 0, function () {
            var nodeRoot, pathType, map;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nodeRoot = comPropCtrl.node;
                        pathType = comPropCtrl.nodePathType;
                        map = saveData[comPropCtrl.state];
                        if (!map) {
                            map = saveData[comPropCtrl.state] = {};
                        }
                        return [4 /*yield*/, walkNodes(nodeRoot, pathType, function (selector, path) { return __awaiter(_this, void 0, void 0, function () {
                                var obj, _a, _b, _i, key, func, _c, _d, _e, _f, key, func, _g, _h;
                                var _j;
                                return __generator(this, function (_k) {
                                    switch (_k.label) {
                                        case 0:
                                            obj = map[path] = (_j = map[path]) !== null && _j !== void 0 ? _j : {};
                                            if (!(selector.props.length <= 0)) return [3 /*break*/, 5];
                                            _a = [];
                                            for (_b in _localSaveFunc)
                                                _a.push(_b);
                                            _i = 0;
                                            _k.label = 1;
                                        case 1:
                                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                                            key = _a[_i];
                                            func = _localSaveFunc[key];
                                            _c = obj;
                                            _d = key;
                                            return [4 /*yield*/, func(selector.node)];
                                        case 2:
                                            _c[_d] = _k.sent();
                                            _k.label = 3;
                                        case 3:
                                            _i++;
                                            return [3 /*break*/, 1];
                                        case 4: return [2 /*return*/];
                                        case 5:
                                            _e = 0, _f = selector.props;
                                            _k.label = 6;
                                        case 6:
                                            if (!(_e < _f.length)) return [3 /*break*/, 9];
                                            key = _f[_e];
                                            func = _localSaveFunc[key];
                                            _g = obj;
                                            _h = key;
                                            return [4 /*yield*/, func(selector.node)];
                                        case 7:
                                            _g[_h] = _k.sent();
                                            _k.label = 8;
                                        case 8:
                                            _e++;
                                            return [3 /*break*/, 6];
                                        case 9: return [2 /*return*/];
                                    }
                                });
                            }); }, "".concat(pathType, ":"))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
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
        var NodeRoot = childs[1];
        // 获取所有的controller
        var comPropCtrls = NodeRoot.getComponentsInChildren("PropController");
        var _loop_1 = function (comPropCtrl) {
            if (!comPropCtrl.open) {
                return "continue";
            }
            var saveData = {};
            if (!comPropCtrl.uid || comPropCtrl.uid.length <= 0) {
                cc.warn("PropController, \u8BF7\u8BBE\u7F6E node: ".concat(comPropCtrl.node.name, " \u7684 uid "));
                return { value: void 0 };
            }
            if (comPropCtrl.state < 0 || comPropCtrl.state >= comPropCtrl.states.length) {
                cc.warn("PropController, ".concat(comPropCtrl.uid, " \u63A7\u5236\u5668\u8D8A\u754C\u4E86"));
                return { value: void 0 };
            }
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
            _doSetProp(comPropCtrl, saveData).then(function () {
                comPropCtrl.propertyJson = JSON.stringify(saveData);
                Editor.log('控制器数据保存成功');
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
    function _regiestSaveFunction(propId, func) {
        if (_localSaveFunc[propId]) {
            cc.warn("prop: ".concat(propId, ", \u5DF2\u7ECF\u88AB\u6CE8\u518C\u4E86, \u6B64\u6B21\u6CE8\u518C\u5C06\u4F1A\u8986\u76D6\u4E0A\u6B21\u7684func"));
            return;
        }
        _localSaveFunc[propId] = func;
    }
    function _savePosition(node) {
        return node.position;
    }
    function _saveColor(node) {
        return {
            r: node.color.r,
            g: node.color.g,
            b: node.color.b,
            a: node.color.a,
        };
    }
    function _saveScale(node) {
        return {
            scaleX: node.scaleX,
            scaleY: node.scaleY
        };
    }
    function _saveRotation(node) {
        return node.angle;
    }
    function _saveOpacity(node) {
        return node.opacity;
    }
    function _saveSkew(node) {
        return {
            skewX: node.skewX,
            skewY: node.skewY,
        };
    }
    function _saveSize(node) {
        return node.getContentSize();
    }
    function _saveAnchor(node) {
        return {
            anchorX: node.anchorX,
            anchorY: node.anchorY,
        };
    }
    function _saveActive(node) {
        return node.active;
    }
    function _saveLabelString(node) {
        if (!node.getComponent(cc.Label))
            return;
        return node.getComponent(cc.Label).string;
    }
    function _saveSpriteTexture(node) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!node.getComponent(cc.Sprite))
                    return [2 /*return*/];
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        // let uuid = (node.getComponent(cc.Sprite).spriteFrame?.getTexture() as any)["_uuid"];
                        var uuid = node.getComponent(cc.Sprite).spriteFrame["_uuid"];
                        if (!uuid)
                            return "";
                        Editor.assetdb.queryUrlByUuid(uuid, function (error, url) {
                            if (error) {
                                resolve("");
                                return;
                            }
                            url = url.replace("db://assets/", "");
                            resolve({
                                uuid: uuid,
                                url: url
                            });
                        });
                    })];
            });
        });
    }
    function _saveAll(node) {
        var coms = node.getComponents(cc.Component);
        var props = {};
        props["node"] = {
            active: node.active,
            position: node.position,
            angle: node.angle,
            scale: {
                scaleX: node.scaleX,
                scaleY: node.scaleY,
            },
            anchor: {
                anchorX: node.anchorX,
                anchorY: node.anchorY,
            },
            size: node.getContentSize(),
            color: {
                r: node.color.r,
                g: node.color.g,
                b: node.color.b,
                a: node.color.a,
            },
            opacity: node.opacity,
            // skew: {
            //     skewX: node.skewX,
            //     skewY: node.skewY,
            // }
        };
        var comsProp = props["coms"] = {};
        for (var _i = 0, coms_2 = coms; _i < coms_2.length; _i++) {
            var com = coms_2[_i];
            if (com.name.includes("PropSelector"))
                continue;
            var prop = comsProp[com.constructor.name] = {};
            for (var key in com) {
                if (key.startsWith("_"))
                    continue;
                var val = com[key];
                if (typeof val === "function" || typeof val === "object")
                    continue;
                prop[key] = val;
            }
        }
        return props;
    }
    _regiestSaveFunction(cc.PropEmum.All, _saveAll);
    _regiestSaveFunction(cc.PropEmum.Active, _saveActive);
    _regiestSaveFunction(cc.PropEmum.Position, _savePosition);
    _regiestSaveFunction(cc.PropEmum.Color, _saveColor);
    _regiestSaveFunction(cc.PropEmum.Scale, _saveScale);
    _regiestSaveFunction(cc.PropEmum.Rotation, _saveRotation);
    _regiestSaveFunction(cc.PropEmum.Opacity, _saveOpacity);
    _regiestSaveFunction(cc.PropEmum.Slew, _saveSkew);
    _regiestSaveFunction(cc.PropEmum.Size, _saveSize);
    _regiestSaveFunction(cc.PropEmum.Anchor, _saveAnchor);
    _regiestSaveFunction(cc.PropEmum.Label_String, _saveLabelString);
    _regiestSaveFunction(cc.PropEmum.Sprite_Texture, _saveSpriteTexture);
})(scene || (scene = {}));
module.exports = scene;
