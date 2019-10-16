import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormShowMode, UIFormType } from "../UIFrame/config/SysDefine";
import UIType from "../UIFrame/UIType";
import UIManager from "../UIFrame/UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HallForm extends BaseUIForm {

    public CurrentUIType = new UIType(UIFormType.Normal, UIFormShowMode.HideOther);


    init() {
        
    }

    async load() {
        await UIManager.GetInstance().ShowUIForms("UIForm/UserInfoForm");
        await UIManager.GetInstance().ShowUIForms("UIForm/FriendRankForm");
        await UIManager.GetInstance().ShowUIForms("UIForm/MenuForm");
        await UIManager.GetInstance().ShowUIForms("UIForm/RoomForm");
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
