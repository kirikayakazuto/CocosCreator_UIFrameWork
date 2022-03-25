import * as cc from "cc";

import { SysDefine } from "./config/SysDefine";
import { IFormConfig, IFormData } from "./Struct";
import TipsMgr from "./TipsMgr";
import UIManager from "./UIManager";

const TAG = "SceneMgr";
class SceneMgr {
    private _scenes: Array<string> = [];
    private _currScene: string = "";

    public getCurrScene() {
        return UIManager.getInstance().getForm(this._currScene);
    }

    /** 打开一个场景 */
    public async open(scenePath: string, params?: any, formData?: IFormData) {
        if(this._currScene == scenePath) {
            cc.warn(TAG, "当前场景和需要open的场景是同一个");
            return null;
        }

        await this.openLoading(formData?.loadingForm, params, formData);

        if(this._scenes.length > 0) {
            let currScene = this._scenes[this._scenes.length-1];
            await UIManager.getInstance().closeForm(currScene);
        }

        let idx = this._scenes.indexOf(scenePath);
        if(idx == -1) {
            this._scenes.push(scenePath);
        }else {
            this._scenes.length = idx + 1;
        }

        this._currScene = scenePath;

        let com = await UIManager.getInstance().openForm(scenePath, params, formData);
        await this.closeLoading(formData?.loadingForm);
        return com;
    }

    /** 回退一个场景 */
    public async back(params?: any, formData?: IFormData) {
        if(this._scenes.length <= 1) {
            cc.warn(TAG, "已经是最后一个场景了, 无处可退");
            return ;
        }
        await this.openLoading(formData?.loadingForm, params, formData);
        let currScene = this._scenes.pop();
        if(!currScene) return ;
        await UIManager.getInstance().closeForm(currScene);

        this._currScene = this._scenes[this._scenes.length-1];
        await UIManager.getInstance().openForm(this._currScene, params, formData);
        await this.closeLoading(formData?.loadingForm);
    }

    public async close(scenePath: string) {
        let com = UIManager.getInstance().getForm(scenePath);
        if(com) {
            return UIManager.getInstance().closeForm(scenePath);
        }
        return false;
    }

    private async openLoading(formConfig?: IFormConfig, params?: any, formData?: IFormData) {
        let form = formConfig || SysDefine.defaultLoadingForm;
        if(!form) return ;
        await TipsMgr.open(form.prefabUrl, params, formData);
    }
    private async closeLoading(formConfig?: IFormConfig) {
        let form = formConfig || SysDefine.defaultLoadingForm;
        if(!form) return ;
        await TipsMgr.close(form.prefabUrl);
    }

}

export default new SceneMgr();