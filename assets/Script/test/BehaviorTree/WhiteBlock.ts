import BlockModel from "./BlockModel";
import ModelBase from "./ModelBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WhiteBlock extends cc.Component {

    

    // onLoad () {}

    start () {
        let model = new ModelBase();
        model.node = this.node;
        model.name = "WhiteBlock";
        BlockModel.regiestModel("WhiteBlock", model);

        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchStart(e: cc.Event.EventTouch) {
        
    }
    onTouchMove(e: cc.Event.EventTouch) {
        this.node.x += e.getDeltaX();
        this.node.y += e.getDeltaY();
    }
    onTouchEnd(e: cc.Event.EventTouch) {

    }

    // update (dt) {}
}
