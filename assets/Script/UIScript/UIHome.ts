import UIHome_Auto from "../AutoScripts/UIHome_Auto";
import SceneMgr from "../UIFrame/SceneMgr";
import { UIScreen } from "../UIFrame/UIForm";
import UIAbout from "./UIAbout";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIHome extends UIScreen {

    static prefabPath = "Forms/UIHome";

    public view: UIHome_Auto;
    async load() {
        return null;
    }

    // onLoad () {}

    start () {
        this.view.Start.addClick(() => {

        }, this);

        this.view.About.addClick(() => {
            SceneMgr.openScene(UIAbout.prefabPath);
        }, this);
    }

    // update (dt) {}
}
