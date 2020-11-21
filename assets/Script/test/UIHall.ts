import UIBase from "../UIFrame/UIBase";
import { FormType } from "../UIFrame/config/SysDefine";
import UIUserInfo from "./UIUserInfo";
import UIFriendRank from "./UIFriendRank";
import UIMenu from "./UIMenu";
import UIRoom from "./UIRoom";
import UIManager from "../UIFrame/UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIHall extends UIBase {

    public formType = FormType.Screen;
    public canDestory = true;

    @property(cc.Label)
    lbClick: cc.Label = null;

    model: number = 1;

    static prefabPath = "UIForms/UIHall";

    async load() {
        await UIManager.getInstance().loadUIForms(UIUserInfo, UIFriendRank, UIMenu, UIRoom);
    }

    async onShow() {
        await Promise.all([UIUserInfo.openView(), UIFriendRank.openView(), UIMenu.openView(), UIRoom.openView()]);
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
        let scaleAnim = cc.tween(role).to(5, {scale: 1.1}).to(5, {scale: 1});
        cc.tween(role).repeatForever(scaleAnim).start();
    }

    // update (dt) {}
}
