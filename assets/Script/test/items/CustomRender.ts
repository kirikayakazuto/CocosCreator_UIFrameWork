import BaseAssembler from "../../Common/Components/BaseAssembler";

const renderEngine = cc.renderer.renderEngine;

const {ccclass, property} = cc._decorator;


@ccclass
export default class CustomRender extends cc.RenderComponent {

    @property(cc.Texture2D)
    _texture: cc.Texture2D = null;
    @property(cc.Texture2D)
    get texture() {
        return this._texture;
    }
    set texture(val: cc.Texture2D) {
        this._texture = val;
        this._updateMaterial()
    }

    _assembler: cc.Assembler = null;          // 顶点数据装配器
    _material = null;     // 材质


    _updateMaterial() {
        let texture = this._texture;
        let material = this.getMaterial(0);
        if(material) {
            if(material.getDefine("USE_TEXTURE") !== undefined) {
                material.define("USE_TEXTURE", true);
            }
            material.setProperty("texture", texture);
        }
        this.setVertsDirty();
        // 暂时不处理
        // BlendFunc.prototype._updateMaterial.call(this);
    }

    _validateRender() {
        
    }

    _resetAssembler() {
        let assembler = this._assembler = new BaseAssembler();
        assembler.init(this);
        this["_updateColor"]();
        this.setVertsDirty();
    }
}