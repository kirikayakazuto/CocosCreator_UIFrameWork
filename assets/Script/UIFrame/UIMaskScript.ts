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

    /** 代码创建一个单色texture */
    private _texture: cc.Texture2D = null;
    private getSingleTexture() {
        if(this._texture) return this._texture;
        let data = new Uint8Array(2 * 2 * 4);
        for(let i=0; i<2; i++) {
            for(let j=0; j<2; j++) {
                data[i*2*4 + j*4+0] = 255;
                data[i*2*4 + j*4+1] = 255;
                data[i*2*4 + j*4+2] = 255;
                data[i*2*4 + j*4+3] = 255;
            }
        }
        let texture = new cc.Texture2D();
        texture.initWithData(data, cc.Texture2D.PixelFormat.RGBA8888, 2, 2);
        texture.handleLoadedTexture();
        this._texture = texture;
        return this._texture;
    }

    /**
     * 初始化
     */
    public async init() {
        let maskTexture = this.getSingleTexture();
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
        UIManager.getInstance().closeStackTopUIForm();
    }
}