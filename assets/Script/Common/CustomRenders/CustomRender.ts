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
    }

    _assembler = null;
    _spriteMaterial = null;
    uv = [];


    _updateAssembler() {
        
    }


}
