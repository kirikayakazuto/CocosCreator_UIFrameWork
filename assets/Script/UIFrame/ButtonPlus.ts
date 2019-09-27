import SoundManager from "./SoundManager";

const {ccclass, property, executeInEditMode, menu, help, inspector} = cc._decorator;
@ccclass
@menu('i18n:MAIN_MENU.component.ui/Button')
@executeInEditMode
@help('i18n:COMPONENT.help_url.button')
@inspector('packages://helloworld/inspector.js')
export default class ButtonPlus extends cc.Button {

    @property({tooltip:"音效路径", type: '', multiline: true, formerlySerializedAs: '_N$string'})
    audioUrl = '';
    @property({tooltip: "屏蔽连续点击"})
    openContinuous = true;
    @property({tooltip:"屏蔽时间, 单位:秒"})
    continuousTime = 1;

    // 点击
    continuous: boolean = false;
    // 定时器
    _continuousTimer: NodeJS.Timeout = null;
    
    
    onEnable() {
        this.continuous = false;
        super.onEnable();
        if (!CC_EDITOR) {
            // ViewAction.getInstance().runButtonAction(this.action, this.node);
        }
    }
    onDisable() {
        if (this._continuousTimer) {
            clearTimeout(this._continuousTimer);
            this._continuousTimer = null;
        }
        super.onEnable();
    }
    _onTouchEnded(event) {
        if (!this.interactable || !this.enabledInHierarchy) return;
        if (this["_pressed"] &&  !this.continuous) {
            this.continuous = this.openContinuous ? true : false;
            cc.Component.EventHandler.emitEvents(this.clickEvents, event);
            this.node.emit('click', this);
            SoundManager.getInstance().playEffectMusic(this.audioUrl ? cc.url.raw(this.audioUrl): null)
            if (this.openContinuous) {
               this._continuousTimer = setTimeout(function(){
                    this.continuous = false;
                }.bind(this), this.continuousTime * 1000);
            }
        }
        this["_pressed"] = false;
        this["_updateState"]();
        event.stopPropagation();
    }
}