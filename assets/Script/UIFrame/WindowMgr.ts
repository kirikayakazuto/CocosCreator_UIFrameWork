import PriorityQueue from "../Common/Utils/PriorityQueue";
import PriorityStack from "../Common/Utils/PriorityStack";
import { FormType } from "./config/SysDefine";
import { EPriority, GetForm, IFormConfig, IFormData } from "./Struct";
import UIManager from "./UIManager";

class WindowMgr {
    // 窗体
    private _showingList: PriorityStack<IFormConfig> = new PriorityStack((a: IFormConfig, b: IFormConfig) => a.prefabUrl === b.prefabUrl);
    private _waitingList: PriorityQueue<WindowData> = new PriorityQueue();
    
    private _currWindow: IFormConfig;
    public get currWindow() {
        return this._currWindow;
    }

    public getWindows() {
        return this._showingList.getElements();
    }

    /** 打开窗体 */
    public async open(form: IFormConfig | string, params?: any, formData?: IFormData) {
        form = GetForm(form, FormType.Window);
        let prefabPath = form.prefabUrl;
        formData = this._formatFormData(formData);
        if(this._showingList.size <= 0 || (!formData.showWait && formData.priority >= this._showingList.getTopEPriority())) {
            this._showingList.push(form, formData.priority);
            this._currWindow = this._showingList.getTopElement();
            return await UIManager.getInstance().openForm(form, params, formData);
        }
        
        // 入等待队列
        this._waitingList.enqueue({form: form, params: params, formData: formData});
        // 加载窗体
        return await UIManager.getInstance().loadUIForm(prefabPath);
    }

    public async close(form: IFormConfig | string, params?: any, formData?: IFormData) {
        form = GetForm(form, FormType.Window);
        let result = this._showingList.remove(form);
        if(!result) return false;

        await UIManager.getInstance().closeForm(form, params, formData);

        if(this._showingList.size <= 0 && this._waitingList.size > 0) {
            let windowData = this._waitingList.dequeue();
            this.open(windowData.form, windowData.params, windowData.formData);
        }
        return true;
    }

    /** 关闭所有弹窗 */
    public async closeAll() {
        this._waitingList.clear();

        for(const fid of this._showingList.getElements()) {
            await UIManager.getInstance().closeForm(fid);
        }
        this._showingList.clear();
        
        return true;
    }

    private _formatFormData(formData: any) {
        return Object.assign({showWait: false, priority: EPriority.FIVE}, formData);
    }
}

class WindowData {
    form: IFormConfig;
    params?: any;
    formData?: any;
}

export default new WindowMgr();
