import { FormType, ModalOpacity } from '../UIFrame/config/SysDefine';
import UIBase from "../UIFrame/UIBase";
import UIHall from './UIHall';
import { EventCenter } from '../UIFrame/EventCenter';
import UIToast from './UIToast';
import CocosHelper from '../UIFrame/CocosHelper';
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

    async onShow(a: number, b: number, c: number) {
        // 初始化操作
        cc.log('onShow');
        console.log(a, b, c);
        EventCenter.emit("Event_Login", 1, 2, 3);

        for(let i=0; i<10; i++) {
            await CocosHelper.sleepSync(1);
            UIToast.popUp("======: " + i);
        }
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
        this.closeUIForm();
        await UIHall.openViewWithLoading();
    }
}