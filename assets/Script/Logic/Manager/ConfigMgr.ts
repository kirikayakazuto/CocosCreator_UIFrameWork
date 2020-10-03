export default class ConfigMgr {
    private _gameConfig: any = null;
    /** 加载配置文件 */
    async loadConfigs() {
        await this._coLoadGameConfig();
        this.onConfigChange();
    }

    /** 加载配置文件 */
    private async _coLoadGameConfig() {
        let data : cc.JsonAsset = await new Promise((resolve, reject) => {
            cc.loader.loadRes("Datas/Game", cc.JsonAsset, (error:Error, data:cc.JsonAsset)=>{
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
            this._gameConfig = this._genGameJson(data);
            return true;
        } else {
            return false;
        }
    }

    private _genGameJson(data: cc.JsonAsset) {
        // let json: {[key: string]: any} = {};
        // let tables = data.json;
        // for(const name in tables) {
        //     if(!Config[name]) {
        //         continue;
        //     }
        //     Config[name].decode && Config[name].decode(tables[name]);
        //     Config[name].link && Config[name].link();                
        //     if(Config[name].list) {
        //         json[name] = CommonUtils.deepClone(Config[name].list);
        //     }   
        //     if(Config[name].config) {
        //         json[name] = CommonUtils.deepClone(Config[name].config);
        //     }
        // }
        // return json;
    }


    /** 通知其他manager */
    public onConfigChange() {
        
    }
}