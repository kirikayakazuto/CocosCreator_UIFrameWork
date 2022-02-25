import CocosHelper from "./CocosHelper";
import { FormType } from "./config/SysDefine";
import FixedMgr from "./FixedMgr";
import SceneMgr from "./SceneMgr";
import { IFormData, ModalType } from "./Struct";
import UIBase from "./UIBase";
import WindowMgr from "./WindowMgr";


export class UIScreen extends UIBase {
    formType = FormType.Screen;
    willDestory = true;


    public async closeSelf(): Promise<boolean> {
        return await SceneMgr.close(this.fid);
    }
}

export class UIWindow extends UIBase {
    formType = FormType.Window;    
    modalType = new ModalType();                // 阴影类型
    willDestory = true;

    /** 显示效果 */
    public async showEffect() {
        this.node.scale = 0;
        await CocosHelper.runTweenSync(this.node, cc.tween().to(0.3, {scale: 1}, cc.easeBackOut()));
    }

    public async closeSelf(): Promise<boolean> {
        return await WindowMgr.close(this.fid);
    }

}

export class UIFixed extends UIBase {
    formType = FormType.Fixed;
    willDestory = true;

    public async closeSelf(): Promise<boolean> {
        return await FixedMgr.close(this.fid);
    }
    
}

export class UITips extends UIBase {
    formType = FormType.Tips;
}

// @ts-ignore
cc.UIScreen = UIScreen;
// @ts-ignore
cc.UIWindow = UIWindow;
// @ts-ignore
cc.UIFixed = UIFixed;
// @ts-ignore
cc.UITips = UITips;
