import CameraCapture from "../Common/Components/CameraCapture";
import DrawBorad from "../Common/Components/DrawBorad";
import TouchPlus from "../Common/Components/TouchPlus";
import { FormType } from "../UIFrame/config/SysDefine";
import UIBase from "../UIFrame/UIBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UICapture extends UIBase {

    @property(cc.Sprite)
    sprite: cc.Sprite = null;

    @property(CameraCapture)
    camereCapture: CameraCapture = null;
    @property(DrawBorad)
    drawBorad: DrawBorad = null;
    @property(TouchPlus)
    touchPlus: TouchPlus = null;

    formType = FormType.Screen;
    static prefabPath = "UIForms/UICapture";

    // onLoad () {}

    start () {        
        this.touchPlus.addEvent(null, (e) => {
            let delta = e.getDelta();
            this.touchPlus.node.x += delta.x;
            this.touchPlus.node.y += delta.y;
        });

        this.onClickCapture();
    }

    onClickCapture() {
        let data = this.camereCapture.captureTexture();
        let texture = new cc.Texture2D()
        texture.initWithData(data, cc.Texture2D.PixelFormat.RGBA8888, this.drawBorad.node.width, this.drawBorad.node.height);        
        this.sprite.spriteFrame = new cc.SpriteFrame(texture);        
        this.sprite.spriteFrame.setFlipY(true);
        this.drawBorad.setData(data);
    }

    onClickPen() {
        this.drawBorad.setPen();
    }
    onClickReaser() {
        this.drawBorad.setReaser();
    }

    // update (dt) {}
}
