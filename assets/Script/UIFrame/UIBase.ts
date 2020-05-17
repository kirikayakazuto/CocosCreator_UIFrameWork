import { ShowType, SysDefine } from "./config/SysDefine";
import UIMaskManager from "./UIMaskManager";
import GEventManager from "./GEventManager";
import { FormType, MaskType } from "./FormType";
import UIBinder from "./UIBinder";
import CocosHelper from "./CocosHelper";
import UIHelper from "./UIHelper";
import UIManager from "./UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIBase extends UIBinder {

    /** 窗体id,该窗体的唯一标示(请不要对这个值进行赋值操作, 内部已经实现了对应的赋值) */
    public uid: string;
    /** 窗体类型 */
    public formType = new FormType();
    /** 阴影类型, 只对PopUp类型窗体启用 */
    public maskType = new MaskType();
    /** 关闭窗口后销毁, 会将其依赖的资源一并销毁, 采用了引用计数的管理, 不用担心会影响其他窗体 */
    public destoryAfterClose = false;
    /** 自动绑定结点 */
    public autoBind = false;

    static prefabPath = "";
    static async show(...parmas: any) {
        if(!this.prefabPath || this.prefabPath.length <= 0) {
            this.prefabPath = SysDefine.UI_PATH_ROOT + CocosHelper.getComponentName(this);
        }
        let baseUIForm = await UIManager.getInstance().showUIForm(this.prefabPath, ...parmas);
        return baseUIForm;
    }
    /** 预先初始化 */
    public async _preInit() {
        if(this.autoBind) {
            UIHelper.getInstance().bindComponent(this);
        }
        await this.load();
    }
    
    /** 异步加载 */
    public async load() {
        // 可以在这里进行一些资源的加载, 具体实现可以看test下的代码
    }

    public onPreShow(...obj: any) {}
    public onAfterShow(...obj: any) {}
    
    public onPreHide() {}
    public onAfterHide() {}

    /**
     * 显示窗体
     */
    public async show() {
        this.node.active = true;
        UIMaskManager.getInstance().addMaskWindow(this.node); 
        await this.showAnimation();
        UIMaskManager.getInstance().showMask(this.formType.UIForm_LucencyType, this.maskType.IsEasing, this.maskType.EasingTime);
    }
    /**
     * 隐藏, 需要重新showUIForm
     */
    public async hide() {
        UIMaskManager.getInstance().removeMaskWindow(this.node); 
        await this.hideAnimation();
        this.node.active = false;
    }

    /**
     * 显示与关闭
     */
    public showUIForm(uiFormName: string, ...obj: any) {
        UIManager.getInstance().showUIForm(uiFormName, obj);
    }
    public closeUIForm() {
        UIManager.getInstance().closeUIForm(this.uid);
    }

    /**
     * 弹窗动画
     */
    public async showAnimation() {
        if(this.formType.UIForms_Type === ShowType.PopUp) {
            await CocosHelper.runSyncAction(this.node, cc.scaleTo(0.3, 1).easing(cc.easeBackOut()));
        }
    }
    public async hideAnimation() {
    }

    /**
     * 消息机制
     */
    public sendMessage(messagType: string, parmas: any) {
        GEventManager.emit(messagType, parmas);
    }
    public receiveMessage(messagType: string, callback: Function, targer: any) {
        GEventManager.on(messagType, callback, targer);
    }

}
