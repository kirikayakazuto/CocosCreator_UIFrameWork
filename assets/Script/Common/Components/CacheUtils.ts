// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ResMgr from "../../UIFrame/ResMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CacheUtils extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    com: cc.Label = null;
    onLoad () {
        this.com = this.getComponent(cc.Label);
    }

    

    start () {

    }

    update (dt) {
        this.com.string = ResMgr.inst.computeTextureCache();
    }
}
