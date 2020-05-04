import { UIFormType, UIFormShowMode, UIFormLucenyType } from '../UIFrame/config/SysDefine';
import UIBase from "../UIFrame/UIBase";
import UIManager from '../UIFrame/UIManager';
import { UIType } from '../UIFrame/FormType';
import GEventManager from '../UIFrame/GEventManager';
const {ccclass, property} = cc._decorator;

@ccclass
export default class UILogin extends UIBase {
    
    formType = new UIType(UIFormType.Normal, UIFormShowMode.HideOther, UIFormLucenyType.Lucency);
    closeAndDestory = true;

    static prefabPath = "UIForm/UILogin";

    preShow(a: number, b: number, c: number) {
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
        this.closeUIForm();
        UIManager.getInstance().showUIForm("UIForm/HallForm");
    }

    onDestroy() {
        cc.log('destory');
        // 这里可以执行你的销毁操作, 在该窗体执行destory时, 会调用onDestory方法
    }
}