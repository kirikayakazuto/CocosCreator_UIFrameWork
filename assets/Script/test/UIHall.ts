import UIBase from "../UIFrame/UIBase";
import { UIType } from "../UIFrame/FormType";
import UIManager from "../UIFrame/UIManager";
import { UIFormType, UIFormShowMode } from "../UIFrame/config/SysDefine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIHall extends UIBase {

    public formType = new UIType(UIFormType.Normal, UIFormShowMode.HideOther);
    public closeAndDestory = true;


    async load() {
        await UIManager.getInstance().showUIForm("UIForm/UIUserInfo");
        await UIManager.getInstance().showUIForm("UIForm/UIFriendRank");
        await UIManager.getInstance().showUIForm("UIForm/UIMenu");
        await UIManager.getInstance().showUIForm("UIForm/UIRoom");
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
