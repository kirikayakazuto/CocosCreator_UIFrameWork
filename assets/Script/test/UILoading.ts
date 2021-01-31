import { FormType, } from "../UIFrame/config/SysDefine";
import UIBase from "../UIFrame/UIBase";
import CocosHelper, { LoadProgress } from "../UIFrame/CocosHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UILoading extends UIBase {

    formType = FormType.TopTips;
    
    start () {

    }
    private _url: string = '';
    public onShow(url: string) {
        this._url = url;
        console.log(url);
    }

    update(dt: number) {
        if(this._url !== CocosHelper.loadProgress.url) return ;
        // this._Labels.Progress.string = `${(CocosHelper.loadProgress.completedCount/CocosHelper.loadProgress.totalCount).toFixed(2)}`;
    }
}
