import BaseUIForm from "../UIFrame/BaseUIForm";
import UIType from "../UIFrame/UIType";
import { UIFormType, UIFormShowMode } from "../UIFrame/config/SysDefine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Loading extends BaseUIForm {

    CurrentUIType = new UIType(UIFormType.Independent, UIFormShowMode.Independent);

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
