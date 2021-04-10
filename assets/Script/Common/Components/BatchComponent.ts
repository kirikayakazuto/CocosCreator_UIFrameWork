import BatchAssembler from "../Assemblers/BatchAssembler";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BantchComponent extends cc.RenderComponent {
    onEnable() {
        super.onEnable();
        if (!CC_NATIVERENDERER) this.node._renderFlag |= cc.RenderFlow.FLAG_POST_RENDER;    
    }

    _resetAssembler() {
        this.setVertsDirty();
        let assembler = this._assembler = new BatchAssembler();
        assembler.init(this);
    }
}
