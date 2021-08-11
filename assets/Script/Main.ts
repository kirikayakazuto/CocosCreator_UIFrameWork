import Log from "./UIFrame/Log";
import SceneMgr from "./UIFrame/SceneMgr";
import TipsMgr from "./UIFrame/TipsMgr";
import UIConfig from "./UIScript/UIConfig";
import UIHome from "./UIScript/UIHome";
import UILight from "./UIScript/UILight";
import UILoading from "./UIScript/UILoading";
import UINavigator from "./UIScript/UINavigator";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    onLoad() {        
    }

    start () {
        TipsMgr.inst.setLoadingForm(UIConfig.Loading.prefabUrl);
        SceneMgr.open(UIConfig.Navigator.prefabUrl);
    }

    onDestroy() {

    }  
    
    update(dt: number) {
       
    }
}
