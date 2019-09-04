import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormType } from "../UIFrame/config/SysDefine";
import UIType from "../UIFrame/UIType";
import AdaptationManager, { AdaptationType } from "../UIFrame/AdaptationManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UserInfoForm extends BaseUIForm {

    CurrentUIType = new UIType(UIFormType.Fixed);   
    
    @property(cc.Node)
    backNode: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        AdaptationManager.GetInstance().adaptationFormByType(AdaptationType.Top, this.node);
        this.backNode.on('click', () => {
            this.ShowUIForm("UIForm/LoginForm");
        });
    }

    // update (dt) {}
}
