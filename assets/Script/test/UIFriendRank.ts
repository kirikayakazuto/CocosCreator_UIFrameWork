import UIBase from "../UIFrame/UIBase";

import AdapterManager, { AdaptationType } from "../UIFrame/AdapterManager";

import ButtonPlus from "../UIFrame/components/ButtonPlus";
import { UIFormType } from "../UIFrame/config/SysDefine";
import GEventManager from "../UIFrame/GEventManager";
import { UIType } from "../UIFrame/FormType";


const {ccclass, property} = cc._decorator;

@ccclass
export default class UIFriendRank extends UIBase {

    formType = new UIType(UIFormType.Fixed);

    @property(cc.Node)
    content: cc.Node = null;
    

    static prefabPath = "UIForm/UIFriendRank";

    // onLoad () {} 

    start () {
        AdapterManager.getInstance().adapatByType(AdaptationType.Left, this.node, 0);
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
