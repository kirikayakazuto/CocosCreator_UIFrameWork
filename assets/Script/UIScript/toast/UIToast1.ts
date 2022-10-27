import CocosHelper from "../../UIFrame/CocosHelper";
import ToastMgr from "../../UIFrame/ToastMgr";
import { UIToast } from "../../UIFrame/UIForm";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIToast1 extends UIToast {

    start () {

    }

    public use(): void {
        
    }

    public free(): void {
        
    }

    public onShow(params: any): void {
        this.scheduleOnce(() => {
            ToastMgr.close(this);
        }, 0.5);
    }

    public onHide(): void {
        
    }

    public async showEffect(): Promise<void> {
        this.node.scale = 0;
        await CocosHelper.runTweenSync(this.node, cc.tween().to(0.3, {scale: 1}, cc.easeBackOut()));
    }

    public async hideEffect(): Promise<void> {
        await CocosHelper.runTweenSync(this.node, cc.tween().by(0.3, {y: 100}, cc.easeBackOut()));
    }

    // update (dt) {}
}
