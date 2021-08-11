import { UIScreen } from "../UIFrame/UIForm";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIScrollTexture extends UIScreen {

    @property(cc.Sprite) spTexture: cc.Sprite = null;


    // onLoad () {}

    start () {

    }

    private turn = 1;
    private progress = 0;
    update (dt) {
        this.progress += dt * this.turn * 0.2;
        this.spTexture.getMaterial(0).setProperty('progress', this.progress);
        if(this.progress >= 1) {
            this.turn = -1;
        }
        if(this.progress <= 0) {
            this.turn = 1;
        }
    }
}
