import { UIFormType, UIFormShowMode, UIFormLucenyType } from './../UIFrame/config/SysDefine';
import BaseUIForm from "../UIFrame/BaseUIForm";
import UIType from "../UIFrame/UIType";
import UIManager from '../UIFrame/UIManager';
const {ccclass, property} = cc._decorator;

@ccclass
export default class TestPanel extends BaseUIForm {
    
    CurrentUIType = new UIType(UIFormType.Normal, UIFormShowMode.HideOther, UIFormLucenyType.Lucency);
    CloseAndDestory = true;

    start() {
        this.view._Nodes.Login.on('click', () => {
            this.CloseUIForm();
            UIManager.GetInstance().ShowUIFormWithLoading("UIForm/HallForm");
        }, this)
    }
    
}