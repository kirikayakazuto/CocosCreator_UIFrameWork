import UIBase from "../UIFrame/UIBase";

import AdapterMgr, { AdaptaterType } from "../UIFrame/AdapterMgr";

import ButtonPlus from "../Common/Components/ButtonPlus";
import { FormType } from "../UIFrame/config/SysDefine";
import { EventCenter } from "../UIFrame/EventCenter";


const {ccclass, property} = cc._decorator;

@ccclass
export default class UIFriendRank extends UIBase {

    formType = FormType.FixedUI;

    @property(cc.Node)
    content: cc.Node = null;
    

    static prefabPath = "UIForm/UIFriendRank";

    // onLoad () {} 

    start () {
        AdapterMgr.inst.adapatByType(AdaptaterType.Left, this.node, 0);
        this.onSendGoldEvent();
    }

    /** 两个窗体间, 通过事件沟通 */
    onSendGoldEvent() {
        for(const item of this.content.children) {
            item.getChildByName("排行榜-送金币").getComponent(ButtonPlus).addClick(() => {
                EventCenter.emit('SendGold', 10);
            }, this);
        }
    }

    // update (dt) {}
}
