import UIBase from "./UIBase";
import { SysDefine, ShowType, ShowMode } from "./config/SysDefine";
import TipsManager from "./TipsManager";
import ResManager from "./ResManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {
    
    private _NoNormal: cc.Node = null;                              // 全屏显示的UI 挂载结点
    private _NoFixed: cc.Node = null;                               // 固定显示的UI
    private _NoPopUp: cc.Node = null;                               // 弹出窗口
    private _NoTips: cc.Node = null;                         // 独立窗体

    private _StaCurrentUIForms:Array<UIBase> = [];                     // 存储弹出的窗体
    private _MapAllUIForms: {[key: string]: UIBase} = cc.js.createMap();              // 所有的窗体
    private _MapCurrentShowUIForms: {[key: string]: UIBase} = cc.js.createMap();      // 正在显示的窗体(不包括弹窗)
    private _MapIndependentForms: {[key: string]: UIBase} = cc.js.createMap();        // 独立窗体 独立于其他窗体, 不受其他窗体的影响
    private _LoadingForm: {[key: string]: boolean} = cc.js.createMap();                   // 正在加载的form 

    private static instance: UIManager = null;                     // 单例
    public static getInstance(): UIManager {
        if(this.instance == null) {
            this.instance = cc.find(SysDefine.SYS_UIROOT_NAME).addComponent<UIManager>(this);
            cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, () => {
                this.instance = null;
            });
        }
        return this.instance;
    }

    onLoad () {
        // 初始化结点
        this._NoNormal = this.node.getChildByName(SysDefine.SYS_NORMAL_NODE);
        this._NoFixed = this.node.getChildByName(SysDefine.SYS_FIXED_NODE);
        this._NoPopUp = this.node.getChildByName(SysDefine.SYS_POPUP_NODE);
        this._NoTips = this.node.getChildByName(SysDefine.SYS_TIPS_NODE);
    }
    
    start() {        
    }

    /** 预加载加载UIForm */
    public async loadUIForms(formName: string | Array<string>) {
        if(typeof(formName) === 'string') {
            await this.loadFormsToAllUIFormsCatch(formName);
        }else {
            for(const name of formName) {
                await this.loadFormsToAllUIFormsCatch(name);
            }
        }
    }
    
    /** 加载Form时显示等待页面 */
    public async showUIFormWithLoading(prefabPath: string, ...params: any) {
        await TipsManager.getInstance().showLoadingForm();
        let uiBase = await UIManager.getInstance().showUIForm(prefabPath, ...params);
        await TipsManager.getInstance().hideLoadingForm();
        return uiBase;
    }

    /**
     * 重要方法 加载显示一个UIForm
     * @param prefabPath 
     * @param obj 初始化信息, 可以不要
     */
    public async showUIForm(prefabPath: string, ...params: any) {
        if(prefabPath === "" || prefabPath == null) return ;
        if(this.checkUIFormIsShowing(prefabPath) || this.checkUIFormIsLoading(prefabPath)) {
            cc.log(`${prefabPath}窗体已经在显示`);
            return ;
        }
        
        let UIBases = await this.loadFormsToAllUIFormsCatch(prefabPath);
        if(UIBases == null) {
            cc.log(`${prefabPath}未加载到，或者正在加载中!`);
            return ;
        }

        // 初始化窗体名称
        UIBases.uid = prefabPath;
        
        // 是否清理栈内窗口
        if(UIBases.formType.IsClearStack) {
            this.clearStackArray();
        }
        
        switch(UIBases.formType.showMode) {
            case ShowMode.Normal:                             // 普通模式显示
                await this.loadUIToCurrentCache(prefabPath, ...params);
            break;
            case ShowMode.ReverseChange:                      // 反向切换
                await this.pushUIFormToStack(prefabPath, ...params);
            break;
            case ShowMode.HideOther:                          // 隐藏其他
                await this.enterUIFormsAndHideOther(prefabPath, ...params);
            break;
            case ShowMode.Tips:                        // 独立显示
                await this.loadUIFormsToIndependent(prefabPath, ...params);
            break;
        }

        return UIBases;
    }
    /**  */
    public getUIComponent(uiname: string) {
        return this._MapAllUIForms[uiname];
    }
    /**
     * 重要方法 关闭一个UIForm
     * @param prefabPath 
     */
    public async closeUIForm(prefabPath: string) {
        if(prefabPath == "" || prefabPath == null) return ;
        let UIBase = this._MapAllUIForms[prefabPath];
        
        if(UIBase == null) return ;
        
        switch(UIBase.formType.showMode) {
            case ShowMode.Normal:                             // 普通模式显示
                await this.exitUIForms(prefabPath);
            break;
            case ShowMode.ReverseChange:                      // 反向切换
                await this.popUIForm();
            break;
            case ShowMode.HideOther:                          // 隐藏其他
                await this.exitUIFormsAndDisplayOther(prefabPath);
            break;
            case ShowMode.Tips:
                await this.exitIndependentForms(prefabPath);
            break;
        }
        // 判断是否销毁该窗体
        if(UIBase.destoryAfterClose) {
            this.destoryForm(UIBase, prefabPath);
        }
    }


    /**
     * 从全部的UI窗口中加载, 并挂载到结点上
     */
    private async loadFormsToAllUIFormsCatch(prefabPath: string) {
        let baseUIResult = this._MapAllUIForms[prefabPath];
        // 判断窗体不在mapAllUIForms中， 也不再loadingForms中
        if (baseUIResult == null && !this._LoadingForm[prefabPath]) {
            //加载指定名称的“UI窗体
            this._LoadingForm[prefabPath] = true;
            baseUIResult  = await this.loadUIForm(prefabPath);
            this._LoadingForm[prefabPath] = false;
            delete this._LoadingForm[prefabPath];
        }
        return baseUIResult;
    }

    /**
     * 从resources中加载
     * @param prefabPath 
     */
    private async loadUIForm(formPath: string) {
        if(formPath == "" || formPath == null){
            return ;
        }
        
        let pre = await ResManager.getInstance().loadForm(formPath);
        if(!pre) {
            cc.warn(`${formPath} 资源加载失败, 请确认路径是否正确`);
            return ;
        }
        let node: cc.Node = cc.instantiate(pre);
        let baseUI = node.getComponent(UIBase);
        if(baseUI == null) {
            return ;
        }
        node.active = false;
        switch(baseUI.formType.showType) {
            case ShowType.Normal:
                UIManager.getInstance()._NoNormal.addChild(node);
            break;
            case ShowType.Fixed:
                UIManager.getInstance()._NoFixed.addChild(node);
            break;
            case ShowType.PopUp:
                UIManager.getInstance()._NoPopUp.addChild(node);
            break;
            case ShowType.Tips:
                UIManager.getInstance()._NoTips.addChild(node);
            break;
        }
        this._MapAllUIForms[formPath] = baseUI;
        
        return baseUI;
    }

    /**
     * 清除栈内所有窗口
     */
    private clearStackArray() {
        if(this._StaCurrentUIForms != null && this._StaCurrentUIForms.length >= 1) {
            this._StaCurrentUIForms = [];
            return true;
        }
        return false;
    }
    /**
     * 关闭栈顶窗口
     */
    public closeTopStackUIForm() {
        if(this._StaCurrentUIForms != null && this._StaCurrentUIForms.length >= 1) {
            let uiFrom = this._StaCurrentUIForms[this._StaCurrentUIForms.length-1];
            if(uiFrom.maskType.ClickMaskClose) {
                uiFrom.closeUIForm();
            }   
        }
    }

    /**
     * 加载到缓存中, 
     * @param prefabPath 
     */
    private async loadUIToCurrentCache(prefabPath: string, ...params: any) {
        let UIBase: UIBase = null;
        let UIBaseFromAllCache: UIBase = null;

        UIBase = this._MapCurrentShowUIForms[prefabPath];
        if(UIBase != null) return ;                                     // 要加载的窗口正在显示

        UIBaseFromAllCache = this._MapAllUIForms[prefabPath];
        if(UIBaseFromAllCache != null) {
            await UIBaseFromAllCache._preInit();
            this._MapCurrentShowUIForms[prefabPath] = UIBaseFromAllCache;
            UIBaseFromAllCache.onPreShow(...params);
            await UIBaseFromAllCache.show();
            UIBaseFromAllCache.onAfterShow(...params);
        }
    }
    /**
     * 加载到栈中
     * @param prefabPath 
     */
    private async pushUIFormToStack(prefabPath: string, ...params: any) {
        if(this._StaCurrentUIForms.length > 0) {
            let topUIForm = this._StaCurrentUIForms[this._StaCurrentUIForms.length-1];
        }
        let UIBase = this._MapAllUIForms[prefabPath];
        if(UIBase == null) return ;
        await UIBase._preInit();
        // 加入栈中, 同时设置其zIndex 使得后进入的窗体总是显示在上面
        this._StaCurrentUIForms.push(UIBase);       
        UIBase.node.zIndex = this._StaCurrentUIForms.length;
        UIBase.onPreShow(...params);
        await UIBase.show();
        UIBase.onAfterShow(...params);
    }
    /**
     * 加载时, 关闭其他窗口
     */
    private async enterUIFormsAndHideOther(prefabPath: string, ...params: any) {
        let UIBase = this._MapCurrentShowUIForms[prefabPath];
        if(UIBase != null) return ;

        // 隐藏其他窗口 
        for(let key in this._MapCurrentShowUIForms) {
            this._MapCurrentShowUIForms[key].hide();
            this._MapCurrentShowUIForms[key] = null;
            delete this._MapCurrentShowUIForms[key];
        }
        this._StaCurrentUIForms.forEach(uiForm => {
            uiForm.hide();
            this._MapCurrentShowUIForms[uiForm.uid] = null;
            delete this._MapCurrentShowUIForms[uiForm.uid];
        });

        let UIBaseFromAll = this._MapAllUIForms[prefabPath];
        
        if(UIBaseFromAll == null) return ;
        await UIBaseFromAll._preInit();

        this._MapCurrentShowUIForms[prefabPath] = UIBaseFromAll;
        UIBaseFromAll.onPreShow(...params);
        await UIBaseFromAll.show();
        UIBaseFromAll.onAfterShow(...params);
    }

    /** 加载到独立map中 */
    private async loadUIFormsToIndependent(prefabPath: string, ...params: any) {
        let UIBase = this._MapAllUIForms[prefabPath];
        if(UIBase == null) return ;
        await UIBase._preInit();
        this._MapIndependentForms[prefabPath] = UIBase;
        UIBase.onPreShow(...params);
        await UIBase.show();
        UIBase.onAfterShow(...params);
    }

    /**
     * --------------------------------- 关闭窗口 --------------------------
     */
    /**
     * 关闭一个UIForm
     * @param prefabPath 
     */
    private async exitUIForms(prefabPath: string) {
        let UIBase = this._MapAllUIForms[prefabPath];
        if(UIBase == null) return ;
        UIBase.onPreHide();
        await UIBase.hide();
        UIBase.onAfterHide();
        this._MapCurrentShowUIForms[prefabPath] = null;
        delete this._MapCurrentShowUIForms[prefabPath];
        
    }
    private async popUIForm() {
        if(this._StaCurrentUIForms.length >= 1) {
            let topUIForm = this._StaCurrentUIForms.pop();
            topUIForm.onPreHide();
            await topUIForm.hide();
            topUIForm.onAfterHide();
        }
    }
    private async exitUIFormsAndDisplayOther(prefabPath: string) {
        if(prefabPath == "" || prefabPath == null) return ;

        let UIBase = this._MapCurrentShowUIForms[prefabPath];
        if(UIBase == null) return ;
        UIBase.onPreHide();
        await UIBase.hide();
        UIBase.onAfterHide();
        this._MapCurrentShowUIForms[prefabPath] = null;
        delete this._MapCurrentShowUIForms[prefabPath];
    }
    private async exitIndependentForms(prefabPath: string) {
        let UIBase = this._MapAllUIForms[prefabPath];
        if(UIBase == null) return ;
        UIBase.onPreHide();
        await UIBase.hide();
        UIBase.onAfterHide();
        this._MapIndependentForms[prefabPath] = null;
        delete this._MapIndependentForms[prefabPath];
    }

    /** 销毁 */
    private destoryForm(UIBase: UIBase, prefabPath: string) {
        ResManager.getInstance().destoryForm(UIBase);
        // 从allmap中删除
        this._MapAllUIForms[prefabPath] = null;
        delete this._MapAllUIForms[prefabPath];
    }

    /**
     * 窗体是否正在显示
     * @param prefabPath 
     */
    public checkUIFormIsShowing(prefabPath: string) {
        let UIBases = this._MapAllUIForms[prefabPath];
        if (UIBases == null) {
            return false;
        }
        return UIBases.node.active;
    }
    /** 窗体是否正在加载 */
    public checkUIFormIsLoading(prefabPath: string) {
        let UIBase = this._LoadingForm[prefabPath];
        return !!UIBase;
    }

    // update (dt) {}
}
