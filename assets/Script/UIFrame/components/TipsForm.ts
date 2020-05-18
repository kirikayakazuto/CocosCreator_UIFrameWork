import CocosHelper from "../CocosHelper";
import UIBase from "../UIBase";
import { ShowMode, ShowType } from "../config/SysDefine";
import { FormType } from "../FrameType";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TipsForm extends UIBase {
    @property(cc.Label)
    tips: cc.Label = null;

    formType = new FormType(ShowType.Tips, ShowMode.Tips);


    public static async popUp(url: string, params: any) {
        let prefab = await CocosHelper.loadRes<cc.Prefab>(url, cc.Prefab);
        if(!prefab) return ;
        let node = cc.instantiate(prefab);
        let com = node.getComponent(TipsForm);
        com.tips.string = params;
        // todo...
        await com.exitAnim();
    }
    // onLoad () {}

    start () {

    }

    async exitAnim() {
        await CocosHelper.runSyncAction(this.node, cc.moveBy(1.2, 0, 30));
        this.node.removeFromParent();
        this.node.destroy();
    }

    // update (dt) {}
}
