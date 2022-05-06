import UIPop_Auto from "../AutoScripts/UIPop_Auto";
import CocosHelper from "../UIFrame/CocosHelper";
import { ModalOpacity } from "../UIFrame/config/SysDefine";
import { ModalType } from "../UIFrame/Struct";
import { UIWindow } from "../UIFrame/UIForm";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIPop extends UIWindow {

    modalType: ModalType = new ModalType(ModalOpacity.OpacityHalf);

    view: UIPop_Auto;

    // onLoad () {}

    start () {
        this.view.Close.addClick(() => {
            this.closeSelf();
        }, this);
    }


    // update (dt) {}
}
