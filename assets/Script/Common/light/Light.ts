import Quadtree from "../QuadTree/QuadTree";
import LightUtils from "../Utils/LightUtils";
import { LPolygon } from "./LPolygon";

export enum LightType {
    Round,      // 圆形
    Sector,     // 扇形
}

export class Light {
    private polygons: {[key: number]: LPolygon} = cc.js.createMap();
    private quadTree: Quadtree = null;

    screenSize: cc.Size = null; // 大小
    radius: number = 600;       // 光线半径
    fade: number = 1;           // 渐变程度
    type: LightType = 0;        // 类型

    sectirAngle: cc.Vec2 = cc.v2(60, 60);   // 扇形区域, x开始位置, y扇形幅度

    constructor(screen: cc.Size, option: {radius?: number, fade?: number, type?: number}) {
        this.screenSize = screen;
        this.radius = option.radius || this.radius;
        this.fade = option.fade || this.fade;
        this.type = option.type || this.type;

        this.quadTree = new Quadtree({x: 0, y: 0, width: screen.width, height: screen.height});
    }

    /** 添加多边形 */
    public addPolygon(polygons: cc.Vec2[]) {
        let p = new LPolygon(polygons)
        this.polygons[p.id] = p;
        this.quadTree.insert({
            id: p.id,
            x: p.rect.x,
            y: p.rect.y,
            width: p.rect.width,
            height: p.rect.height
        });
    }

    public clearPolygon() {
        this.quadTree.clear();
    }

    public getPolygonsByLight(light: cc.Vec2) {
        let r = cc.rect(light.x - this.radius/2, light.y - this.radius/2, this.radius, this.radius);
        let eles = this.quadTree.retrieve(r);
        let polygon: cc.Vec2[][] = [];
        for(const e of eles) {
            polygon.push(this.polygons[e.id].points);
        }
        console.log(eles.length)
        return polygon;
    }

    public getIntersect(light: cc.Vec2) {
        switch(this.type) {
            case LightType.Round:
                return LightUtils.getIntersect(light, this.getPolygonsByLight(light));
            case LightType.Sector:
                return LightUtils.getIntersectByAngle(this.sectirAngle.x, this.sectirAngle.y, light, this.getPolygonsByLight(light));
        }
    }

}