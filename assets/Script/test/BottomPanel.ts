import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormType } from "../UIFrame/config/SysDefine";


const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends BaseUIForm {

    @property(cc.Node)
    ShopNode: cc.Node = null;

    onLoad() {
        this.CurrentUIType.UIForms_Type = UIFormType.Fixed;
        this.ShopNode.on('click', this.ShopClick, this);
    }

    ShopClick() {
        this.OpenUIForm("Maker_UIForm")
    }


}
