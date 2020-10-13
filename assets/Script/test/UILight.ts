import LightUtils from "../Common/Utils/LightUtils";
import { FormType } from "../UIFrame/config/SysDefine";
import UIBase from "../UIFrame/UIBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UILight extends UIBase {

    formType = FormType.Screen;
    static prefabPath = "UIForms/UILight";

    @property(cc.Node)
    ndItemRoot: cc.Node = null;
    @property(cc.Graphics)
    graphics: cc.Graphics = null;
    @property(cc.Node)
    ndLight: cc.Node = null;

    mtl: cc.Material = null;


    private itemPolygons: cc.Vec2[][] = [];
    onLoad () {
        this.itemPolygons = LightUtils.getItemPolygons(this.ndItemRoot.children, this.graphics.node.getPosition());
        this.mtl = this.graphics.getMaterial(0);
        this.mtl.setProperty("edge", 0.4);
    }

    start () {
        this.ndLight.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }
    onTouchMove(e: cc.Event.EventTouch) {
        this.ndLight.x += e.getDeltaX();
        this.ndLight.y += e.getDeltaY();
    }

    draw() {
        this.graphics.clear();
        let intersects = LightUtils.getIntersect(this.ndLight.getPosition(), this.itemPolygons);
        this.graphics.moveTo(intersects[0].x, intersects[0].y);
        for(let i=1; i<intersects.length; i++) {
            let intersect = intersects[i];
            this.graphics.lineTo(intersect.x, intersect.y);
        }
        this.graphics.fill();

        // for(let i=0; i<intersects.length; i++) {
        //     let intersect = intersects[i];
        //     this.graphics.moveTo(this.ndLight.x, this.ndLight.y);
        //     this.graphics.lineTo(intersect.x, intersect.y);
        //     this.graphics.stroke();
        // }
    }

    update (dt) {
        this.draw();
        let p = this.ndLight.getPosition()
        
        this.mtl.setProperty("center", cc.v2(p.x/1334, p.y/750));
    }
}
