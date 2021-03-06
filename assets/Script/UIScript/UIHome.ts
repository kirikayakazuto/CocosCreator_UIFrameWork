import UIHome_Auto from "../AutoScripts/UIHome_Auto";
import PropController from "../Common/Components/PropController";
import * as StateMathine from "../Common/StateMachine/StateMachine"
import SceneMgr from "../UIFrame/SceneMgr";
import { UIFixed, UIScreen } from "../UIFrame/UIForm";
import UIManager from "../UIFrame/UIManager";
import UIAbout from "./UIAbout";
import UIMap from "./UIMap"
import UISound from "./UISound";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIHome extends UIScreen {

    static prefabPath = "Forms/Screen/UIHome";

    public view: UIHome_Auto;
    async load() {
        UIManager.getInstance().loadUIForm(UISound.prefabPath);
        return null;
    }

    model = 5;

    refreshView() {
        console.log(this.model)
    }

    start () {
        UISound.openView(); 
        this.view.Start.addClick(() => {
            SceneMgr.open(UIMap.prefabPath);
        }, this);

        this.view.About.addClick(() => {
            SceneMgr.open(UIAbout.prefabPath);
        }, this);
    }

    // update (dt) {}
}
