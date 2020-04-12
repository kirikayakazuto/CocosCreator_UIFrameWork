import { UIFormLucenyType, UIFormShowMode, UIFormType } from "../UIFrame/config/SysDefine";
import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIType, MaskType } from "../UIFrame/FormType";
import CocosHelper from "../UIFrame/CocosHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HallSettingForm extends BaseUIForm {

    UIType = new UIType(UIFormType.PopUp, UIFormShowMode.ReverseChange, UIFormLucenyType.Translucence);

    @property(cc.Node)
    CloseNode: cc.Node= null;


    startPosition: cc.Vec2;

    init(obj: any) {
        this.startPosition = this.node.convertToNodeSpaceAR(obj.startPosition);
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.CloseNode.on('click', () => {
            this.closeUIForm();
        }, this)
    } 

    async showPopUpAnimation() {
        this.node.scale = 0;
        this.node.setPosition(this.startPosition);
        await CocosHelper.runSyncAction(this.node, cc.spawn(cc.moveTo(0.3, 0, 0), cc.scaleTo(0.3, 1)));
    }

    async hidePopUpAnimation() {

    }

    // update (dt) {}
}
