const {ccclass, property} = cc._decorator;

@ccclass
export default class Test extends cc.Component {

    // onLoad () {}

    @property(cc.Node)
    Coco: cc.Node = null;

    start () {
        cc.log(cc.Color.WHITE)
        
    }

    moveCoco() {
        this.Coco.runAction(cc.moveTo(1, cc.v2(50, 50)));
        this.Coco.runAction(cc.moveTo(5, cc.v2(-50, 50)));
        this.Coco.runAction(cc.moveTo(1, cc.v2(-50, 50)));
        
    }

    // update (dt) {}
}
