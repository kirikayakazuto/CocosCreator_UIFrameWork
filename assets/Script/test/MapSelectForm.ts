import { UIFormType } from './../UIFrame/config/SysDefine';
import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormShowMode } from "../UIFrame/config/SysDefine";
import UIType from "../UIFrame/UIType";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainPanel extends BaseUIForm {


    CurrentUIType = new UIType(UIFormType.Normal, UIFormShowMode.HideOther);

    onLoad () {
        
    }

    start() {
        this.ShowUIForm("SkillPanel", null);
        this.ShowUIForm("BottomPanel", null);
    }



    // update (dt) {}
}
