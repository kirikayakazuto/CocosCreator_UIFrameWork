import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormType } from "../UIFrame/config/SysDefine";
import UIType from "../UIFrame/UIType";
import AdaptationManager, { AdaptationType } from "../UIFrame/AdaptationManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class BottomPanel extends BaseUIForm {

    @property(cc.Node)
    ShopNode: cc.Node = null;


    CurrentUIType = new UIType(UIFormType.Fixed);

    onLoad() {}
    start() {
        AdaptationManager.GetInstance().adaptationFormByType(AdaptationType.Bottom, this.node);
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
