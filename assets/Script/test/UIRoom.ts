import UIBase from "../UIFrame/UIBase";
import AdapterManager, { AdaptationType } from "../UIFrame/AdapterManager";
import { UIFormType } from "../UIFrame/config/SysDefine";
import { UIType } from "../UIFrame/FormType";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIRoom extends UIBase {

    ClickMaskClose = false;
    formType = new UIType(UIFormType.Fixed);

    static prefabPath = "UIForm/UIRoom";

    // onLoad () {}

    start () {
        AdapterManager.getInstance().adapatByType(AdaptationType.Right, this.node, 20);
    }

    // update (dt) {}
}
