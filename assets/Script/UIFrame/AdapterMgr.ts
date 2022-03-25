import * as cc from "cc";

let flagOffset = 0;
const _None = 1 << flagOffset ++;
const _Left = 1 << flagOffset ++;            // 左对齐
const _Right = 1 << flagOffset ++;           // 右对齐
const _Top = 1 << flagOffset ++;             // 上对齐
const _Bottom = 1 << flagOffset ++;          // 下对齐
const _StretchWidth = _Left | _Right;          // 拉伸宽
const _StretchHeight = _Top | _Bottom;         // 拉伸高

const _FullWidth = 1 << flagOffset ++;       // 等比充满宽
const _FullHeight = 1 << flagOffset ++;      // 等比充满高
const _Final = 1 << flagOffset++;

/**  */
export enum AdapterType {
    Top = _Top,
    Bottom = _Bottom,
    Left = _Left,
    Right = _Right,

    StretchWidth = _StretchWidth,
    StretchHeight = _StretchHeight,

    FullWidth = _FullWidth,
    FullHeight = _FullHeight,
}

const {ccclass, property} = cc._decorator;

@ccclass("AdapterMgr")
export default class AdapterMgr {

    private static _instance: AdapterMgr | null = null;                     // 单例
    public static get inst() {
        if(this._instance == null) {
            this._instance = new AdapterMgr();       
            this._instance.visibleSize = cc.view.getVisibleSize();
            console.log(`visiable size: ${this._instance.visibleSize}`);
        }
        return this._instance;
    }
    
    /** 屏幕尺寸 */
    public visibleSize: cc.Size | null = null;;

    public adapteByType(flag: number, node: cc.Node, distance = 0) {
        let tFlag = _Final;
        while (tFlag > 0) {
            if (tFlag & flag)
                this._doAdapte(tFlag, node, distance);
            tFlag = tFlag >> 1;
        }
        let widget = node.getComponent(cc.Widget);
        if(!widget) widget = node.addComponent(cc.Widget);
        widget.target = cc.find("Canvas");
        widget.updateAlignment();
    }

    private _doAdapte(flag: number, node: cc.Node, distance: number = 0) {
        if(!this.visibleSize) return ;
        let widget = node.getComponent(cc.Widget);
        if(!widget) {
            widget = node.addComponent(cc.Widget);
        }
        let trans = node.getComponent(cc.UITransform);
        if(!trans) trans = node.addComponent(cc.UITransform);
        switch(flag) {
            case _None:
                break;
            case _Left:
                widget.isAlignLeft = true;
                widget.isAbsoluteLeft = true;
                widget.left = distance ? distance : 0;
                break;
            case _Right:
                widget.isAlignRight = true;
                widget.isAbsoluteRight = true;
                widget.right = distance ? distance : 0;
                break;
            case _Top:
                // if(cc.sys.platform === cc.sys.WECHAT_GAME) {     // 微信小游戏适配刘海屏
                //     let menuInfo = window["wx"].getMenuButtonBoundingClientRect();
                //     let systemInfo = window["wx"].getSystemInfoSync();
                //     distance += cc.find("Canvas").height * (menuInfo.top / systemInfo.screenHeight);
                // }
                widget.isAlignTop = true;
                widget.isAbsoluteTop = true;
                widget.top = distance ? distance : 0;
                break;
            case _Bottom:
                widget.isAlignBottom = true;
                widget.isAbsoluteBottom = true;
                widget.bottom = distance ? distance : 0;
                break;
            case _FullWidth:
                trans.height /= trans.width / this.visibleSize.width;
                trans.width = this.visibleSize.width;
                break;
            case _FullHeight:
                trans.width /= trans.height / this.visibleSize.height;
                trans.height = this.visibleSize.height;
                break;
        }
    }


    /** 移除 */
    removeAdaptater(node: cc.Node) {
        if(node.getComponent(cc.Widget)) {
            node.removeComponent(cc.Widget);
        }
    }
}
