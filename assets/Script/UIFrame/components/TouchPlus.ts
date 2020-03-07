const {ccclass, property} = cc._decorator;

@ccclass
export default class TouchPlus extends cc.Component {

    private offset  = 15;       // 误差值
    private startPosition: cc.Vec2;
    private isTouch = false;

    private isClick = true;

    private clickEvent: Function;
    private slideEvent: (e: cc.Event.EventTouch) => any;

    /** 添加点击事件和滑动事件 */
    public addEvent(click: Function, slide: (e: cc.Event.EventTouch) => any) {
        this.clickEvent = click;
        this.slideEvent = slide;
    }

    // onLoad () {}

    start () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
    }


    private touchStart(e: cc.Event.EventTouch) {
        this.isTouch = true;
        this.startPosition = e.getLocation();
    }
    private touchMove(e: cc.Event.EventTouch) {
        if(!this.isTouch) return ;
        let pos = e.getLocation();
        let len = pos.sub(this.startPosition).mag();
        if(len > this.offset) {
            this.isClick = false;
            // 触发滑动
            this.slideEvent && this.slideEvent(e);
        }
    }
    private touchEnd(e: cc.Event.EventTouch) {
        if(!this.isTouch) return ;
        this.isTouch = false;
        
        this.isClick && this.clickEvent && this.clickEvent(e);

        this.isClick = true;
    }
    private touchCancel(e: cc.Event.EventTouch) {
        if(!this.isTouch) return ;
        this.isTouch = false;

        this.isClick = true;
    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
    }

    // update (dt) {}
}
