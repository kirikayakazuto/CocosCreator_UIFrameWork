import UIManager from "./UIFrame/UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    onLoad() {
        // MemoryDetector.showMemoryStatus();
    }

    start () {
        UIManager.GetInstance().ShowUIForms("UIForm/LoginForm");
    }

    buttonPlus() {
        cc.log('触发了点击事件'); 
    }
}
