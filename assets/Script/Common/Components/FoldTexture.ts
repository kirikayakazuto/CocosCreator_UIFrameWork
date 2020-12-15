import TextureAssembler from "../Assemblers/TextureAssembler";
import { CommonUtils } from "../Utils/CommonUtils";
import { PolygonUtil } from "../Utils/PolygonUtil";

let _vec2_temp = new cc.Vec2();
let _mat4_temp = new cc.Mat4();

const {ccclass, inspector, executeInEditMode, mixins, property} = cc._decorator;

@ccclass
@executeInEditMode
export default class FoldTexture extends cc.RenderComponent {
    @property(cc.Boolean)
    editing: boolean = false;

    @property(cc.Texture2D)
    _texture: cc.Texture2D = null;
    @property(cc.Texture2D)
    get texture() {
        return this._texture;
    }
    set texture(val: cc.Texture2D) {
        this._texture = val;
        let l = -val.width/2, b = -val.height/2, t = val.height/2, r = val.width/2;
        this.polygon = [cc.v2(l, b), cc.v2(r, b), cc.v2(r, t), cc.v2(l, t)];
        this._updateMaterial();
    }

    _polygon: cc.Vec2[] = [];
    public get polygon() {
        return this._polygon;
    }
    public set polygon(points: cc.Vec2[]) {
        this._polygon = points;
        this._updateVerts();
    }

    @property([cc.Vec2])
    _line: cc.Vec2[] = [];
    @property({type: [cc.Vec2], serializable: true})
    public get line() {
        return this._line;
    }
    public set line(points: cc.Vec2[]) {
        this._line = points;
        this.computePolygonByLine();
    }

    onLoad() {

    }
    start() {

    }

    private computePolygonByLine() {
        let l = -this.texture.width/2, b = -this.texture.height/2, t = this.texture.height/2, r = this.texture.width/2;
        let polygon = [cc.v2(l, b), cc.v2(r, b), cc.v2(r, t), cc.v2(l, t)];
        let result = PolygonUtil.splitPolygonByLine(this.line[0], this.line[1], polygon);
        if(result.length >= 2) {
            
        }

    }

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
        this.setVertsDirty();
        
        // cc.BlendFunc.prototype['_updateMaterial'].call(this);
    }

    public _validateRender() {
        
    }

    public _resetAssembler() {
        let assembler = this._assembler = new TextureAssembler();
        assembler.init(this);
        this._updateColor();
        this.setVertsDirty();
    }

    _hitTest (cameraPt: cc.Vec2) {
        let node = this.node;
        let testPt = _vec2_temp;
        
        node['_updateWorldMatrix']();
        // If scale is 0, it can't be hit.
        if (!cc.Mat4.invert(_mat4_temp, node['_worldMatrix'])) {
            return false;
        }
        cc.Vec2.transformMat4(testPt, cameraPt, _mat4_temp);
        return CommonUtils.isInPolygon(testPt, this.polygon);
    }
}