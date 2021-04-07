import UIBase from "./UIBase";
import { SysDefine, FormType } from "./config/SysDefine";
import ResMgr from "./ResMgr";
import ModalMgr from "./ModalMgr";
import AdapterMgr, { AdaptaterType } from "./AdapterMgr";
import Scene from "../Scene/Scene";
import { UIWindow } from "./UIForm";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {    
    private _ndScreen: cc.Node = null;                              // 全屏显示的UI 挂载结点
    private _ndFixed: cc.Node = null;                               // 固定显示的UI
    private _ndPopUp: cc.Node = null;                               // 弹出窗口
    private _ndTips: cc.Node = null;                                // 独立窗体

    private _popupForms:Array<UIWindow> = [];                                         // 存储弹出的窗体
    private _allForms: {[key: string]: UIBase} = cc.js.createMap();                 // 所有已经挂载的窗体, 可能没有显示
    private _showingForms: {[key: string]: UIBase} = cc.js.createMap();             // 正在显示的窗体
    private _tipsForms: {[key: string]: UIBase} = cc.js.createMap();                // 独立窗体 独立于其他窗体, 不受其他窗体的影响
    private _loadingForm: {[key: string]: ((value: UIBase) => void)[]} = cc.js.createMap();             // 正在加载的form 

    private _currWindowId = '';                                     // 当前显示的弹窗
    public get currWindowId() {
        return this._currWindowId;
    }
    private _currScreenId = '';                                     // 当前显示的screen
    public get currScreenId() {
        return this._currScreenId;
    }
    
    private static instance: UIManager = null;                                          // 单例
    public static getInstance(): UIManager {
        if(this.instance == null) {
            let canvas = cc.director.getScene().getChildByName("Canvas");
            let scene = canvas.getChildByName(SysDefine.SYS_SCENE_NODE);
            if(!scene) {
                scene = new cc.Node(SysDefine.SYS_SCENE_NODE);
                scene.addComponent(Scene);
                scene.parent = canvas;
            }
            let UIROOT = new cc.Node(SysDefine.SYS_UIROOT_NODE);
            scene.addChild(UIROOT);
            this.instance = cc.find(SysDefine.SYS_UIROOT_NAME).addComponent<UIManager>(this);

            UIROOT.addChild(this.instance._ndScreen = new cc.Node(SysDefine.SYS_SCREEN_NODE));
            UIROOT.addChild(this.instance._ndFixed = new cc.Node(SysDefine.SYS_FIXED_NODE));
            UIROOT.addChild(this.instance._ndPopUp = new cc.Node(SysDefine.SYS_POPUP_NODE));
            UIROOT.addChild(this.instance._ndTips = new cc.Node(SysDefine.SYS_TOPTIPS_NODE));
            
            cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, () => {
                this.instance = null;
            });
        }
        return this.instance;
    }
    
    start() {        
    }

    /** 预加载UIForm */
    public async loadUIForms(...uibases: typeof UIBase[]) {
        for(const uibase of uibases) {
            let uiBase = await this.loadForm(uibase.prefabPath);
            if(!uiBase) {
                console.warn(`${uiBase}没有被成功加载`);
            }
        }
    }
    
    /**
     * 加载显示一个UIForm
     * @param prefabPath 
     * @param obj 初始化信息, 可以不要
     */
    public async openUIForm(prefabPath: string, params: any) {
        if(!prefabPath || prefabPath.length <= 0) {
            cc.warn(`${prefabPath}, 参数错误`);
            return ;
        }
        if(this.checkFormShowing(prefabPath)) {
            cc.warn(`${prefabPath}, 窗体正在显示中`);
            return null;
        }
        let com = await this.loadForm(prefabPath);
        if(!com) {
            cc.warn(`${prefabPath} 加载失败了!`);
            return null;
        }
        // 初始化窗体名称
        com.fid = prefabPath;
        
        switch(com.formType) {
            case FormType.Screen:
                await this.enterToScreen(prefabPath, params);
            break;
            case FormType.Fixed:
                await this.enterToFixed(prefabPath, params);
            break;
            case FormType.Window:
                await this.enterToPopup(prefabPath, params);
            break;
            case FormType.Tips:                                  // 独立显示
                await this.enterToTips(prefabPath, params);
            break;
        }

        return com;
    }
    /**
     * 重要方法 关闭一个UIForm
     * @param prefabPath 
     */
    public async closeUIForm(prefabPath: string) {
        if(!prefabPath || prefabPath.length <= 0) {
            cc.warn(`${prefabPath}, 参数错误`);
            return ;
        };
        let com = this._allForms[prefabPath];
        if(!com) return true;
        
        switch(com.formType) {
            case FormType.Screen:
                await this.exitToScreen(prefabPath);
            break;
            case FormType.Fixed:                             // 普通模式显示
                await this.exitToFixed(prefabPath);
            break;
            case FormType.Window:
                await this.exitToPopup(prefabPath);
            break;
            case FormType.Tips:
                await this.exitToTips(prefabPath);
            break;
        }
        // 判断是否销毁该窗体
        if(com.canDestory) {
            this.destoryForm(com, prefabPath);
        }
        return true;
    }

    /**
     * 从窗口缓存中加载(如果没有就会在load加载), 并挂载到结点上
     */
    private async loadForm(prefabPath: string): Promise<UIBase> {
        let com = this._allForms[prefabPath];
        if(com) return com;
        return new Promise((resolve, reject) => {
            if(this._loadingForm[prefabPath]) {
                this._loadingForm[prefabPath].push(resolve);
                return ;
            }
            this._loadingForm[prefabPath] = [resolve];
            this._doLoadUIForm(prefabPath).then((com: UIBase) => {
                for(const func of this._loadingForm[prefabPath]) {
                    func(com);
                }
                this._loadingForm[prefabPath] = null;
                delete this._loadingForm[prefabPath];
            });
        });
    }

    /**
     * 从resources中加载
     * @param prefabPath 
     */
    private async _doLoadUIForm(formPath: string) {
        let prefab = await ResMgr.inst.loadForm(formPath);
        if(!prefab) {
            cc.warn(`${formPath} 资源加载失败, 请确认路径是否正确`);
            return null;
        }
        let node = cc.instantiate(prefab);
        let baseCom = node.getComponent(UIBase);
        if(baseCom == null) {
            cc.warn(`${formPath} 结点没有绑定UIBase`);
            return null;
        }
        node.active = false;                    // 避免baseCom调用了onload方法
        switch(baseCom.formType) {
            case FormType.Screen:
                this._ndScreen.addChild(node);
            break;
            case FormType.Fixed:
                this._ndFixed.addChild(node);
            break;
            case FormType.Window:
                this._ndPopUp.addChild(node);
            break;
            case FormType.Tips:
                this._ndTips.addChild(node);
            break;
        }
        this._allForms[formPath] = baseCom;
        
        return baseCom;
    }

    /** 添加到screen中 */
    private async enterToScreen(prefabPath: string, params: any) {
        // 关闭其他显示的窗口 
        for(let key in this._showingForms) {
            await this._showingForms[key].closeUIForm();
        }
        let com = this._allForms[prefabPath];
        if(!com) return ;
        this._showingForms[prefabPath] = com;

        AdapterMgr.inst.adapatByType(AdaptaterType.FullScreen, com.node);
        
        await com._preInit();
        com.onShow(params);
        this._currScreenId = com.fid;
        await this.showForm(com);
    }

    /** 添加到Fixed中 */
    private async enterToFixed(prefabPath: string, params: any) {
        let com = this._allForms[prefabPath];
        if(!com) return ;
        await com._preInit();
        
        com.onShow(params);
        this._showingForms[prefabPath] = com;
        await this.showForm(com);
    }

    /** 添加到popup中 */
    private async enterToPopup(prefabPath: string, params: any) {
        let com = this._allForms[prefabPath] as UIWindow;
        if(!com) return ;
        await com._preInit();

        this._popupForms.push(com);     
        com.node.zIndex = this._popupForms.length;

        
        com.onShow(params);
        this._showingForms[prefabPath] = com;
        this._currWindowId = com.fid;
        ModalMgr.inst.checkModalWindow(this._popupForms);
        await this.showForm(com);
    }
    
    /** 加载到tips中 */
    private async enterToTips(prefabPath: string, params: any) {
        let com = this._allForms[prefabPath];
        if(!com) return ;
        await com._preInit();
        this._tipsForms[prefabPath] = com;
        
        com.onShow(params);
        await this.showForm(com);
    }

    private async exitToScreen(prefabPath: string) {
        let com = this._showingForms[prefabPath];
        if(!com) return ;
        com.onHide();
        await this.hideForm(com);

        this._showingForms[prefabPath] = null;
        delete this._showingForms[prefabPath];
    }
   
    private async exitToFixed(prefabPath: string) {
        let com = this._allForms[prefabPath];
        if(!com) return ;
        com.onHide();
        await this.hideForm(com);
        this._showingForms[prefabPath] = null;
        delete this._showingForms[prefabPath];
    }

    private async exitToPopup(prefabPath: string) {
        if(this._popupForms.length <= 0) return;
        let com = this._popupForms.pop();
        com.onHide();
        ModalMgr.inst.checkModalWindow(this._popupForms);
        await this.hideForm(com);
        this._currWindowId = this._popupForms.length > 0 ? this._popupForms[this._popupForms.length-1].fid : '';

        this._showingForms[prefabPath] = null;
        delete this._showingForms[prefabPath];
    }
    
    private async exitToTips(prefabPath: string) {
        let com = this._allForms[prefabPath];
        if(!com) return ;
        com.onHide();
        await this.hideForm(com);

        this._tipsForms[prefabPath] = null;
        delete this._tipsForms[prefabPath];
    }

    private async showForm(baseUI: UIBase) {
        baseUI.node.active = true;
        await baseUI.showEffect();
    }
    private async hideForm(baseUI: UIBase) {
        await baseUI.hideEffect();
        baseUI.node.active = false;
    }

    /** 销毁 */
    private destoryForm(UIBase: UIBase, prefabPath: string) {
        ResMgr.inst.destoryForm(UIBase);
        // 从allmap中删除
        this._allForms[prefabPath] = null;
        delete this._allForms[prefabPath];
    }
    /** 窗体是否正在显示 */
    public checkFormShowing(prefabPath: string) {
        let com = this._allForms[prefabPath];
        if (com == null) {
            return false;
        }
        return com.node.active;
    }

    /** 窗体是否正在加载 */
    public checkFormLoading(prefabPath: string) {
        let com = this._loadingForm[prefabPath];
        return !!com;
    }

    /**
     * 清除栈内所有窗口
     */
    private async clearStackArray() {
        if(this._popupForms == null || this._popupForms.length <= 0) {
            return ;
        }
        for(const baseUI of this._popupForms) {
            await baseUI.closeUIForm();
        }
        this._popupForms = [];
        return ;
    }

    /**
     * 关闭栈顶窗口
     */
    private closeTopStackUIForm() {
        if(this._popupForms != null && this._popupForms.length >= 1) {
            let uiFrom = this._popupForms[this._popupForms.length-1];
            if(uiFrom.modalType.clickMaskClose) {
                uiFrom.closeUIForm();
            }   
        }
    }

    /** 获得Component */
    public getComponentByFid(fId: string) {
        return this._allForms[fId];
    }
}
