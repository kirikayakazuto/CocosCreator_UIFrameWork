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
     * 第一步, 让item的render方法都不执行, 即执行处理数据的方法 但是不执行fillbuffers方法
     * 第二步, 按照顺序, 自己调用render方法, 填充数据, 以达到合批的目的
    **/
    public fillBuffers(comp: cc.RenderComponent, renderer: any) {
        super.fillBuffers(comp, renderer);
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
        this._walkCollect(comp.node.children);
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

    private _walkCollect(nodes: cc.Node[]) {
        if(!nodes || nodes.length <= 0) return ;
        this._groups.push(nodes);

        let count = nodes[0].childrenCount;
        let groups: cc.Node[][] = [];
        for(let i=0; i<count; i++) {
            groups[i] = [];
        }        
        for(const node of nodes) {
            if(!node._activeInHierarchy || node.opacity == 0) continue;

            let flag = node._renderFlag & BAN_FALG;
            // cc.log(parseInt(node._renderFlag).toString(2), parseInt(BAN_FALG).toString(2))
            if(flag > 0) {                          // 表示这个node需要渲染
                node['__RenderFlag__'] = flag;
                node._renderFlag &= ~flag;          // 去掉对应的flag
            }             

            node['__DirtyFlag__'] = node.parent['__DirtyFlag__'] | (node._renderFlag & DIRTY_PROP);

            if(flag == 0 || node.children.length <= 0) continue;
            for(let i=0; i<node.childrenCount; i++) {
                groups[i].push(node.children[i]);
            }
        }
        for(const group of groups) {
            this._walkCollect(group);
        }
    }
}