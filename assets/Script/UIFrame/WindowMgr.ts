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
        params = this._formatParams(params);
        if(this._showingList.size <= 0 || (!params.showWait && params.priority >= this._showingList.getTopEPriority())) {
            this._showingList.push(prefabPath, params.priority);
            this._currWindow = this._showingList.getTopElement();
            return await UIManager.getInstance().openForm(prefabPath, params, formData);
        }
        
        this._waitingList.enqueue({prefabPath: prefabPath, params: params, formData: formData});
        
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

    private _formatParams(params: any) {
        if(!params) params = {};

        if(!params.hasOwnProperty("showWait")) {        // 当前有已经显示的window时, 会放等待列表里, 知道 当前没有正在显示的window时才被显示
            params.showWait = false;
        }
        if(!params.hasOwnProperty("priority")) {        // 优先级(会影响弹窗的层级, 先判断优先级, 在判断添加顺序)
            params.priority = EPriority.FIVE;
        }

        return params;
    }
}

class WindowData {
    prefabPath: string;
    params?: any;
    formData?: any;
}

export default new WindowMgr();
