import { IFormData } from "./Struct";
import UIManager from "./UIManager";

const TAG = "SceneMgr";
class SceneMgr {

    private _scenes: Array<string> = [];
    private _currScene: string = "";

    public getCurrScene() {
        return UIManager.getInstance().getComponentByFid(this._currScene);
    }

    /** 打开一个场景 */
    public async openScene(scenePath: string, params?: any, formData?: IFormData) {
        if(this._currScene == scenePath) {
            cc.warn(TAG, "当前场景和需要open的场景是同一个");
            return ;
        }
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
        await this._doOpenScene(this._currScene, params, formData);
    }

    /** 回退一个场景 */
    public async backScene(params?: any, formData?: IFormData) {
        if(this._scenes.length <= 1) {
            cc.warn(TAG, "已经是最后一个场景了, 无处可退");
            return ;
        }
        let currScene = this._scenes.pop();
        await UIManager.getInstance().closeForm(currScene);

        this._currScene = this._scenes[this._scenes.length-1];
        await this._doOpenScene(this._currScene, params, formData);
    }
    
    /** 如果没有通过SceneMgr打开场景, 那么会在UIManager中调用check方法检查一下 */
    // public checkOpen(scenePath: string) {
    //     if(scenePath == this._currScene) return true;
    //     this._currScene = scenePath;
    //     this.stack.push(this._currScene);
    // }

    public checkClose() {

    }

    /** 打开场景 */
    private async _doOpenScene(scenePath: string, params?: any, formData?: IFormData) {
        // await TipsMgr.inst.showLoadingForm();
        await UIManager.getInstance().openForm(scenePath, params, formData);
        // await TipsMgr.inst.hideLoadingForm();
    }

}

export default new SceneMgr();