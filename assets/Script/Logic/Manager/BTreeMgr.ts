import CocosHelper from "../../UIFrame/CocosHelper";
export default class BTreeMgr {

    private configs: {[name: string]: cc.JsonAsset} = cc.js.createMap();
    private trees: {[name: string]: b3.BehaviorTree} = cc.js.createMap();
    private blackboard: b3.Blackboard = new b3.Blackboard();


    /** 生成行为树 */
    public async genTree(configPath: string, nameSpace: string, name?: string) {
        let config = await CocosHelper.loadAssetSync<cc.JsonAsset>(configPath);
        let tree = new b3.BehaviorTree();
        tree.load(config, window[nameSpace]);

        nameSpace = name ? name : nameSpace;
        this.trees[nameSpace] = tree;

        return tree;
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
            this.trees[key].tick(this, this.blackboard);
        }
    }

}