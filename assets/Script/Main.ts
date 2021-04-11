import UILogin from "./test/UILogin";
import { EventCenter } from "./UIFrame/EventCenter";
import DebugWindowUtil from "./Common/Utils/DebugWindowUtils";
const DIRTY_PROP = cc.RenderFlow.FLAG_OPACITY | cc.RenderFlow.FLAG_WORLD_TRANSFORM;

const {ccclass, property} = cc._decorator;

/** 禁止子节点执行的FLAG */
const BAN_FALG = cc.RenderFlow.FLAG_RENDER | cc.RenderFlow.FLAG_POST_RENDER;

@ccclass
export default class Main extends cc.Component {

    @property(cc.Node)
    ndRoot: cc.Node = null;

    @property(cc.Prefab)
    pfItem: cc.Prefab = null;
    
    onLoad() {
        cc.dynamicAtlasManager.enabled = true;
    }

    start () {
        // TipsMgr.inst.setLoadingForm("UIForms/UILoading");
        // UILogin.openView(1);
        // UITest.openView();
        // UICapture.openView();
        // UIDungeon.openView();
        this.test();
    }

    test() {
    }

    /**
     * 
     */
    onDestroy() {
        cc.log('destory');
    } 
    
}
