import { SysDefine } from "./config/SysDefine";
export class LoadProgress {
    public url: string;
    public completedCount: number;
    public totalCount: number;
    public item: any;
    public cb?: Function;
}

/** 一些cocos api 的封装, promise函数统一加上sync后缀 */
export default class CocosHelper {

    /** 加载进度 */
    public static loadProgress = new LoadProgress();

    /** 等待时间, 秒为单位 */
    public static sleepSync = function(time: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, time * 1000);
        });
    }

    /**
     * 
     * @param target 
     * @param repeat -1，表示永久执行
     * @param tweens 
     */
    public static async runRepeatTweenSync(target: any, repeat: number, ...tweens: cc.Tween[]) {
        return new Promise((resolve, reject) => {
            let selfTween = cc.tween(target);
            for(const tmpTween of tweens) {
                selfTween = selfTween.then(tmpTween);
            }
            if(repeat < 0) {
                cc.tween(target).repeatForever(selfTween).start();
            }else {
                cc.tween(target).repeat(repeat, selfTween).start();
            }
        });   
    }
    /** 同步的tween */
    public static async runTweenSync(target: any, ...tweens: cc.Tween[]): Promise<void> {
        return new Promise((resolve, reject) => {
            let selfTween = cc.tween(target);
            for(const tmpTween of tweens) {
                selfTween = selfTween.then(tmpTween);
            }
            selfTween.call(() => {
                resolve();
            }).start();
        });
    }
    /** 停止tween */
    public stopTween(target: any) {
        cc.Tween.stopAllByTarget(target);
    }
    public stopTweenByTag(tag: number) {
        cc.Tween.stopAllByTag(tag);
    }
    /** 同步的动作, 在2.4.x action已经被废弃了, 不建议使用 */
    public static async runActionSync(node: cc.Node, ...actions: cc.FiniteTimeAction[]) {
        if(!actions || actions.length <= 0) return ;
        return new Promise((resolve, reject) => {
            actions.push(cc.callFunc(() => {
                resolve(true);
            }));
            node.runAction(cc.sequence(actions));
        });
    }

    /** 同步的动画 */
    public static async runAnimSync(node: cc.Node, animName?: string | number) {
        let anim = node.getComponent(cc.Animation);
        if(!anim) return ;
        let clip: cc.AnimationClip = null;
        if(!animName) clip = anim.defaultClip;
        else {
            let clips = anim.getClips();
            if(typeof(animName) === "number") {
                clip = clips[animName];
            }else if(typeof(animName) === "string") {
                for(let i=0; i<clips.length; i++) {
                    if(clips[i].name === animName) {
                        clip = clips[i];
                        break;
                    }
                }
            }   
        }
        if(!clip) return ;
        await CocosHelper.sleepSync(clip.duration);
    }

    /** 加载资源异常时抛出错误 */
    public static loadResThrowErrorSync<T>(url: string, type: typeof cc.Asset, progressCallback?: (completedCount: number, totalCount: number, item: any) => void): Promise<T> {
        
        return null;

    }
    /** 加载资源 */
    public static loadResSync<T>(url: string, type: typeof cc.Asset, progressCallback?: (completedCount: number, totalCount: number, item: any) => void): Promise<T>{
        if (!url || !type) {
            cc.error("参数错误", url, type);
            return;
        }
        CocosHelper.loadProgress.url = url;
        if(progressCallback) {
            this.loadProgress.cb = progressCallback;
        }
        return new Promise((resolve, reject) => {
            cc.loader.loadRes(url, type, this._progressCallback, (err, asset) => {
                if (err) {
                    cc.error(`${url} [资源加载] 错误 ${err}`);
                    resolve(null);
                }else {
                    resolve(asset);
                }
                // 加载完毕了，清理进度数据
                CocosHelper.loadProgress.url = '';
                CocosHelper.loadProgress.completedCount = 0;
                CocosHelper.loadProgress.totalCount = 0;
                CocosHelper.loadProgress.item = null;
                CocosHelper.loadProgress.cb = null;
            });
        });
    }
    /** 
     * 加载进度
     * cb方法 其实目的是可以将loader方法的progress
     */
    private static _progressCallback(completedCount: number, totalCount: number, item: any) {
        CocosHelper.loadProgress.completedCount = completedCount;
        CocosHelper.loadProgress.totalCount = totalCount;
        CocosHelper.loadProgress.item = item;
        CocosHelper.loadProgress.cb && CocosHelper.loadProgress.cb(completedCount, totalCount, item);
    }
    /**
     * 寻找子节点
     */
    public static findChildInNode(nodeName: string, rootNode: cc.Node): cc.Node {
        if(rootNode.name == nodeName) {
            return rootNode;
        }
        for(let i=0; i<rootNode.childrenCount; i++) {
            let node = this.findChildInNode(nodeName, rootNode.children[i]);
            if(node) {
                return node;
            }
        }
        return null;
    }

    /** 检测前缀是否符合绑定规范 */
    public static checkNodePrefix(name: string) {
        if(name[0] !== SysDefine.SYS_STANDARD_Prefix) {
            return false;
        }
        return true;
    }
    /** 检查后缀 */
    public static checkBindChildren(name: string) {
        if(name[name.length-1] !== SysDefine.SYS_STANDARD_End) {
            return true;
        }
        return false;
    }
    /** 获得类型和name */
    public static getPrefixNames(name: string) {
        if(name === null) {
            return ;
        }
        return name.split(SysDefine.SYS_STANDARD_Separator);
    }
    /** 获得Component的类名 */
    public static getComponentName(com: Function) {
        let arr = com.name.match(/<.*>$/);
        if(arr && arr.length > 0) {
            return arr[0].slice(1, -1);
        }
        return com.name;
    }
    /** 加载bundle */
    public static loadBundleSync(url: string, options: any): Promise<cc.AssetManager.Bundle> {
        return new Promise((resolve, reject) => {
            cc.assetManager.loadBundle(url, options, (err: Error, bundle: cc.AssetManager.Bundle) => {
                if(!err) {
                    cc.error(`加载bundle失败, url: ${url}, err:${err}`);
                    resolve(null);
                }else {
                    resolve(bundle);
                }
            });
        });
    }
    
    /** 路径是相对分包文件夹路径的相对路径 */
    public static loadAssetFromBundleSync(bundleName: string, url: string | string[]) {
        let bundle = cc.assetManager.getBundle(bundleName);
        if(!bundle) {
            cc.error(`加载bundle中的资源失败, 未找到bundle, bundleUrl:${bundleName}`);
            return null;
        }
        return new Promise((resolve, reject) => {
            bundle.load(url, (err, asset: cc.Asset | cc.Asset[]) => {
                if(err) {
                    cc.error(`加载bundle中的资源失败, 未找到asset, url:${url}, err:${err}`);
                    resolve(null);
                }else {
                    resolve(asset);
                }
            });
        });
    }

    /** 通过路径加载资源, 如果这个资源在bundle内, 会先加载bundle, 在解开bundle获得对应的资源 */
    public static loadAssetSync(url: string | string[]) {
        return new Promise((resolve, reject) => {
            cc.resources.load(url, (err, assets: cc.Asset | cc.Asset[]) => {
                if(!err) {
                    cc.error(`加载asset失败, url:${url}, err: ${err}`);
                    resolve(null);
                }else {
                    this.addRef(assets);
                    resolve(assets);
                }
            });
        });
    }
    /** 释放资源 */
    public static releaseAsset(assets: cc.Asset | cc.Asset[]) {
        this.decRes(assets);
    }
    /** 增加引用计数 */
    private static addRef(assets: cc.Asset | cc.Asset[]) {
        if(assets instanceof Array) {
            for(const a of assets) {
                a.addRef();
            }
        }else {
            assets.addRef();
        }
    }
    /** 减少引用计数, 当引用计数减少到0时,会自动销毁 */
    private static decRes(assets: cc.Asset | cc.Asset[]) {
        if(assets instanceof Array) {
            for(const a of assets) {
                a.decRef();
            }
        }else {
            assets.decRef();
        }
    }

    /** 怎么用promise实现以下方法, 可以在同一帧内返回一个a, 并且还能异步执行callback方法 */
    private static testForCallback(callback: Function) {
        let a = 1;
        setTimeout(() => {
            callback(a);
        }, 1000);
        return a;
    }

    public static captureScreen(camera: cc.Camera, prop?: cc.Node | cc.Rect) {
        let newTexture = new cc.RenderTexture();
        let oldTexture = camera.targetTexture;
        let rect: cc.Rect = cc.rect(0, 0, cc.visibleRect.width, cc.visibleRect.height);
        if(prop) {
            if(prop instanceof cc.Node) {
                rect = prop.getBoundingBoxToWorld();
            }else {
                rect = prop;
            }
        }
        newTexture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, cc.game._renderContext.STENCIL_INDEX8);
        camera.targetTexture = newTexture;
        camera.render();
        camera.targetTexture = oldTexture;
        
        let buffer = new ArrayBuffer(rect.width * rect.height * 4);
        let data = new Uint8Array(buffer);
        newTexture.readPixels(data, rect.x, rect.y, rect.width, rect.height);
        return data;
    }


}

