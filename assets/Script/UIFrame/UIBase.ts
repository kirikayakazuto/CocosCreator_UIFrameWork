import UIMaskManager from "./UIMaskManager";
import GEventManager from "./GEventManager";
import UIBinder from "./UIBinder";
import CocosHelper from "./CocosHelper";
import UIManager from "./UIManager";
import { ShowType, SysDefine, UIState } from "./config/SysDefine";
import { FormType, MaskType } from "./FrameType";
import Binder from "./Binder";

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
    public autoBind = true;
    /** 当前ui的状态 */
    public state: UIState = 0;
    /** 回调 */
    private _cb: (confirm: any) => void;

    /** 资源路径，如果没写的话就是类名 */
    public static prefabPath = "";
    public static async openView(...parmas: any): Promise<UIBase> {
        return await UIManager.getInstance().showUIForm(this.prefabPath, ...parmas);
    }
    public static async openViewWithLoading(...parmas: any) {
        return await UIManager.getInstance().showUIFormWithLoading(this.prefabPath, ...parmas);
    }
    public static async closeView() {
        await UIManager.getInstance().closeUIForm(this.prefabPath);
    }
    
    /** 预先初始化 */
    public async _preInit() {
        if(this.autoBind) {
            Binder.bindComponent(this);
        }
        if(!UIBase.prefabPath || UIBase.prefabPath.length <= 0) {
            UIBase.prefabPath = SysDefine.UI_PATH_ROOT + CocosHelper.getComponentName(UIBase);
        }
        await this.load();
    }
    
    /** 异步加载 */
    public async load() {
        // 可以在这里进行一些资源的加载, 具体实现可以看test下的代码
    }

    public onShow(...obj: any) {}

    public onHide() {}
    

    public waitPromise() {
        return new Promise((resolve, reject) => {
            this._cb = (confirm) => {
                resolve(confirm);
            }
        });
    }

    /**
     * 显示与关闭
     */
    public async showUIForm(uiFormName: string, ...obj: any) {
       await UIManager.getInstance().showUIForm(uiFormName, obj);
    }
    public async closeUIForm() {
       await UIManager.getInstance().closeUIForm(this.uid);
    }

    /**
     * 弹窗动画
     */
    public async showAnimation() {
        if(this.formType.showType === ShowType.PopUp) {
            this.node.scale = 0;
            await CocosHelper.runSyncAction(this.node, cc.scaleTo(0.3, 1).easing(cc.easeBackOut()));
        }
    }
    public async hideAnimation() {
    }
}
