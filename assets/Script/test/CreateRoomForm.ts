import BaseUIForm from "../UIFrame/BaseUIForm";
import UIType from "../UIFrame/UIType";
import { UIFormType, UIFormLucenyType, UIFormShowMode } from "../UIFrame/config/SysDefine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CreateRoomForm extends BaseUIForm {

    CurrentUIType = new UIType(UIFormType.PopUp, UIFormShowMode.ReverseChange, UIFormLucenyType.ImPenetrable);
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
