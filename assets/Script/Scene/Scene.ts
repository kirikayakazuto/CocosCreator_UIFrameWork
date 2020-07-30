import GameLogic from "../Logic/Game";
import { EventCenter } from "../UIFrame/EventCenter";
import { EventType } from "../UIFrame/EventType";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Scene extends cc.Component {

    public static inst: Scene = null;

    public async start() {
        Scene.inst = this;

        await this.onGameInit();
        this.registerEvent();
    }
    /** 游戏初始化 */
    public async onGameInit() {
        // 第一步 展示loading页面，当然有些默认就是loading页面

        // 第二步 初始化游戏（Managers，Configs，SDKs）
        await GameLogic.init(this.node);
        // 第三步 构建初始场景（加载必要的prefab，音频，texture）

        // 第四步 关掉loading页面，正式进入游戏

    }
    /** 初始化事件 */
    private registerEvent() {
        if(CC_WECHATGAME) {
            wx.onShow(this.onGameShow.bind(this));
            wx.onHide(this.onGameHide.bind(this));
        }else {
            cc.game.on(cc.game.EVENT_SHOW, this.onGameShow, this);
            cc.game.on(cc.game.EVENT_HIDE, this.onGameHide, this);
        }
    }

    private onGameShow(param) {
        EventCenter.emit(EventType.GameShow);
        cc.director.resume()
    }
    private onGameHide() {
        EventCenter.emit(EventType.GameHide);
        cc.director.pause();
    }

    public update(dt: number) {
        GameLogic.update(dt);
    }

    public lateUpdate() {

    }
}