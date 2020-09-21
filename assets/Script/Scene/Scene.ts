import Game from "../Logic/Game";
import { EventCenter } from "../UIFrame/EventCenter";
import { EventType } from "../UIFrame/EventType";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Scene extends cc.Component {
    @property(cc.Node)
    ndBlock: cc.Node = null;

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
        await Game.init(this.node);
        // 第三步 构建初始场景（加载必要的prefab，音频，texture）

        // 第四步 加载主界面UI,关掉loading页面,正式进入游戏

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

    private onGameShow(param: any) {
        EventCenter.emit(EventType.GameShow, param);
        cc.director.resume()
    }
    private onGameHide() {
        EventCenter.emit(EventType.GameHide);
        cc.director.pause();
    }

    public update(dt: number) {
        Game.update(dt);
    }

    public lateUpdate() {

    }

    /** 设置是否阻挡游戏触摸输入 */
    private _block = 0;
    public setInputBlock(bool: boolean) {
        if(!this.ndBlock) {
            cc.warn("未启用 block input");
            return ;
        }
        bool ? ++ this._block : -- this._block;
        this.ndBlock.active = this._block > 0;
    }
}