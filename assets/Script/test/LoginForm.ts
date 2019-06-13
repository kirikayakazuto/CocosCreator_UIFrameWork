import { UIFormType, UIFormShowMode } from './../UIFrame/config/SysDefine';
import BaseUIForm from "../UIFrame/BaseUIForm";
import UIType from "../UIFrame/UIType";
const {ccclass, property} = cc._decorator;

@ccclass
export default class TestPanel extends BaseUIForm {
    

    CurrentUIType = new UIType(UIFormType.Normal, UIFormShowMode.HideOther)
    onLoad() {
        this.node.getChildByName("btn").on('click', this.callback, this);
    }

    callback() {
        this.ShowUIForm("SelectPeopleForm");
    }
    
}