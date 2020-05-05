import UIBase from "../UIFrame/UIBase";
import { UIType } from "../UIFrame/FormType";
import UIManager from "../UIFrame/UIManager";
import { UIFormType, UIFormShowMode } from "../UIFrame/config/SysDefine";
import UIUserInfo from "./UIUserInfo";
import UIFriendRank from "./UIFriendRank";
import UIMenu from "./UIMenu";
import UIRoom from "./UIRoom";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIHall extends UIBase {

    public formType = new UIType(UIFormType.Normal, UIFormShowMode.HideOther);
    public closeAndDestory = true;


    static prefabPath = "UIForm/UIHall";

    async load() {
        await UIUserInfo.show();
        await UIFriendRank.show();
        await UIMenu.show();
        await UIRoom.show();
    }

    start () {
        this.playRoleAnim();
    }

    playRoleAnim() {
        let role = cc.find("role", this.node)
        role.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(5, 1.1),  cc.scaleTo(5, 1))));
    }

    // update (dt) {}
}
