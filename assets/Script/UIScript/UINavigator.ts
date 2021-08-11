import UINavigator_Auto from "../AutoScripts/UINavigator_Auto";
import SceneMgr from "../UIFrame/SceneMgr";
import { UIScreen } from "../UIFrame/UIForm";
import WindowMgr from "../UIFrame/WindowMgr";
import UIConfig from "./UIConfig";


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
                SceneMgr.open(UIConfig.Home.prefabUrl);
                break;
            case "light":
                SceneMgr.open(UIConfig.Light.prefabUrl);
                break;
            case "capture":
                SceneMgr.open(UIConfig.capture.prefabUrl);
                break;
            case "mobx":
                WindowMgr.open(UIConfig.Mobx.prefabUrl);
                break;
            case "dungeon":
                SceneMgr.open(UIConfig.Dungeon.prefabUrl);
                break;
            case "splitTexture":
                SceneMgr.open(UIConfig.SplitTexture.prefabUrl);
                break;
            case "scrollTexture":
                SceneMgr.open(UIConfig.ScrollTexture.prefabUrl);
                break;
        }
    }

    // update (dt) {}
}
