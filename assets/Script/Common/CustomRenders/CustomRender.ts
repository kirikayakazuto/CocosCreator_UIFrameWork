import CustomAssembler from "./CustomAssembler";
const renderEngine = cc.renderer.renderEngine;
const SpriteMaterial = renderEngine.SpriteMaterial;

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
        this._activateMaterial();
    }

    _assembler: CustomAssembler = null;          // 顶点数据装配器
    _spriteMaterial = null;     // 材质
    uv = [];                    // 纹理UV

    _renderData = null;


    onEnable() {
        super.onEnable();
        this._updateAssembler();
        this._activateMaterial();
        this.calculateUV();

        this.node.on(cc.Node.EventType.SIZE_CHANGED, this._onNodeSizeChange, this);
        this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this._onNodeSizeChange, this);
    }

    onDisable() {
        super.onDisable();

        this.node.off(cc.Node.EventType.SIZE_CHANGED, this._onNodeSizeChange, this);
        this.node.off(cc.Node.EventType.ANCHOR_CHANGED, this._onNodeSizeChange, this);
    }


    /** */
    _updateAssembler() {
        let assebler = new CustomAssembler();
        if(this._assembler != assebler) {
            this._assembler = assebler;
            this._renderData = null;
        }

        if(!this._renderData) {
            // this._renderData = this._assembler.createData(this);
            this._renderData.material = this['_material'];
            this['markForUpdateRenderData'](true);
        }
    }

    _activateMaterial() {
        let material = this['_material'];
        if(!material) {
            material = this['_material'] = new SpriteMaterial();
        }

        material.useColor = true;
        if(this._texture) {
            material.texture = this._texture;
            this['markForUpdateRenderData'](true);
            this['markForRender'](true);
        } else {
            this['disableRender']();
        }

        this['_updateMaterial']();
    }

    /** 顶点顺序是 左下, 右下, 左上, 右上 */
    calculateUV() {
        let uv = this.uv;
        let l=0, r=1, b=1, t=0;

        uv[0] = l; uv[1] = b;
        uv[2] = r; uv[3] = b;
        uv[4] = l; uv[5] = t;
        uv[6] = r; uv[7] = t;
    }

    _onNodeSizeChange() {
        if(!this._renderData) return ;      // 没有渲染数据
        this['markForUpdateRenderData'](true);
    }

    



}
