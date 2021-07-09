import SceneMgr from "./UIFrame/SceneMgr";
import TipsMgr from "./UIFrame/TipsMgr";
import UIHome from "./UIScript/UIHome";
import UILoading from "./UIScript/UILoading";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {
    
    onLoad() {        
    }

    start () {
        TipsMgr.inst.setLoadingForm(UILoading.prefabPath);
        SceneMgr.open(UIHome.prefabPath);
    }

    onDestroy() {

    }  
    
}
