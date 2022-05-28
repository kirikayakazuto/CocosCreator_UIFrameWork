"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Const_1 = __importDefault(require("./Const"));
//@ts-ignore
var fs = require('fs');
//@ts-ignore
var path = require('path');
var ProjectPath = Editor.Project.path;
var scene;
(function (scene) {
    var map = {};
    /** 遍历resources/forms */
    function start() {
        return __awaiter(this, void 0, void 0, function () {
            var config, ProjectDir, FormsPath, ConfigPath, contentStr, key, strScript, dbConfigPath;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Editor.log("\u6B63\u5728\u8BFB\u53D6\u914D\u7F6E\u6587\u4EF6: ".concat(ProjectPath, "/").concat(Const_1.default.ConfigUrl, " \u8BF7\u7A0D\u7B49."));
                        config = fs.readFileSync("".concat(ProjectPath, "/").concat(Const_1.default.ConfigUrl));
                        if (!config) {
                            Editor.log("\u8BFB\u53D6\u914D\u7F6E\u6587\u4EF6\u5931\u8D25:".concat(ProjectPath, "/").concat(Const_1.default.ConfigUrl));
                            return [2 /*return*/];
                        }
                        config = JSON.parse(config);
                        ProjectDir = Editor.Project.path;
                        FormsPath = "".concat(ProjectDir, "/").concat(config.FormsDir).replace(/\\/g, "/");
                        ConfigPath = "".concat(ProjectDir, "/").concat(config.ScriptsDir, "/").concat(config.ScriptsName).replace(/\\/g, "/");
                        return [4 /*yield*/, walkDirSync(FormsPath, function (prefabUrl, stat) { return __awaiter(_this, void 0, void 0, function () {
                                var type, baseName;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, getPrefabType(prefabUrl)];
                                        case 1:
                                            type = _a.sent();
                                            if (!type)
                                                return [2 /*return*/, null];
                                            baseName = path.basename(prefabUrl).split(".")[0];
                                            map[baseName] = {
                                                prefabUrl: getResourcesUrl(prefabUrl),
                                                type: type
                                            };
                                            return [2 /*return*/, null];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        contentStr = "";
                        for (key in map) {
                            contentStr += "static ".concat(key, " = {\n        prefabUrl: \"").concat(map[key].prefabUrl, "\",\n        type: \"").concat(map[key].type, "\"\n    }\n    ");
                        }
                        strScript = "\nexport default class UIConfig {\n    ".concat(contentStr, "\n}\ncc.game.on(cc.game.EVENT_GAME_INITED, () => {\n    for(const key in UIConfig) {\n        let constourt = cc.js.getClassByName(key);\n        if(constourt) constourt['UIConfig'] = UIConfig[key];\n    }\n});\n");
                        dbConfigPath = ConfigPath.replace(Editor.Project.path.replace(/\\/g, "/"), "db:/");
                        return [4 /*yield*/, saveFile(dbConfigPath, strScript)];
                    case 2:
                        _a.sent();
                        Editor.log("\u751F\u6210".concat(config.ScriptsName, "\u6587\u4EF6\u6210\u529F"));
                        return [2 /*return*/];
                }
            });
        });
    }
    scene.start = start;
    function saveFile(ScriptPath, strScript) {
        return new Promise(function (resolve, reject) {
            // main process or renderer process
            Editor.assetdb.createOrSave(ScriptPath, strScript, function (err, meta) {
                if (err) {
                    resolve(null);
                    return;
                }
                resolve(meta);
            });
        });
    }
    function getResourcesUrl(fileUrl) {
        var url = "".concat(Editor.Project.path, "/assets/resources/").replace(/\\/g, "/");
        fileUrl = fileUrl.replace(/\\/g, "/");
        Editor.log(fileUrl, url);
        return fileUrl.replace(url, "").split('.')[0];
    }
    function getPrefabType(fileUrl) {
        return new Promise(function (resolve, reject) {
            var dbFileUrl = getResourcesUrl(fileUrl);
            cc.resources.load(dbFileUrl, cc.Prefab, function (err, asset) {
                if (err) {
                    resolve(null);
                    return;
                }
                //@ts-ignore
                var UIBase = cc.UIBase, UIScreen = cc.UIScreen, UIWindow = cc.UIWindow, UIFixed = cc.UIFixed, UITips = cc.UITips;
                var node = asset.data;
                var com = node.getComponent(UIBase);
                if (!com) {
                    Editor.log("".concat(fileUrl, ", \u6CA1\u6709\u7EE7\u627F\u4E0EUIBase"));
                    resolve(null);
                    return;
                }
                if (com instanceof UIScreen)
                    resolve("UIScreen");
                else if (com instanceof UIWindow)
                    resolve("UIWindow");
                else if (com instanceof UIFixed)
                    resolve("UIFixed");
                else if (com instanceof UITips)
                    resolve("UITips");
            });
        });
    }
    // 遍历文件夹
    function walkDirSync(dir, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var items, i, name_1, filePath, stat, extName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        items = fs.readdirSync(dir);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < items.length)) return [3 /*break*/, 8];
                        name_1 = items[i];
                        filePath = path.join(dir, name_1);
                        stat = fs.statSync(filePath);
                        if (!stat.isFile()) return [3 /*break*/, 5];
                        extName = path.extname(filePath);
                        if (!checkIsPrefab(extName)) return [3 /*break*/, 3];
                        return [4 /*yield*/, callback(filePath, stat)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        if (extName != '.meta')
                            Editor.log("\u63D0\u793A: \u8DF3\u8FC7".concat(filePath, ", \u56E0\u4E3A\u5B83\u4E0D\u662Fprefab~"));
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        if (!stat.isDirectory()) return [3 /*break*/, 7];
                        return [4 /*yield*/, walkDirSync(filePath, callback)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 1];
                    case 8: return [2 /*return*/, null];
                }
            });
        });
    }
    function checkIsPrefab(extName) {
        return extName == '.prefab';
    }
})(scene || (scene = {}));
module.exports = scene;
