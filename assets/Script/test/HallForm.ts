import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormShowMode, UIFormType } from "../UIFrame/config/SysDefine";
import UIType from "../UIFrame/UIType";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HallForm extends BaseUIForm {

    public CurrentUIType = new UIType(UIFormType.Normal, UIFormShowMode.HideOther);


    start () {
        this.playRoleAnim();
        this.ShowUIForm("UIForm/UserInfoForm");
        this.ShowUIForm("UIForm/FriendRankForm");
        this.ShowUIForm("UIForm/MenuForm");
        this.ShowUIForm("UIForm/RoomForm");
    }

    playRoleAnim() {
        let role = cc.find("role", this.node)
        role.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(5, 1.1),  cc.scaleTo(5, 1))));
    }

    // update (dt) {}
}
