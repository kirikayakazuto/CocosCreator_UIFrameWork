import UIBase from "../UIFrame/UIBase";
import { ShowType } from "../UIFrame/config/SysDefine";
import AdapterMgr, { AdaptaterType } from "../UIFrame/AdapterMgr";
import { FormType, MaskType } from "../UIFrame/FrameType";
import UILogin from "./UILogin";
import { EventCenter } from "../UIFrame/EventCenter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIUserInfo extends UIBase {

    formType = new FormType(ShowType.FixedUI);
    
    @property(cc.Node)
    backNode: cc.Node = null;

    static prefabPath = "UIForm/UIUserInfo";

    // onLoad () {}

    start () {
        AdapterMgr.inst.adapatByType(AdaptaterType.Top, this.node);
        this.backNode.on('click', () => {
            UILogin.openView(1, 2, 3);
        });

        /**  */
        EventCenter.on('SendGold', (gold: number) => {
            cc.log('收到了来自FriendRankForm的消息');
        }, this);
    }

    // update (dt) {}
}
