import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormType } from "../UIFrame/config/SysDefine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SkillPanel extends BaseUIForm {

    @property(cc.Node)
    skill1: cc.Node = null;

    onLoad() {
        this.CurrentUIType.UIForms_Type = UIFormType.Fixed;
        this.skill1.on('click', this.Skill1Callback, this);
    }

    Skill1Callback() {
        cc.log("skill1 clicked");
    }
}
