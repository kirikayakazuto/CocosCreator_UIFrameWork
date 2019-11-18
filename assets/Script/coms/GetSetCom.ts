const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    private _item: cc.Prefab;
    
    public get item() {
        return this._item;
    }
    public set item(v : cc.Prefab) { 
        this._item = v;
    }
    

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
