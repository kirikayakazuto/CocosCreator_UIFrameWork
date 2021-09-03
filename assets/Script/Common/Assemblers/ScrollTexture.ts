import ScrollAssembler from "./ScrollAssembler";

const {ccclass, menu, executeInEditMode, mixins, property} = cc._decorator;

@ccclass
@executeInEditMode
@menu('i18n:MAIN_MENU.component.ui/ScrollTexture')
@mixins(cc.BlendFunc)
export default class ScrollTexture extends cc.RenderComponent {

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

    public doScaleEffect() {
        let rectCount = this._assembler.getRectCount();
        let pos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));

        for(let i=0; i<rectCount; i++) {
            let arr = this._assembler.getRect(i);

            let center = this.getPolygonCenter(arr);
            let dir = center.sub(pos).normalize();

            this.tweenVec2(cc.v2(0, 0), dir.mul(2), 1, (dt: cc.Vec2) => {
                this._assembler.setRect(i, [
                    arr[0].addSelf(dt),
                    arr[1].addSelf(dt),
                    arr[2].addSelf(dt),
                    arr[3].addSelf(dt)
                ]);
            });
        }
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

    public tweenVec2(from: cc.Vec2, to: cc.Vec2, duration: number, onUpdate: (t: cc.Vec2) => void, onComplete?: Function, autoStart: boolean = true) {
        let o: Record<string, cc.Vec2> = {_value: from};
        Object.defineProperty(o, 'value', {
            get: () => o._value,
            set: (v: cc.Vec2) => { o._value = v; onUpdate && onUpdate(o._value); },
        });
        let tween = cc.tween(o).to(duration, { value: to }).call(onComplete);
        if (autoStart) {
            tween.start();
        }
        return tween;
    }
}

