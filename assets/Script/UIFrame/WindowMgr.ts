import PriorityQueue from "../Common/Utils/PriorityQueue";
import PriorityStack from "../Common/Utils/PriorityStack";
import { EPriority, IFormData } from "./Struct";
import UIManager from "./UIManager";

class WindowMgr {
    // 窗体
    private _showingList: PriorityStack<string> = new PriorityStack();
    private _waitingList: PriorityQueue<WindowData> = new PriorityQueue();
    
    private _currWindow: string = "";
    public get currWindow() {
        return this._currWindow;
    }

    public getWindows() {
        return this._showingList.getElements();
    }

    /** 打开窗体 */
    public async open(prefabPath: string, params?: any, formData?: IFormData) {
        formData = this._formatFormData(formData);
        if(this._showingList.size <= 0 || (!formData.showWait && formData.priority >= this._showingList.getTopEPriority())) {
            this._showingList.push(prefabPath, formData.priority);
            this._currWindow = this._showingList.getTopElement();
            return await UIManager.getInstance().openForm(prefabPath, params, formData);
        }
        
        // 入等待队列
        this._waitingList.enqueue({prefabPath: prefabPath, params: params, formData: formData});
        // 加载窗体
        return await UIManager.getInstance().loadUIForm(prefabPath);
    }

    public async close(prefabPath: string) {
        let result = this._showingList.remove(prefabPath);
        if(!result) return false;

        await UIManager.getInstance().closeForm(prefabPath);

        if(this._showingList.size <= 0 && this._waitingList.size > 0) {
            let windowData = this._waitingList.dequeue();
            this.open(windowData.prefabPath, windowData.params, windowData.formData);
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
    prefabPath: string;
    params?: any;
    formData?: any;
}

export default new WindowMgr();
