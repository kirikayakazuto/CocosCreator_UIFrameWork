import UIBase from "../UIFrame/UIBase";
import { FormType } from "../UIFrame/FrameType";
import { ShowType } from "../UIFrame/config/SysDefine";
import UIUserInfo from "./UIUserInfo";
import UIFriendRank from "./UIFriendRank";
import UIMenu from "./UIMenu";
import UIRoom from "./UIRoom";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIHall extends UIBase {

    public formType = new FormType(ShowType.SceneBase);
    public canDestory = false;

    @property(cc.Label)
    lbClick: cc.Label = null;

    model: number = 1;

    static prefabPath = "UIForm/UIHall";

    async load() {
        await Promise.all([UIUserInfo.openView(), UIFriendRank.openView(), UIMenu.openView(), UIRoom.openView()]);
    }

    onShow() {

    }

    refreshView() {
        this.lbClick.string = `${this.model}`;
    }

    start () {
        this.playRoleAnim();
    }

    onClick() {
        this.model ++;
    }

    playRoleAnim() {
        let role = cc.find("role", this.node)
        role.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(5, 1.1),  cc.scaleTo(5, 1))));
    }

    // update (dt) {}
}
