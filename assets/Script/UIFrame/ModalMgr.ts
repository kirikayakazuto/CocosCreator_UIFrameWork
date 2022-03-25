import * as cc from "cc";

import { ModalOpacity, SysDefine } from "./config/SysDefine";
import UIModalScript from "./UIModalScript";
import { ModalType } from "./Struct";
import { UIWindow } from "./UIForm";

/**
 * 遮罩管理
 */
const {ccclass, property} = cc._decorator;

@ccclass("ModalMgr")
export default class ModalMgr extends cc.Component {
    public static popUpRoot = SysDefine.SYS_UIROOT_NAME + '/' + SysDefine.SYS_POPUP_NODE;
    public static _inst: ModalMgr | null = null;
    public static get inst() {
        if(this._inst == null) {
            this._inst = new ModalMgr();

            let node = new cc.Node("UIModalNode");
            let rootNode = cc.find(ModalMgr.popUpRoot);
            if(rootNode) rootNode.addChild(node);
            this._inst.uiModal = node.addComponent(UIModalScript);
            this._inst.uiModal.init();
            this._inst.PopUpRoot = cc.find(ModalMgr.popUpRoot);
        }
        return this._inst;
    }

    private uiModal:UIModalScript | null = null;
    private PopUpRoot: cc.Node | null = null;;

    /** 为mask添加颜色 */
    private async showModal(maskType: ModalType) {
        if(!this.uiModal) return ;
        await this.uiModal.showModal(maskType.opacity, maskType.easingTime, maskType.isEasing);
    }

    public checkModalWindow(coms: UIWindow[]) {
        if(!this.uiModal || !this.PopUpRoot) return ;
        if(coms.length <= 0) {
            this.uiModal.node.active = false;
            return ;
        }
        this.uiModal.node.active = true;
        if(this.uiModal.node.parent) {
            this.uiModal.node.removeFromParent();
        }
        for(let i=coms.length-1; i>=0; i--) {
            if(coms[i].modalType.opacity > 0) {
                this.PopUpRoot.insertChild(this.uiModal.node, Math.max(coms[i].node.getSiblingIndex()-1, 0));
                this.uiModal.fid = coms[i].fid;
                this.showModal(coms[i].modalType);
                break;
            }
        }
        
    }


}

