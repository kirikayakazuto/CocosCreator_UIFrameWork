import UIHome_Auto from "../AutoScripts/UIHome_Auto";
import FormMgr from "../UIFrame/FormMgr";
import { UIFixed, UIScreen } from "../UIFrame/UIForm";
import UIManager from "../UIFrame/UIManager";
import UIConfig from "./../UIConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class UIHome extends UIScreen {

    public view: UIHome_Auto;
    async load() {
        await UIManager.getInstance().openForm(UIConfig.UISound.prefabUrl);;
        return null;
    }

    model = 5;
    refreshView() {
        console.log(this.model)
    }

    start () {
        this.view.Start.addClick(() => {
            FormMgr.open(UIConfig.UIMap);
        }, this);

        this.view.About.addClick(() => {
            FormMgr.open(UIConfig.UIAbout);
        }, this);

        this.view.Back.addClick(() => {
            FormMgr.backScene();
        }, this);
    }

    // update (dt) {}
}
