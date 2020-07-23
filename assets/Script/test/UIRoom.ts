import UIBase from "../UIFrame/UIBase";
import AdapterMgr, { AdaptaterType } from "../UIFrame/AdapterMgr";
import { ShowType } from "../UIFrame/config/SysDefine";
import { FormType } from "../UIFrame/FrameType";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIRoom extends UIBase {

    ClickMaskClose = false;
    formType = new FormType(ShowType.FixedUI);

    static prefabPath = "UIForm/UIRoom";

    // onLoad () {}

    start () {
        AdapterMgr.inst.adapatByType(AdaptaterType.Right, this.node, 20);
    }

    // update (dt) {}
}
