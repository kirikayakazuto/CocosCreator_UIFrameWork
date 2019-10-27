import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormType, UIFormLucenyType, UIFormShowMode } from "../UIFrame/config/SysDefine";
import { UIType } from "../UIFrame/FormType";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CreateRoomForm extends BaseUIForm {

    UIType = new UIType(UIFormType.PopUp, UIFormShowMode.ReverseChange, UIFormLucenyType.ImPenetrable);
    ClickMaskClose = false;
    
    @property(cc.Node)
    CloseNode: cc.Node= null;
    // onLoad () {}

    start () {
        this.CloseNode.on('click', () => {
            this.CloseUIForm();
        }, this)
    }

    // update (dt) {}
}
