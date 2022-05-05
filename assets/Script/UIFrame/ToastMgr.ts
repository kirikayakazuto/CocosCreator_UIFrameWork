import { Pool } from "../Common/Utils/Pool";
import { IFormData } from "./Struct";
import UIManager from "./UIManager";

class ToastMgr {
    private _pools: {[key: string]: Pool<any>} = cc.js.createMap();

    public async open(url: string, params?: any, formData?: IFormData) {
        
        
    }

    public async close(url) {
        await UIManager.getInstance().closeForm(url);
    }

}

export default new ToastMgr();

