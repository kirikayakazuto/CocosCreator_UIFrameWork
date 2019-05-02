import { UIFormLucenyType } from "./config/SysDefine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIMaskManager extends cc.Component {
    static instance: UIMaskManager = null;

    static GetInstance() {
        if(this.instance == null) {
            this.instance = new cc.Node("UIMaskManager").addComponent(this);
            this.instance.node.height = 1000;
            this.instance.node.width = 1000;
            this.instance.addComponent(cc.Graphics);
            this.instance.addComponent(cc.Button);
        }
        return this.instance;
    }


    public SetMaskWindow(parent: cc.Node, lucenyType: number) {
        
        switch (lucenyType) {
            case UIFormLucenyType.Lucency:    
                this.node.active = true;
                this.getComponent(cc.Graphics).fillColor = cc.color(0, 0, 0, 0);
                this.getComponent(cc.Graphics).fillRect(-this.node.width/2, -this.node.height/2, 1000, 1000);
                
            break;
            case UIFormLucenyType.Translucence:    
                this.node.active = true;
                this.getComponent(cc.Graphics).fillColor = cc.color(0, 0, 0, 126);
                this.getComponent(cc.Graphics).fillRect(-this.node.width/2, -this.node.height/2, 1000, 1000);
                
            break;
            case UIFormLucenyType.ImPenetrable:    
                this.node.active = true;
                this.getComponent(cc.Graphics).fillColor = cc.color(0, 0, 0, 63);
                this.getComponent(cc.Graphics).fillRect(-this.node.width/2, -this.node.height/2, 1000, 1000);
            break;
            case UIFormLucenyType.Pentrate:    
                this.node.active = false;
            break;        
        }
        parent.addChild(this.node, -1);
        
    }

    public CancelMaskWindow() {
        this.node.active = false;
        this.node.parent = null;
        this.getComponent(cc.Graphics).clear();
    }

}