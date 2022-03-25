import * as cc from "cc";

import { FormType } from "./config/SysDefine";
import FixedMgr from "./FixedMgr";
import SceneMgr from "./SceneMgr";
import { IFormConfig, IFormData } from "./Struct";
import TipsMgr from "./TipsMgr";
import WindowMgr from "./WindowMgr";

class FormMgr {
    /**
     * 打开窗体
     * @param form 窗体配置信息
     * @param param 自定义参数
     * @param formData 窗体处理时的一些数据
     */
    async open(form: IFormConfig, param?: any, formData?: IFormData) {
        switch(form.type) {
            case FormType.Screen:
                return await SceneMgr.open(form.prefabUrl, param, formData);
            case FormType.Window:
                return await WindowMgr.open(form.prefabUrl, param, formData);
            case FormType.Fixed:
                return await FixedMgr.open(form.prefabUrl, param, formData);
            case FormType.Tips:
                return await TipsMgr.open(form.prefabUrl, param, formData);
            default:
                cc.error(`未知类型的窗体: ${form.type}`);
                return null;
        }
    }

    async close(form: IFormConfig) {
        switch(form.type) {
            case FormType.Screen:
                return await SceneMgr.close(form.prefabUrl);
            case FormType.Window:
                return await WindowMgr.close(form.prefabUrl);
            case FormType.Fixed:
                return await FixedMgr.close(form.prefabUrl);
            case FormType.Tips:
                return await TipsMgr.close(form.prefabUrl);
            default:
                cc.error(`未知类型的窗体: ${form.type}`);
                return false;
        }
    }

    async backScene(params?: any, formData?: IFormData) {
        return SceneMgr.back(params, formData);
    }

    async closeAllWindows() {
        await WindowMgr.closeAll();
    }

}

export default new FormMgr();