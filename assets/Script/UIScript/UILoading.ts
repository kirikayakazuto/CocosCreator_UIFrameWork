import UILoading_Auto from "../AutoScripts/UILoading_Auto";
import AdapterMgr from "../UIFrame/AdapterMgr";
import CocosHelper from "../UIFrame/CocosHelper";
import { UITips } from "../UIFrame/UIForm";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UILoading extends UITips {
    
    view: UILoading_Auto;

    // onLoad () {}

    start () {

    }

    async showEffect() {
        let len = AdapterMgr.inst.visibleSize.width/2 + this.view.Left.width/2;
        this.view.Left.x = -len;
        this.view.Right.x = len;

        await Promise.all([
            CocosHelper.runTweenSync(this.view.Left, cc.tween().to(0.3, {x: -228}, cc.easeIn(3.0))),
            CocosHelper.runTweenSync(this.view.Right, cc.tween().to(0.3, {x: 228}, cc.easeIn(3.0)))
        ]);
    }

    async hideEffect() {
        let len = AdapterMgr.inst.visibleSize.width/2 + this.view.Left.width/2;
        this.view.Left.x = -228;
        this.view.Right.x = 228;

        await CocosHelper.sleepSync(0.5);
        await Promise.all([
            CocosHelper.runTweenSync(this.view.Left, cc.tween().to(0.3, {x: -len}, cc.easeIn(3.0))),
            CocosHelper.runTweenSync(this.view.Right, cc.tween().to(0.3, {x: len}, cc.easeIn(3.0)))
        ]);
    }

    // update (dt) {}
}
