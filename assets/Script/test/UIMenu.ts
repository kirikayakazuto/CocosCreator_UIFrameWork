import UIBase from "../UIFrame/UIBase";
import { FormType } from "../UIFrame/config/SysDefine";
import AdapterMgr, { AdaptaterType } from "../UIFrame/AdapterMgr";
import UIHallSetting from "./UIHallSetting";
import ButtonPlus from "../Common/Components/ButtonPlus";

const {ccclass, property} = cc._decorator;


@ccclass
export default class UIMenu extends UIBase {

    @property(cc.Node)
ndMenu: cc.Node = null;

    formType = FormType.FixedUI;
    
    static prefabPath = "UIForms/UIMenu";

    onShow() {
        
    }

    start () {
        AdapterMgr.inst.adapatByType(AdaptaterType.Bottom, this.node, -2);
        for(let i=0; i<this.ndMenu.childrenCount; i++) {
            this.ndMenu.children[i].getComponent(ButtonPlus).addClick(this.menuClick, this);
        }
    }
    
    onHide() {
        
    }

    menuClick(e: cc.Event.EventTouch, data) {
        let pos = e.getLocation();
        UIHallSetting.openView(pos);
    }

    // update (dt) {}
}