import UIPop_Auto from "../AutoScripts/UIPop_Auto";
import { UIWindow } from "../UIFrame/UIForm";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIPop extends UIWindow {


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
