import UIManager from "./UIFrame/UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {
    @property
    Text = ""

    onLoad() {
        
    }

    start () {
        UIManager.GetInstance().ShowUIForms("UIForm/LoginForm");
    }
}
