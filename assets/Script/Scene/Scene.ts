import Game from "../Logic/Game";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Scene extends cc.Component {

    public static inst: Scene = null;

    private _started = false;
    public start() {
        Scene.inst = this;
        this._started = true;

        if(CC_WECHATGAME) {
            wx.onShow((param) => {
                
            });
        }
    }

    public update(dt: number) {
        Game.inst.update(dt);
    }

    public lateUpdate() {

    }
}