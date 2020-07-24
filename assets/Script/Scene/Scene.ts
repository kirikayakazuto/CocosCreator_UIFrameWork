import Game from "../Logic/Game";
import { EventCenter } from "../UIFrame/EventCenter";
import { EventType } from "../UIFrame/EventType";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Scene extends cc.Component {

    public static inst: Scene = null;

    private _started = false;
    public start() {
        Scene.inst = this;
        this._started = true;

        if(CC_WECHATGAME) {
            wx.onShow(this.onGameShow.bind(this));
            wx.onHide(this.onGameHide.bind(this));
        }else {
            cc.game.on(cc.game.EVENT_SHOW, this.onGameShow, this);
            cc.game.on(cc.game.EVENT_HIDE, this.onGameHide, this);
        }
    }

    onGameShow(param) {
        EventCenter.emit(EventType.GameShow);
        cc.director.resume()
    }
    onGameHide() {
        EventCenter.emit(EventType.GameHide);
        cc.director.pause();
    }

    public update(dt: number) {
        Game.inst.update(dt);
    }

    public lateUpdate() {

    }
}