import UIBase from "../UIFrame/UIBase";
import CocosHelper from "../UIFrame/CocosHelper";
import { SysDefine } from "../UIFrame/config/SysDefine";
import Scene from "../Scene/Scene";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIToast extends UIBase {
    static async popUp() {
        Scene.inst.setInputBlock(true);
        try {
            let p = await CocosHelper.loadResSync<cc.Prefab>("", cc.Prefab);
            let node = cc.instantiate(p);    
            let parent = cc.find(SysDefine.UI_PATH_ROOT + "/" + SysDefine.SYS_TOPTIPS_NODE);
            if(!parent) return;
            parent.addChild(node);
        } catch (error) {
            Scene.inst.setInputBlock(false);
            return ;
        }
        Scene.inst.setInputBlock(false);
    }
}