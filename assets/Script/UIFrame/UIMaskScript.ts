import UIManager from "./UIManager";
import { UIFormLucenyType } from "./config/SysDefine";

/**
 * @Author: 邓朗 
 * @Describe: mask设置
 * @Date: 2019-05-30 23:35:26  
 * @Last Modified time: 2019-05-30 23:35:26 
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class UIMaskScript extends cc.Component {

    UIFormName: string;

    /**
     * 初始化
     */
    public async init(texture: cc.Texture2D) {
        let maskTexture = texture;
        let size = cc.view.getVisibleSize();
        this.node.height = size.height;
        this.node.width = size.width;
        this.node.addComponent(cc.Button);
        this.node.on('click', this._clickMaskWindow, this);
        
        let sprite = this.node.addComponent(cc.Sprite)
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        sprite.spriteFrame = new cc.SpriteFrame(maskTexture);
        this.node.color = new cc.Color(0, 0, 0);
        this.node.opacity = 0;
        this.node.active = true;
    }
    /** 使用 */
    reUse(uiFormName: string) {
        this.UIFormName = uiFormName;
    }
    /** 释放 */
    unUse() {
        this.UIFormName = "";
        this.node.opacity = 0;
        this.node.active = true;
        cc.tween(this.node).stop();
    }
    // 
    public showMaskUI(lucenyType: number, time: number = 0.6, isEasing: boolean = true) {
        let o = 0;
        switch (lucenyType) {
            case UIFormLucenyType.Lucency:   
                o = 0;
            break;
            case UIFormLucenyType.ImPenetrable:    
                o = 63;
            break;
            case UIFormLucenyType.Translucence:   
                o = 126;
            break;
            case UIFormLucenyType.Pentrate:    
                this.node.active = false;
            break;        
        }
        if(isEasing) {
            cc.tween(this.node)
            .to(time, {opacity: o})
            .start();
        }else {
            this.node.opacity = o;
        }
    }
    

    public _clickMaskWindow() {
        UIManager.GetInstance().CloseStackTopUIForm();
    }
}