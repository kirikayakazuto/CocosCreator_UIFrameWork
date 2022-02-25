import UIGame_Auto from "../AutoScripts/UIGame_Auto";
import FormMgr from "../UIFrame/FormMgr";
import { UIScreen } from "../UIFrame/UIForm";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIGame extends UIScreen {


    view: UIGame_Auto;

    // onLoad () {}

    start () {
        this.view.Back.addClick(() => {
            FormMgr.backScene();
        }, this);
    }

    // update (dt) {}
}
