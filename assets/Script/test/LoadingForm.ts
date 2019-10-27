import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormType, UIFormShowMode } from "../UIFrame/config/SysDefine";
import { UIType } from "../UIFrame/FormType";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Loading extends BaseUIForm {

    UIType = new UIType(UIFormType.Independent, UIFormShowMode.Independent);

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
