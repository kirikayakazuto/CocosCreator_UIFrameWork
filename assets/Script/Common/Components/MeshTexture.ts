import ScrollAssembler from "../Assemblers/MeshAssembler";

const {ccclass, menu, executeInEditMode, mixins, property} = cc._decorator;

@ccclass
@executeInEditMode
@menu('i18n:MAIN_MENU.component.ui/MeshTexture')
@mixins(cc.BlendFunc)
export default class MeshTexture extends cc.RenderComponent {

    @property(cc.Texture2D)
    _texture: cc.Texture2D = null;
    @property(cc.Texture2D)
    get texture() {
        return this._texture;
    }
    set texture(val: cc.Texture2D) {
        this._texture = val;
        this.node.width = val.width; this.node.height = val.height;
        this._updateMaterial();
    }

    @property({displayName: "步长"})
    step = 10;

    @property({type: cc.Enum(cc.macro.BlendFactor), override: true})
    srcBlendFactor: cc.macro.BlendFactor = cc.macro.BlendFactor.SRC_ALPHA;

    @property({type: cc.Enum(cc.macro.BlendFactor), override: true})
    dstBlendFactor: cc.macro.BlendFactor = cc.macro.BlendFactor.ONE_MINUS_SRC_ALPHA;

    private _updateVerts() {
        this.setVertsDirty();
    }

    public _updateMaterial() {
        let texture = this._texture;
        let material = this.getMaterial(0);
        if(material) {
            if(material.getDefine("USE_TEXTURE") !== undefined) {
                material.define("USE_TEXTURE", true);
            }
            material.setProperty("texture", texture);
        }
        this['__proto__']._updateBlendFunc.call(this);
        this.setVertsDirty();        
    }

    public _validateRender() {
        
    }

    public _assembler: ScrollAssembler = null;
    public _resetAssembler() {
        let assembler = this._assembler = window["textureAssember"] = new ScrollAssembler();
        assembler.init(this);
        this._updateColor();
        this.setVertsDirty();
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

    public tweenVec2(from: cc.Vec2, to: cc.Vec2, duration: number, onUpdate: (t: cc.Vec2) => void, onComplete?: Function, delay: number = 0) {
        let o: Record<string, cc.Vec2> = {_value: from};
        Object.defineProperty(o, 'position', {
            get: () => o._value,
            set: (v: cc.Vec2) => { o._value = v; onUpdate && onUpdate(o._value); },
        });
        let tween = cc.tween(o).delay(delay).to(duration, { position: to }).call(onComplete);
        tween.start();
        return tween;
    }

    public tweenVec2Bezier(from: cc.Vec2, to: cc.Vec2, duration: number, onUpdate: (t: cc.Vec2) => void, onComplete?: Function, delay: number = 0) {
        let o: Record<string, cc.Vec2> = {_value: from};
        Object.defineProperty(o, 'position', {
            get: () => o._value,
            set: (v: cc.Vec2) => { o._value = v; onUpdate && onUpdate(o._value); },
        });
        // let tween = cc.tween(o).delay(delay).to(duration, { position: to }).call(onComplete);
        let tween = cc.tween(o).delay(delay).bezierTo(duration, cc.v2(from.x, from.y+100), cc.v2(to.x, to.y + 100), to).call(onComplete);
        tween.start();
        return tween;
    }

    public doScaleEffect() {
        return new Promise((resolve, reject) => {
            let rectCount = this._assembler.getRectCount();
            let pos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
    
            for(let i=0; i<rectCount; i++) {
                let arr = this._assembler.getRect(i);
    
                let center = this.getPolygonCenter(arr);
                let dir = center.sub(pos).normalize();
    
                this.tweenVec2(cc.v2(0, 0), dir.mul(1.5), 0.3, (dt: cc.Vec2) => {
                    this._assembler.setRect(i, [
                        arr[0].addSelf(dt),
                        arr[1].addSelf(dt),
                        arr[2].addSelf(dt),
                        arr[3].addSelf(dt)
                    ]);
                }, () => {
                    if(i == rectCount-1) resolve(true);
                });
            }
        })
        
    }

    public async doTextureMove(e, data) {
        let dir = cc.v2(-1, 0);
        if(data == 'right') {
            dir = cc.v2(1, 0)
        }
        
        let rectCount = this._assembler.getRectCount();
        let pos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));

        for(let i=0; i<rectCount; i++) {
            let idx = rectCount - i -1;
            let arr = this._assembler.getRect(idx);

            let targetPos = dir.mul(400);
            this.tweenVec2Bezier(cc.v2(0, 0), targetPos, 1, (dt: cc.Vec2) => {
                this._assembler.setRect(idx, [
                    arr[0].add(dt),
                    arr[1].add(dt),
                    arr[2].add(dt),
                    arr[3].add(dt),
                ]);
            }, () => {
                this._assembler.setRect(idx, [
                    arr[0].add(targetPos),
                    arr[1].add(targetPos),
                    arr[2].add(targetPos),
                    arr[3].add(targetPos),
                ]);
            }, Math.floor(i/40) * 0.1);
        }
    }

}

