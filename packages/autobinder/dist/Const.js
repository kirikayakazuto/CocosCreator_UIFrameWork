"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Const = /** @class */ (function () {
    function Const() {
    }
    /** 规范符号 */
    Const.ScriptsDir = "assets/Script/AutoScripts"; // 代码生成路径
    Const.STANDARD_Prefix = '_'; // 绑定前缀
    Const.STANDARD_Separator = '$'; // 分隔符
    Const.STANDARD_End = '#'; // 绑定后缀, 结点添加此后缀后, 不会查询其子节点
    Const.SeparatorMap = {
        "Node": "cc.Node",
        "Label": "cc.Label",
        "Button": "cc.Button",
        "Sprite": "cc.Sprite",
        "RichText": "cc.RichText",
        "Mask": "cc.Mask",
        "MotionStreak": "cc.MotionStreak",
        "TiledMap": "cc.TiledMap",
        "TiledTile": "cc.TiledTile",
        "Spine": "sp.Skeleton",
        "Graphics": "cc.Graphics",
        "Animation": "cc.Animation",
        "WebView": "cc.WebView",
        "EditBox": "cc.EditBox",
        "ScrollView": "cc.ScrollView",
        "VideoPlayer": "cc.VideoPlayer",
        "ProgressBar": "cc.ProgressBar",
        "PageView": "cc.PageView",
        "Slider": "cc.Slider",
        "Toggle": "cc.Toggle",
        "ButtonPlus": "ButtonPlus",
    };
    return Const;
}());
exports.default = Const;
