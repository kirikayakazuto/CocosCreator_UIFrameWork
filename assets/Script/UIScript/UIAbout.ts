import UIAbout_Auto from "../AutoScripts/UIAbout_Auto";
import SceneMgr from "../UIFrame/SceneMgr";
import { UIScreen } from "../UIFrame/UIForm";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIAbout extends UIScreen {

    static prefabPath = "Forms/UIAbout";

    view: UIAbout_Auto;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.view.Close.addClick(() => {
            SceneMgr.backScene();
        }, this);
    }

    // update (dt) {}
}
