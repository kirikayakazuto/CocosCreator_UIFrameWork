import UINavigator_Auto from "../AutoScripts/UINavigator_Auto";
import FormMgr from "../UIFrame/FormMgr";
import { UIScreen } from "../UIFrame/UIForm";
import UIConfig from "./../UIConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class UINavigator extends UIScreen {

    view: UINavigator_Auto;

    start () {
        let content = this.view.Scroll.content;
        for(const e of content.children) {
            e.on(cc.Node.EventType.TOUCH_END, this.onClickButton, this);
        }
    }

    onClickButton(e: cc.Event.EventTouch) {
        let node = e.getCurrentTarget();
        switch(node.name) {
            case "project":
                FormMgr.open(UIConfig.UIHome);
                break;
            case "light":
                FormMgr.open(UIConfig.UILight);
                break;
            case "capture":
                FormMgr.open(UIConfig.UICapture);
                break;
            case "mobx":
                FormMgr.open(UIConfig.UIMobx);
                break;
            case "dungeon":
                FormMgr.open(UIConfig.UIDungeon);
                break;
            case "splitTexture":
                FormMgr.open(UIConfig.UISplitTexture);
                break;
            case "scrollTexture":
                FormMgr.open(UIConfig.UIScrollTexture);
                break;
            case "meshTexture":
                FormMgr.open(UIConfig.UIMeshTexture);
                break;
        }
    }

    // update (dt) {}
}
