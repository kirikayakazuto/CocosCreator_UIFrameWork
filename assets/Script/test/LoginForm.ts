import { UIFormType, UIFormShowMode, UIFormLucenyType } from './../UIFrame/config/SysDefine';
import BaseUIForm from "../UIFrame/BaseUIForm";
import UIType from "../UIFrame/UIType";
import UIManager from '../UIFrame/UIManager';
const {ccclass, property} = cc._decorator;

@ccclass
export default class TestPanel extends BaseUIForm {
    
    CurrentUIType = new UIType(UIFormType.Normal, UIFormShowMode.HideOther, UIFormLucenyType.Lucency);
    CloseAndDestory = true;         // 这里设置为true表示会将这个结点所依赖的资源销毁


    start() {
        this._Nodes.Login.on('click', () => {
            this.ShowUIForm("UIForm/HallForm", null);
        }, this)
    }
    
}