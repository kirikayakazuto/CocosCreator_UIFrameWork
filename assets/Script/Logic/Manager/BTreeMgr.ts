import e = require("express");
import BTreeBase from "../../Common/Behavior3/BTreeBase";
import CocosHelper from "../../UIFrame/CocosHelper";
export default class BTreeMgr {

    private configs: {[name: string]: cc.JsonAsset} = cc.js.createMap();
    private trees: {[name: string]: BTreeBase} = cc.js.createMap();

    /** 注册行为树 */
    public regiestTree(name: string, tree: BTreeBase) {
        if(this.trees[name]) {
            console.warn(`${name} : 已经被注册了`)
        }
        this.trees[name] = tree;
        
    }
    
    public unRegiestTree(name: string) {
        this.trees[name] = null;
        delete this.trees[name];
    }

    /** 加载配置文件 */
    public async loadConfigSync(path: string | string[]) {
        let assets = await CocosHelper.loadAssetSync<cc.JsonAsset>(path);
        if(assets instanceof Array) { 
            for(const e of assets) {
                this.configs[e.name] = e;
            }
        }else {
            this.configs[assets.name] = assets;
        }
        
    }
    /** 获得配置文件 */
    public getConfig(path: string) {
        return this.configs[path];
    }

    /** 外部调用, 驱动行为树 */
    public tick(dt: number) {        
        for(const key in this.trees) {
            this.trees[key].tick();
        }
    }

}