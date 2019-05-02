import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormShowMode } from "../UIFrame/config/SysDefine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainPanel extends BaseUIForm {


    onLoad () {
        this.CurrentUIType.UIForms_ShowMode = UIFormShowMode.HideOther;
        
    }



    // update (dt) {}
}
