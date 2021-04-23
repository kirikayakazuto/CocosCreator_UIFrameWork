import UILoading from "./test/UILoading";
import UILogin from "./test/UILogin";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    @property(cc.Node)
    content: cc.Node = null;
    @property(cc.Prefab)
    pfNode: cc.Prefab = null;
    
    onLoad() {
        cc.dynamicAtlasManager.enabled = true;
    }

    start () {
        UILogin.openView();
        // for(let i=0; i<20; i++) {
        //     let node = cc.instantiate(this.pfNode);
        //     node.parent = this.content;
        // }
    }

    onDestroy() {

    } 
    
}
