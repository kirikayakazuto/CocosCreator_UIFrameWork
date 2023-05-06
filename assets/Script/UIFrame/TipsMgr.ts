import { FormType } from "./config/SysDefine";
import { GetForm, IFormConfig, IFormData } from "./Struct";
import UIManager from "./UIManager";

class TipsMgr {
    public async open(form: IFormConfig | string, params?: any, formData?: IFormData) {
        form = GetForm(form, FormType.Tips);
        return await UIManager.getInstance().openForm(form, params, formData);
    }
    public async close(form: IFormConfig | string, params?: any, formData?: IFormData) {
        form = GetForm(form, FormType.Tips);
        return await UIManager.getInstance().closeForm(form, params, formData);
    }
}

export default new TipsMgr();