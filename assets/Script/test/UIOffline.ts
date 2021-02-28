import { FormType } from "../UIFrame/config/SysDefine";
import UIBase from "../UIFrame/UIBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIOffline extends UIBase {

    

    formType = FormType.PopUp;
    static prefabPath = "UIForms/UIOffline";

    @property(cc.Button)
    close: cc.Button = null;
    
    // onLoad () {}

    start () {
        this.close.node.on('click', () => {
            this.closeUIForm();
        }, this);
    }

    // update (dt) {}
}
