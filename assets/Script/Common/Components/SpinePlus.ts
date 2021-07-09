
const {ccclass, property, executeInEditMode, menu, help, inspector} = cc._decorator;
@ccclass
@menu('i18n:MAIN_MENU.component.ui/SpinePlus')
@executeInEditMode
@help('app://docs/html/components/spine.html')
@inspector('packages://custom-inspector/inspector/spine.js')
export default class SpinePlus extends sp.Skeleton {

    @property({override: true, visible: true})
    paused = false;


    // onLoad () {}

    start () {
        
    }

    update (dt: number) {
        if(!CC_EDITOR) {
            super.update(dt);
            return ;
        }
        if (this.paused) return;
        //@ts-ignore
        cc.engine._animatingInEditMode = 1;
        //@ts-ignore
        cc.engine.animatingInEditMode = 1;
        //@ts-ignore
        dt *= this.timeScale * sp.timeScale;
        // @ts-ignore
        this._updateRealtime(dt);
    }
}