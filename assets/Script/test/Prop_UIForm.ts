import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormType, UIFormLucenyType, UIFormShowMode } from "../UIFrame/config/SysDefine";
import GMessageManager from "../UIFrame/GMessageManager";
import UIType from "../UIFrame/UIType";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Prop_UIForm extends BaseUIForm {

    @property(cc.Label)
    title: cc.Label = null;
    @property(cc.Label)
    dist: cc.Label = null;
    @property(cc.Node)
    closeBtn: cc.Node = null;

    CurrentUIType = new UIType(UIFormType.PopUp, UIFormShowMode.ReverseChange, UIFormLucenyType.ImPenetrable);

    init(obj?: any) {
        this.PropMsgReturn(obj);
    }

    onLoad() {
        this.closeBtn.on('click', () => {
            this.CloseUIForm();
        }, this)
    }

    PropMsgReturn(data) {
        this.title.string = data.name;
        this.dist.string = data.dist;
    }
}
