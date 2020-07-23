import { ShowType, ShowLuceny } from "./config/SysDefine";

export class FormType {
    //是否清空“栈集合”
    public IsClearStack = false;
    //UI窗体（位置）类型
    public showType = ShowType.SceneBase;
    //UI mask透明度类型
    public showMask = ShowLuceny.Pentrate;

    constructor(formtype?: ShowType, lucencyType?: ShowLuceny, isClearStack?: boolean) {
        this.showType = formtype || this.showType;
        this.showMask = lucencyType || this.showMask;
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