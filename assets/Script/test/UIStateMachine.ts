import StateMachine from "../Common/StateMachine/state-machine";
import { FormType } from "../UIFrame/config/SysDefine";
import UIBase from "../UIFrame/UIBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIStateMachine extends UIBase {
    formType = FormType.Screen;
    static prefabPath = "UIForms/UIStateMachine";
    // onLoad () {}

    start () {
        StateMachine.create({
            
        })   
    }



    // update (dt) {}
}
