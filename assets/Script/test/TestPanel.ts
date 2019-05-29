import BaseUIForm from "../UIFrame/BaseUIForm";
import CocosHelper from "../UIFrame/CocosHelper";
import UIManager from "../UIFrame/UIManager";
import { UIFormType, UIFormShowMode, UIFormLucenyType } from "../UIFrame/config/SysDefine";
import UIType from "../UIFrame/UIType";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TestPanel extends BaseUIForm {
    



    onLoad() {
        this.node.getChildByName("btn").on('click', this.callback, this);
    }

    callback() {
        this.ShowUIForm("SelectPeople");
    }
    
}