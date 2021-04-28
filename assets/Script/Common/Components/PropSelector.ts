const {ccclass, executeInEditMode, property} = cc._decorator;

export enum PropEmum {
    Active,
    Position,
    Rotation,
    Scale,
    Anchor,
    Size,
    Color,
    Opacity,
    Slew,

    Label_String,
}

cc['PropEmum'] = PropEmum;

const ControllerId = cc.Enum({});

@ccclass
@executeInEditMode
export default class PropSelector extends cc.Component {

    @property({type: ControllerId, tooltip: "控制器的名称"})
    ctrlId = 0;
    // 被控制的属性
    @property({type: [cc.Enum(PropEmum)], tooltip: "被控制的属性"})               
    props: PropEmum[] = [];    

    onLoad() {
        
    }

    start () {
        
    }

    // update (dt) {} 
}
