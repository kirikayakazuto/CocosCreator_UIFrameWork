
const {ccclass, property} = cc._decorator;

@ccclass
export default class Item extends cc.Component {

    

    // onLoad () {}

    start () {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (e: cc.Event.EventTouch) => {
            this.node.x += e.getDeltaX();
            this.node.y += e.getDeltaY();
        }, this);
    }

    // update (dt) {}
}
