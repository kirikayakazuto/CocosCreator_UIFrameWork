import UIManager from "./UIManager";

const {ccclass, property} = cc._decorator;
/***
 * 独立窗体, 独立控制, 不受其他窗体控制
 * 
 * 这里专门用于处理  提示类窗体, 例如断线提示, 加载过场等
 */
@ccclass
export default class IndependentManager{
    private static instance: IndependentManager = null;                     // 单例
    static getInstance(): IndependentManager {
        if(this.instance == null) {
            this.instance = new IndependentManager();
        }
        return this.instance;
    }
    private loadingFormName: string;
    /** 设置加载页面 */
    public setLoadingForm(loadingName: string) {
        this.loadingFormName = loadingName;
        UIManager.getInstance().loadUIForms(this.loadingFormName);
    }
    public async showLoadingForm() {
        await UIManager.getInstance().showUIForm(this.loadingFormName);
    }
    /** 隐藏加载form */
    public hideLoadingForm() {
        UIManager.getInstance().closeUIForm(this.loadingFormName);
    }

    public showStringTips() {
        
    }
    public showOfflineTips() {

    }
}
