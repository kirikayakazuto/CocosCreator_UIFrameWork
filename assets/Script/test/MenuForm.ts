import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormType } from "../UIFrame/config/SysDefine";
import AdaptationManager, { AdaptationType } from "../UIFrame/AdaptationManager";
import UIManager from "../UIFrame/UIManager";
import { UIType } from "../UIFrame/FormType";

const {ccclass, property} = cc._decorator;


@ccclass
export default class MenuForm extends BaseUIForm {

    UIType = new UIType(UIFormType.Fixed);
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        AdaptationManager.GetInstance().adaptationFormByType(AdaptationType.Bottom, this.node, -2);
    }

    menuClick(e: cc.Event.EventTouch, data) {
        let pos = e.getLocation();
        let obj = {
            startPosition: pos
        }
        switch(data) {
            case "sz":
                UIManager.GetInstance().ShowUIForms("UIForm/HallSettingForm", obj);
            break;
        }
    }

    // update (dt) {}
}