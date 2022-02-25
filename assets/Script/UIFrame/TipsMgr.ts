import { IFormData } from "./Struct";
import UIManager from "./UIManager";

class TipsMgr {
    public async open(url: string, params?: any, formData?: IFormData) {
        return await UIManager.getInstance().openForm(url, params, formData);
    }
    public async close(url: string) {
        return await UIManager.getInstance().closeForm(url);
    }
}

export default new TipsMgr();