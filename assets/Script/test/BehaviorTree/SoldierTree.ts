import BTreeBase from "../../Common/Behavior3/BTreeBase";
import Game from "../../Logic/Game";
import CocosHelper from "../../UIFrame/CocosHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SoldierTree extends BTreeBase {
    bTreeName = "SoldierTree";
    bTreeUrl = "BTreeConfigs/SoldierTree";

    onLoad() {
        let config = Game.bTreeMgr.getConfig(this.bTreeUrl);
        this.bTree.load(config, window[this.bTreeName]);
        Game.bTreeMgr.regiestTree(this.bTreeName, this);        
    }

    start() {
        
    }




}
