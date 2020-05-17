import UIBase from "../UIFrame/UIBase";
import { UIFormType } from "../UIFrame/config/SysDefine";
import AdapterManager, { AdaptaterType } from "../UIFrame/AdapterManager";
import UIManager from "../UIFrame/UIManager";
import { UIType } from "../UIFrame/FormType";
import UIHallSetting from "./UIHallSetting";

const {ccclass, property} = cc._decorator;


@ccclass
export default class UIMenu extends UIBase {

    formType = new UIType(UIFormType.Fixed);
    
    static prefabPath = "UIForm/UIMenu";

    start () {
        AdapterManager.getInstance().adapatByType(AdaptaterType.Bottom, this.node, -2);
    }

    menuClick(e: cc.Event.EventTouch, data) {
        let pos = e.getLocation();

        switch(data) {
            case "sz":
                UIHallSetting.show(pos);
            break;
        }
    }

    // update (dt) {}
}