import UIBase from "../UIFrame/UIBase";
import { FormType, ModalOpacity } from "../UIFrame/config/SysDefine";


const {ccclass, property} = cc._decorator;

@ccclass
export default class UICreateRoom extends UIBase {

    formType = FormType.PopUp;
    ClickMaskClose = false;
    static prefabPath = "UIForms/UICreateRoom";

    @property(cc.Node)
    CloseNode: cc.Node= null;
    // onLoad () {}

    start () {
        this.CloseNode.on('click', () => {
            this.closeUIForm();
        }, this)
    }

    // update (dt) {}
}
  