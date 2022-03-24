import * as cc from "cc";

import CocosHelper from "./CocosHelper";
import { FormType } from "./config/SysDefine";
import FormMgr from "./FormMgr";
import { ModalType } from "./Struct";
import UIBase from "./UIBase";


export class UIScreen extends UIBase {
    formType = FormType.Screen;
    willDestory = true;


    public async closeSelf(): Promise<boolean> {
        return await FormMgr.close({prefabUrl: this.fid, type: this.formType});
    }
}

export class UIWindow extends UIBase {
    formType = FormType.Window;    
    modalType = new ModalType();                // 阴影类型
    willDestory = true;

    /** 显示效果 */
    public async showEffect() {
        this.node.setScale(cc.v3(0, 0));
        
        
        await CocosHelper.runTweenSync(this.node, cc.tween().to(0.3, {scale: new cc.Vec3(1, 1)}, {}));
    }

    public async closeSelf(): Promise<boolean> {
        return await FormMgr.close({prefabUrl: this.fid, type: this.formType});
    }

}

export class UIFixed extends UIBase {
    formType = FormType.Fixed;
    willDestory = true;

    public async closeSelf(): Promise<boolean> {
        return await FormMgr.close({prefabUrl: this.fid, type: this.formType});
    }
    
}

export class UITips extends UIBase {
    formType = FormType.Tips;

    public async closeSelf(): Promise<boolean> {
        return await FormMgr.close({prefabUrl: this.fid, type: this.formType});
    }
}

// @ts-ignore
cc.UIScreen = UIScreen;
// @ts-ignore
cc.UIWindow = UIWindow;
// @ts-ignore
cc.UIFixed = UIFixed;
// @ts-ignore
cc.UITips = UITips;
