import { UIFormType, UIFormShowMode, UIFormLucenyType } from './../UIFrame/config/SysDefine';
import BaseUIForm from "../UIFrame/BaseUIForm";
import UIManager from '../UIFrame/UIManager';
import { UIType } from '../UIFrame/FormType';
const {ccclass, property} = cc._decorator;

@ccclass
export default class TestPanel extends BaseUIForm {
    
    UIType = new UIType(UIFormType.Normal, UIFormShowMode.HideOther, UIFormLucenyType.Lucency);
    CloseAndDestory = true;

    init() {
        cc.log('init')
    }

    onLoad() {
        cc.log('onload')
    }

    start() {
        cc.log('start')
        this.view._Nodes.Login.on('click', () => {
            this.CloseUIForm();
            UIManager.GetInstance().ShowUIFormWithLoading("UIForm/HallForm");
        }, this)
    }
    
}