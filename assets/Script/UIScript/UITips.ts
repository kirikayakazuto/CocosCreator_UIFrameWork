import UITips_Auto from "../AutoScripts/UITips_Auto";
import { ModalOpacity } from "../UIFrame/config/SysDefine";
import { ModalType } from "../UIFrame/Struct";
import { UIWindow } from "../UIFrame/UIForm";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UITips extends UIWindow {

    modalType = new ModalType(ModalOpacity.OpacityHalf, true);

    view: UITips_Auto;
    

    // onLoad () {}

    start () {

    }

    onShow(str: string) {
        this.view.Tips.string = str;
    }

    // update (dt) {}
}
