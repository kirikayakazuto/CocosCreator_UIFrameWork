import ButtonPlus from "./Common/Components/ButtonPlus";
import TouchPlus from "./Common/Components/TouchPlus";
import UILogin from "./test/UILogin";

import { EventCenter } from "./UIFrame/EventCenter";
import DebugWindowUtil from "./Common/Utils/DebugWindowUtils";
import UILight from "./test/UILight";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    @property(ButtonPlus)
    buttonPlus: ButtonPlus = null;

    @property(TouchPlus)
    touchPlus: TouchPlus = null;

    @property(cc.Node)
    ndMatrix: cc.Node = null;

    
    onLoad() {
        EventCenter.on("Event_Login", (a: number, b: number, c: number) => {
            console.log("Event ", a, b, c);
        }, this);
    }

    start () {
        if (CC_DEBUG) {
            DebugWindowUtil.init();
        }

        // UILogin.openView(1, 2, 3);
        UILight.openView();
        // TipsMgr.inst.setLoadingForm("UIForms/UILoading");
        // UILogin.openView(1, 2, 3);
        this.buttonPlus.addClick(() => {
            cc.log("点击事件!");
        }, this);

        this.buttonPlus.addLongClick(() => {
            cc.log("触发长按事件 开始");
        }, () => { 
            cc.log("触发长按事件 结束");
        }, this);

        this.touchPlus.addEvent((e) => {
            console.log('触发点击事件');
        }, (e) => {
            console.log('触发滑动事件', e.getDelta());
        })

        console.log(this.ndMatrix)
    }

    /**
     * 
     */
    onDestroy() {
        cc.log('destory');
    } 
    
}
