import UIManager from "./UIFrame/UIManager";
import ButtonPlus from "./UIFrame/ButtonPlus";
import UIIndependentManager from "./UIFrame/UIIndependentManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(ButtonPlus)
    buttonPlus: ButtonPlus = null;

    onLoad() {}

    start () {
        UIIndependentManager.getInstance().setLoadingForm("UIForm/LoadingForm");
        UIManager.GetInstance().ShowUIForms("UIForm/LoginForm");

        this.buttonPlus.addClick(() => {
            cc.log("点击事件!");
        }, this);

        this.buttonPlus.addLongClick(() => {
            cc.log("触发长按事件 开始");
        }, () => {
            cc.log("触发长按事件 结束");
        }, this);
    }

    /**
     * 
     */
    onDestroy() {
        cc.log('destory');
    }
}
