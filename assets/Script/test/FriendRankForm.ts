import BaseUIForm from "../UIFrame/BaseUIForm";

import AdaptationManager, { AdaptationType } from "../UIFrame/AdaptationManager";

import ButtonPlus from "../UIFrame/ButtonPlus";
import { UIFormType } from "../UIFrame/config/SysDefine";
import GEventManager from "../UIFrame/GEventManager";
import { UIType } from "../UIFrame/FormType";


const {ccclass, property} = cc._decorator;

@ccclass
export default class FriendRankForm extends BaseUIForm {

    UIType = new UIType(UIFormType.Fixed);

    @property(cc.Node)
    content: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {} 

    start () {
        AdaptationManager.GetInstance().adaptationFormByType(AdaptationType.Left, this.node, 0);
        this.onSendGoldEvent();
    }

    /** 两个窗体间, 通过事件沟通 */
    onSendGoldEvent() {
        for(const item of this.content.children) {
            item.getChildByName("排行榜-送金币").getComponent(ButtonPlus).addClick(() => {
                GEventManager.emit('SendGold', 10);
            }, this);
        }
    }

    // update (dt) {}
}
