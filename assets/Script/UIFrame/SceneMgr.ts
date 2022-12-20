import { FormType, SysDefine } from "./config/SysDefine";
import { GetForm, IFormConfig, IFormData } from "./Struct";
import TipsMgr from "./TipsMgr";
import UIManager from "./UIManager";

const TAG = "SceneMgr";
class SceneMgr {
    private _scenes: Array<IFormConfig> = [];
    private _currScene: IFormConfig;

    public getCurrScene() {
        return UIManager.getInstance().getForm(this._currScene.prefabUrl);
    }

    /** 打开一个场景 */
    public async open(form: IFormConfig | string, params?: any, formData?: IFormData) {
        form = GetForm(form);
        let scenePath = form.prefabUrl;
        if(this._currScene && this._currScene.prefabUrl == scenePath) {
            cc.warn(TAG, "当前场景和需要open的场景是同一个");
            return null;
        }

        await this.openLoading(formData?.loadingForm, params, formData);

        if(this._scenes.length > 0) {
            let currScene = this._scenes[this._scenes.length-1];
            await UIManager.getInstance().closeForm(currScene);
        }
        
        let idx = -1;
        for(let i=0; i<this._scenes.length; i++) {
            if(this._scenes[i].prefabUrl !== form.prefabUrl) continue;
            idx = i;
            break;
        }
        if(idx == -1) {
            this._scenes.push(form);
        }else {
            this._scenes.length = idx + 1;
        }

        this._currScene = form;

        let com = await UIManager.getInstance().openForm(form, params, formData);
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
        await UIManager.getInstance().closeForm(currScene);

        this._currScene = this._scenes[this._scenes.length-1];
        await UIManager.getInstance().openForm(this._currScene, params, formData);
        await this.closeLoading(formData?.loadingForm);
    }

    public async close(form: IFormConfig | string, params?: any, formData?: IFormData) {
        form = GetForm(form);
        return UIManager.getInstance().closeForm(form, params, formData);
    }

    private async openLoading(formConfig: IFormConfig, params: any, formData: IFormData) {
        let form = formConfig || SysDefine.defaultLoadingForm;
        if(!form) return ;
        await TipsMgr.open(form.prefabUrl, params, formData);
    }
    private async closeLoading(formConfig: IFormConfig) {
        let form = formConfig || SysDefine.defaultLoadingForm;
        if(!form) return ;
        await TipsMgr.close(form.prefabUrl);
    }

    
}

export default new SceneMgr();