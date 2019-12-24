import UIManager from "./UIManager";

const {ccclass, property} = cc._decorator;
/***
 * 独立窗体, 独立控制, 不受其他窗体控制
 * 
 * 这里专门用于处理  提示类窗体, 例如断线提示, 加载过场等
 */
@ccclass
export default class UIIndependentManager{
    private static Instance: UIIndependentManager = null;                     // 单例
    static getInstance(): UIIndependentManager {
        if(this.Instance == null) {
            this.Instance = new UIIndependentManager();
        }
        return this.Instance;
    }
    private loadingFormName: string;
    /** 设置加载页面 */
    public setLoadingForm(loadingName: string) {
        this.loadingFormName = loadingName;
        UIManager.GetInstance().loadUIForms(this.loadingFormName);
    }
    public async showLoadingForm() {
        await UIManager.GetInstance().ShowUIForms(this.loadingFormName);
    }
    /** 隐藏加载form */
    public hideLoadingForm() {
        UIManager.GetInstance().CloseUIForms(this.loadingFormName);
    }
}
