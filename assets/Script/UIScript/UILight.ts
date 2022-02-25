import UILight_Auto from "../AutoScripts/UILight_Auto";
import TexturePlus from "../Common/Components/TexturePlus";
import Light from "../Common/Light/Light";
import LightUtils from "../Common/Light/LightUtils";
import Obstacle from "../Common/Light/Obstacle";
import FormMgr from "../UIFrame/FormMgr";
import { UIScreen } from "../UIFrame/UIForm";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UILight extends UIScreen {
    
    @property(Obstacle)
    private obstacle: Obstacle = null;
    @property(Light)
    private light: Light = null;

    @property(cc.Camera)
    camera: cc.Camera = null;
    @property(cc.Sprite) spShadow: cc.Sprite = null;

    private _shadowTexture: cc.RenderTexture = new cc.RenderTexture();
    view: UILight_Auto;
    onLoad () {
        cc.director.on(cc.Director.EVENT_BEFORE_DRAW, () => {
            this._shadowTexture = new cc.RenderTexture();
            this._shadowTexture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, cc.game._renderContext.STENCIL_INDEX8);
            this.camera.targetTexture = this._shadowTexture;
        }, this);

        cc.director.on(cc.Director.EVENT_AFTER_DRAW, () => {
            this.spShadow.spriteFrame.setTexture(this._shadowTexture);
            this.spShadow.spriteFrame.setFlipY(true);
            this.spShadow.markForRender(true)
        }, this);
    }

    start () {
        let viewSize = cc.view.getVisibleSize();
        this.obstacle.addPolygon('', [
            cc.v2(0, 0), cc.v2(viewSize.width, 0), cc.v2(viewSize.width, viewSize.height), cc.v2(0, viewSize.height)
        ]);

        let ndObstacle = this.obstacle.node;
        for(let i=0; i<ndObstacle.childrenCount; i++) {
            let node = ndObstacle.children[i];
            let com = node.getComponent(TexturePlus);
            if(!com) continue;
            
            let points = com.polygon.concat([]);
            points = points.map(e => e.add(node.getPosition()));

            this.obstacle.addPolygon(com.node.uuid, points);
        }

        this.view.Back.addClick(() => {
            FormMgr.backScene();
        }, this);
    }


    private draw() {
        let polygons = this.obstacle.getPolygons(this.light.getBound());
        
        let intersections = LightUtils.getIntersections(this.light.node.getPosition(), polygons);
        this.light.draw(intersections);
    }

    update (dt: number) {
        this.draw();       
    }
}
