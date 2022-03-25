import * as cc from "cc";

export class LoadProgress {
    public url: string | null = null;
    public completedCount: number = 0;
    public totalCount: number = 0;
    public item: any;
    public cb?: Function;
}

/** 一些cocos api 的封装, promise函数统一加上sync后缀 */
export default class CocosHelper {

    public static async callInNextTick() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 0);
        })
    }

    /** 加载进度 */
    public static loadProgress = new LoadProgress();

    /** 等待时间, 秒为单位 */
    public static sleepSync = function(dur: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, dur * 1000)
        });
    }

    /**
     * 
     * @param target 
     * @param repeat -1，表示永久执行
     * @param tweens 
     */
    public static async runRepeatTweenSync(target: any, repeat: number, ...tweens: cc.Tween<cc.Node>[]) {
        return new Promise((resolve, reject) => {
            let selfTween = cc.tween(target);
            for(const tmpTween of tweens) {
                selfTween = selfTween.then(tmpTween);
            }
            if(repeat < 0) {
                cc.tween(target).repeatForever(selfTween).start();
            }else {
                cc.tween(target).repeat(repeat, selfTween).call(() => {
                    resolve(true);
                }).start();
            }
        });   
    }
    /** 同步的tween */
    public static async runTweenSync(target: any, ...tweens: cc.Tween<cc.Node>[]): Promise<void> {
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


    /** 同步的动画 */
    public static async runAnimSync(node: cc.Node, animName?: string | number) {
        let anim = node.getComponent(cc.Animation);
        if(!anim) return ;
        let clip: cc.AnimationClip | null = null;
        if(!animName) clip = anim.defaultClip;
        else {
            
            let clips = anim.clips;
            if(typeof(animName) === "number") {
                clip = clips[animName];
            }else if(typeof(animName) === "string") {
                for(let i=0; i<clips.length; i++) {
                    if(clips[i]?.name === animName) {
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
    public static loadResThrowErrorSync<T>(url: string, type: typeof cc.Asset, onProgress?: (completedCount: number, totalCount: number, item: any) => void): Promise<T> | null {    
        return null;
    }

    private static _loadingMap: {[key: string]: Function[]} = {};
    public static loadRes<T>(url: string, type: typeof cc.Asset, callback: Function ) {
        if(this._loadingMap[url]) {
            this._loadingMap[url].push(callback);
            return ;
        }
        this._loadingMap[url] = [callback];
        this.loadResSync<T>(url, type).then((data: any) => {
            let arr = this._loadingMap[url];
            for(const func of arr) {
                func(data);
            }
            delete this._loadingMap[url];
        });
    }
    /** 加载资源 */
    public static loadResSync<T>(url: string, type: typeof cc.Asset, onProgress?: (completedCount: number, totalCount: number, item: any) => void): Promise<T | null>{
        return new Promise((resolve, reject) => {
            if(!onProgress) onProgress = this._onProgress;
            cc.resources.load(url, type, onProgress, (err, asset: any) => {
                if (err) {
                    cc.error(`${url} [资源加载] 错误 ${err}`);
                    resolve(null);
                }else {
                    resolve(asset);
                }
            });
        });
    }
    /** 
     * 加载进度
     * cb方法 其实目的是可以将loader方法的progress
     */
    private static _onProgress(completedCount: number, totalCount: number, item: any) {
        CocosHelper.loadProgress.completedCount = completedCount;
        CocosHelper.loadProgress.totalCount = totalCount;
        CocosHelper.loadProgress.item = item;
        CocosHelper.loadProgress.cb && CocosHelper.loadProgress.cb(completedCount, totalCount, item);
    }
    /**
     * 寻找子节点
     */
    public static findChildInNode(nodeName: string, rootNode: cc.Node): cc.Node | null {
        if(rootNode.name == nodeName) {
            return rootNode;
        }
        for(let i=0; i<rootNode.children.length; i++) {
            let node = this.findChildInNode(nodeName, rootNode.children[i]);
            if(node) {
                return node;
            }
        }
        return null;
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
    public static loadBundleSync(url: string, options: any): Promise<cc.AssetManager.Bundle | null> {
        return new Promise((resolve, reject) => {
            cc.assetManager.loadBundle(url, options, (err: Error | null, bundle: cc.AssetManager.Bundle) => {
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
    public static loadAssetFromBundleSync(bundleName: string, url: string) {
        let bundle = cc.assetManager.getBundle(bundleName);
        return new Promise((resolve, reject) => {
            if(!bundle) {
                cc.error(`加载bundle中的资源失败, 未找到bundle, bundleUrl:${bundleName}`);
                return null;
            }
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
    public static loadAssetSync(url: string) {
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
}

