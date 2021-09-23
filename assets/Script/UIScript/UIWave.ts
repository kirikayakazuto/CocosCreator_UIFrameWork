const {ccclass, property} = cc._decorator;

@ccclass
export default class UIWave extends cc.Component {

    @property(cc.PhysicsPolygonCollider) polygonCollider: cc.PhysicsPolygonCollider = null;
    

    // onLoad () {}

    start () {
        this.polygonCollider.points = []
    }

    // update (dt) {}
}
