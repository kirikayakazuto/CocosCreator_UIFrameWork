export default class  Const {
    /** 规范符号 */
    static ScriptsDir = "assets/Script/AutoScripts";         // 路径
    static STANDARD_Prefix = '_';
    static STANDARD_Separator = '$';
    static STANDARD_End = '#';
    
    
    static SeparatorMap: {[key: string]: string} = {
        "Node"        : "cc.Node",
        "Label"       : "cc.Label",
        "Button"      : "cc.Button",
        "Sprite"      : "cc.Sprite",
        "RichText"    : "cc.RichText",
        "Mask"        : "cc.Mask",
        "MotionStreak": "cc.MotionStreak",
        "TiledMap"    : "cc.TiledMap",
        "TiledTile"   : "cc.TiledTile",
        "Spine"       : "sp.Skeleton",
        "Graphics"    : "cc.Graphics",
        "Animation"   : "cc.Animation",
        "WebView"     : "cc.WebView",
        "EditBox"     : "cc.EditBox",
        "ScrollView"  : "cc.ScrollView",
        "VideoPlayer" : "cc.VideoPlayer",
        "ProgressBar" : "cc.ProgressBar",
        "PageView"    : "cc.PageView",
        "Slider"      : "cc.Slider",
        "Toggle"      : "cc.Toggle",
        "ButtonPlus"  : "ButtonPlus",
    };
}
