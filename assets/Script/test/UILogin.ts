import { FormType, ModalOpacity } from '../UIFrame/config/SysDefine';
import UIBase from "../UIFrame/UIBase";
import UIHall from './UIHall';
import { EventCenter } from '../UIFrame/EventCenter';
import UIToast from './UIToast';
import CocosHelper from '../UIFrame/CocosHelper';
import UILogin_Auto from '../AutoScripts/UILogin_Auto';
const {ccclass, property} = cc._decorator;

@ccclass
export default class UILogin extends UIBase {
    
    formType = FormType.Screen;
    canDestory = true;

    static prefabPath = "UIForms/UILogin";

    /** 下面表示 生命周期顺序 */
    async load() {
        cc.log('load');
        // 在这里执行你的加载操作
    }

    onShow(a: number) {
        // 初始化操作
        cc.log('onShow');
        EventCenter.emit("Event_Login", 1, 2, 3);
        
        let view = this.view as UILogin_Auto;
        console.log(view)

        view.btn.addClick(() => {

        }, this);
    }

    onLoad() {
        cc.log('onload');
    }

    start() {
        cc.log('start')
    }

    onHide() {
        cc.log('onHide');
    }

    onDestroy() {
        cc.log('destory');
        // 这里可以执行你的销毁操作, 在该窗体执行destory时, 会先调用onDestory方法
    }

    async onClickLogin() {
        this.closeSelf();
        await UIHall.openViewWithLoading();
    }
}