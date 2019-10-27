import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormType } from "../UIFrame/config/SysDefine";
import AdaptationManager, { AdaptationType } from "../UIFrame/AdaptationManager";
import { UIType } from "../UIFrame/FormType";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UserInfoForm extends BaseUIForm {

    UIType = new UIType(UIFormType.Fixed);   
    
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
