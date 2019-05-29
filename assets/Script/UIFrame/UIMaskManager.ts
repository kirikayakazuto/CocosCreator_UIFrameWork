import { UIFormLucenyType } from "./config/SysDefine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIMaskManager extends cc.Component {
    static instance: UIMaskManager = null;
    public canClose = false;                // 是否可以关闭改弹窗

    static GetInstance() {
        if(this.instance == null) {
            this.instance = new cc.Node("UIMaskManager").addComponent(this);
            this.instance.node.height = 1000;
            this.instance.node.width = 1000;
            this.instance.addComponent(cc.Graphics);
            this.instance.addComponent(cc.Button);
            this.instance.node.on('click', this.instance._clickMaskWindow, this.instance);
        }
        return this.instance;
    }

    public SetMaskWindow(parent: cc.Node, lucenyType: number) {
        
        switch (lucenyType) {
            case UIFormLucenyType.Lucency:    
                this.canClose = false;
                this.node.active = true;
                this.getComponent(cc.Graphics).fillColor = cc.color(0, 0, 0, 0);
                this.getComponent(cc.Graphics).fillRect(-this.node.width/2, -this.node.height/2, 1000, 1000);
                
            break;
            case UIFormLucenyType.Translucence:    
                this.canClose = true;
                this.node.active = true;
                this.getComponent(cc.Graphics).fillColor = cc.color(0, 0, 0, 126);
                this.getComponent(cc.Graphics).fillRect(-this.node.width/2, -this.node.height/2, 1000, 1000);
                
            break;
            case UIFormLucenyType.ImPenetrable:    
                this.canClose = true;
                this.node.active = true;
                this.getComponent(cc.Graphics).fillColor = cc.color(0, 0, 0, 63);
                this.getComponent(cc.Graphics).fillRect(-this.node.width/2, -this.node.height/2, 1000, 1000);
            break;
            case UIFormLucenyType.Pentrate:    
                this.canClose = false;
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

    /**
     * 点击阴影部分
     * 关闭弹窗
     */
    private _clickMaskWindow() {
        if(!this.canClose) return ;

        
    }

}