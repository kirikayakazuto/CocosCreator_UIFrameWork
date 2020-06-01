import { ShowType, ShowMode, ShowLuceny } from '../UIFrame/config/SysDefine';
import UIBase from "../UIFrame/UIBase";
import { FormType } from '../UIFrame/FrameType';
import GEventManager from '../UIFrame/GEventManager';
import UIHall from './UIHall';
const {ccclass, property} = cc._decorator;

@ccclass
export default class UILogin extends UIBase {
    
    formType = new FormType(ShowType.Normal, ShowMode.HideOther, ShowLuceny.Lucency);
    closeAndDestory = true;

    static prefabPath = "UIForm/UILogin";

    onPreShow(a: number, b: number, c: number) {
        console.log(a, b, c);
        GEventManager.emit("Event_Login", 1, 2, 3);
    }

    /** 下面表示 生命周期顺序 */
    init() {
        cc.log('init');
    }

    async load() {
        cc.log('load');
        // 在这里执行你的加载操作, 如HallForm中的await UIManager.GetInstance().ShowUIForms("UIForm/UserInfoForm");
    }

    onLoad() {
        cc.log('onload');
    }

    start() {
        cc.log('start')
    }

    onDestroy() {
        cc.log('destory');
        // 这里可以执行你的销毁操作, 在该窗体执行destory时, 会调用onDestory方法
    }

    onClickLogin() {
        this.closeUIForm();
        UIHall.show();
    }
}