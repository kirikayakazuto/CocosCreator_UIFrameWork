import UIManager from "./UIFrame/UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Node)
    cocos: cc.Node = null;

    onLoad() {
        
    }

    start () {
        UIManager.GetInstance().ShowUIForms("LoginForm", null);
    }
}
