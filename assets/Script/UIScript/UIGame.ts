import UIGame_Auto from "../AutoScripts/UIGame_Auto";
import SceneMgr from "../UIFrame/SceneMgr";
import { UIScreen } from "../UIFrame/UIForm";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIGame extends UIScreen {


    view: UIGame_Auto;

    // onLoad () {}

    start () {
        this.view.Back.addClick(() => {
            SceneMgr.back();
        }, this);
    }

    // update (dt) {}
}
