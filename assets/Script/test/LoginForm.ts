import { UIFormType, UIFormShowMode, UIFormLucenyType } from './../UIFrame/config/SysDefine';
import BaseUIForm from "../UIFrame/BaseUIForm";
import UIManager from '../UIFrame/UIManager';
import { UIType } from '../UIFrame/FormType';
const {ccclass, property} = cc._decorator;

@ccclass
export default class TestPanel extends BaseUIForm {
    
    UIType = new UIType(UIFormType.Normal, UIFormShowMode.HideOther, UIFormLucenyType.Lucency);
    CloseAndDestory = true;

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
        this.view._Nodes.Login.on('click', () => {
            this.CloseUIForm();
            UIManager.GetInstance().showUIForm("UIForm/HallForm");
        }, this)
    }

    onDestroy() {
        cc.log('destory');
        // 这里可以执行你的销毁操作, 在该窗体执行destory时, 会调用onDestory方法
    }
}