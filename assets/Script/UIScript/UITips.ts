import UITips_Auto from "../AutoScripts/UITips_Auto";
import { UIWindow } from "../UIFrame/UIForm";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UITips extends UIWindow {

    static prefabPath = "Forms/Windows/UITips"

    view: UITips_Auto;
    

    // onLoad () {}

    start () {

    }

    onShow(str: string) {
        this.view.Tips.string = str;
    }

    // update (dt) {}
}
