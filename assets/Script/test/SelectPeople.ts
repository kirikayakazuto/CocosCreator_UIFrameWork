import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormShowMode } from "../UIFrame/config/SysDefine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SelectPeople extends BaseUIForm {


onLoad () {

        this.CurrentUIType.UIForms_ShowMode = UIFormShowMode.HideOther;
        
        this.node.getChildByName("btn").on('click', this.EnterGame, this);
        this.node.getChildByName("close").on('click', this.BackGame, this)
        
    }

    EnterGame() {
        this.OpenUIForm("MainPanel");
        this.OpenUIForm("SkillPanel");
        this.OpenUIForm("BottomPanel");
    }
    BackGame() {
        this.CloseUIForm();
    }

    start () {

    }

    // update (dt) {}
}
