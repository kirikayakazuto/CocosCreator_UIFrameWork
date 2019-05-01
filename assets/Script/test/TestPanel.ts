import BaseUIForm from "../UIFrame/BaseUIForm";
import CocosHelper from "../UIFrame/CocosHelper";
import UIManager from "../UIFrame/UIManager";
import { UIFormType } from "../UIFrame/config/SysDefine";
import UIType from "../UIFrame/UIType";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TestPanel extends BaseUIForm {
    /** 窗体类型 */
    public CurrentUIType = new UIType();

    
}