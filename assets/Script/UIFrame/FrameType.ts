import { ShowType, ShowMode, ShowLuceny } from "./config/SysDefine";

export class FormType {
    //是否清空“栈集合”
    public IsClearStack = false;
    //UI窗体（位置）类型
    public showType = ShowType.Normal;
    //UI窗体显示类型
    public showMode = ShowMode.Normal;
    //UI窗体透明度类型
    public showLucency = ShowLuceny.Pentrate;

    constructor(formtype?: ShowType, showMode?: ShowMode, lucencyType?: ShowLuceny, isClearStack?: boolean) {
        this.showType = formtype || this.showType;
        this.showMode = showMode || this.showMode;
        this.showLucency = lucencyType || this.showLucency;
        this.IsClearStack = isClearStack || this.IsClearStack;
    }
}

export class MaskType {
    public ClickMaskClose = false;      // 点击阴影关闭
    public IsEasing = false;            // 缓动实现
    public EasingTime = 0.3;            // 缓动时间

    constructor(ClickMaskClose=false, IsEasing = false, EasingTime=0.3) {
        this.ClickMaskClose = ClickMaskClose;
        this.IsEasing = IsEasing;
        this.EasingTime = EasingTime;
    }
}