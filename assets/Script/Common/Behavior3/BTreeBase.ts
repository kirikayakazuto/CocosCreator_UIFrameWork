import Game from "../../Logic/Game";
import CocosHelper from "../../UIFrame/CocosHelper";

const {ccclass, property} = cc._decorator;

/**
 * 封装一颗行为树
 */
@ccclass
export default class BTreeBase extends cc.Component {

    /** 对应的命名空间名称 */
    public bTreeName: string;
    /** 配置文件路径 */
    public bTreeUrl: string;
    
    public bTree: b3.BehaviorTree = new b3.BehaviorTree();
    /** 共享消息的对象 */
    private blackboard: b3.Blackboard = new b3.Blackboard();;


    tick() {
        this.bTree.tick(this, this.blackboard);
    }
}
