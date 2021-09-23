import { ScrollViewElementProxy, ScrollViewHelper } from "../Common/Components/ScrollViewHelper";
import { ModalOpacity } from "../UIFrame/config/SysDefine";
import { ModalType } from "../UIFrame/Struct";
import { UIWindow } from "../UIFrame/UIForm";

const {ccclass, property} = cc._decorator;

export class ScrollPlusProxy extends ScrollViewElementProxy {
    lab: number;
}

@ccclass
export default class UIScrollPlus extends UIWindow {

    @property(ScrollViewHelper) scrollHelper: ScrollViewHelper = null;

    @property(cc.Prefab) pfItem: cc.Prefab = null;

    modalType = new ModalType(ModalOpacity.OpacityHalf, true)
    
    private _nodePool = new cc.NodePool();
    // onLoad () {}

    start () {
        this.layoutItems();

        this.scrollHelper.onAllocUI = (proxy: ScrollPlusProxy) => {
            let ui = this._nodePool.get() || cc.instantiate(this.pfItem)
            proxy.ui = ui;
            ui.parent = this.scrollHelper.scrollView.content;
            ui.setPosition(proxy.region.x, proxy.region.y);
            proxy.ui.getChildByName('lab').getComponent(cc.Label).string = '' + proxy.lab;
        }
        this.scrollHelper.onFreeUI = (proxy: ScrollViewElementProxy) => {
            this._nodePool.put(proxy.ui);
            proxy.ui = null;
        }
        this.scrollHelper.isUIPooled = () => {
            return this._nodePool.size() > 0;
        }
        this.scrollHelper.checkUI();
    }



    private layoutItems() {
        let d = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        this.scrollHelper.clearData();
        let ypos = 0;
        for(let i=0; i<d.length; i++) {
            let proxy = new ScrollPlusProxy();
            proxy.lab = d[i];
            proxy.region = cc.rect(-this.pfItem.data.width/2, ypos-this.pfItem.data.height, this.pfItem.data.width, this.pfItem.data.height);
            this.scrollHelper.addData(proxy);
            ypos -= this.pfItem.data.height + 10;
        }
        this.scrollHelper.scrollView.content.height = (this.pfItem.data.height + 10) * d.length;
    }

    // update (dt) {}
}
