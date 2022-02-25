import UIAbout_Auto from "../AutoScripts/UIAbout_Auto";
import FormMgr from "../UIFrame/FormMgr";
import { UIScreen } from "../UIFrame/UIForm";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIAbout extends UIScreen {

    view: UIAbout_Auto;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.view.Close.addClick(() => {
            FormMgr.backScene();
        }, this);
    }

    // update (dt) {}
}
