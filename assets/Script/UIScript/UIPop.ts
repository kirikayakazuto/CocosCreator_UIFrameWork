// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UIPop_Auto from "../AutoScripts/UIPop_Auto";
import { UIWindow } from "../UIFrame/UIForm";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIPop extends UIWindow {

    static prefabPath = "Forms/Windows/UIPop";

    willDestory = true;

    view: UIPop_Auto;

    // onLoad () {}

    start () {
        this.view.Close.addClick(() => {
            this.closeSelf();
        }, this);
    }

    // update (dt) {}
}
