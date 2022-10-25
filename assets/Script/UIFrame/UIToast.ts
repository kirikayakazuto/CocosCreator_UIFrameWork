import { IPool, Pool } from "../Common/Utils/Pool";
import CocosHelper from "./CocosHelper";
import { FormType } from "./config/SysDefine";
import { IFormData } from "./Struct";
import UIBase from "./UIBase";
import UIManager from "./UIManager";


export enum ToastType {
    Default,
}


/**
 * 外部传参
 * 1. 将prefabUrl注册, 静态
 * 2. UIToast.open 直接打开
 */

export class ToastBase extends UIBase implements IPool {
    formType = FormType.Toast;

    public static open() {

    }

    public use() {
        
    }

    public free() {

    }   
}


