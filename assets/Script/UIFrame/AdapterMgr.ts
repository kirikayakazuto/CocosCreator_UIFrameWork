/**
 * @Author: 邓朗 
 * @Date: 2019-06-12 17:18:04  
 * @Describe: 适配组件, 主要适配背景大小,窗体的位置
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class AdapterMgr {

    private static _instance: AdapterMgr = null;                     // 单例
    public static get inst() {
        if(this._instance == null) {
            this._instance = new AdapterMgr();       
            this._instance.visibleSize = cc.view.getVisibleSize();
            console.log(`visiable size: ${this._instance.visibleSize}`);
        }
        return this._instance;
    }
    
    /** 屏幕尺寸 */
    public visibleSize: cc.Size;

    /**
     * 适配靠边的UI
     * @param type 
     * @param node 
     * @param distance 
     */
    public adapatByType(type: AdaptaterType, node: cc.Node, distance?: number) {
        let widget = node.getComponent(cc.Widget);
        if(!widget) {
            widget = node.addComponent(cc.Widget);
        }
        switch(type) {
            case AdaptaterType.Top:
                if(cc.sys.platform === cc.sys.WECHAT_GAME) {     // 微信小游戏适配刘海屏
                    let menuInfo = window["wx"].getMenuButtonBoundingClientRect();
                    let systemInfo = window["wx"].getSystemInfoSync();
                    distance = cc.find("Canvas").height * (menuInfo.top / systemInfo.screenHeight);
                }
                widget.top = distance ? distance : 0;
                widget.isAbsoluteTop = true;
                widget.isAlignTop = true;
            break;
            case AdaptaterType.Bottom:
                widget.bottom = distance ? distance : 0;
                widget.isAbsoluteBottom = true;
                widget.isAlignBottom = true;
            break;
            case AdaptaterType.Left:
                widget.left = distance ? distance : 0;
                widget.isAbsoluteLeft = true;
                widget.isAlignLeft = true;
            break;
            case AdaptaterType.Right:
                widget.right = distance ? distance : 0;
                widget.isAbsoluteRight = true;
                widget.isAlignRight = true;
            break;
            case AdaptaterType.FullScreen:
                widget.right = 0;
                widget.left = 0;
                widget.top = 0;
                widget.bottom = 0;
                widget.isAlignLeft = true;
                widget.isAlignRight = true;
                widget.isAlignBottom = true;
                widget.isAlignTop = true;
            break;
        }
        widget.target = cc.find("Canvas");
        widget.updateAlignment();
    }
    /** 移除 */
    removeAdaptater(node: cc.Node) {
        if(node.getComponent(cc.Widget)) {
            node.removeComponent(cc.Widget);
        }
    }
}
/**  */
export enum AdaptaterType {
    Center = 0,
    Top = 1,
    Bottom = 2,
    Left = 3,
    Right = 4,
    FullScreen = 5,
}
