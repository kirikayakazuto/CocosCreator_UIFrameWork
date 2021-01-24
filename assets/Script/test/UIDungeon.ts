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
        this.dungeon = new Dungeon(63, 37);
        let map = this.dungeon.generate();
        let size = this.pfGrid.data.width;
        for(let j=0; j<this.dungeon.height; j++) {
            for(let x=0; x<this.dungeon.width; x++) {
                let node = cc.instantiate(this.pfGrid);            
                node.color = this.getColor(map[j * this.dungeon.width + x]);
                this.ndItemRoot.addChild(node);
                node.setPosition(x * size, j * size);
            }
        }        
    }

    private getColor(type: GridType) {
        switch(type) {
            case GridType.Wall:
                return cc.color(0, 0, 0, 255);
            case GridType.Floor:
                return cc.color(255, 255, 255, 255);
            case GridType.OpenDoor:
                // return cc.color(0, 0, 255, 255);
            case GridType.CloseDoor:
                return cc.color(0, 255, 0, 255);
        }

        cc.resources.load("", cc.SpriteFrame, (error, spriteFrame: cc.SpriteFrame) => {  
            let sprite: cc.Sprite;
            sprite.spriteFrame = spriteFrame;
        })
        
    }

    


    
}