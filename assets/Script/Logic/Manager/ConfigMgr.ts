import { BaseMgr } from "./BaseMgr";

export default class ConfigMgr extends BaseMgr {

    /** 加载配置文件 */
    async loadConfigs() {

    }

    /** 通知其他manager */
    public onConfigChange() {
        this.game.playerMgr.onConfigChange()
    }
}