export default class ConfigMgr {
    private _blockConfig: any = null;
    /** 加载配置文件 */
    async loadConfigs() {
        await this._coLoadGameConfig();
        this.onConfigChange();
    }

    public getLookConfig(): {len: number, angle: number} {
        return this._blockConfig["look"];
    }

    /** 加载配置文件 */
    private async _coLoadGameConfig() {
        let data : cc.JsonAsset = await new Promise((resolve, reject) => {
            cc.loader.loadRes("JsonConfigs/BlackBlockConfig", cc.JsonAsset, (error:Error, data:cc.JsonAsset)=>{
                if(error) {
                    console.log(error);
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
        if(data) {
            console.log("game config loaded!");
            this._blockConfig = data.json;
            return true;
        } else {
            return false;
        }
    }


    /** 通知其他manager */
    public onConfigChange() {
        
    }
}