import UIBase from "../UIFrame/UIBase";
import { UIType } from "../UIFrame/FormType";
import { UIFormType, UIFormShowMode, UIFormLucenyType } from "../UIFrame/config/SysDefine";


const {ccclass, property} = cc._decorator;

@ccclass
export default class UICreateRoom extends UIBase {

    formType = new UIType(UIFormType.PopUp, UIFormShowMode.ReverseChange, UIFormLucenyType.ImPenetrable);
    
    ClickMaskClose = false;


    static prefabPath = "UIForm/UICreateRoom";

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
