import UIManager from "./UIManager";
import UIToast from "../test/UIToast";

const {ccclass, property} = cc._decorator;
/***
 * 独立窗体, 独立控制, 不受其他窗体控制, 非单例
 * 
 * 这里专门用于处理  提示类窗体, 例如断线提示, 加载过场等
 */
@ccclass
export default class TipsMgr{
    private static _instance: TipsMgr = null;                     // 单例
    static get inst() {
        if(this._instance == null) {
            this._instance = new TipsMgr();
        }
        return this._instance;
    }
    private loadingFormName: string;
    /** 设置加载页面 */
    public setLoadingForm(loadingName: string) {
        this.loadingFormName = loadingName;
    }
    public async showLoadingForm(...params: any[]) {
        await UIManager.getInstance().openUIForm(this.loadingFormName, ...params);
    }
    /** 隐藏加载form */
    public async hideLoadingForm() {
        await UIManager.getInstance().closeUIForm(this.loadingFormName);
    }

    /** 提示窗体 */
    private tipsFormName: string;
    public setTipsForm(tipsFormName: string) {
        this.tipsFormName = tipsFormName;
    }
    public async showToast() {
        await UIToast.popUp();
    }
}
