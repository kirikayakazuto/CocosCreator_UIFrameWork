import { IPool, Pool } from "../Common/Utils/Pool";
import CocosHelper from "./CocosHelper";
import UIBase from "./UIBase";


export enum ToastType {
    Default,
}


/**
 * 外部传参
 * 1. 将prefabUrl注册, 静态
 * 2. UIToast.open 直接打开
 */

export class UIToast extends UIBase implements IPool {

    public use() {
        
    }

    public free() {

    }   
}

export class ToastMgr {
    private _pools: {[key: string]: Pool<UIToast>} = {};

    private async load(url: string) {
        if(!this._pools[url]) {
            let prefab = await CocosHelper.loadResSync<cc.Prefab>(url, cc.Prefab);
            this._pools[url] = new Pool<UIToast>(() => {
                let node = cc.instantiate(prefab);
                return node.getComponent(UIToast);
            }, 10);
        }
        return this._pools[url].alloc();
    }

    public register(type: ToastType, toast: string) {

    }

    private async free(url: string, obj: UIToast) {
        this._pools[url].free(obj);
    }

    public async open(name: string, params: number) {
        
    }

    public async close(url: string) {
        
    }

}

