import TexturePlus from "../Common/Components/TexturePlus";
import { PolygonHelper } from "../Common/Utils/PolygonHelper";
import { FormType } from "../UIFrame/config/SysDefine";
import UIBase from "../UIFrame/UIBase";
const {ccclass, property} = cc._decorator;

@ccclass
export default class UISplitTexture extends UIBase {
    formType = FormType.Screen;
    static prefabPath = "UIForms/UISplitTexture";
    
    @property(cc.Node)
    textureRoot: cc.Node = null;
    @property(cc.Graphics)
    graphics: cc.Graphics = null;
    @property(cc.Texture2D)
    pic: cc.Texture2D = null;

    private textures: TexturePlus[] = [];
    private startPoint: cc.Vec2 = null;
    private endPoint: cc.Vec2 = null;

    start() {
        let node = new cc.Node();
        let t = node.addComponent(TexturePlus);
        node.parent = this.textureRoot;
        t.texture = this.pic;
        this.textures.push(t);

        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);

        this.graphics.node.x = -cc.visibleRect.width/2;
        this.graphics.node.y = -cc.visibleRect.height/2;
    }
    onTouchStart(e: cc.Event.EventTouch) {
        this.startPoint = e.getLocation();
    }
    onTouchMove(e: cc.Event.EventTouch) {
        this.graphics.clear();
        this.graphics.moveTo(this.startPoint.x, this.startPoint.y);
        let p = e.getLocation();
        this.graphics.lineTo(p.x, p.y);
        this.graphics.stroke();
    }
    onTouchEnd(e: cc.Event.EventTouch) {
        this.graphics.clear();
        this.endPoint = e.getLocation();
        this.useLineCutPolygon(this.startPoint, this.endPoint);
    }

    private useLineCutPolygon(p0: cc.Vec2, p1: cc.Vec2) {
        for(let i=this.textures.length-1; i>=0; i--) {
            let texture = this.textures[i];
            let pa = texture.node.convertToNodeSpaceAR(p0);
            let pb = texture.node.convertToNodeSpaceAR(p1);
            console.log(pa, pb)
            let polygons = PolygonHelper.lineCutPolygon(pa, pb, texture.polygon);
            // console.log(polygons);
            if(polygons.length <= 0) continue;
            this.splitTexture(texture, polygons);
        }
    }

    private splitTexture(texture: TexturePlus, polygons: cc.Vec2[][]) {
        texture.polygon = polygons[0];
        for(let i=1; i<polygons.length; i++) {
            let node = new cc.Node();
            let t = node.addComponent(TexturePlus);
            node.parent = this.textureRoot;
            node.setPosition(texture.node.position);
            t.texture = this.pic;
            t.polygon = polygons[i];
            this.textures.push(t);
        }
    }
}
