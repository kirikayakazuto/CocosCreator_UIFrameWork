import { UIFormLucenyType, UIFormShowMode, UIFormType } from "../UIFrame/config/SysDefine";
import UIBase from "../UIFrame/UIBase";
import { UIType, MaskType } from "../UIFrame/FormType";
import CocosHelper from "../UIFrame/CocosHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIHallSetting extends UIBase {

    formType = new UIType(UIFormType.PopUp, UIFormShowMode.ReverseChange, UIFormLucenyType.Translucence);

    @property(cc.Node)
    CloseNode: cc.Node= null;

    startPosition: cc.Vec2;

    static prefabPath = "";


    preShow(startPosition: cc.Vec2) {
        this.startPosition = this.node.convertToNodeSpaceAR(startPosition);
    }

    start () {
        this.CloseNode.on('click', () => {
            this.closeUIForm();
        }, this)
    } 

    async showAnimation() {
        this.node.scale = 0;
        this.node.setPosition(this.startPosition);
        await CocosHelper.runSyncAction(this.node, cc.spawn(cc.moveTo(0.3, 0, 0), cc.scaleTo(0.3, 1)));
    }

    async hideAnimation() {

    }

    // update (dt) {}
}
