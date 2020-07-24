import UIBase from "../UIFrame/UIBase";
import { FormType } from "../UIFrame/config/SysDefine";
import AdapterMgr, { AdaptaterType } from "../UIFrame/AdapterMgr";
import UIHallSetting from "./UIHallSetting";

const {ccclass, property} = cc._decorator;


@ccclass
export default class UIMenu extends UIBase {

    formType = FormType.FixedUI;
    
    static prefabPath = "UIForm/UIMenu";

    onShow() {
        
    }

    start () {
        AdapterMgr.inst.adapatByType(AdaptaterType.Bottom, this.node, -2);
    }
    
    onHide() {
        
    }

    menuClick(e: cc.Event.EventTouch, data) {
        let pos = e.getLocation();
        UIHallSetting.openView(pos);
    }

    // update (dt) {}
}