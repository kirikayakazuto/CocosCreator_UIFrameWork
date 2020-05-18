import UIBase from "../UIFrame/UIBase";
import { FormType } from "../UIFrame/FrameType";
import { ShowType, ShowMode, ShowLuceny } from "../UIFrame/config/SysDefine";


const {ccclass, property} = cc._decorator;

@ccclass
export default class UICreateRoom extends UIBase {

    formType = new FormType(ShowType.PopUp, ShowMode.ReverseChange, ShowLuceny.ImPenetrable);
    
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
