const {ccclass, property} = cc._decorator;

export enum PropEmum {
    Position,
    Rotation,
    Scale,
    Anchor,
    Size,
    Color,
    Opacity,
    Slew
}

cc['PropEmum'] = PropEmum;

@ccclass
export default class PropSelector extends cc.Component {

    @property({tooltip: "控制器的名称"})
    ctrlId: string = "";                // 控制器的名称
    // 被控制的属性
    @property({type: [cc.Enum(PropEmum)], tooltip: "被控制的属性"})               
    props: PropEmum[] = [];    

    start () {
        
    }

    // update (dt) {} 
}
