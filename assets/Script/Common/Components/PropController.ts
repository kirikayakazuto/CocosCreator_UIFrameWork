
const {ccclass, property} = cc._decorator;

export enum PropertyType {
    None,
    Label,

}

@ccclass("Controller")
export class Controller {
    @property(cc.String)
    name: string = "";

    @property(cc.Integer)
    type: number = 0;

    @property([cc.String])
    types: string[] = [];

}

@ccclass
export default class PropController extends cc.Component {


    @property([Controller])
    controllers: Controller[] = [];

    @property(cc.JsonAsset)
    propertyJson: cc.JsonAsset = null;

    // onLoad () {}

    start () {
        
    }

    getController(name: string) {
        for(const e of this.controllers) {
            if(e.name !== name) continue;
            return e;
        }
        return null;
    }

    /** 
     * 1, 找到对应的json文件
     * 2, 
     */
    public doControl(name: string, type: string | number) {
        
    }
    

    // update (dt) {}
}
