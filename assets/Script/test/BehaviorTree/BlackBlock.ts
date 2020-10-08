import CocosHelper from "../../UIFrame/CocosHelper";
import { EventCenter } from "../../UIFrame/EventCenter";
import { EventType } from "../../UIFrame/EventType";
import BlockModel from "./BlockModel";
import { BlockState } from "./BlockType";
import ModelBase from "./ModelBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BlackBlock extends cc.Component {

    @property(cc.Node)
    ndBody: cc.Node = null;
    @property(cc.Label)
    lbState: cc.Label = null;
    @property(cc.Graphics)
    graphics: cc.Graphics = null;

    start() {
        let model = new ModelBase();
        model.node = this.node;
        model.name = "BlackBlock";
        BlockModel.regiestModel("BlackBlock", model)

        EventCenter.on(EventType.BlackBlockState, this.onStateChange, this);

        this.lookAround();
        this.range();

    }

    onStateChange(state: BlockState) {
        switch(state) {
            case BlockState.Stand:
                this.lbState.string = "发呆"
                break;
            case BlockState.Attack:
                this.lbState.string = "攻击";
                break;
            break;
        }
    }

    onAttack() {

    }

    onStand() {

    }

    onPatrol() {

    }

    onDodge() {

    }

    private async lookAround() {
        cc.Tween.stopAllByTarget(this.ndBody);
        await CocosHelper.runTweenSync(this.ndBody, cc.tween().by(3, {angle: 90}));
    }

    public range() {
        let len = 300;
        let range = Math.PI * 1/3;
        let x = Math.cos(range/2) * len;
        let y = Math.sin(range/2) * len;

    
        this.graphics.moveTo(0, 0);    
        this.graphics.lineTo(x, -y);

        this.graphics.arc(0, 0, len, range/2, -range/2, false);

        this.graphics.lineTo(0, 0);

        
        this.graphics.fill();
    
    }




}


/**
 * 行为树 的结点 通过事件 向ui层发送消息, 例如: 攻击, 逃跑, 巡逻
 * 结点需要 通过输入的消息得到输出的消息
 * 
 * 输入的消息 包括内部的和外部的, 归根结底, 行为树就是根据当前情况, 得出一个结果, 例如之前写的 当玩家进入敌人一定范围后, 敌人开始警戒
 * 这里的玩家位置就是外部数据, 而自己的位置就是内部数据, 根据这两个位置计算得到玩家与敌人的距离, 最终得出 敌人警戒的结果
 * 
 * 内部数据 我们可以在初始化 行为树的传入
 * 那么如何优雅的获得到需要的外部数据 才是重点
 * 
 * 方案一: 将所有的数据放入同一块黑板内, 通过标签或id 获得 (黑板表示共享数据中心)
 * 
 * 
 * 那么树要不要 继承component呢
 * 
 * 
 */
