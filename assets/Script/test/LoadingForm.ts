import UIBase from "../UIFrame/UIBase";
import { UIFormType, UIFormShowMode } from "../UIFrame/config/SysDefine";
import { UIType } from "../UIFrame/FormType";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Loading extends UIBase {

    formType = new UIType(UIFormType.Independent, UIFormShowMode.Independent);

    
    
    start () {

    }

    // update (dt) {}
}
