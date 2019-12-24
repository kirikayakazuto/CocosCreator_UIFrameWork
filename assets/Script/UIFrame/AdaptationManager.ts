import { SysDefine } from './config/SysDefine';
/**
 * @Author: 邓朗 
 * @Date: 2019-06-12 17:18:04  
 * @Describe: 适配组件, 主要适配背景大小, fixed类型窗体的位置
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class AdaptationManager extends cc.Component {

    private static _Instance: AdaptationManager = null;                     // 单例
    static GetInstance(): AdaptationManager {
        if(this._Instance == null) {
            this._Instance = cc.find(SysDefine.SYS_UIAdaptation_NAME).addComponent<AdaptationManager>(this);
            cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, () => {
                this._Instance = null;
            });
        }
        return this._Instance;
    }
    
    /** 屏幕尺寸 */
    public VisibleSize: cc.Size;

    onLoad () {
        this.VisibleSize = cc.view.getFrameSize();
        cc.log(`当前屏幕尺寸为${this.VisibleSize}`);
    }

    start () {}
    /**
     * 适配靠边的UI
     * @param type 
     * @param node 
     * @param distance 
     */
    adaptationFormByType(type: AdaptationType, node: cc.Node, distance?: number) {
        let widget = node.getComponent(cc.Widget)
        if(widget){
            cc.log(`已经添加了widget组件`);
        }else {
            widget = node.addComponent(cc.Widget);
        }
        switch(type) {
            case AdaptationType.Top:
                if(cc.sys.platform === cc.sys.WECHAT_GAME) {     // 微信小游戏适配刘海屏
                    let menuInfo = window["wx"].getMenuButtonBoundingClientRect();
                    let systemInfo = window["wx"].getSystemInfoSync();
                    distance = cc.find("Canvas").height * (menuInfo.top / systemInfo.screenHeight);
                }
                widget.top = distance ? distance : 0;
                widget.isAbsoluteTop = true;
                widget.isAlignTop = true;
            break;
            case AdaptationType.Bottom:
                widget.bottom = distance ? distance : 0;
                widget.isAbsoluteBottom = true;
                widget.isAlignBottom = true;
            break;
            case AdaptationType.Left:
                widget.left = distance ? distance : 0;
                widget.isAbsoluteLeft = true;
                widget.isAlignLeft = true;
            break;
            case AdaptationType.Right:
                widget.right = distance ? distance : 0;
                widget.isAbsoluteRight = true;
                widget.isAlignRight = true;
            break;
        }
        widget.target = cc.find("Canvas");
        widget.updateAlignment();
    }
    /** 移除 */
    removeAdaptationToForm(node: cc.Node) {
        if(node.getComponent(cc.Widget)) {
            node.removeComponent(cc.Widget);
        }
    }
}
/**  */
export enum AdaptationType {
    Top = 1,
    Bottom = 2,
    Left = 3,
    Right = 4,
}
