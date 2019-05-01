/**窗体类型 */
export enum UIFormType {
    Normal,                     // 普通窗口
    Fixed,                      // 固定窗口
    PopUp,                      // 弹出窗口
}
/**显示类型 */
export enum UIFormShowMode {
    //普通
    Normal,
    //反向切换
    ReverseChange,
    //隐藏其他
    HideOther
}
/**透明度类型 */
export enum UIFormLucenyType {
    //完全透明，不能穿透
    Lucency,
    //半透明，不能穿透
    Translucence,
    //低透明度，不能穿透
    ImPenetrable,
    //可以穿透
    Pentrate    
}

export class SysDefine {
    /* 路径常量 */
    public static SYS_PATH_CANVAS = "Canvas";
    public static SYS_PATH_UIFORMS_CONFIG_INFO = "UIFormsConfigInfo";
    public static SYS_PATH_CONFIG_INFO = "SysConfigInfo";

    /* 标签常量 */
    public static SYS_UIROOT_NAME = "UIRoot";
    /* 节点常量 */
    public static SYS_NORMAL_NODE = "Normal";
    public static SYS_FIXED_NODE = "Fixed";
    public static SYS_POPUP_NODE = "PopUp";
    // public static SYS_SCRIPTMANAGER_NODE = "_ScriptMgr";
    /* 遮罩管理器中，透明度常量 */
    public static SYS_UIMASK_LUCENCY_COLOR_RGB = 255 / 255;
    public static SYS_UIMASK_LUCENCY_COLOR_RGB_A = 0 / 255;

    public static SYS_UIMASK_TRANS_LUCENCY_COLOR_RGB = 220 / 255;
    public static SYS_UIMASK_TRANS_LUCENCY_COLOR_RGB_A = 50 / 255;

    public static SYS_UIMASK_IMPENETRABLE_COLOR_RGB = 50 / 255;
    public static SYS_UIMASK_IMPENETRABLE_COLOR_RGB_A = 200 / 255;
}