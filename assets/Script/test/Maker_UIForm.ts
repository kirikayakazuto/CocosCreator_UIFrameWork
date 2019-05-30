import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormType, UIFormLucenyType, UIFormShowMode } from "../UIFrame/config/SysDefine";

import UIType from "../UIFrame/UIType";

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

    CurrentUIType = new UIType(UIFormType.PopUp, UIFormShowMode.ReverseChange, UIFormLucenyType.ImPenetrable);
    ClickMaskClose = true;
    onLoad() {
        this.CloseBtn.on('click', () => {
            this.CloseUIForm();
        }, this);


        this.BtnTicket.on('click', () => {
            let obj = {
                name: "神杖",
                dist: "神杖详细介绍...",
                buttonPos: this.BtnTicket.position,
            }
            this.ShowUIForm("Prop_UIForm", obj);
        }, this);

        this.BtnShoe.on('click', () => {
            let obj = {
                name: "战靴",
                dist: "战靴详细介绍...",
                buttonPos: this.BtnShoe.position,
            }
            this.ShowUIForm("Prop_UIForm", obj);
        }, this);

        this.BtnCloth.on('click', () => {
            let obj = {
                name: "盔甲",
                dist: "盔甲详细介绍...",
                buttonPos: this.BtnCloth.position,
            }
            this.ShowUIForm("Prop_UIForm", obj);
        }, this);
    }


}
