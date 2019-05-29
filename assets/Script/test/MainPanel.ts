import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormShowMode } from "../UIFrame/config/SysDefine";
import UIType from "../UIFrame/UIType";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainPanel extends BaseUIForm {


    CurrentUIType = new UIType(null, UIFormShowMode.HideOther);

    onLoad () {
        
    }



    // update (dt) {}
}
