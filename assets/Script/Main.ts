import SceneMgr from "./UIFrame/SceneMgr";
import UIConfig from "./UIScript/UIConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    onLoad() {        
    }

    start () {
        SceneMgr.open(UIConfig.Navigator.prefabUrl);

    }
    
    onDestroy() {

    }      
}
