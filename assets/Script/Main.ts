import ButtonPlus from "./Common/Components/ButtonPlus";
import TouchPlus from "./Common/Components/TouchPlus";
import UILogin from "./test/UILogin";
import { EventCenter } from "./UIFrame/EventCenter";
import DebugWindowUtil from "./Common/Utils/DebugWindowUtils";
import UITest from "./test/UITest";
import { TestBroadcast } from "./test/TestBroadcast";
import UICapture from "./test/UICapture";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    @property(ButtonPlus)
    buttonPlus: ButtonPlus = null;
    @property(TouchPlus)
    touchPlus: TouchPlus = null;
    
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

        this.touchPlus.addEvent((e) => {
            console.log('触发点击事件');
        }, (e) => {
            console.log('触发滑动事件', e.getDelta());
        })
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
