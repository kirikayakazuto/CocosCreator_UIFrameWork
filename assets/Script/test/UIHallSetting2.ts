import UIBase from "../UIFrame/UIBase";
import { FormType } from "../UIFrame/config/SysDefine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIHallSetting2 extends UIBase {

    formType = FormType.PopUp;

    public start() {

    }

    onClickYes() {
        this._cb(true);
        this.closeUIForm();
    }

    onClickNo() {
        this._cb(false);
        this.closeUIForm();
    }


}