import CocosHelper from "./CocosHelper";
import UIManager from "./UIManager";
import { FormType, SysDefine } from "./config/SysDefine";
import { IFormData, ModalType } from "./Struct";
import AdapterMgr from "./AdapterMgr";
import TipsMgr from "./TipsMgr";


const {ccclass, property} = cc._decorator;

@ccclass
export default class UIBase extends cc.Component {

    /** 窗体id,该窗体的唯一标示(请不要对这个值进行赋值操作, 内部已经实现了对应的赋值) */
    public fid: string;
    /** 窗体数据 */
    public formData: IFormData = null;
    /** 窗体类型 */
    public formType: FormType = 0;
    /** 关闭窗口后销毁, 会将其依赖的资源一并销毁, 采用了引用计数的管理, 不用担心会影响其他窗体 */
    public canDestory = false;
    /** 回调 */
    protected _cb: (confirm: any) => void;
    /** 是否已经调用过preinit方法 */
    private _inited = false;
    /** 资源路径，如果没写的话就是类名 */
    public static prefabPath = "";

    

    /** 打开UIBase */
    public static async openView(parmas?: any, formData?: IFormData): Promise<UIBase> {
        return await UIManager.getInstance().openUIForm(this.prefabPath, parmas, formData);
    }
    public static async openViewWithLoading(parmas?: any): Promise<UIBase> {
        await TipsMgr.inst.showLoadingForm(parmas);
        let uiBase = await this.openView(parmas);
        await TipsMgr.inst.hideLoadingForm();
        return uiBase;
    }
    public static async closeView(): Promise<boolean> {
        return await UIManager.getInstance().closeUIForm(this.prefabPath);
    }
    public view: cc.Component;

    /** 预先初始化 */
    public async _preInit() {
        if(this._inited) return ;
        this._inited = true;
        this.view = this.getComponent(`${this.node.name}_Auto`);
        autorun(this.refreshView.bind(this));
        // 加载这个UI依赖的其他资源
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
    public async showUIForm(uiFormName: string, obj: any): Promise<UIBase> {
       return await UIManager.getInstance().openUIForm(uiFormName, obj);
    }
    public async closeUIForm(): Promise<boolean> {
       return await UIManager.getInstance().closeUIForm(this.fid);
    }

    /**
     * 弹窗动画
     */
    public async showEffect() {}
    public async hideEffect() {}

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
