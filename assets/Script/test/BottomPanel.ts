import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormType } from "../UIFrame/config/SysDefine";
import UIType from "../UIFrame/UIType";


const {ccclass, property} = cc._decorator;

@ccclass
export default class BottomPanel extends BaseUIForm {

    @property(cc.Node)
    ShopNode: cc.Node = null;


    CurrentUIType = new UIType(UIFormType.Fixed);

    onLoad() {
        this.ShopNode.on('click', this.ShopClick, this);
    }

    ShopClick() {
        let buttonPos = this.node.position.add(this.ShopNode.position)
        let obj = {
            buttonPos: buttonPos,
        }
        this.ShowUIForm("Maker_UIForm", obj)
    }

}
