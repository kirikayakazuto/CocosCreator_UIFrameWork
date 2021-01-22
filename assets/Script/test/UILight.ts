import LightHelper from "../Common/light/LightHelper";
import { FormType } from "../UIFrame/config/SysDefine";
import UIBase from "../UIFrame/UIBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UILight extends UIBase {

    formType = FormType.Screen;
    static prefabPath = "UIForms/UILight";

    @property(LightHelper)
    lightHelper: LightHelper = null;

    @property(cc.Node)
    ndItem: cc.Node = null;

    start() {
        let node = this.ndItem.children[1];
        cc.tween(node).by(50, {x: 1000, y: -1000}).start();
    }



    onLoad () {
    
    }


}
