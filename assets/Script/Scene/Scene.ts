import GameLogic from "../Logic/Game";
import { EventCenter } from "../UIFrame/EventCenter";
import { EventType } from "../UIFrame/EventType";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Scene extends cc.Component {

    public static inst: Scene = null;

    private _started = false;
    public async start() {
        Scene.inst = this;
        this._started = true;

        // 初始化game逻辑
        await GameLogic.init(this.node);

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
        if(this._started && GameLogic.inited) {
            // 游戏加载完毕了，可以正式进入游戏, 关闭loading界面
            // todo...

        }
        GameLogic.update(dt);
    }

    public lateUpdate() {

    }
}