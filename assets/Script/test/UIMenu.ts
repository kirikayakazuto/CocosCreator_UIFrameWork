import UIBase from "../UIFrame/UIBase";
import { ShowType } from "../UIFrame/config/SysDefine";
import AdapterMgr, { AdaptaterType } from "../UIFrame/AdapterMgr";
import UIManager from "../UIFrame/UIManager";
import { FormType } from "../UIFrame/FrameType";
import UIHallSetting from "./UIHallSetting";

const {ccclass, property} = cc._decorator;


@ccclass
export default class UIMenu extends UIBase {

    formType = new FormType(ShowType.FixedUI);
    
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