import { StateMachine, StateMachineConfig, StateMachineEventDef } from "../../Common/StateMachine/state-machine";

/** 士兵所有的状态 */
const enum SoldierState {
    None,           // 无
    Idel,           // 发呆
    Patrol,         // 巡逻
    Attack,         // 攻击
    Trace,          // 追踪
}
export default class Soldier implements StateMachineConfig {
    constructor(target: StateMachine) {
        
    }
    /** 默认状态 */
    initial = "Idel";

    /** 事件 */
    events = [
        
    ];

};

/** 警惕 */
const Alert: StateMachineEventDef = {
    name: "Patrol",
    from: "Idel",
    to: "Patrol"
}
/** 发呆 */
const Daze: StateMachineEventDef = {
    name: "Daze",
    from: "Patrol",
    to: "Idel"
}
const Attack: StateMachineEventDef = {
    name: "Attack",
    from: [],
    to: ""
}


