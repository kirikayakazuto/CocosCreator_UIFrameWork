import UILoading from "./test/UILoading";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {
    
    onLoad() {
        cc.dynamicAtlasManager.enabled = true;
    }

    start () {
        UILoading.openView();
    }

    onDestroy() {

    } 
    
}
