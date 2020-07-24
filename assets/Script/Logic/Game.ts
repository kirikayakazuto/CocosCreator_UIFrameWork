/**
 * 掌管逻辑层的逻辑
 */
export default class Game {
    private static _inst: Game = null;
    public static get inst() {
        if(!this._inst) {
            this._inst = new Game();
        }
        return this._inst;
    }

    private inited = false;
    public async init(uiRoot: cc.Node) {
        if(this.inited) return;
        this.inited = true;
        // 初始化Manager, 例如new ConfigMgr();

        // 加载配置

        // 

        
    }

    onGameShow() {

    }

    public onGameConfig() {
        // 初始化配置
    }


    /**
     * 逻辑层的时间更新控制
     * @param dt 
     */
    public update(dt: number) {
        // 例如Task.update(dt);,更新任务进度
    }
}