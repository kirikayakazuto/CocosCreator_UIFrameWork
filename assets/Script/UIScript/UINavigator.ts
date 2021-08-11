import UINavigator_Auto from "../AutoScripts/UINavigator_Auto";
import SceneMgr from "../UIFrame/SceneMgr";
import { UIScreen } from "../UIFrame/UIForm";
import WindowMgr from "../UIFrame/WindowMgr";
import UICapture from "./UICapture";
import UIDungeon from "./UIDungeon";
import UIHome from "./UIHome";
import UILight from "./UILight";
import UIMobx from "./UIMobx";
import UISplitTexture from "./UISplitTexture";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UINavigator extends UIScreen {

    static prefabPath = "Forms/Screen/UINavigator";
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
                SceneMgr.open(UIHome.prefabPath);
                break;
            case "light":
                SceneMgr.open(UILight.prefabPath);
                break;
            case "capture":
                SceneMgr.open(UICapture.prefabPath);
                break;
            case "mobx":
                WindowMgr.open(UIMobx.prefabPath);
                break;
            case "dungeon":
                SceneMgr.open(UIDungeon.prefabPath);
                break;
            case "splitTexture":
                SceneMgr.open(UISplitTexture.prefabPath);
                break;
        }
    }

    // update (dt) {}
}
