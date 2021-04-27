import PropSelector, { PropEmum } from "./PropSelector";

const {ccclass, executeInEditMode, property} = cc._decorator;

const ControllerType = cc.Enum({});
@ccclass
@executeInEditMode
export default class PropController extends cc.Component {

    @property({tooltip: "是否启用控制器"})
    open = true;
    

    _uid = "";
    @property
    get uid() {
        return this._uid;
    }
    set uid(val: string) {
        this._uid = val;

        if(cc.isValid(this.node)) {
            let coms = this.node.getComponents(PropController);
            let array = coms.map((val, i) => { 
                return {name: val.uid, value: i};
            });
            //@ts-ignore
            cc.Class.Attr.setClassAttr(PropSelector, 'ctrlId', 'enumList', array);
        }
    }
    
    _state = 0;
    @property({type: ControllerType})
    get state() {
        return this._state;
    }
    set state(val: number) {
        this._state = val;
        this.doControl(val);
    }

    @property
    _states: string[] = [];
    @property([cc.String])
    get states() {
        return this._states;
    }
    set states(states: string[]) {
        this._states = states;
        let array = states.map((val, i) => {
            return {name: val, value: i};
        })
        //@ts-ignore
        cc.Class.Attr.setClassAttr(PropController, 'state', 'enumList', array);
    }

    @property(cc.JsonAsset)
    propertyJson: cc.JsonAsset = null;

    onLoad () {
        let array = this._states.map((val, i) => {
            return {name: val, value: i};
        });
        //@ts-ignore
        cc.Class.Attr.setClassAttr(PropController, 'state', 'enumList', array);
    }

    start () {}

    public doControl(type: string | number) {
        let t = type;
        if(typeof type == "string") {
            t = this.states[type];
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
    node.color = new cc.Color(prop.r, prop.g, prop.b);
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
function _setActive(node: cc.Node, prop: any) {
    node.active = prop;
}
function _setLabelString(node: cc.Node, prop: any) {
    node.getComponent(cc.Label).string = prop;
}

const _localSetFunc: {[key: number]: (node: cc.Node, prop: any) => void} = {};
function _regiestSetFunction(id: number, func: (node: cc.Node, prop: any) => void) {
    if(_localSetFunc[id]) {
        cc.warn("");
    }
    _localSetFunc[id] = func;
}

_regiestSetFunction(PropEmum.Active, _setActive);
_regiestSetFunction(PropEmum.Position, _setPosition);
_regiestSetFunction(PropEmum.Color, _setColor);
_regiestSetFunction(PropEmum.Scale, _setSacle);
_regiestSetFunction(PropEmum.Rotation, _setRotation);
_regiestSetFunction(PropEmum.Opacity, _setOpacity);
_regiestSetFunction(PropEmum.Slew, _setSlew);
_regiestSetFunction(PropEmum.Size, _setSize);
_regiestSetFunction(PropEmum.Anchor, _setAnchor);
_regiestSetFunction(PropEmum.Label_String, _setLabelString);
