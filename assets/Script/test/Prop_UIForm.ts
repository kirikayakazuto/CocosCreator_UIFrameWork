import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormType, UIFormLucenyType, UIFormShowMode } from "../UIFrame/config/SysDefine";
import GMessageManager from "../UIFrame/GMessageManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Prop_UIForm extends BaseUIForm {

    @property(cc.Label)
    title: cc.Label = null;
    @property(cc.Label)
    dist: cc.Label = null;
    @property(cc.Node)
    closeBtn: cc.Node = null;

    onLoad() {
        this.CurrentUIType.UIForms_Type = UIFormType.PopUp;
        this.CurrentUIType.UIForms_ShowMode = UIFormShowMode.ReverseChange;
        this.CurrentUIType.UIForm_LucencyType = UIFormLucenyType.ImPenetrable;
        this.closeBtn.on('click', () => {
            this.CloseUIForm();
        }, this)
        GMessageManager.on("prop", this.PropMsgReturn, this);

    }

    PropMsgReturn(data) {
        this.title.string = data.name;
        this.dist.string = data.dist;
    }
}
