import UIManager from "./UIManager";

const {ccclass, property} = cc._decorator;
/***
 * 独立窗体, 独立控制
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
    }
    public async showLoadingForm() {
        await UIManager.GetInstance().ShowUIForms(this.loadingFormName);
    }
    public hideLoadingForm() {
        UIManager.GetInstance().CloseUIForms(this.loadingFormName);
    }





}
// _MapIndependentForms