import { MaskOpacity } from "./config/SysDefine";

export class MaskType {
    public opacity: MaskOpacity = MaskOpacity.Pentrate;
    public clickMaskClose = false;      // 点击阴影关闭
    public isEasing = false;            // 缓动实现
    public easingTime = 0.3;            // 缓动时间

    constructor(opacity = MaskOpacity.Pentrate, ClickMaskClose=false, IsEasing = false, EasingTime=0.3) {
        this.opacity = opacity;
        this.clickMaskClose = ClickMaskClose;
        this.isEasing = IsEasing;
        this.easingTime = EasingTime;
    }
}