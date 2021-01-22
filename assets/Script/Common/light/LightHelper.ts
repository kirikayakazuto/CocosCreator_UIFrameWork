import LightUtils from "../Utils/LightUtils";
import { Light } from "./Light";

const {ccclass, property} = cc._decorator;

export enum LightType {
    Round,      // 圆形
    Sector,     // 扇形
}

@ccclass
export default class LightHelper extends cc.Component {

    /** 画笔 */
    @property(cc.Graphics)
    graphics: cc.Graphics = null;
    @property(cc.Material)
    mtl: cc.Material = null;
    @property(cc.Node)
    ndLight: cc.Node = null;
    @property(cc.Node)
    ndItemRoot: cc.Node = null;

    @property(cc.Integer)
    lightType: LightType = 0;
    lightRadius: number = 300;       // 光线半径
    lightFade: number = 1;           // 光线渐变程度,    1表示光线到半径长度, 透明度到0

    light: Light = null;


    canvasSize: cc.Size = null;
    visiableSize: cc.Size = null;


    onLoad () {
        
        this.canvasSize = cc.view.getCanvasSize();
        this.visiableSize = cc.view.getVisibleSize();
        console.log(this.canvasSize)
        this.node.setContentSize(this.canvasSize);

        this.mtl = this.graphics.setMaterial(0, this.mtl);

        this.mtl.setProperty("screen", cc.v2(this.canvasSize.width, this.canvasSize.height));

        this.light = new Light(this.canvasSize, {
            radius: this.lightRadius,
            fade: this.lightFade,
            type: this.lightType,
        });

        let r = this.lightRadius / this.canvasSize.width;
        this.mtl.setProperty("maxRadius", r);

        this.updatePolygons();
    }

    

    start () {
        this.ndLight.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    private onTouchMove(e: cc.Event.EventTouch) {
        this.ndLight.x += e.getDeltaX();
        this.ndLight.y += e.getDeltaY();
    }

    onDestroy() {
        this.ndLight.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }
    

    updatePolygons() {
        let polygons = LightUtils.getItemPolygons(this.ndItemRoot.children);
        this.light.clearPolygon();
        for(const p of polygons) {
            this.light.addPolygon(p);
        }
    }
    
    update (dt) {
        this.updatePolygons();
        let lightPos = this.ndLight.getPosition();
        LightUtils.drawLight(this.graphics, lightPos, this.light.getIntersect(lightPos));
        this.mtl.setProperty("lightPos", cc.v2(lightPos.x/this.visiableSize.width, lightPos.y/this.visiableSize.height));
    }


    // update (dt) {}
}
