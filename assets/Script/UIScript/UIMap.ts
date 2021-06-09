import UILevel_Auto from "../AutoScripts/UILevel_Auto";
import UIMap_Auto from "../AutoScripts/UIMap_Auto";
import SceneMgr from "../UIFrame/SceneMgr";
import { UIScreen } from "../UIFrame/UIForm";
import WindowMgr from "../UIFrame/WindowMgr";
import UIFunction from "./UIFunction";
import UIGame from "./UIGame";
import UISetting from "./UISetting";
import UISkills from "./UISkills";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIMap extends UIScreen {

    static prefabPath = "Forms/Screen/UIMap";
    view: UIMap_Auto;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    async load() {
        await UIFunction.openView();
        return '';
    }

    start () {

        this.view.Round.addClick(() => {
            SceneMgr.open(UIGame.prefabPath);
        }, this);
        this.view.Back.addClick(() => {
            SceneMgr.back();
        }, this);
    }

    // update (dt) {}
}
