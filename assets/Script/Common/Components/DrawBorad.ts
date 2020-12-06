import DrawingBoard from "../Utils/DrawingBoard";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DrawBorad extends cc.Component {

    @property(cc.Node)
    ndBroad: cc.Node = null;

    private _drawingBroad: DrawingBoard = null;
    private _texture: cc.Texture2D = new cc.Texture2D();
    private _sprite: cc.Sprite = null;

    private broadYMax = -1;         // 画板上边界最大值
    private broadXMin = -1;         // 画板左边界最小值
    private _touching = false;


    onLoad() {
        if(!this.ndBroad) {
            this.ndBroad = this.node;
        }
        this._sprite = this.ndBroad.getComponent(cc.Sprite);
        if(!this._sprite) {
            this.ndBroad.addComponent(cc.Sprite);
        }
        this._drawingBroad = new DrawingBoard(this.ndBroad.width, this.ndBroad.height);
        this._drawingBroad.setColor(0, 0, 0, 255);
        this._drawingBroad.setLineWidth(5);

        this._touching = false;

        let worldPos = this.ndBroad.convertToWorldSpaceAR(cc.v2(0, 0))
        this.broadYMax = worldPos.y + this.ndBroad.height/2 ;
        this.broadXMin = worldPos.x - this.ndBroad.width/2;

        this.ndBroad.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.ndBroad.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.ndBroad.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        this.ndBroad.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    }

    start() {
        
    }

    public setData(data: any) {
        this._drawingBroad.setData(data);
        this.updateTexture(this._drawingBroad.getData(), this.ndBroad.width, this.ndBroad.height);
    }

    private touchStart(e: cc.Event.EventTouch) {
        if(this._touching) return ;
        this._touching = true;
        let worldPos = e.getLocation();
        this._drawingBroad.moveTo(worldPos.x-this.broadXMin, this.getRealY(worldPos.y));
    }
    private touchMove(e: cc.Event.EventTouch) {
        if(!this._touching) return ;
        let worldPos = e.getLocation();
        this._drawingBroad.lineTo(worldPos.x-this.broadXMin, this.getRealY(worldPos.y));
        this.updateTexture(this._drawingBroad.getData(), this.ndBroad.width, this.ndBroad.height);
    }
    private touchCancel(e: cc.Event.EventTouch) {
        this._touching = false;
    }
    private touchEnd(e: cc.Event.EventTouch) {
        this._touching = false;
    }

    onDestroy() {
        this.ndBroad.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.ndBroad.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.ndBroad.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        this.ndBroad.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    }

    setColor(r: number, g: number, b: number, a: number) {
        this._drawingBroad.setColor(r, g, b, a);
    }
    setLineWidth(width: number) {
        this._drawingBroad.setLineWidth(width);
    }
    setPen() {
        this.setColor(0, 0, 0, 255);
        this.setLineWidth(5);
    }
    setReaser() {
        this.setColor(0, 0, 0, 0);
        this.setLineWidth(20);
    }

    getTexture() {
        return this._texture;
    }

    private updateTexture(data: any, width: number, height: number) {
        this._texture.initWithData(data, cc.Texture2D.PixelFormat.RGBA8888, width, height);
        this._sprite.spriteFrame.setTexture(this._texture)
        this._sprite.markForRender(true)
    }

    private getRealY(y: number) {
        if(this._sprite.spriteFrame['_flipY']) {
            return this.broadYMax - (cc.visibleRect.height-y);
        }
        return this.broadYMax - y;
    }


}