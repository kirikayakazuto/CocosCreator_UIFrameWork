import { FormType } from "../UIFrame/config/SysDefine";
import UIBase from "../UIFrame/UIBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIBehavior extends UIBase {

    formType = FormType.Screen;
    static prefabPath = "UIForms/UIBehavior";

    onShow() {

    }

    start () {
        let tree = new b3.BehaviorTree();
    }

    // update (dt) {}
}
