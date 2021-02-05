import { FormType } from "../UIFrame/config/SysDefine";
import UIBase from "../UIFrame/UIBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UITest extends UIBase {

    formType = FormType.PopUp;

    static prefabPath = "UIForms/UITest";

    // onLoad () {}

    start () {
        // this._Nodes.Name.
    }

    // update (dt) {}
}
