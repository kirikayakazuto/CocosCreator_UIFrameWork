import { Pool } from "../Common/Utils/Pool";
import { FormType, SysDefine } from "./config/SysDefine";
import { EventCenter } from "./EventCenter";
import ResMgr from "./ResMgr";
import { GetForm, IFormConfig, IFormData } from "./Struct";
import { UIToast } from "./UIForm";
import UIManager from "./UIManager";

class ToastMgr {
    private _pools: {[key: string]: Pool<UIToast>} = cc.js.createMap();
    private _showingToast: {[key: string]: Array<UIToast>} = cc.js.createMap();
    
    public async open(form: IFormConfig | string, params?: any, formData?: IFormData) {
        form = GetForm(form, FormType.Toast);
        
        let pool = this._pools[form.prefabUrl];
        if(!pool) {
            pool = await this.genPool(form.prefabUrl);
        }
        let toastBase = pool.alloc();
        await UIManager.getInstance().enterToToast(toastBase, params);

        let arr = this._showingToast[form.prefabUrl];
        if(!arr) {
            arr = this._showingToast[form.prefabUrl] = new Array<UIToast>();
        }
        arr.push(toastBase);

        return toastBase;
    }

    public async close(com: UIToast, params: any) {
        await UIManager.getInstance().exitToToast(com, params);
        if(!this._pools[com.fid]) return;
        this._pools[com.fid].free(com);

        let arr = this._showingToast[com.fid];
        if(!arr) return;
        for(let i=arr.length-1; i>=0; i--) {
            if(arr[i].uuid !== com.uuid) continue;
            arr.splice(i, 1);
            break;
        }
    }


    private async genPool(prefabUrl: string) {
        // 对pool创建一个独立结点
        // todo...
        let prefab = await ResMgr.inst.loadFormPrefab(prefabUrl);
        let pool = this._pools[prefabUrl] = new Pool(() => {
            let node = cc.instantiate(prefab);
            UIManager.getInstance().addNode(node);
            return node.getComponent(UIToast);
        }, 3);
        return pool;
    }

    public clearToasts(prefabUrl: string) {
        let pool = this._pools[prefabUrl];
        if(!pool) return;

        // 先清理可能没有收入到pool中的
        let arr = this._showingToast[prefabUrl];
        if(!arr) return;
        
        for(let toast of arr) {
            pool.free(toast);
        }

        pool.clear((toastBase: UIToast) => {
            toastBase.node.destroy();
            EventCenter.targetOff(toastBase);
        });
        // 销毁prefab以及依赖的资源
        ResMgr.inst.destoryFormPrefab(prefabUrl);

        this._pools[prefabUrl] = null;
        delete this._pools[prefabUrl];

        this._showingToast[prefabUrl] = null;
        delete this._showingToast[prefabUrl];
    }


    public checkHasShowingToast(prefabUrl: string) {
        return this._showingToast[prefabUrl].length > 0;
    }

}

export default new ToastMgr();

