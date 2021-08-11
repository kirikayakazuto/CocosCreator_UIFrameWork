import UISkills_Auto from "../AutoScripts/UISkills_Auto";
import { UIWindow } from "../UIFrame/UIForm";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UISkills extends UIWindow {

    view: UISkills_Auto;

    // onLoad () {}

    start () {
        this.view.Close.addClick(() => {
            this.closeSelf();
        }, this);
    }

    // update (dt) {}
}
