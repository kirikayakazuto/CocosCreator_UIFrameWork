import SceneMgr from "./UIFrame/SceneMgr";
import UIConfig from "./UIConfig";
import FormMgr from "./UIFrame/FormMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    onLoad() {        
    }

    start () {
        FormMgr.open(UIConfig.UINavigator);
    }
    
    onDestroy() {

    }      
}
