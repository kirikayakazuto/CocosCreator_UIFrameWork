
import { SysDefine } from "./config/SysDefine";
import UIModalScript from "./UIModalScript";
import UIBase from "./UIBase";
import { MaskType } from "./FrameType";

/**
 * 遮罩管理
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class UIModalMgr extends cc.Component {
    public static popUpRoot: cc.Node = null;
    public static _inst: UIModalMgr = null;
    public static get inst() {
        if(this._inst == null) {
            this._inst = cc.find(SysDefine.SYS_UIMODAL_NAME).addComponent<UIModalMgr>(this);
            UIModalMgr.inst.uiModal = new cc.Node("UIModalNode").addComponent(UIModalScript);
            UIModalMgr.inst.uiModal.init();
            this.popUpRoot = cc.find(SysDefine.SYS_UIROOT_NAME + '/' + SysDefine.SYS_POPUP_NODE);
        }
        return this._inst;
    }
    private uiModal:UIModalScript = null;

    /** 为mask添加颜色 */
    private async showModal(maskType: MaskType) {
        await this.uiModal.showModal(maskType.opacity, maskType.easingTime, maskType.isEasing);
    }

    public checkModalWindow(uiBases: UIBase[]) {
        if(this.uiModal.node.parent) {
            this.uiModal.node.removeFromParent();
        }
        for(let i=uiBases.length-1; i>=0; i--) {
            if(uiBases[i].maskType.opacity > 0) {
                UIModalMgr.popUpRoot.addChild(this.uiModal.node, Math.max(uiBases[i].node.zIndex-1, 0));
                this.uiModal.uid = uiBases[i].uid;
                this.showModal(uiBases[i].maskType);
                break;
            }
        }
        if(!this.uiModal.node.parent) {
            this.uiModal.node.opacity = 0;
        }
    }
}