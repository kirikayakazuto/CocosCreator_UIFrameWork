import { Dungeon, GridType } from "../Common/Utils/Dungeon";
import UIBase from "../UIFrame/UIBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIDungeon extends UIBase {

    @property(cc.Prefab)
    pfGrid: cc.Prefab = null;

    @property(cc.Node)
    ndItemRoot: cc.Node = null;

    static prefabPath = "UIForms/UIDungeon";

    private dungeon: Dungeon = null;

    start() {
        this.dungeon = new Dungeon(51, 51);
        let map = this.dungeon.generate();
        let size = this.pfGrid.data.width;
        for(let i=0; i<map.length; i++) {
            let node = cc.instantiate(this.pfGrid);
            node.color = map[i] == GridType.Wall ? cc.color(0, 0, 0, 255) : cc.color(255, 255, 255, 255);
            this.ndItemRoot.addChild(node);
            let grid = this.dungeon.getGridByIdx(i);
            node.setPosition(grid.x * size, grid.y * size);
                    
        }
    }

    


    
}