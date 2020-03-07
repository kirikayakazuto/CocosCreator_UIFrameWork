import UIManager from "./UIFrame/UIManager";
import ButtonPlus from "./UIFrame/components/ButtonPlus";
import UIIndependentManager from "./UIFrame/UIIndependentManager";
import TouchPlus from "./UIFrame/components/TouchPlus";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(ButtonPlus)
    buttonPlus: ButtonPlus = null;

    @property(TouchPlus)
    touchPlus: TouchPlus = null;

    onLoad() {}

    start () {
        UIIndependentManager.getInstance().setLoadingForm("UIForm/LoadingForm");
        UIManager.GetInstance().showUIForm("UIForm/LoginForm");

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
