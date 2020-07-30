import ConfigMgr from "./Manager/ConfigMgr";
import PlayerMgr from "./Manager/PlayerMgr";

/**
 * 掌管逻辑层
 */
class GameLogic {

    public inited = false;
    public configMgr: ConfigMgr = null;
    public playerMgr: PlayerMgr = null;
    public async init(uiRoot: cc.Node) {
        // 初始化Manager, 例如new ConfigMgr();
        this.configMgr = new ConfigMgr();
        this.playerMgr = new PlayerMgr();
        // 初始化平台sdk
        // todo...
        // 加载配置
        await this.configMgr.loadConfigs();

        // 

        this.inited = true;
    }

    onGameShow() {

    }

    /**
     * 逻辑层的时间更新控制
     * @param dt 
     */
    public update(dt: number) {
        // 例如Task.update(dt);,更新任务进度
    }
}

export default new GameLogic();