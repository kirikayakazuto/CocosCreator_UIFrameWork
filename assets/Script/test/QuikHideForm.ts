import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormType, UIFormLucenyType, UIFormShowMode } from "../UIFrame/config/SysDefine";
import UIType from "../UIFrame/UIType";
const {ccclass, property} = cc._decorator;

@ccclass
export default class QuikHideForm extends BaseUIForm {

    CurrentUIType = new UIType(UIFormType.PopUp, UIFormShowMode.ReverseChange, UIFormLucenyType.Pentrate);
    ClickMaskClose = false;

    init() {        
        this.scheduleOnce(this.CloseUIForm.bind(this), 0.8)
    }
    // onLoad () {}

    start () {
        
    }

    HidePopUpAnimation(callback: Function) {
        
        cc.tween(this.node)
        .by(0.3, {position: cc.v2(0, 90)})
        .call(() => {
            callback();
            this.node.setPosition(0, 0);
        })
        .start();
    }

    // update (dt) {}
}
