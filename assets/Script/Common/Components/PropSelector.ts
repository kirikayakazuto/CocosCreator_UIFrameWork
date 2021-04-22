const {ccclass, property} = cc._decorator;

@ccclass("Selector")
export class Selector {
    @property(cc.String)
    name: string = "";                // 控制器的名称
    // 被控制的属性
    @property(cc.Boolean)               
    position: boolean = false;    

}

@ccclass
export default class PropSelector extends cc.Component {

    @property({type: [Selector], serializable: true})
    selectors: Selector[] = [];

    start () {

    }

    // update (dt) {}
}
