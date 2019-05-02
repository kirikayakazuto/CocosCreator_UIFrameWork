import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormType } from "../UIFrame/config/SysDefine";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Prop_UIForm extends BaseUIForm {

    

    onLoad() {
        this.CurrentUIType.UIForms_Type = UIFormType.PopUp;
    }
}
