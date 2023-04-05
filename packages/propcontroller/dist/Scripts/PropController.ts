import PropSelector, { PropEmum } from "./PropSelector";

export enum NodePathType {
    Name,
    SiblingIndex,
}
cc['NodePathType'] = NodePathType;

const {ccclass, executeInEditMode, menu, inspector, property} = cc._decorator;

@ccclass
@executeInEditMode
@menu('i18n:状态控制/PropController')
@inspector('packages://propcontroller/dist/inspector.js')
export default class PropController extends cc.Component {

    @property({type: cc.Enum(NodePathType), tooltip: "Name: 根据node name保存, SiblingIndex: 根据node 在children的index保存"})
    nodePathType = NodePathType.SiblingIndex;

    @property({tooltip: "是否启用控制器"})
    open = true;
    
    @property({serializable: true})
    _uid = "";
    @property
    get uid() {
        return this._uid;
    }
    set uid(val: string) {
        this._uid = val;
        this._refreshIdEnum();
    }
    
    @property({type: cc.Enum({})})
    _state = 0;
    @property({type: cc.Enum({})})
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
        this._refresh();
    }

    @property()
    propertyJson = '';

    onLoad () {
        this.open = false;
        this._refresh();
        this._refreshIdEnum();
    }

    start () {}

    public doControl(type: string | number) {
        let t = type;
        let ctrl = JSON.parse(this.propertyJson);

        let map = ctrl[t];      
        for(const path in map) {
            let paths = path.split(":");
            let node: cc.Node = null;
            switch(+paths[0]) {
                case NodePathType.Name:
                    node = cc.find(paths[1], this.node);
                    break;
                case NodePathType.SiblingIndex:
                    node = this._getNodeBySiblingIndex(paths[1], this.node);
                    break;
            }
            if(!node) { cc.warn("find node faild, path:", path); continue;}
            let nodeProps = map[path];
            for(const key in nodeProps) {  
                let func = _localSetFunc[key];
                if(!func) continue;
                func(node, nodeProps[key])
            }
        }
    }

    private _getNodeBySiblingIndex(path: string, node: cc.Node) {
        path = (path[0] == '/') ? path.substring(1) : path;
        for(const e of path.split("/")) {
            node = node.children[+e];
        }
        return node;
    }

    private _refresh() {
        if(CC_EDITOR) {
            let array = this._states.map((val, i) => {
                return {name: val, value: i};
            });
            //@ts-ignore
            cc.Class.Attr.setClassAttr(this, 'state', 'enumList', array);
            //@ts-ignore
            // Editor.Utils.refreshSelectedInspector('node', this.node.uuid);
        }
    }

    private _refreshIdEnum() {
        if(CC_EDITOR) {
            let coms = this.node.getComponents(PropController);
            let array = coms.map((val, i) => { 
                return {name: val.uid, value: i};
            });
            //@ts-ignore
            cc.Class.Attr.setClassAttr(PropSelector, 'ctrlId', 'enumList', array);
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
function _setSpriteTexture(node: cc.Node, prop: any) {
    let url = prop.url ?? "";
    let uuid = prop.uuid ?? "";
    if(url.includes("resources")) {
        url = url.replace("resources/", "");
        url = url.split('.')[0];
    }
    if(CC_EDITOR) {
        cc.assetManager.loadAny({uuid: uuid}, (error, data) => {        
            if(error) {
                Editor.warn('PropController  load sprite texture faild', prop, error);
                return ;
            };
            node.getComponent(cc.Sprite).spriteFrame = data;
        });
        return;
    }

    cc.resources.load<cc.Texture2D>(url, cc.Texture2D, (error, data: cc.Texture2D) => {        
        if(error) {
            Editor.warn('PropController  load sprite texture faild', url, error);
            return ;
        };
        node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(data);
    });
    
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
_regiestSetFunction(PropEmum.Sprite_Texture, _setSpriteTexture);
