import UIBase from "../UIFrame/UIBase";
import { FormType, ModalOpacity } from "../UIFrame/config/SysDefine";
import { ModalType } from "../UIFrame/Struct";
import { UIWindow } from "../UIFrame/UIForm";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIHallSetting2 extends UIWindow {
    
    static prefabPath = "UIForms/UIHallSetting2";
    modalType = new ModalType(ModalOpacity.OpacityHalf, false);

    public start() {

    }

    onClickYes() {
        this._cb(true);
        this.closeSelf();
    }

    onClickNo() {
        this._cb(false);
        this.closeSelf();
    }


}