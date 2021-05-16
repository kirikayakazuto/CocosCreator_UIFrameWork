import AdapterMgr, { AdaptaterType } from "../UIFrame/AdapterMgr";
import { UIFixed } from "../UIFrame/UIForm";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UISound extends UIFixed {

    static prefabPath = "Forms/Fixed/UISound"


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        AdapterMgr.inst.adapatByType(AdaptaterType.Right, this.node);
        AdapterMgr.inst.adapatByType(AdaptaterType.Top, this.node);
    }

    // update (dt) {}
}
