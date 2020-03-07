const {ccclass, property} = cc._decorator;

@ccclass
export default class TouchPlus extends cc.Component {


    // onLoad () {}

    start () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
    }


    private touchStart(e: cc.Event.EventTouch) {

    }
    private touchMove(e: cc.Event.EventTouch) {

    }
    private touchEnd(e: cc.Event.EventTouch) {

    }
    private touchCancel(e: cc.Event.EventTouch) {

    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
    }

    // update (dt) {}
}
