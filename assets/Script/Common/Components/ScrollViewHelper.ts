const {ccclass, property} = cc._decorator;

//help:
//add this to the ScrollView node
//add all data by addData function, that includes the layout of the data, we call it a "Proxy"
//set onFreeUI to your free handler, put the node in pool
//set onAllocUI to your alloc handler, instansiate the node, and refresh it.
//enjoy, all ui will have a lazy create 
//if you call scrollTo() function with no duration, you should call checkUI(), because scrollTo with no duration will not trigger "scrollEvents"

export enum ScrollViewElementProxyState {
    NoUI,
    HaveUI
}

export class ScrollViewElementProxy {
    public region:cc.Rect;
    public ui:cc.Node;
    public src:ScrollViewElementProxy;
    public horizontalLoop:boolean;
    public verticalLoop:boolean;
    public state:ScrollViewElementProxyState = ScrollViewElementProxyState.NoUI;
}

@ccclass
export class ScrollViewHelper extends cc.Component {
    @property()
    public syncInterval : number = 0.05;
    private _proxys : ScrollViewElementProxy[] = [];
    private _svCachedScrollView : cc.ScrollView;
    private _rectCachedViewport : cc.Rect;
    private _debugNode : cc.Graphics;
    private _horizontalLoop : boolean;
    private _syncingUI : boolean;
    public onFreeUI:(proxy:ScrollViewElementProxy) => void;
    public onAllocUI:(proxy:ScrollViewElementProxy) => void;
    public isUIPooled:(proxy:ScrollViewElementProxy) => boolean;

    public get scrollView() : cc.ScrollView {
        return this._svCachedScrollView;
    }
    
    public get datas() : ScrollViewElementProxy[] {
        return this._proxys;
    }

    public clearData() {
        for(let proxy of this._proxys) {
            if(proxy.ui) {
                if(this.onFreeUI) {
                    this.onFreeUI(proxy);
                }
            }
        }
        this._proxys.length = 0;
    }

    public addData(data:ScrollViewElementProxy) {
        this._initializeProxy(data);
        this._proxys.push(data);
    }

    public setDebug(debug:Boolean) {
        if(debug && !this._debugNode) {
            this._debugNode = (new cc.Node()).addComponent(cc.Graphics);
            this.scrollView.content.addChild(this._debugNode.node);
            this._debugNode.node.setPosition(cc.v2(0, 0));
        } else if(!debug && this._debugNode) {
            this._debugNode.node.removeFromParent();
            this._debugNode.node.destroy();
        }
        this._refreshDebug();
    }

    public checkUI() {
        this._checkUIState();
        this._syncingUI = true;
    }

    public setLoopHorizontal(loop:boolean) {
        if(loop != this._horizontalLoop) {
            if(loop) {
                for(let i = this._proxys.length - 1; i >= 0 ; i--) {
                    let target = this._proxys[i];
                    if(!target.horizontalLoop) {
                        //this is a original
                        let copyed = new ScrollViewElementProxy();
                        this._initializeProxy(copyed);
                        copyed.src = target.src;
                        copyed.region = new cc.Rect(target.region.x, target.region.y, target.region.width, target.region.height);
                        copyed.horizontalLoop = true;
                        copyed.verticalLoop = target.verticalLoop;
                        copyed.region.x += this.scrollView.content.width;
                        this._proxys.push(copyed);
                    }
                }
                this.scrollView.content.setContentSize(this.scrollView.content.width * 2, this.scrollView.content.height);
            } else {
                for(let i = this._proxys.length - 1; i >= 0; i--) {
                    let target = this._proxys[i];
                    if(target.horizontalLoop) {
                        if(target.ui) {
                            this.onFreeUI(target);
                            target.ui = null;
                            this._proxys.splice(i, 1);
                        }
                    }
                }
                this.scrollView.content.setContentSize(this.scrollView.content.width / 2, this.scrollView.content.height);
            }
            this._horizontalLoop = loop;
        }
    }

    onLoad() {
        this._bindScrollView(this.getComponent(cc.ScrollView));
    }

    private _syncCounter : number = 0;
    update(dt:number) {
        if(this._syncingUI) {
            this._syncCounter+=dt;
            if(this._syncCounter >= this.syncInterval) {
                this._syncCounter = 0;
                this._syncUIState(1);
            }
        }
    }

    private _initializeProxy(proxy:ScrollViewElementProxy) {
        proxy.horizontalLoop = false;
        proxy.src = proxy;
        proxy.state = ScrollViewElementProxyState.NoUI;
        proxy.ui = null;
        proxy.verticalLoop = false;
    }

    private _lastCheckX:number = 0;
    private _checkLoopHorizontal() {
        let offset = this.scrollView.getScrollOffset();
        let delta = offset.x - this._lastCheckX;
        if(Math.abs(delta) > 2) {
            this._lastCheckX = offset.x;
            let originalWidth = this.scrollView.content.width / 2;
            //check move whole content
            if(delta < 0 && offset.x < -originalWidth) {
                offset.x += originalWidth;
                this._lastCheckX = offset.x;
                offset.x = -offset.x;
                this.scrollView.scrollToOffset(offset);
            } else if(delta > 0 && offset.x > 0) {
                offset.x -= originalWidth;
                this._lastCheckX = offset.x;
                offset.x = -offset.x;
                this.scrollView.scrollToOffset(offset);
            }
        }
    }

    private _bindScrollView(view:cc.ScrollView) {
        this._svCachedScrollView = this.getComponent(cc.ScrollView);
        let eventHandler = new cc.Component.EventHandler();
        eventHandler.target = this.node;
        eventHandler.component = "ScrollViewHelper";
        eventHandler.handler = "_onScroll";
        this._svCachedScrollView.scrollEvents.push(eventHandler);
        this._svCachedScrollView.node.on(cc.Node.EventType.SIZE_CHANGED, this._refreshViewportRect, this);
        this._svCachedScrollView.content.on(cc.Node.EventType.ANCHOR_CHANGED, this._refreshViewportRect, this);
        this._svCachedScrollView.content.on(cc.Node.EventType.SIZE_CHANGED, this._refreshViewportRect, this);
        this._refreshViewportRect();
    }

    private _refreshViewportRect() {
        this._rectCachedViewport = cc.rect();
        this._rectCachedViewport.size = this._svCachedScrollView.node.getContentSize();
        this._rectCachedViewport.origin = cc.v2(-this._svCachedScrollView.content.anchorX * this._svCachedScrollView.content.width, 
            (1 - this._svCachedScrollView.content.anchorY) * this._svCachedScrollView.content.height - this._rectCachedViewport.size.height);
        this._checkUIState();
        this._syncingUI = true;
    }
    
    private _checkUIState() {
        let delta = this._svCachedScrollView.getScrollOffset();
        let viewWidth = this._rectCachedViewport.width;
        let viewHeight = this._rectCachedViewport.height;
        let viewX = -delta.x + this._rectCachedViewport.x;
        let viewY = -delta.y + this._rectCachedViewport.y;
        for(let proxy of this._proxys) {
            let rect = proxy.region;
            let x = rect.x;
            let y = rect.y;
            if(x > viewX - rect.width && x < viewX + viewWidth &&
                y > viewY - rect.height && y < viewY + viewHeight) {
                proxy.state = ScrollViewElementProxyState.HaveUI;
            } else {
                proxy.state = ScrollViewElementProxyState.NoUI;
            }
        }
    }

    private _syncUIState(maxAllocCount:number) {
        let changeCount : number = 0;
        for(let proxy of this._proxys) {
            if(proxy.state == ScrollViewElementProxyState.NoUI && proxy.ui) {
                this.onFreeUI(proxy);
                changeCount ++;
                if(this._debugNode) {
                    cc.log("ScrollViewHelper._syncUIState ----> free ui");
                }
            }
        }
        for(let proxy of this._proxys) {
            if(proxy.state == ScrollViewElementProxyState.HaveUI && !proxy.ui) {
                let pooled = this.isUIPooled && this.isUIPooled(proxy);
                this.onAllocUI(proxy);
                changeCount++;
                if(!pooled) {               //real alloc should be limited
                    maxAllocCount--;
                }
                if(this._debugNode) {
                    cc.log("ScrollViewHelper._syncUIState ----> alloc ui");
                }
            }
            if(maxAllocCount <= 0) {
                break;
            }
        }
        if(changeCount <= 0) {
            //everything is changed
            this._syncingUI = false;
        }
    }

    private _onScroll() {
        if(this._horizontalLoop) {
            this._checkLoopHorizontal();
        }
        this._checkUIState();
        this._syncingUI = true;
    }

    private _refreshDebug() {
        if(this._debugNode) {
            this._debugNode.clear();
            this._debugNode.fillColor = cc.color(255, 0, 0, 255);
            for(let i = 0; i < this._proxys.length; i++) {
                this._debugNode.fillRect(this._proxys[i].region.x, this._proxys[i].region.y, this._proxys[i].region.width, this._proxys[i].region.height);
            }
        }
    }
}