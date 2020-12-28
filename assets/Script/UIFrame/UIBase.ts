import UIBinder from "./UIBinder";
import CocosHelper from "./CocosHelper";
import UIManager from "./UIManager";
import { FormType, SysDefine } from "./config/SysDefine";
import { MaskType } from "./FrameType";
import Binder from "./Binder";
import AdapterMgr from "./AdapterMgr";
import TipsMgr from "./TipsMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIBase extends UIBinder {

    /** 窗体id,该窗体的唯一标示(请不要对这个值进行赋值操作, 内部已经实现了对应的赋值) */
    public uid: string;
    /** 窗体类型 */
    public formType: FormType = 0;
    /** 阴影类型, 只对PopUp类型窗体启用 */
    public maskType = new MaskType();
    /** 关闭窗口后销毁, 会将其依赖的资源一并销毁, 采用了引用计数的管理, 不用担心会影响其他窗体 */
    public canDestory = false;
    /** 自动绑定结点 */
    public autoBind = true;
    /** 回调 */
    protected _cb: (confirm: any) => void;
    /** 是否已经调用过preinit方法 */
    private _inited = false;

    /** 资源路径，如果没写的话就是类名 */
    public static _prefabPath = "";
    public static set prefabPath(path: string) {
        this._prefabPath = path;
    }
    public static get prefabPath() {
        if(!this._prefabPath || this._prefabPath.length <= 0) {
            this._prefabPath = SysDefine.UI_PATH_ROOT + CocosHelper.getComponentName(this);
            console.log("component name:", CocosHelper.getComponentName(this))
        }
        return this._prefabPath;
    }

    /** 打开关闭UIBase */
    public static async openView(...parmas: any): Promise<UIBase> {
        return await UIManager.getInstance().openUIForm(this.prefabPath, ...parmas);
    }
    public static async openViewWithLoading(...parmas: any): Promise<UIBase> {
        await TipsMgr.inst.showLoadingForm(this.prefabPath);
        let uiBase = await this.openView(...parmas);
        await TipsMgr.inst.hideLoadingForm();
        return uiBase;
    }
    public static async closeView(): Promise<boolean> {
        return await UIManager.getInstance().closeUIForm(this.prefabPath);
    }
    
    /** 预先初始化 */
    public async _preInit() {
        if(this._inited) return ;
        this._inited = true;
        if(this.autoBind) {
            Binder.bindComponent(this);
        }
        autorun(this.refreshView.bind(this));
        // 加载这个UI依赖的其他资源，其他资源可以也是UI
        await this.load();

        this.onInit();
    }

    @observable
    model: any = null;
    /**
     * 这个函数在model的数值发生变化时（前提条件是在这个函数中用到了model），会自动执行，无需手动调用
     * @param r 
     */
    public refreshView(r: IReactionPublic) {
        
    }

    /** 可以在这里进行一些资源的加载, 具体实现可以看test下的代码 */
    public async load() {}

    public onInit() {}

    public onShow(...obj: any) {}

    public onHide() {}
    
    /** 通过闭包，保留resolve.在合适的时间调用cb方法 */
    public waitPromise(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._cb = (confirm: any) => {
                resolve(confirm);
            }
        });
    }

    /**
     * 
     * @param uiFormName 窗体名称
     * @param obj 参数
     */
    public async showUIForm(uiFormName: string, ...obj: any): Promise<UIBase> {
       return await UIManager.getInstance().openUIForm(uiFormName, obj);
    }
    public async closeUIForm(): Promise<boolean> {
       return await UIManager.getInstance().closeUIForm(this.uid);
    }

    /**
     * 弹窗动画
     */
    public async showAnimation() {
        if(this.formType === FormType.PopUp) {
            this.node.scale = 0;
            await CocosHelper.runTweenSync(this.node, cc.tween().to(0.3, {scale: 1}, cc.easeBackOut()));
        }
    }
    public async hideAnimation() {
    }

    /** 设置是否挡住触摸事件 */
    private _blocker: cc.BlockInputEvents = null;
    public setBlockInput(block: boolean) {
        if(!this._blocker)  {
            let node = new cc.Node('block_input_events');
            this._blocker = node.addComponent(cc.BlockInputEvents);
            this._blocker.node.setContentSize(AdapterMgr.inst.visibleSize);
            this.node.addChild(this._blocker.node, cc.macro.MAX_ZINDEX);
        }
        this._blocker.node.active = block;
    }
}
