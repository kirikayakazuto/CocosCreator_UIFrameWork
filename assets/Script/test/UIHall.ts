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
    public destoryAfterClose = true;

    @property(cc.Label)
    lbClick: cc.Label = null;

    @observable
    public clickCount = 0;

    static prefabPath = "UIForm/UIHall";

    async load() {
        await UIUserInfo.openView();
        await UIFriendRank.openView();
        await UIMenu.openView();
        await UIRoom.openView();
    }

    onShow() {
        autorun(this.refreshClickView.bind(this));
    }

    refreshClickView() {
        this.lbClick.string = `${this.clickCount}`;
    }

    start () {
        this.playRoleAnim();
    }

    onClick() {
        this.clickCount ++;
    }

    playRoleAnim() {
        let role = cc.find("role", this.node)
        role.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(5, 1.1),  cc.scaleTo(5, 1))));
    }

    // update (dt) {}
}
