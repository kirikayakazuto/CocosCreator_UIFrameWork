import { Pool } from "../Common/Utils/Pool";
import { FormType } from "./config/SysDefine";
import ResMgr from "./ResMgr";
import { GetForm, IFormConfig, IFormData } from "./Struct";
import UIManager from "./UIManager";
import { ToastBase } from "./UIToast";

class ToastMgr {
    private _pools: {[key: string]: Pool<ToastBase>} = cc.js.createMap();

    public async open(form: IFormConfig | string, params?: any, formData?: IFormData) {
        form = GetForm(form, FormType.Toast);
        

        let pool = this._pools[form.prefabUrl];
        if(!pool) {
            let prefab = await ResMgr.inst.loadFormPrefab(form.prefabUrl);
            pool = this._pools[form.prefabUrl] = new Pool(() => cc.instantiate(prefab).getComponent(ToastBase), 3);
        }

        pool.alloc()
        
    }

    public async close(url: string) {
        await UIManager.getInstance().closeForm(url);
    }

}

export default new ToastMgr();

