import UIBase from "./UIBase";
import { SysDefine, FormType } from "./config/SysDefine";
import ResMgr from "./ResMgr";
import UIModalMgr from "./UIModalMgr";
import AdapterMgr, { AdaptaterType } from "./AdapterMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {
    
    private _NoNormal: cc.Node = null;                              // 全屏显示的UI 挂载结点
    private _NoFixed: cc.Node = null;                               // 固定显示的UI
    private _NoPopUp: cc.Node = null;                               // 弹出窗口
    private _NoTips: cc.Node = null;                                // 独立窗体

    private _StaCurrentUIForms:Array<UIBase> = [];                                      // 存储弹出的窗体
    private _MapAllUIForms: {[key: string]: UIBase} = cc.js.createMap();                // 所有的窗体
    private _MapCurrentShowUIForms: {[key: string]: UIBase} = cc.js.createMap();        // 正在显示的窗体(不包括弹窗)
    private _MapIndependentForms: {[key: string]: UIBase} = cc.js.createMap();          // 独立窗体 独立于其他窗体, 不受其他窗体的影响
    private _LoadingForm: {[key: string]: boolean} = cc.js.createMap();                 // 正在加载的form 

    private _currWindowId = '';
    public get currWindowId() {
        return this._currWindowId;
    }
    private _currScreenId = '';
    public get currScreenId() {
        return this._currScreenId;
    }

    private static instance: UIManager = null;                                          // 单例
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
        this._NoNormal = this.node.getChildByName(SysDefine.SYS_SCREEN_NODE);
        this._NoFixed = this.node.getChildByName(SysDefine.SYS_FIXEDUI_NODE);
        this._NoPopUp = this.node.getChildByName(SysDefine.SYS_POPUP_NODE);
        this._NoTips = this.node.getChildByName(SysDefine.SYS_TOPTIPS_NODE);
    }
    
    start() {        
    }

    /**  */
    public getComponentByUid(uid: string) {
        return this._MapAllUIForms[uid];
    }

    /** 预加载UIForm */
    public async loadUIForms(...uibases: typeof UIBase[]) {
        for(const uibase of uibases) {
            let uiBase = await this.loadFormsToAllUIFormsCatch(uibase.prefabPath);
            if(!uiBase) {
                console.warn(`${uiBase}没有被成功加载`);
            }
        }
    }
    
    /**
     * 重要方法 加载显示一个UIForm
     * @param prefabPath 
     * @param obj 初始化信息, 可以不要
     */
    public async openUIForm(prefabPath: string, ...params: any) {
        if(prefabPath === "" || prefabPath == null) return ;
        if(this.checkUIFormIsShowing(prefabPath) || this.checkUIFormIsLoading(prefabPath)) {
            cc.warn(`${prefabPath}窗体已经在显示,或者正在加载中!`);
            return null;
        }
        let uiBase = await this.loadFormsToAllUIFormsCatch(prefabPath);
        if(uiBase == null) {
            cc.warn(`${prefabPath}未加载!`);
            return null;
        }
        // 初始化窗体名称
        uiBase.uid = prefabPath;
        
        switch(uiBase.formType) {
            case FormType.Screen:
                await this.enterUIFormsAndHideOther(prefabPath, ...params);
            break;
            case FormType.FixedUI:
                await this.loadUIToCurrentCache(prefabPath, ...params);
            break;
            case FormType.PopUp:
                await this.pushUIFormToStack(prefabPath, ...params);
            break;
            case FormType.TopTips:                        // 独立显示
                await this.loadUIFormsToIndependent(prefabPath, ...params);
            break;
        }

        return uiBase;
    }
    /**
     * 重要方法 关闭一个UIForm
     * @param prefabPath 
     */
    public async closeUIForm(prefabPath: string) {
        if(prefabPath == "" || prefabPath == null) return ;
        let UIBase = this._MapAllUIForms[prefabPath];
        
        if(UIBase == null) return true;
        
        switch(UIBase.formType) {
            case FormType.Screen:
                await this.exitUIFormsAndDisplayOther(prefabPath);
            break;
            case FormType.FixedUI:                             // 普通模式显示
                await this.exitUIForms(prefabPath);
            break;
            case FormType.PopUp:
                await this.popUIForm();
            break;
            case FormType.TopTips:
                await this.exitIndependentForms(prefabPath);
            break;
        }
        // 判断是否销毁该窗体
        if(UIBase.canDestory) {
            this.destoryForm(UIBase, prefabPath);
        }
        return true;
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
        
        let pre = await ResMgr.inst.loadForm(formPath);
        if(!pre) {
            cc.warn(`${formPath} 资源加载失败, 请确认路径是否正确`);
            return ;
        }
        let node: cc.Node = cc.instantiate(pre);
        let baseUI = node.getComponent(UIBase);
        if(baseUI == null) {
            cc.warn(`${formPath} 没有绑定UIBase的Component`);
            return ;
        }
        node.active = false;
        switch(baseUI.formType) {
            case FormType.Screen:
                UIManager.getInstance()._NoNormal.addChild(node);
            break;
            case FormType.FixedUI:
                UIManager.getInstance()._NoFixed.addChild(node);
            break;
            case FormType.PopUp:
                UIManager.getInstance()._NoPopUp.addChild(node);
            break;
            case FormType.TopTips:
                UIManager.getInstance()._NoTips.addChild(node);
            break;
        }
        this._MapAllUIForms[formPath] = baseUI;
        
        return baseUI;
    }

    /**
     * 清除栈内所有窗口
     */
    private async clearStackArray() {
        if(this._StaCurrentUIForms == null || this._StaCurrentUIForms.length <= 0) {
            return ;
        }
        for(const baseUI of this._StaCurrentUIForms) {
            await baseUI.closeUIForm();
        }
        this._StaCurrentUIForms = [];
        return ;
    }
    /**
     * 关闭栈顶窗口
     */
    public closeTopStackUIForm() {
        if(this._StaCurrentUIForms != null && this._StaCurrentUIForms.length >= 1) {
            let uiFrom = this._StaCurrentUIForms[this._StaCurrentUIForms.length-1];
            if(uiFrom.maskType.clickMaskClose) {
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
            
            UIBaseFromAllCache.onShow(...params);
            await this.showForm(UIBaseFromAllCache);
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
        let baseUI = this._MapAllUIForms[prefabPath];
        if(baseUI == null) return ;
        await baseUI._preInit();
        // 加入栈中, 同时设置其zIndex 使得后进入的窗体总是显示在上面
        this._StaCurrentUIForms.push(baseUI);       
        baseUI.node.zIndex = this._StaCurrentUIForms.length;
        
        baseUI.onShow(...params);
        this._currWindowId = baseUI.uid;
        UIModalMgr.inst.checkModalWindow(this._StaCurrentUIForms);
        await this.showForm(baseUI);
    }
    /**
     * 加载时, 关闭其他窗口
     */
    private async enterUIFormsAndHideOther(prefabPath: string, ...params: any) {
        let UIBase = this._MapCurrentShowUIForms[prefabPath];
        if(UIBase != null) return ;

        // 隐藏其他窗口 
        for(let key in this._MapCurrentShowUIForms) {
            await this._MapCurrentShowUIForms[key].closeUIForm();
        }
        this._StaCurrentUIForms.forEach(async uiForm => {
            await uiForm.closeUIForm();
        });

        let UIBaseFromAll = this._MapAllUIForms[prefabPath];
        
        if(UIBaseFromAll == null) return ;
        AdapterMgr.inst.adapatByType(AdaptaterType.FullScreen, UIBaseFromAll.node);
        await UIBaseFromAll._preInit();

        this._MapCurrentShowUIForms[prefabPath] = UIBaseFromAll;
        
        UIBaseFromAll.onShow(...params);
        this._currScreenId = UIBaseFromAll.uid;
        await this.showForm(UIBaseFromAll);
    }

    /** 加载到独立map中 */
    private async loadUIFormsToIndependent(prefabPath: string, ...params: any) {
        let UIBase = this._MapAllUIForms[prefabPath];
        if(UIBase == null) return ;
        await UIBase._preInit();
        this._MapIndependentForms[prefabPath] = UIBase;
        
        UIBase.onShow(...params);
        await this.showForm(UIBase);
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
        UIBase.onHide();
        await this.hideForm(UIBase);

        this._MapCurrentShowUIForms[prefabPath] = null;
        delete this._MapCurrentShowUIForms[prefabPath];
    }
    private async popUIForm() {
        if(this._StaCurrentUIForms.length >= 1) {
            let topUIForm = this._StaCurrentUIForms.pop();
            topUIForm.onHide();
            UIModalMgr.inst.checkModalWindow(this._StaCurrentUIForms);
            await this.hideForm(topUIForm);
            this._currWindowId = this._StaCurrentUIForms.length > 0 ? this._StaCurrentUIForms[this._StaCurrentUIForms.length-1].uid : '';
        }
    }
    private async exitUIFormsAndDisplayOther(prefabPath: string) {
        if(prefabPath == "" || prefabPath == null) return ;

        let UIBase = this._MapCurrentShowUIForms[prefabPath];
        if(UIBase == null) return ;
        UIBase.onHide();
        await this.hideForm(UIBase);

        this._MapCurrentShowUIForms[prefabPath] = null;
        delete this._MapCurrentShowUIForms[prefabPath];
    }
    private async exitIndependentForms(prefabPath: string) {
        let UIBase = this._MapAllUIForms[prefabPath];
        if(UIBase == null) return ;
        UIBase.onHide();
        await this.hideForm(UIBase);

        this._MapIndependentForms[prefabPath] = null;
        delete this._MapIndependentForms[prefabPath];
    }

    private async showForm(baseUI: UIBase) {
        baseUI.node.active = true;
        await baseUI.showAnimation();
    }
    private async hideForm(baseUI: UIBase) {
        await baseUI.hideAnimation();
        baseUI.node.active = false;
    }
    /** 销毁 */
    private destoryForm(UIBase: UIBase, prefabPath: string) {
        ResMgr.inst.destoryForm(UIBase);
        // 从allmap中删除
        this._MapAllUIForms[prefabPath] = null;
        delete this._MapAllUIForms[prefabPath];
    }
    /** 窗体是否正在显示 */
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
}
