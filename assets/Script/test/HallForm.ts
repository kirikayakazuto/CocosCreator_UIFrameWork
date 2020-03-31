import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIType } from "../UIFrame/FormType";
import UIManager from "../UIFrame/UIManager";
import { UIFormType, UIFormShowMode } from "../UIFrame/config/SysDefine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HallForm extends BaseUIForm {

    public UIType = new UIType(UIFormType.Normal, UIFormShowMode.HideOther);
    CloseAndDestory = true;

    init() {
        
    }

    async load() {
        await UIManager.getInstance().showUIForm("UIForm/UserInfoForm");
        await UIManager.getInstance().showUIForm("UIForm/FriendRankForm");
        await UIManager.getInstance().showUIForm("UIForm/MenuForm");
        await UIManager.getInstance().showUIForm("UIForm/RoomForm");
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
