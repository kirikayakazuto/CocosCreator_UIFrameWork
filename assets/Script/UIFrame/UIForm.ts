import CocosHelper from "./CocosHelper";
import { FormType } from "./config/SysDefine";
import { ModalType } from "./Struct";
import UIBase from "./UIBase";

export class UIScreen extends UIBase {
    formType = FormType.Screen;
    willDestory = true;
}

export class UIWindow extends UIBase {
    formType = FormType.Window;    
    modalType = new ModalType();                // 阴影类型
    priority = 0;                               // 优先级(会影响弹窗的层级, 先判断优先级, 在判断添加顺序)

    /** 显示效果 */
    public async showEffect() {
        this.node.scale = 0;
        await CocosHelper.runTweenSync(this.node, cc.tween().to(0.3, {scale: 1}, cc.easeBackOut()));
    }

}

export class UIFixed extends UIBase {
    formType = FormType.Fixed;
    
}

export class UITips extends UIBase {
    formType = FormType.Tips;
}

