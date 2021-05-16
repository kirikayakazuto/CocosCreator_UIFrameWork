import UILevel_Auto from "../AutoScripts/UILevel_Auto";
import SceneMgr from "../UIFrame/SceneMgr";
import { UIScreen } from "../UIFrame/UIForm";
import WindowMgr from "../UIFrame/WindowMgr";
import UISetting from "./UISetting";
import UISkills from "./UISkills";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIMap extends UIScreen {

    static prefabPath = "Forms/Screen/UIMap";
    view: UILevel_Auto;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.view.Back.addClick(() => {
            SceneMgr.back();
        }, this);

        this.view.Setting.addClick(() => {
            UISetting.openView();
        }, this);

        this.view.Skills.addClick(() => {
            WindowMgr.open(UISkills.prefabPath);
        }, this);
    }

    // update (dt) {}
}
