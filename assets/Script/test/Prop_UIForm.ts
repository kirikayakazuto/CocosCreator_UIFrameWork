import BaseUIForm from "../UIFrame/BaseUIForm";
import { UIFormType, UIFormLucenyType, UIFormShowMode } from "../UIFrame/config/SysDefine";
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

    public startPostion: cc.Vec2;
    public endPosition: cc.Vec2;

    
    CurrentUIType = new UIType(UIFormType.PopUp, UIFormShowMode.ReverseChange, UIFormLucenyType.Translucence);
    ClickMaskClose = true;
    
    init(obj?: any) {
        this.title.string = obj.name;
        this.dist.string = obj.dist;
        this.startPostion = obj.buttonPos;
    }

    onLoad() {
        this.closeBtn.on('click', () => {
            this.CloseUIForm();
        }, this)
    }


    ShowPopUpAnimation(callback: Function) {
        this.node.scale = 0;
        this.node.setPosition(this.startPostion);
        cc.tween(this.node)
        .to(0.3, {scale:1, position:cc.v2(0,0)})
        .call(() => {
            // 显示mask
            callback();
        })
        .start();
    }
}
