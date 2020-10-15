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

    onClickUseRound() {

    }
    onCLickUseSector() {

    }

    onClickMoveSector() {
        // cc.tween(this.lightHelper.sectirAngle).by(3, {x: 60}).by(3, {x: -120}).by(3, {x: 60}).start();
    }

    onClickChangeLightR() {
        // this.lightHelper.changeLightRadius(this.lightHelper.lightRadius == 600 ? 300 : 600);
    }



    onLoad () {
    
    }


}
