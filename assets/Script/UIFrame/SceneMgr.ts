import { IFormData } from "./Struct";
import TipsMgr from "./TipsMgr";
import UIManager from "./UIManager";

const TAG = "SceneMgr";
class SceneMgr {

    private _scenes: Array<string> = [];
    private _currScene: string = "";

    public getCurrScene() {
        return UIManager.getInstance().getComponentByFid(this._currScene);
    }

    /** 打开一个场景 */
    public async open(scenePath: string, params?: any, formData?: IFormData) {
        if(this._currScene == scenePath) {
            cc.warn(TAG, "当前场景和需要open的场景是同一个");
            return ;
        }
        await TipsMgr.inst.showLoadingForm();

        if(this._scenes.length > 0) {
            let currScene = this._scenes[this._scenes.length-1];
            await UIManager.getInstance().closeForm(currScene);
        }

        let idx = this._scenes.indexOf(scenePath);
        if(idx == -1) {
            this._scenes.push(scenePath);
        }else {
            this._scenes.length = idx+1;
        }

        this._currScene = scenePath;

        await UIManager.getInstance().openForm(scenePath, params, formData);
        await TipsMgr.inst.hideLoadingForm();
    }

    /** 回退一个场景 */
    public async back(params?: any, formData?: IFormData) {
        if(this._scenes.length <= 1) {
            cc.warn(TAG, "已经是最后一个场景了, 无处可退");
            return ;
        }
        await TipsMgr.inst.showLoadingForm();
        let currScene = this._scenes.pop();
        await UIManager.getInstance().closeForm(currScene);

        this._currScene = this._scenes[this._scenes.length-1];
        await UIManager.getInstance().openForm(this._currScene, params, formData);
        await TipsMgr.inst.hideLoadingForm();
    }

}

export default new SceneMgr();