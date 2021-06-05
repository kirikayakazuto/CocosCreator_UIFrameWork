import UISetting_Auto from "../AutoScripts/UISetting_Auto";
import AdapterMgr from "../UIFrame/AdapterMgr";
import CocosHelper from "../UIFrame/CocosHelper";
import { ModalOpacity } from "../UIFrame/config/SysDefine";
import SceneMgr from "../UIFrame/SceneMgr";
import { ModalType } from "../UIFrame/Struct";
import { UIWindow } from "../UIFrame/UIForm";
import WindowMgr from "../UIFrame/WindowMgr";
import UICapture from "./UICapture";
import UIMobx from "./UIMobx";
import UIPop from "./UIPop";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UISetting extends UIWindow {
    willDestory = true;
    static prefabPath = "Forms/Windows/UISetting";
    view: UISetting_Auto;

    modalType = new ModalType(ModalOpacity.OpacityHalf, true);

    // onLoad () {}

    start () {

        this.view.Pop.addClick(() => {
            WindowMgr.open(UIPop.prefabPath);
        }, this);

        this.view.Mobx.addClick(() => {
            WindowMgr.open(UIMobx.prefabPath);
        }, this);

        this.view.Capture.addClick(() => {
            SceneMgr.open(UICapture.prefabPath);
        }, this);
    }

    async showEffect() {
        let len = AdapterMgr.inst.visibleSize.height/2 + 300;
        this.node.y = len;
        await CocosHelper.runTweenSync(this.node, cc.tween().to(0.5, {y: 0}, cc.easeBackOut()));
    }

    async hideEffect() {
        let len = AdapterMgr.inst.visibleSize.height/2 + 300;
        this.node.y = 0;
        await CocosHelper.runTweenSync(this.node, cc.tween().to(0.3, {y: len}, cc.easeBackIn()));
    }

    // update (dt) {}
}
