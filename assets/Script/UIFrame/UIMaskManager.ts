import { UIFormLucenyType, SysDefine } from "./config/SysDefine";
import UIManager from "./UIManager";
import UIMaskScript from "./UIMaskScript";
import BaseUIForm from "./BaseUIForm";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIMaskManager extends cc.Component {

    static instance: UIMaskManager = null;

    static getInstance() {
        if(this.instance == null) {
            this.instance = cc.find(SysDefine.SYS_UIMASK_NAME).addComponent<UIMaskManager>(this);
        }
        return this.instance;
    }

    public addMaskWindow(parent: cc.Node, lucenyType: number) {
        if(parent.getChildByName("UIMaskNode")) {
            return ;
        }
        
        let uiMaskScript = new cc.Node("UIMaskNode").addComponent(UIMaskScript);

        uiMaskScript.init(parent.getComponent(BaseUIForm).UIFormName);
        uiMaskScript.showMaskUI(lucenyType);

        
        parent.addChild(uiMaskScript.node, -1);
    }

    public removeMaskWindow(parent: cc.Node) {
        let node = parent.getChildByName("UIMaskNode");
        if(node) {
            node.removeFromParent();
        }
    }

    /**
     * 点击阴影部分
     * 关闭弹窗
     */
    private _clickMaskWindow() {
        UIManager.GetInstance().CloseStackTopUIForm();
    }

}