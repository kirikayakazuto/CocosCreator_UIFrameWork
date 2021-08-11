import UIFunction_Auto from "../AutoScripts/UIFunction_Auto";
import AdapterMgr, { AdapterType } from "../UIFrame/AdapterMgr";
import { UIFixed } from "../UIFrame/UIForm";
import WindowMgr from "../UIFrame/WindowMgr";
import UIConfig from "./UIConfig";
import UISkills from "./UISkills";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIFunction extends UIFixed {
    
    view: UIFunction_Auto;
    // onLoad () {}

    start () {
        AdapterMgr.inst.adapteByType(AdapterType.Bottom, this.node, 50);
        
        this.view.Setting.addClick(() => {            
            WindowMgr.open(UIConfig.Setting.prefabUrl);
        }, this);

        this.view.Skills.addClick(() => {
            WindowMgr.open(UIConfig.Skills.prefabUrl);
        }, this);

        
    }

    // update (dt) {}
}
