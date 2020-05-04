import ButtonPlus from "./UIFrame/components/ButtonPlus";
import TipsManager from "./UIFrame/TipsManager";
import TouchPlus from "./UIFrame/components/TouchPlus";
import UILogin from "./test/UILogin";
import GEventManager from "./UIFrame/GEventManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    @property(ButtonPlus)
    buttonPlus: ButtonPlus = null;

    @property(TouchPlus)
    touchPlus: TouchPlus = null;

    onLoad() {
        GEventManager.on("Event_Login", (a: number, b: number, c: number) => {
            console.log("Event ", a, b, c);
        }, this);
    }

    start () {
        TipsManager.getInstance().setLoadingForm("UIForm/UILoading");
        UILogin.show(1, 2, 3);
    
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
    }

    /**
     * 
     */
    onDestroy() {
        cc.log('destory');
    }
}
