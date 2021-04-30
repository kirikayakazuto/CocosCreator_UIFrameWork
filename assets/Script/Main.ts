import SceneMgr from "./UIFrame/SceneMgr";
import UIHome from "./UIScript/UIHome";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {
    
    onLoad() {
        cc.dynamicAtlasManager.enabled = true;
    }

    start () {
        SceneMgr.openScene(UIHome.prefabPath);
        // for(let i=0; i<20; i++) {
        //     let node = cc.instantiate(this.pfNode);
        //     node.parent = this.content;
        // }
    }

    onDestroy() {

    } 
    
}
