import UILevel_Auto from "../AutoScripts/UILevel_Auto";
import SceneMgr from "../UIFrame/SceneMgr";
import { UIScreen } from "../UIFrame/UIForm";
import UISetting from "./UISetting";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UILevel extends UIScreen {

    static prefabPath = "Forms/Screen/UILevel";
    view: UILevel_Auto;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.view.Back.addClick(() => {
            SceneMgr.backScene();
        }, this);

        this.view.Setting.addClick(() => {
            UISetting.openView();
        }, this);

        this.view.Skills.addClick(() => {

        }, this);
    }

    // update (dt) {}
}
