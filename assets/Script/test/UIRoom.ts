import UIBase from "../UIFrame/UIBase";
import AdapterManager, { AdaptaterType } from "../UIFrame/AdapterManager";
import { ShowType } from "../UIFrame/config/SysDefine";
import { FormType } from "../UIFrame/FrameType";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIRoom extends UIBase {

    ClickMaskClose = false;
    formType = new FormType(ShowType.Fixed);

    static prefabPath = "UIForm/UIRoom";

    // onLoad () {}

    start () {
        AdapterManager.getInstance().adapatByType(AdaptaterType.Right, this.node, 20);
    }

    // update (dt) {}
}
