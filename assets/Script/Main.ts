import Log from "./UIFrame/Log";
import SceneMgr from "./UIFrame/SceneMgr";
import TipsMgr from "./UIFrame/TipsMgr";
import UIHome from "./UIScript/UIHome";
import UILight from "./UIScript/UILight";
import UILoading from "./UIScript/UILoading";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {
    
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
    
}
