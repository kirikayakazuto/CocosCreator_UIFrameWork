import { PropEmum } from "./PropSelector";

const {ccclass, executeInEditMode, property} = cc._decorator;

const ControllerType = cc.Enum({});

@ccclass
@executeInEditMode
export default class PropController extends cc.Component {
    @property(cc.String)
    id: string = "";

    
    _type = 0;
    @property({type: ControllerType})
    get type() {
        return this._type;
    }
    set type(val: number) {
        this._type = val;
        this.doControl(val);
    }

    @property
    _types: string[] = [];
    @property([cc.String])
    get types() {
        return this._types;
    }
    set types(types: string[]) {
        this._types = types;
        let array = types.map((val, i) => {
            return {name: val, value: i};
        })
        //@ts-ignore
        cc.Class.Attr.setClassAttr(PropController, 'type', 'enumList', array);
    }

    @property(cc.JsonAsset)
    propertyJson: cc.JsonAsset = null;

    onLoad () {
        let array = this.types.map((val, i) => {
            return {name: val, value: i};
        })
        //@ts-ignore
        cc.Class.Attr.setClassAttr(PropController, 'type', 'enumList', array);
    }

    start () {
        this.doControl('left');
    }

    public doControl(type: string | number) {
        let t = type;
        if(typeof type == "number") {
            t = this.types[type];
        }

        let ctrl = this.propertyJson.json;

        let map = ctrl[t];        
        for(const path in map) {
            let node = cc.find(path, this.node);
            if(!node) continue;
            let nodeProps = map[path];
            for(const key in nodeProps) {  
                let func = _localSetFunc[key];
                if(!func) continue;

                func(node, nodeProps[key])
            }
        }
    }


    

    // update (dt) {}
}

function _setPosition(node: cc.Node, prop: any) {
    node.setPosition(prop);
}
function _setColor(node: cc.Node, prop: any) {
    node.color.r = prop.r;
    node.color.g = prop.g;
    node.color.b = prop.b;
    node.color.a = prop.a;
}
function _setSacle(node: cc.Node, prop: any) {
    node.scaleX = prop.scaleX;
    node.scaleY = prop.scaleY;
}
function _setRotation(node: cc.Node, prop: any) {
    node.angle = prop;
}
function _setOpacity(node: cc.Node, prop: any) {
    node.opacity = prop;
}
function _setSlew(node: cc.Node, prop: any) {
    node.skewX = prop.skewX;
    node.skewY = prop.skewY;
}
function _setSize(node: cc.Node, prop: any) {
    node.setContentSize(prop);
}
function _setAnchor(node: cc.Node, prop: any) {
    node.anchorX = prop.anchorX;
    node.anchorY = prop.anchorY;
}

const _localSetFunc: {[key: number]: (node: cc.Node, prop: any) => void} = {};
function _regiestSetFunction(id: number, func: (node: cc.Node, prop: any) => void) {
    if(_localSetFunc[id]) {
        cc.warn("");
    }
    _localSetFunc[id] = func;
}

_regiestSetFunction(PropEmum.Position, _setPosition);
_regiestSetFunction(PropEmum.Color, _setColor);
_regiestSetFunction(PropEmum.Scale, _setSacle);
_regiestSetFunction(PropEmum.Rotation, _setRotation);
_regiestSetFunction(PropEmum.Opacity, _setOpacity);
_regiestSetFunction(PropEmum.Slew, _setSlew);
_regiestSetFunction(PropEmum.Size, _setSize);
_regiestSetFunction(PropEmum.Anchor, _setAnchor);




// cc.game.on(cc.game.EVENT_ENGINE_INITED, () => {
//     //@ts-ignore
//     cc.Class.Attr.setClassAttr(ShaderHelper, 'program', 'enumList', array);
// });