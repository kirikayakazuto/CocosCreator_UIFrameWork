import TexturePlus from "../Common/Components/TexturePlus";
import { PolygonUtil } from "../Common/Utils/PolygonUtil";
import { UIScreen } from "../UIFrame/UIForm";
import UISplitTexture_Auto from "../AutoScripts/UISplitTexture_Auto";
import FormMgr from "../UIFrame/FormMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UISplitTexture extends UIScreen {


    @property(cc.Node)
    textureRoot: cc.Node = null;
    @property(cc.Graphics)
    graphics: cc.Graphics = null;
    @property(cc.Texture2D)
    pic: cc.Texture2D = null;

    private textures: TexturePlus[] = [];
    private startPoint: cc.Vec2 = null;
    private endPoint: cc.Vec2 = null;

    view: UISplitTexture_Auto;

    start() {
        this.init();

        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);

        this.graphics.node.x = -cc.visibleRect.width/2;
        this.graphics.node.y = -cc.visibleRect.height/2;

        this.view.Close.addClick(() => {
            FormMgr.backScene();
        }, this);
    }

    init() {
        let node = new cc.Node();
        let t = node.addComponent(TexturePlus);
        node.parent = this.textureRoot;
        t.texture = this.pic;
        this.textures.push(t);
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

    private doSplit() {
        let h = this.pic.height, w = this.pic.width;
        for(let i=0; i<15; i++) {
            let p0 = cc.v2(-(w/2+10), (Math.random() * h)-h/2);
            let p1 = cc.v2(w/2+10, (Math.random() * h)-h/2);
            this.useLineCutPolygon(p0, p1, false);
        }

        for(let i=0; i<15; i++) {
            let p0 = cc.v2(Math.random() * w - w/2, -(h/2+10));
            let p1 = cc.v2(Math.random() * w - w/2, (h/2+10));
            this.useLineCutPolygon(p0, p1, false);
        }
    }

    private useLineCutPolygon(p0: cc.Vec2, p1: cc.Vec2, isWorld = true) {
        for(let i=this.textures.length-1; i>=0; i--) {
            let texture = this.textures[i];
            let pa = p0.clone();
            let pb = p1.clone();
            if(isWorld) {
                pa = texture.node.convertToNodeSpaceAR(p0);
                pb = texture.node.convertToNodeSpaceAR(p1);
            }
            let polygons = PolygonUtil.lineCutPolygon(pa, pb, texture.polygon);
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

    onClickFly() {
        for(let i=0; i<this.textures.length; i++) {
            let center = this.getPolygonCenter(this.textures[i].polygon);
            let dir = center.normalize();
            cc.tween(this.textures[i].node).by(5, {x: dir.x * 500, y: dir.y * 500}).start();
        }
    }

    onClickReset() {
        for(let i=0; i<this.textures.length; i++) {
            let center = this.getPolygonCenter(this.textures[i].polygon);
            let dir = center.normalize();
            cc.tween(this.textures[i].node).by(5, {x: -dir.x * 500, y: -dir.y * 500}).call(() => {
                if(i === this.textures.length-1) {
                    this.textureRoot.destroyAllChildren();
                    this.textureRoot.removeAllChildren();
                    this.textures = [];
                    this.init();
                }
            }).start();
        }   
    }

    onFallDown() {
        for(let i=0; i<this.textures.length; i++) {
            let center = this.getPolygonCenter(this.textures[i].polygon);
            cc.tween(this.textures[i].node).delay((center.y + this.pic.height)/this.pic.height).by(2, {y: -500}, cc.easeCircleActionIn()).start();
        }
    }
    onResetFallDown() {
        
    }

    private getPolygonCenter(polygon: cc.Vec2[]) {
        let x = 0, y = 0;
        for(let i=0; i<polygon.length; i++) {
            x += polygon[i].x;
            y += polygon[i].y;
        }
        x = x/polygon.length;
        y = y/polygon.length;
        return cc.v2(x, y)
    }
}
