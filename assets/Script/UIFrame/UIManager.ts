import BaseUIForm from "./BaseUIForm";
import { SysDefine, UIFormType, UIFormShowMode } from "./config/SysDefine";
import UILoader from "./UILoader";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {
    
    private _NoNormal: cc.Node = null;                              // 全屏显示的UI 挂载结点
    private _NoFixed: cc.Node = null;                               // 固定显示的UI
    private _NoPopUp: cc.Node = null;                               // 弹出窗口

    private _StaCurrentUIForms:Array<BaseUIForm> = [];                     // 存储反向切换的窗体
    private _MapAllUIForms: {[key: string]: BaseUIForm} = {};              // 所有的窗体
    private _MapCurrentShowUIForms: {[key: string]: BaseUIForm} = {};      // 正在显示的窗体(不包括弹窗)

    private static _Instance: UIManager = null;                     // 单例
    static GetInstance(): UIManager {
        if(this._Instance == null) {
            this._Instance = cc.find(SysDefine.SYS_UIROOT_NAME).addComponent<UIManager>(this);
        }
        return this._Instance;
    }


    onLoad () {
        
    }
    start() {
        this.InitRootCanvasLoading();
        this._NoNormal = this.node.getChildByName(SysDefine.SYS_NORMAL_NODE);
        this._NoFixed = this.node.getChildByName(SysDefine.SYS_FIXED_NODE);
        this._NoPopUp = this.node.getChildByName(SysDefine.SYS_POPUP_NODE);
    }

    /**
     * 窗体是否正在显示
     * @param uiFormName 
     */
    public UIFormIsShowing(uiFormName: string) {
        let baseUIForms = this._MapAllUIForms[uiFormName];
        if (baseUIForms == null) {
            return false;
        }
        return baseUIForms.node.active;
    }

    /**
     * 重要方法 加载显示一个UIForm
     * @param uiFormName 
     * @param obj 初始化信息, 可以不要
     */
    public async ShowUIForms(uiFormName: string, obj?: any) {
        if(uiFormName == "" || uiFormName == null) return ;
        if(this.UIFormIsShowing(uiFormName)) {
            cc.log(`${uiFormName}窗体已经在显示`);
            return ;        
        }
        
        let baseUIForms = await this.LoadFormsToAllUIFormsCatch(uiFormName);
        if(baseUIForms == null) return ;

        // 初始化窗体名称
        baseUIForms.UIFormName = uiFormName;
        // 初始化窗体信息   如果预制体默认active为true 那么先执行了onload start 在执行的init
        
        
        // 是否清理栈内窗口
        if(baseUIForms.CurrentUIType.IsClearStack) {
            this.ClearStackArray();
        }
        
        switch(baseUIForms.CurrentUIType.UIForms_ShowMode) {
            case UIFormShowMode.Normal:                             // 普通模式显示
                this.LoadUIToCurrentCache(uiFormName, obj);
            break;
            case UIFormShowMode.ReverseChange:                      // 反向切换
                this.PushUIFormToStack(uiFormName, obj);
            break;
            case UIFormShowMode.HideOther:                          // 隐藏其他
                this.EnterUIFormsAndHideOther(uiFormName, obj);
            break;
        }

        
    }
    /**
     * 重要方法 关闭一个UIForm
     * @param uiFormName 
     */
    public CloseUIForms(uiFormName: string) {
        if(uiFormName == "" || uiFormName == null) return ;
        let baseUIForm = this._MapAllUIForms[uiFormName];
        if(baseUIForm == null) return ;

        switch(baseUIForm.CurrentUIType.UIForms_ShowMode) {
            case UIFormShowMode.Normal:                             // 普通模式显示
                this.ExitUIForms(uiFormName);
            break;
            case UIFormShowMode.ReverseChange:                      // 反向切换
                this.PopUIForm();
            break;
            case UIFormShowMode.HideOther:                          // 隐藏其他
                this.ExitUIFormsAndDisplayOther(uiFormName);
            break;
        }
        // 判断是否销毁该窗体
        if(baseUIForm.CloseAndDestory) {
            UILoader.getInstance().releaseNodeRes(baseUIForm.node);
        }
    }
    /**
     * 从全部的UI窗口中加载, 并挂载到结点上
     */
    private async LoadFormsToAllUIFormsCatch(uiFormName: string) {
        let baseUIResult = this._MapAllUIForms[uiFormName];
        if (baseUIResult == null) {
            //加载指定名称的“UI窗体”
            baseUIResult  = await this.LoadUIForm(uiFormName) as BaseUIForm;
        }
        return baseUIResult;
    }

    /**
     * 从resources中加载
     * @param uiFormName 
     */
    private async LoadUIForm(strUIFormPath: string) {
        if(strUIFormPath == "" || strUIFormPath == null){
            return ;
        }
        
        let pre = await UILoader.getInstance().loadRes(strUIFormPath, cc.Prefab) as cc.Prefab;
        let node: cc.Node = cc.instantiate(pre);
        let baseUIForm = node.getComponent(BaseUIForm);
        if(baseUIForm == null) {
            return ;
        }
        node.active = false;
        switch(baseUIForm.CurrentUIType.UIForms_Type) {
            case UIFormType.Normal:
                UIManager.GetInstance()._NoNormal.addChild(node);
            break;
            case UIFormType.Fixed:
                UIManager.GetInstance()._NoFixed.addChild(node);
            break;
            case UIFormType.PopUp:
                UIManager.GetInstance()._NoPopUp.addChild(node);
            break;
        }
        this._MapAllUIForms[strUIFormPath] = baseUIForm;
        
        return baseUIForm;
    }

    /**
     * 清除栈内所有窗口
     */
    private ClearStackArray() {
        if(this._StaCurrentUIForms != null && this._StaCurrentUIForms.length >= 1) {
            this._StaCurrentUIForms = [];
            return true;
        }
        return false;
    }
    /**
     * 关闭栈顶窗口
     */
    public CloseStackTopUIForm() {
        if(this._StaCurrentUIForms != null && this._StaCurrentUIForms.length >= 1) {
            let uiFrom = this._StaCurrentUIForms[this._StaCurrentUIForms.length-1];
            if(uiFrom.ClickMaskClose) {
                uiFrom.CloseUIForm();
            }   
        }
    }

    /**
     * 加载到缓存中, 
     * @param uiFormName 
     */
    private LoadUIToCurrentCache(uiFormName: string, obj: any) {
        let baseUIForm: BaseUIForm = null;
        let baseUIFormFromAllCache: BaseUIForm = null;

        baseUIForm = this._MapCurrentShowUIForms[uiFormName];
        if(baseUIForm != null) return ;                                     // 要加载的窗口正在显示

        baseUIFormFromAllCache = this._MapAllUIForms[uiFormName];
        if(baseUIFormFromAllCache != null) {
            baseUIFormFromAllCache.init(obj);
            this._MapCurrentShowUIForms[uiFormName] = baseUIFormFromAllCache;
            baseUIFormFromAllCache.DisPlay();
        }
    }
    /**
     * 加载到栈中
     * @param uiFormName 
     */
    private PushUIFormToStack(uiFormName: string, obj: any) {
        if(this._StaCurrentUIForms.length > 0) {
            let topUIForm = this._StaCurrentUIForms[this._StaCurrentUIForms.length-1];
            topUIForm.Freeze();
        }
        let baseUIForm = this._MapAllUIForms[uiFormName];
        if(baseUIForm == null) return ;
        baseUIForm.init(obj);
        // 加入栈中, 同时设置其zIndex 使得后进入的窗体总是显示在上面
        this._StaCurrentUIForms.push(baseUIForm);       
        baseUIForm.node.zIndex = this._StaCurrentUIForms.length;
        baseUIForm.DisPlay();
    }
    /**
     * 加载时, 关闭其他窗口
     */
    private EnterUIFormsAndHideOther(uiFormName: string, obj: any) {

        let baseUIForm = this._MapCurrentShowUIForms[uiFormName];
        if(baseUIForm != null) return ;

        // 隐藏其他窗口 
        for(let key in this._MapCurrentShowUIForms) {
            this._MapCurrentShowUIForms[key].Hiding();
            this._MapCurrentShowUIForms[key] = null;
            delete this._MapCurrentShowUIForms[key];
        }
        this._StaCurrentUIForms.forEach(uiForm => {
            uiForm.Hiding();
            this._MapCurrentShowUIForms[uiForm.UIFormName] = null;
            delete this._MapCurrentShowUIForms[uiForm.UIFormName];
        });

        let baseUIFormFromAll = this._MapAllUIForms[uiFormName];
        
        if(baseUIFormFromAll == null) return ;
        baseUIFormFromAll.init(obj);

        this._MapCurrentShowUIForms[uiFormName] = baseUIFormFromAll;
        baseUIFormFromAll.DisPlay();
    }



    /**
     * --------------------------------- 关闭窗口 --------------------------
     */
    /**
     * 关闭一个UIForm
     * @param uiFormName 
     */
    private ExitUIForms(uiFormName: string) {
        let baseUIForm = this._MapAllUIForms[uiFormName];
        if(baseUIForm == null) return ;
        baseUIForm.Hiding();
        this._MapCurrentShowUIForms[uiFormName] = null;
        delete this._MapCurrentShowUIForms[uiFormName];
        
    }
    private PopUIForm() {
        if(this._StaCurrentUIForms.length >= 2) {
            let topUIForm = this._StaCurrentUIForms.pop();
            topUIForm.Hiding();
            topUIForm = this._StaCurrentUIForms[this._StaCurrentUIForms.length-1];
            topUIForm.ReDisPlay();
        }else if(this._StaCurrentUIForms.length >= 1) {
            let topUIForm = this._StaCurrentUIForms.pop();
            topUIForm.Hiding();
        }
    }
    private ExitUIFormsAndDisplayOther(uiFormName: string) {
        if(uiFormName == "" || uiFormName == null) return ;

        let baseUIForm = this._MapCurrentShowUIForms[uiFormName];
        if(baseUIForm == null) return ;
        baseUIForm.Hiding();
        this._MapCurrentShowUIForms[uiFormName] = null;
        delete this._MapCurrentShowUIForms[uiFormName];

        //  显示其他窗口 
        /* for(let key in this._MapCurrentShowUIForms) {
            this._MapCurrentShowUIForms[key].ReDisPlay();
        }
        this._StaCurrentUIForms.forEach(uiForm => {
            uiForm.ReDisPlay();
        }); */
    }


    /** * 预设场景 这里可以放置你的加载页面 */
    InitRootCanvasLoading() {

    }


    
    

    // update (dt) {}
}
