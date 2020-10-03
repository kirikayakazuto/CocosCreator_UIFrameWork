export default class BTreeMgr {
    private configs: any = {};
    // private trees: {[name: string]: b3.BehaviorTree} = cc.js.createMap();
    private trees: Array<b3.BehaviorTree> = [];     // 行为树

    private blackboard: b3.Blackboard = null;

    public init() {
        this.blackboard = new b3.Blackboard();
    }
    public addTree(name: string) {
        let tree = new b3.BehaviorTree();
        let config = this.getTreeConfig(name);
        if(!config) {
            console.error('没有找到对应的配置文件', name)
            return ;
        }
        tree.load(config, name);
    }

    private getTreeConfig(name: string) {
        return this.configs[name];
    }

    public onConfigChange() {
        
    }

    public update(dt: number) {        
        for(const tree of this.trees) {
            tree.tick(this, this.blackboard);
        }
    }

    public test() {
        
    }
}