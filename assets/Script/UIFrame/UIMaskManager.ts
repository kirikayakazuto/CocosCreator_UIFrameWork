
import { UIFormLucenyType, SysDefine } from "./config/SysDefine";
import UIManager from "./UIManager";
import UIMaskScript from "./UIMaskScript";
import BaseUIForm from "./BaseUIForm";
/**
 * 遮罩管理
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class UIMaskManager extends cc.Component {

    private uiMaskScript:UIMaskScript = null;
    public static instance: UIMaskManager = null;
    public static getInstance() {
        if(this.instance == null) {
            this.instance = cc.find(SysDefine.SYS_UIMASK_NAME).addComponent<UIMaskManager>(this);
        }
        return this.instance;
    }
    /** 添加mask, 这个时候会阻断点击事件 */
    public addMaskWindow(parent: cc.Node) {
        if(parent.getChildByName("UIMaskNode")) {
            return ;
        }
        
        this.uiMaskScript = new cc.Node("UIMaskNode").addComponent(UIMaskScript);

        this.uiMaskScript.init(parent.getComponent(BaseUIForm).UIFormName);
        

        
        parent.addChild(this.uiMaskScript.node, -1);
    }
    /** 为mask添加颜色 */
    public showMask(lucenyType: number) {
        this.uiMaskScript.showMaskUI(lucenyType);
    }

    /** 去掉mask */
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