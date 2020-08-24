import { MaskOpacity } from "./config/SysDefine";

export class MaskType {
    public opacity: MaskOpacity = MaskOpacity.OpacityLow;
    public clickMaskClose = false;      // 点击阴影关闭
    public isEasing = true;             // 缓动实现
    public easingTime = 0.2;            // 缓动时间

    constructor(opacity = MaskOpacity.OpacityLow, ClickMaskClose=false, IsEasing = true, EasingTime=0.2) {
        this.opacity = opacity;
        this.clickMaskClose = ClickMaskClose;
        this.isEasing = IsEasing;
        this.easingTime = EasingTime;
    }
}