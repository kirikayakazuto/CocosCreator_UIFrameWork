import CocosHelper from "./CocosHelper";
import UIBase from "./UIBase";
import { FormType } from "./config/SysDefine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TipsForm extends UIBase {
    @property(cc.Label)
    tips: cc.Label = null;

    formType = FormType.TopTips;


    public static async popUp(url: string, params: any) {
        let prefab = await CocosHelper.loadResSync<cc.Prefab>(url, cc.Prefab);
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
        await CocosHelper.runActionSync(this.node, cc.moveBy(1.2, 0, 30));
        this.node.removeFromParent();
        this.node.destroy();
    }

    // update (dt) {}
}
