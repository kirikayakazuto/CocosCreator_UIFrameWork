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

    lightType: LightType = 0;
    lightRadius: number = 300;       // 光线半径
    lightFade: number = 1;           // 光线渐变程度,    1表示光线到半径长度, 透明度到0

    light: Light = null;


    canvasSize: cc.Size = null;


    onLoad () {
        
        this.canvasSize = cc.view.getCanvasSize();
        this.node.setContentSize(this.canvasSize);

        this.node.x = -this.canvasSize.width/2;
        this.node.y = -this.canvasSize.height/2;        // 放在屏幕左下角, 坐标系和shader对应

        this.mtl = this.graphics.setMaterial(0, this.mtl);

        this.mtl.setProperty("screen", cc.v2(this.canvasSize.width, this.canvasSize.height));

        

        this.light = new Light(this.canvasSize, {
            radius: this.lightRadius,
            fade: this.lightFade,
            type: this.lightType,
        });

        let r = this.lightRadius / this.canvasSize.width;
        this.mtl.setProperty("maxRadius", r);

        let polygons = LightUtils.getItemPolygons(this.ndItemRoot.children);
        for(const p of polygons) {
            this.light.addPolygon(p);
        }
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

    update (dt) {
        let intersects = this.light.getIntersect(this.ndLight.getPosition());
        LightUtils.drawLight(this.graphics, this.ndLight.getPosition(), intersects);
        let p = this.ndLight.getPosition()
        this.mtl.setProperty("lightPos", cc.v2(p.x/this.canvasSize.width, p.y/this.canvasSize.height));
    }


    // update (dt) {}
}
