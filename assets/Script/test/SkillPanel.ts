import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormType } from "../UIFrame/config/SysDefine";
import UIType from "../UIFrame/UIType";
import AdaptationManager, { AdaptationType } from "../UIFrame/AdaptationManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SkillPanel extends BaseUIForm {

    @property(cc.Node)
    skill1: cc.Node = null;

    CurrentUIType = new UIType(UIFormType.Fixed);

    onLoad() {
        
        this.skill1.on('click', this.Skill1Callback, this);
    }
    start() {
        AdaptationManager.GetInstance().adaptationFormByType(AdaptationType.Top, this.node);
    }


    Skill1Callback() {
        this.ShowUIForm("QuikHideForm", null);
    }
}
