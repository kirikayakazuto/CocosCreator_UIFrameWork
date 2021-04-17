import BaseAssembler from "./BaseAssembler";

/** 禁止子节点执行的FLAG */
const BAN_FALG = (cc.RenderFlow.FLAG_RENDER | cc.RenderFlow.FLAG_POST_RENDER);
/** 对子节点有影响的FLAG */
const DIRTY_PROP = cc.RenderFlow.FLAG_OPACITY | cc.RenderFlow.FLAG_WORLD_TRANSFORM;
/** 开关 */
let BATCH_SWITCH = true;

export default class BatchAssembler extends BaseAssembler {

    constructor() {
        super();
    }

    /** 分层渲染 */
    private _groups: Array<cc.Node[]> = [];
    /** 
     * 重写 
     * 第一步, 让item的render方法都不执行, 只执行处理数据的方法 但是不执行fillbuffers方法
     * 第二步, 在postFillBuffers中按照顺序, 自己调用render方法, 填充数据, 以达到合批的目的
    **/
    public fillBuffers(comp: cc.RenderComponent, renderer: any) {
        if(CC_NATIVERENDERER) {
            return ;
        }
        if(!BATCH_SWITCH) return ;
        
        // 记录当前结点是否会给孩子结点造成影响
        let worldTransformFlag = renderer.worldMatDirty ? cc.RenderFlow.FLAG_WORLD_TRANSFORM : 0;
        let worldOpacityFlag = renderer.parentOpacityDirty ? cc.RenderFlow.FLAG_OPACITY_COLOR : 0;
        let dirtyFlag = worldTransformFlag | worldOpacityFlag;
        comp.node['__DirtyFlag__'] = dirtyFlag;
        this._groups = [];
        this._walkByName(comp.node.children);
    }

    public postFillBuffers(comp: cc.RenderComponent, renderer: any) {
        let originWorldMatDirty = renderer.worldMatDirty;
        if(!BATCH_SWITCH || !this._groups || this._groups.length <= 0) return ;
        BATCH_SWITCH = false;

        for(let group of this._groups) {
            if(group.length <= 0) continue;
            for(let node of group) {
                let renderFlag = node['__RenderFlag__'];
                let dirtyFlag = node['__DirtyFlag__'];
                renderer.worldMatDirty = dirtyFlag > 0 ? 1 : 0;
                node._renderFlag |= renderFlag;

                if(renderFlag) {
                    cc.RenderFlow.flows[renderFlag]._func(node);
                }
            }
        }
        this._groups = null;
        BATCH_SWITCH = true;
        renderer.worldMatDirty = originWorldMatDirty;
    }

    /**
     * 方案一
     * 默认的广度遍历方式
     * 优点: 速度较快
     * 缺点: 新增或删除节点可能会导致合批失败
     */
    private _walkDefault(nodes: cc.Node[]): void {
        if(!nodes || nodes.length <= 0) return ;
        
        let count = nodes[0].childrenCount;
        let groups: cc.Node[][] = [];
        for(let i=0; i<count; i++) {
            groups[i] = [];
        }        
        let group = [];
        for(const node of nodes) {
            if(!node._activeInHierarchy || node.opacity == 0) continue;
            let flag = node._renderFlag & BAN_FALG;
            if(flag > 0) {                          // 表示这个node需要渲染
                node['__RenderFlag__'] = flag;
                node._renderFlag &= ~flag;          // 去掉对应的flag
                group.push(node);
            }             

            node['__DirtyFlag__'] = node.parent['__DirtyFlag__'] | (node._renderFlag & DIRTY_PROP);
            for(let i=0; i<count; i++) {
                groups[i].push(node.children[i]);                
            }
        }
        if(group.length > 0) {
            this._groups.push(group);
        }
        for(const group of groups) {
            this._walkDefault(group);
        }
    }

    /**
     * 方案二
     * 同名结点同批次渲染
     * 优点: 新增或删除节点不会导致合批失败
     * 缺点: 兄弟结点不能同名,速度没方案一快,内存消耗也大
     */
    private _walkByName(nodes: cc.Node[]) {
        if(!nodes || nodes.length <= 0) return ;
        
        let groups: {[key: string]: cc.Node[]} = {};
        let group = [];
        let keys: string[] = [];
        for(const node of nodes) {
            if(!node._activeInHierarchy || node.opacity == 0) continue;
            let flag = node._renderFlag & BAN_FALG;
            if(flag > 0) {                          // 表示这个node需要渲染
                node['__RenderFlag__'] = flag;
                node._renderFlag &= ~flag;          // 去掉对应的flag
                group.push(node);
            }             

            node['__DirtyFlag__'] = node.parent['__DirtyFlag__'] | (node._renderFlag & DIRTY_PROP);

            let lastKey = "";
            for(const n of node.children) {                
                let key = n.name;
                if(!groups[key]) groups[key] = [];
                groups[key].push(n);

                if(keys.indexOf(key) == -1) {
                    if(lastKey.length == 0) {           // 当前key肯定要存0号位
                        keys.unshift(key);
                    }else {
                        let idx = keys.indexOf(lastKey);
                        keys.splice(idx+1, 0, key);
                    }
                }
                lastKey = key;
            }
        }
        if(group.length > 0) {
            this._groups.push(group);
        }
        for(const key of keys) {
            this._walkByName(groups[key]);
        }
    }


}