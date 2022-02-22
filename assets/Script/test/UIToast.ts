import CocosHelper from "../UIFrame/CocosHelper";
import { SysDefine } from "../UIFrame/config/SysDefine";
// import Scene from "../Scene/Scene";

// const {ccclass, property} = cc._decorator;

// @ccclass
// export default class UIToast extends cc.Component {
//     static async popUp(str: string) {
//         Scene.inst.setInputBlock(true);
//         try {
//             let prefab = await CocosHelper.loadResSync<cc.Prefab>("UIToast", cc.Prefab);
//             let node = cc.instantiate(prefab);    
//             let parent = cc.find(SysDefine.SYS_UIROOT_NAME + "/" + SysDefine.SYS_TOPTIPS_NODE);
//             if(!parent) return;
//             parent.addChild(node);
//             let lab = node.getChildByName("label")?.getComponent(cc.Label);
//             if(lab) lab.string = str;
//             node.getComponent(UIToast).showAnim();
//         } catch (error) {
//             Scene.inst.setInputBlock(false);
//             return ;
//         }
//         Scene.inst.setInputBlock(false);
//     }


//     public showAnim() {
//         this.node.y = 0;
//         this.node.opacity = 255;

//         cc.tween(this.node).by(2, {position: cc.v3(0, 80, 0)}).to(0.3, {opacity: 0}).call(() => {
//             this.node.destroy();
//             this.node.removeFromParent();
//         }).start();
//     }


//}