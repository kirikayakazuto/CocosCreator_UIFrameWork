import UIFunction_Auto from "../AutoScripts/UIFunction_Auto";
import AdapterMgr, { AdaptaterType } from "../UIFrame/AdapterMgr";
import { UIFixed } from "../UIFrame/UIForm";
import WindowMgr from "../UIFrame/WindowMgr";
import UISetting from "./UISetting";
import UISkills from "./UISkills";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIFunction extends UIFixed {
    static prefabPath = "Forms/Fixed/UIFunction"
    
    view: UIFunction_Auto;
    // onLoad () {}

    start () {
        AdapterMgr.inst.adapatByType(AdaptaterType.Bottom, this.node, 50);
        
        this.view.Setting.addClick(() => {
            UISetting.openView();
        }, this);

        this.view.Skills.addClick(() => {
            WindowMgr.open(UISkills.prefabPath);
        }, this);
    }

    // update (dt) {}
}
