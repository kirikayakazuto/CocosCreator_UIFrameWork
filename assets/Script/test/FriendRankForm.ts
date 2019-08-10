import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormType } from "../UIFrame/config/SysDefine";
import UIType from "../UIFrame/UIType";
import AdaptationManager, { AdaptationType } from "../UIFrame/AdaptationManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FriendRankForm extends BaseUIForm {

    CurrentUIType = new UIType(UIFormType.Fixed);
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        AdaptationManager.GetInstance().adaptationFormByType(AdaptationType.Left, this.node, 0);
    }

    // update (dt) {}
}
