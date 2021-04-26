import { PropEmum } from "./PropSelector";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PropController extends cc.Component {
    @property(cc.String)
    id: string = "";

    _type: number = 0;
    @property(cc.Integer)
    get type() {
        return this._type;
    }
    set type(val: number) {
        this._type = val;
        this.doControl(val);
    }

    @property([cc.String])
    types: string[] = [];

    @property(cc.JsonAsset)
    propertyJson: cc.JsonAsset = null;

    onLoad () {
        
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
    node.color = cc.Color.fromHEX(node.color, prop.toString(16));
}
function _setSacle(node: cc.Node, prop: any) {
    node.scaleX = prop.scaleX;
    node.scaleY = prop.scaleY;
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