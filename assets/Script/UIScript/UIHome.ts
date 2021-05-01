import UIHome_Auto from "../AutoScripts/UIHome_Auto";
import SceneMgr from "../UIFrame/SceneMgr";
import { UIScreen } from "../UIFrame/UIForm";
import UIAbout from "./UIAbout";
import UILevel from "./UILevel";
import UIPop from "./UIPop";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIHome extends UIScreen {

    static prefabPath = "Forms/Screen/UIHome";

    public view: UIHome_Auto;
    async load() {
        return null;
    }

    // onLoad () {}

    start () {
        this.view.Start.addClick(() => {
            SceneMgr.openScene(UILevel.prefabPath);
        }, this);

        this.view.About.addClick(() => {
            SceneMgr.openScene(UIAbout.prefabPath);
        }, this);

        this.view.Tips.addClick(() => {
            UIPop.openView();
        }, this);
    }

    // update (dt) {}
}
