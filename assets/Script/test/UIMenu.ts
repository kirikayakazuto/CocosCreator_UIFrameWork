import UIBase from "../UIFrame/UIBase";
import { UIFormType } from "../UIFrame/config/SysDefine";
import AdapterManager, { AdaptationType } from "../UIFrame/AdapterManager";
import UIManager from "../UIFrame/UIManager";
import { UIType } from "../UIFrame/FormType";

const {ccclass, property} = cc._decorator;


@ccclass
export default class UIMenu extends UIBase {

    formType = new UIType(UIFormType.Fixed);
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        AdapterManager.getInstance().adapatByType(AdaptationType.Bottom, this.node, -2);
    }

    menuClick(e: cc.Event.EventTouch, data) {
        let pos = e.getLocation();

        switch(data) {
            case "sz":
                UIManager.getInstance().showUIForm("UIForm/UIHallSetting", pos);
            break;
        }
    }

    // update (dt) {}
}