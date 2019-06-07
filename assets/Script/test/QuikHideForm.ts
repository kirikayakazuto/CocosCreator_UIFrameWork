import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormType, UIFormLucenyType, UIFormShowMode } from "../UIFrame/config/SysDefine";
import UIType from "../UIFrame/UIType";
const {ccclass, property} = cc._decorator;

@ccclass
export default class QuikHideForm extends BaseUIForm {

    CurrentUIType = new UIType(UIFormType.PopUp, UIFormShowMode.ReverseChange, UIFormLucenyType.Translucence);
    ClickMaskClose = false;


    init() {
        this.scheduleOnce(this.CloseUIForm.bind(this), 1)
    }
    // onLoad () {}

    start () {
        
    }

    HidePopUpAnimation(callback: Function) {
        console.log("==");
        cc.tween(this.node)
        .delay(2)
        .call(() => {
            callback();
        })
        .start();
    }

    // update (dt) {}
}
