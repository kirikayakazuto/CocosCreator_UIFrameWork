import UIMobx_Auto from "../AutoScripts/UIMobx_Auto";
import { computed, makeAutoObservable } from "../Common/Mobx/mobx";
import { autorun } from "../Common/Mobx/mobx";
import { observable } from "../Common/Mobx/mobx";
import { UIScreen } from "../UIFrame/UIForm";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIMobx extends UIScreen {

    static prefabPath = "Forms/Screen/UIMobx"

    view: UIMobx_Auto;

    constructor() {
        super();
        // mobx6版本中使用注解必须调用此方法
        makeAutoObservable(this);
    }
    
    @observable
    obj = 1;

    // onLoad () {}

    start () {
        
        
    }

    onShow() {
        autorun(() => this.view.A.string = this.obj + "");
    }

    // update (dt) {}
}
