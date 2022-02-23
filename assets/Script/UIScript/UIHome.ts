import UIHome_Auto from "../AutoScripts/UIHome_Auto";
import SceneMgr from "../UIFrame/SceneMgr";
import { UIFixed, UIScreen } from "../UIFrame/UIForm";
import UIManager from "../UIFrame/UIManager";
import UIConfig from "./UIConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class UIHome extends UIScreen {

    public view: UIHome_Auto;
    async load() {
        await UIManager.getInstance().openForm(UIConfig.Sound.prefabUrl);;
        return null;
    }

    model = 5;
    refreshView() {
        console.log(this.model)
    }

    start () {
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
