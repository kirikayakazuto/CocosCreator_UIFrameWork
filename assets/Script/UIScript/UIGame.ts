import UIGame_Auto from "../AutoScripts/UIGame_Auto";
import SceneMgr from "../UIFrame/SceneMgr";
import UIBase from "../UIFrame/UIBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIGame extends UIBase {

    static prefabPath = "Forms/Screen/UIGame";

    view: UIGame_Auto;

    // onLoad () {}

    start () {
        this.view.Back.addClick(() => {
            SceneMgr.back();
        }, this);
    }

    // update (dt) {}
}
