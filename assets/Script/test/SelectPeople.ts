import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormShowMode } from "../UIFrame/config/SysDefine";
import UIType from "../UIFrame/UIType";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SelectPeople extends BaseUIForm {



    CurrentUIType = new UIType(null, UIFormShowMode.HideOther);

    onLoad () {
        this.node.getChildByName("btn").on('click', this.EnterGame, this);
        this.node.getChildByName("close").on('click', this.BackGame, this);
    }

    EnterGame() {
        this.ShowUIForm("MainPanel", null);
        this.ShowUIForm("SkillPanel", null);
        this.ShowUIForm("BottomPanel", null);
    }

    BackGame() {
        this.CloseUIForm();
    }

    start () {

    }

    // update (dt) {}
}
