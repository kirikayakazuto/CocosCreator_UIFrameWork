import UIBase from "../UIFrame/UIBase";

import AdapterManager, { AdaptaterType } from "../UIFrame/AdapterManager";

import ButtonPlus from "../UIFrame/components/ButtonPlus";
import { ShowType } from "../UIFrame/config/SysDefine";
import GEventManager from "../UIFrame/GEventManager";
import { FormType } from "../UIFrame/FrameType";


const {ccclass, property} = cc._decorator;

@ccclass
export default class UIFriendRank extends UIBase {

    formType = new FormType(ShowType.Fixed);

    @property(cc.Node)
    content: cc.Node = null;
    

    static prefabPath = "UIForm/UIFriendRank";

    // onLoad () {} 

    start () {
        AdapterManager.getInstance().adapatByType(AdaptaterType.Left, this.node, 0);
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
