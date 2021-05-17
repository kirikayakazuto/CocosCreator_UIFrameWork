import UISetting_Auto from "../AutoScripts/UISetting_Auto";
import AdapterMgr from "../UIFrame/AdapterMgr";
import CocosHelper from "../UIFrame/CocosHelper";
import { UIWindow } from "../UIFrame/UIForm";
import UIPop from "./UIPop";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UISetting extends UIWindow {
    willDestory = true;
    static prefabPath = "Forms/Windows/UISetting";
    view: UISetting_Auto;

    // onLoad () {}

    start () {
        this.view.Close.addClick(() => {
            this.closeSelf();
        }, this);

        this.view.Pop.addClick(() => {
            UIPop.openView(1, {showWait: true});
        }, this);
    }

    async showEffect() {
        let len = AdapterMgr.inst.visibleSize.height/2 + 300;
        this.node.y = len;
        await CocosHelper.runTweenSync(this.node, cc.tween().to(0.5, {y: 0}, cc.easeBackOut()));
    }

    async hideEffect() {
        let len = AdapterMgr.inst.visibleSize.height/2 + 300;
        this.node.y = 0;
        await CocosHelper.runTweenSync(this.node, cc.tween().to(0.3, {y: len}, cc.easeBackIn()));
    }

    // update (dt) {}
}
