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


    startPosition: cc.Vec2;

    init(obj: any) {
        this.startPosition = obj.buttonPos;
    }

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
    
    ShowPopUpAnimation(callback: Function) {
        this.node.scale = 0;
        this.node.setPosition(this.startPosition);
        cc.tween(this.node)
        .to(0.3, {scale:1, position:cc.v2(0,0)})
        .call(() => {
            // 显示mask
            callback();
        })
        .start();
    }


}
