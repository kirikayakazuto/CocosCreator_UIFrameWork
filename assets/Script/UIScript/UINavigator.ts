import UINavigator_Auto from "../AutoScripts/UINavigator_Auto";
import SceneMgr from "../UIFrame/SceneMgr";
import { UIScreen } from "../UIFrame/UIForm";
import WindowMgr from "../UIFrame/WindowMgr";
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
                SceneMgr.open(UIConfig.UIHome.prefabUrl);
                break;
            case "light":
                SceneMgr.open(UIConfig.UILight.prefabUrl);
                break;
            case "capture":
                SceneMgr.open(UIConfig.UICapture.prefabUrl);
                break;
            case "mobx":
                WindowMgr.open(UIConfig.UIMobx.prefabUrl);
                break;
            case "dungeon":
                SceneMgr.open(UIConfig.UIDungeon.prefabUrl);
                break;
            case "splitTexture":
                SceneMgr.open(UIConfig.UISplitTexture.prefabUrl);
                break;
            case "scrollTexture":
                SceneMgr.open(UIConfig.UIScrollTexture.prefabUrl);
                break;
            case "meshTexture":
                SceneMgr.open(UIConfig.UIMeshTexture.prefabUrl);
                break;
        }
    }

    // update (dt) {}
}
