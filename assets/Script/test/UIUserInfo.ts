import UIBase from "../UIFrame/UIBase";
import { ShowType } from "../UIFrame/config/SysDefine";
import AdapterManager, { AdaptaterType } from "../UIFrame/AdapterManager";
import { FormType } from "../UIFrame/FrameType";
import GEventManager from "../UIFrame/GEventManager";
import UILogin from "./UILogin";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIUserInfo extends UIBase {

    formType = new FormType(ShowType.Fixed);   
    
    @property(cc.Node)
    backNode: cc.Node = null;

    static prefabPath = "UIForm/UIUserInfo";

    // onLoad () {}

    start () {
        AdapterManager.getInstance().adapatByType(AdaptaterType.Top, this.node);
        this.backNode.on('click', () => {
            UILogin.show(1, 2, 3);
        });

        /**  */
        GEventManager.on('SendGold', (gold: number) => {
            cc.log('收到了来自FriendRankForm的消息');
        }, this);
    }

    // update (dt) {}
}
