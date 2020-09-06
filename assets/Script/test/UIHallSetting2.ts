import UIBase from "../UIFrame/UIBase";
import { FormType, MaskOpacity } from "../UIFrame/config/SysDefine";
import { MaskType } from "../UIFrame/FrameType";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIHallSetting2 extends UIBase {

    formType = FormType.PopUp;
    maskType = new MaskType(MaskOpacity.OpacityHalf, false);

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