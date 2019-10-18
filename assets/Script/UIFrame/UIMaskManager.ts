
import { UIFormLucenyType, SysDefine } from "./config/SysDefine";
import UIMaskScript from "./UIMaskScript";
import BaseUIForm from "./BaseUIForm";
/**
 * 遮罩管理
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class UIMaskManager extends cc.Component {
    public static instance: UIMaskManager = null;
    public static getInstance() {
        if(this.instance == null) {
            this.instance = cc.find(SysDefine.SYS_UIMASK_NAME).addComponent<UIMaskManager>(this);
        }
        return this.instance;
    }
    private uiMaskScript:UIMaskScript = null;
    maskTexture: cc.Texture2D = null;
    /** 添加mask, 这个时候会阻断点击事件 */
    public addMaskWindow(parent: cc.Node) {
        if(parent.getChildByName("UIMaskNode") || !parent.getComponent(BaseUIForm)) {
            return ;
        }
        this.uiMaskScript = MaskNodePool.getInstance().get(parent, this.getComponent(cc.Sprite).spriteFrame.getTexture());
    }
    /** 为mask添加颜色 */
    public showMask(lucenyType: number, isEasing?: boolean, time?: number) {
        this.uiMaskScript.showMaskUI(lucenyType, time, isEasing);
    }

    /** 去掉mask */
    public removeMaskWindow(parent: cc.Node) {
        MaskNodePool.getInstance().put(parent);
    }
}
/** 结点池 */
export class MaskNodePool {
    public static instance: MaskNodePool = null;
    public static getInstance() {
        if(this.instance == null) {
            this.instance = new MaskNodePool();
        }
        return this.instance;
    }

    private pool: Array<UIMaskScript> = [];

    public init(texture: cc.Texture2D) {
        for(let i=0; i<3; i++) {
            let com = new cc.Node("UIMaskNode").addComponent(UIMaskScript);
            com.init(texture);
            this.pool.push(com);
        }
    }

    /** 释放一个 */
    public get(parent: cc.Node, texture: cc.Texture2D) {
        if(this.pool.length <= 0) {
            this.init(texture);
        }
        let com = this.pool.pop();
        com.reUse(parent.getComponent(BaseUIForm).UIFormName);
        parent.addChild(com.node, -1);
        return com;
    }
    /** 回收结点 */
    public put(parent: cc.Node) {
        let node = parent.getChildByName("UIMaskNode")
        if(!node || !node.getComponent(UIMaskScript)) {
            cc.log("不是对应类型的结点, 无法回收!");
            return false;
        }
        node.removeFromParent();
        let com = node.getComponent(UIMaskScript);
        com.unUse();
        this.pool.push(com);
        return true;
    }
    /** 清除结点池 */
    clear() {
        for(const com of this.pool) {
            com.unUse();
        }
        this.pool = [];
    }

    


}