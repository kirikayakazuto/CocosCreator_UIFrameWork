import { UIFormType, UIFormShowMode } from './../UIFrame/config/SysDefine';
import BaseUIForm from "../UIFrame/BaseUIForm";
import UIType from "../UIFrame/UIType";
import UIManager from '../UIFrame/UIManager';
const {ccclass, property} = cc._decorator;

@ccclass
export default class TestPanel extends BaseUIForm {
    
    CurrentUIType = new UIType(UIFormType.Normal);
    CloseAndDestory = true;         // 这里设置为true表示会将这个结点所依赖的资源销毁

    @property(cc.Node)
    LoginButton: cc.Node = null;

    start() {
        this.LoginButton.on('click', () => {
            this.ShowUIForm("UIForm/HallForm");
        }, this)
    }
    
}