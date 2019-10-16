/**窗体类型 */
export enum UIFormType {
    /** 普通窗口 */
    Normal,
    /** 固定窗口 */
    Fixed,                      
    /** 弹出窗口 */
    PopUp,    
    /** 独立窗口 */
    Independent,                  
}
/**显示类型 */
export enum UIFormShowMode {
    /** 普通, 窗体的显示和关闭并不会影响其他窗体 */
    Normal,
    /** 反向切换, 窗体关闭时, 会显示其他窗体 */
    ReverseChange,
    /** 隐藏其他, 窗体显示时, 会隐藏其他窗体 */
    HideOther,
    /** 独立显示, 不受其他窗体影响 */
    Independent,

}
/**透明度类型 */
export enum UIFormLucenyType {
    /** 完全透明，不能穿透 */
    Lucency,
    /** 半透明，不能穿透 */
    Translucence,
    /** 低透明度，不能穿透 */
    ImPenetrable,
    /** 可以穿透 */
    Pentrate    
}
/** 常量 */
export class SysDefine {
    /* 路径常量 */
    public static SYS_PATH_CANVAS = "Canvas";
    public static SYS_PATH_UIFORMS_CONFIG_INFO = "UIFormsConfigInfo";
    public static SYS_PATH_CONFIG_INFO = "SysConfigInfo";
    /* 标签常量 */
    public static SYS_UIROOT_NAME = "Canvas/UIROOT";
    public static SYS_UIMASK_NAME = "Canvas/UIROOT/UIMaskScript"
    public static SYS_UIAdaptation_NAME = "Canvas/UIROOT/UIAdaptationScript"
    /* 节点常量 */
    public static SYS_NORMAL_NODE = "Normal";
    public static SYS_FIXED_NODE = "Fixed";
    public static SYS_POPUP_NODE = "PopUp";  
    public static SYS_INDEPENDENT_NODE = "Independent";

    /** 规范符号 */
    public static SYS_STANDARD_Prefix = '_';
    public static SYS_STANDARD_Separator = '$';
    public static SYS_STANDARD_End = '#';
    
    public static SeparatorMap: {[key: string]: string} = {
        "_Node"        : "cc.Node",
        "_Label"       : "cc.Label",
        "_Button"      : "cc.Button",
        "_Sprite"      : "cc.Sprite",
        "_RichText"    : "cc.RichText",
        "_Mask"        : "cc.Mask",
        "_MotionStreak": "cc.MotionStreak",
        "_TiledMap"    : "cc.TiledMap",
        "_TiledTile"   : "cc.TiledTile",
        "_Spine"       : "sp.Spine",
        "_Graphics"    : "cc.Graphics",
        "_Animation"   : "cc.Animation",
        "_WebView"     : "cc.WebView",
        "_EditBox"     : "cc.EditBox",
        "_ScrollView"  : "cc.ScrollView",
        "_VideoPlayer" : "cc.VideoPlayer",
        "_ProgressBar" : "cc.ProgressBar",
        "_PageView"    : "cc.PageView",
        "_Slider"      : "cc.Slider",
        "_Toggle"      : "cc.Toggle",
    };

}