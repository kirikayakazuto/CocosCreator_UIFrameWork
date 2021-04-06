import UILogin from "./test/UILogin";
import { EventCenter } from "./UIFrame/EventCenter";
import DebugWindowUtil from "./Common/Utils/DebugWindowUtils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {
    
    onLoad() {
        EventCenter.on("Event_Login", (a: number, b: number, c: number) => {
            console.log("Event ", a, b, c);
        }, this);
        cc.dynamicAtlasManager.enabled = false;
    }

    start () {
        if (CC_DEBUG) {
            DebugWindowUtil.init();
        }

        // TipsMgr.inst.setLoadingForm("UIForms/UILoading");
        UILogin.openView(1);
        // UITest.openView();
        // UICapture.openView();
        // UIDungeon.openView();
        this.test();
    }

    test() {
        
    }

    /**
     * 
     */
    onDestroy() {
        cc.log('destory');
    } 
    
}
