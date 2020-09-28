const {ccclass, property} = cc._decorator;
/**
 * dom helper
 * 控制dom元素, 包括处理 生成, 销毁, 显示, 隐藏和位置控制
 */
let domId = 1;
@ccclass
export default class DomHelper extends cc.Component {    
    private id = '';                                    // domId
    private divDom: HTMLDivElement = null;              // dom元素

    onLoad () {
        this.genDomDiv();
    }
    start() {
        
    }
    onDestroy() {
        this.divDom.remove();
    }

    onEnable() {
        this.divDom.style.visibility = 'visible';
        this.refreshView();
    }
    onDisable() {
        this.divDom.style.visibility = 'hidden';
    }

    public getDom() {
        return this.divDom;
    }
  
    private genDomDiv() {
        this.id = 'CocosCreatorDiv' + domId++;
        this.divDom = document.createElement('div');
        this.divDom.id = `${this.id}`;
        document.body.appendChild(this.divDom);
        this.refreshView();
    }

    /** 刷新视图 */
    private refreshView() {
        if(!this || !this.divDom) return ;
        let rect = this.node.getBoundingBoxToWorld();
        /** 屏幕尺寸 */
        let screenHeight = cc.view.getFrameSize().height;
        let screenWidth = cc.view.getFrameSize().width;
        /** 设计尺寸 */
        let viewHeight = cc.view.getVisibleSize().height;
        let viewWidth = cc.view.getVisibleSize().width;

        let left = rect.x;
        let bottom = rect.y;
        /** 缩放比例, fillHeight模式下用height，fillwidth模式下用width */
        let scale = (screenHeight/viewHeight);

        let div = this.divDom;
        div.style.width = `${scale * rect.width}px`;
        div.style.height = `${scale * rect.height}px`;
        div.style.position = 'absolute';
        div.style.left = `${scale * left}px`;
        div.style.bottom = `${scale * bottom}px`;
    }

    onResize(end?: Function) {
        if(!this.divDom || !this.node.active) return ;
        // 全屏触发的windowreseize事件, 会在下一帧才改变其位置和大小
        setTimeout(() => {
            if(!this || !this.divDom || !this.node.active || !this.enabled) return ;
            this.refreshView();
            end && end();
        }, 0);   
    }
    // update (dt) {}
}
