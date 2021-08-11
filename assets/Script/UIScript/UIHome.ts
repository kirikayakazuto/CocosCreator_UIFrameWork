import UIHome_Auto from "../AutoScripts/UIHome_Auto";
import PropController from "../Common/Components/PropController";
import * as StateMathine from "../Common/StateMachine/StateMachine"
import SceneMgr from "../UIFrame/SceneMgr";
import { UIFixed, UIScreen } from "../UIFrame/UIForm";
import UIManager from "../UIFrame/UIManager";
import UIAbout from "./UIAbout";
import UIConfig from "./UIConfig";
import UIMap from "./UIMap"
import UISound from "./UISound";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIHome extends UIScreen {

    public view: UIHome_Auto;
    async load() {
        UIManager.getInstance().loadUIForm(UIConfig.Sound.prefabUrl);
        return null;
    }

    model = 5;

    refreshView() {
        console.log(this.model)
    }

    start () {
        UIManager.getInstance().openForm(UIConfig.Sound.prefabUrl);

        this.view.Start.addClick(() => {
            SceneMgr.open(UIConfig.Map.prefabUrl);
        }, this);

        this.view.About.addClick(() => {
            SceneMgr.open(UIConfig.About.prefabUrl);
        }, this);

        this.view.Back.addClick(() => {
            SceneMgr.back();
        }, this);
    }

    // update (dt) {}
}
