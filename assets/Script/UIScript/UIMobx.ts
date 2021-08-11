import UIMobx_Auto from "../AutoScripts/UIMobx_Auto";
import { observable, computed, reaction, autorun, when, IReactionPublic, makeAutoObservable } from "../Common/Mobx/mobx";
import { UIWindow } from "../UIFrame/UIForm";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIMobx extends UIWindow {


    view: UIMobx_Auto;

    constructor() {
        super();
        // mobx6版本中使用注解必须调用此方法
        makeAutoObservable(this);
    }
    
    @observable num1 = 0;
    @observable num2 = 0;
    @computed get total() {
        return this.num1 * this.num2;
    }
    @observable obj = {num3: 0};

    refreshView() {
        this.view.Txt1.string = '' + this.num1;
        this.view.Txt2.string = '' + this.num2;
        this.view.Txt3.string = '' + this.total;
    }

    // onLoad () {}

    start () {
        this.view.Close.addClick(() => {
            this.closeSelf();
        }, this);
        autorun(this.refreshView.bind(this));
        
        when(() => this.total > 10).then(() => {
            this.view.Txt4.node.active = this.total > 10;
        });

        reaction((() => this.obj && this.obj.num3), (arg: any, prev: number, r: IReactionPublic) => {
            if(!cc.isValid(this.node)) return ;
            this.view.Txt5.string = '' + arg;
            // r.dispose();
        });

        this.view.Btn1.addClick(() => {
            this.num1 ++;
        }, this);
        this.view.Btn2.addClick(() => {
            this.num2 ++;
        }, this);

        this.view.Btn3.addClick(() => {
            this.obj.num3 ++;
        }, this);
        
    }

    
    

    

    onShow() {
        
    }


}
