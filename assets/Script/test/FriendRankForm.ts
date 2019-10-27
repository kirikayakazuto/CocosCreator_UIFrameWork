import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormType } from "../UIFrame/config/SysDefine";
import AdaptationManager, { AdaptationType } from "../UIFrame/AdaptationManager";
import { UIType } from "../UIFrame/FormType";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FriendRankForm extends BaseUIForm {

    UIType = new UIType(UIFormType.Fixed);
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        AdaptationManager.GetInstance().adaptationFormByType(AdaptationType.Left, this.node, 0);
    }

    // update (dt) {}
}
