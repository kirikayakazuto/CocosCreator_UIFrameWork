import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormType, UIFormLucenyType, UIFormShowMode } from "../UIFrame/config/SysDefine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Maker_UIForm extends BaseUIForm {

    @property(cc.Node)
    CloseBtn: cc.Node = null;
    @property(cc.Node)
    BtnTicket: cc.Node = null;
    @property(cc.Node)
    BtnShoe: cc.Node = null;
    @property(cc.Node)
    BtnCloth: cc.Node = null;

    onLoad() {
        this.CurrentUIType.UIForms_Type = UIFormType.PopUp;
        this.CurrentUIType.UIForm_LucencyType = UIFormLucenyType.Translucence;
        this.CurrentUIType.UIForms_ShowMode = UIFormShowMode.ReverseChange;

        this.CloseBtn.on('click', () => {
            this.CloseUIForm();
        }, this);

        this.BtnTicket.on('click', () => {
            
        }, this);

        this.BtnShoe.on('click', () => {

        }, this);

        this.BtnCloth.on('click', () => {

        }, this);
    }

}
