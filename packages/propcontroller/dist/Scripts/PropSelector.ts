const {ccclass, executeInEditMode, menu, property} = cc._decorator;

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
    Sprite_Texture,
}

cc['PropEmum'] = PropEmum;

const ControllerId = cc.Enum({});

@ccclass
@menu('i18n:状态控制/PropSelector')
@executeInEditMode
export default class PropSelector extends cc.Component {
    
    // @property({type: ControllerId, tooltip: "控制器的名称"})
    // ctrlId = 0;
    
    // 被控制的属性
    @property({type: [cc.Enum(PropEmum)], tooltip: "被控制的属性"})               
    props: PropEmum[] = [];    

    // update (dt) {} 
}
