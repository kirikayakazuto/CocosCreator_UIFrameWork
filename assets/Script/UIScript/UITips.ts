import UITips_Auto from "../AutoScripts/UITips_Auto";
import UIBase from "../UIFrame/UIBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UITips extends UIBase {

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
