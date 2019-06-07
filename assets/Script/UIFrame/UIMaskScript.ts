import UIManager from "./UIManager";
import { UIFormLucenyType } from "./config/SysDefine";

/**
 * @Author: 邓朗 
 * @Describe: mask设置
 * @Date: 2019-05-30 23:35:26  
 * @Last Modified time: 2019-05-30 23:35:26 
 */

export default class UIMaskScript extends cc.Component {

    UIFormName: string;
    /**
     * 初始化
     */
    public init(uiFormName: string) {
        this.UIFormName = uiFormName;
        let size = cc.view.getVisibleSize();
        this.node.height = size.height;
        this.node.width = size.width;
        this.node.addComponent(cc.Graphics);
        this.node.addComponent(cc.Button);
        this.node.on('click', this._clickMaskWindow, this);
        this.node.active = true;
    }

    public showMaskUI(lucenyType: number) {
        switch (lucenyType) {
            case UIFormLucenyType.Lucency:    
                this.getComponent(cc.Graphics).fillColor = cc.color(0, 0, 0, 0);
                this.getComponent(cc.Graphics).fillRect(-this.node.width/2, -this.node.height/2, this.node.width, this.node.height);
            break;
            case UIFormLucenyType.Translucence:    
                this.getComponent(cc.Graphics).fillColor = cc.color(0, 0, 0, 126);
                this.getComponent(cc.Graphics).fillRect(-this.node.width/2, -this.node.height/2, this.node.width, this.node.height);
            break;
            case UIFormLucenyType.ImPenetrable:    
                this.getComponent(cc.Graphics).fillColor = cc.color(0, 0, 0, 63);
                this.getComponent(cc.Graphics).fillRect(-this.node.width/2, -this.node.height/2, this.node.width, this.node.height);
            break;
            case UIFormLucenyType.Pentrate:    
                this.node.active = false;
            break;        
        }
    }
    public hideMaskUI() {
        this.getComponent(cc.Graphics).clear();
    }


    public _clickMaskWindow() {
        UIManager.GetInstance().CloseStackTopUIForm();
    }
}