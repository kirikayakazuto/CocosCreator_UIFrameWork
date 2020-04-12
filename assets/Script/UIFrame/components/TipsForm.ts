import CocosHelper from "../CocosHelper";
import UIManager from "../UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TipsForm extends cc.Component {

    @property(cc.Label)
    tips: cc.Label = null;

    public static async popUp(url: string, params: any) {
        let prefab = await CocosHelper.loadRes(url, cc.Prefab) as cc.Prefab;
        if(!prefab) return ;
        let node = cc.instantiate(prefab);
        let com = node.getComponent(TipsForm);
        com.tips.string = params;
        UIManager.getInstance().addTips(node);
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
