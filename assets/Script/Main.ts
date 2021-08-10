import Log from "./UIFrame/Log";
import SceneMgr from "./UIFrame/SceneMgr";
import TipsMgr from "./UIFrame/TipsMgr";
import UIHome from "./UIScript/UIHome";
import UILight from "./UIScript/UILight";
import UILoading from "./UIScript/UILoading";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {
    @property(cc.Sprite) spMap: cc.Sprite = null;
    
    onLoad() {        
    }

    start () {
        TipsMgr.inst.setLoadingForm(UILoading.prefabPath);
        SceneMgr.open(UILight.prefabPath);
        Log.d(true, "aaa 这个log会被显示");
        Log.d(false, "bbb这个log不会被显示");
    }

    onDestroy() {

    }  

    private turn = 1;
    private progress = 0;
    update(dt: number) {
        this.progress += dt * this.turn  * 0.2;
        this.spMap.getMaterial(0).setProperty('progress', this.progress);
        if(this.progress >= 1) {
            this.turn = -1;
        }
        if(this.progress <= 0) {
            this.turn = 1;
        }
        
    }
    
}
