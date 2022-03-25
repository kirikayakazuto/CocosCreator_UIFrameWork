import * as cc from "cc";

import CocosHelper from "./CocosHelper";
import UIBase from "./UIBase";
import { EventCenter } from "./EventCenter";

/**
 * 资源加载, 针对的是Form
 * 首先将资源分为两类
 * 一种是在编辑器时将其拖上去图片, 这里将其称为静态图片, 
 * 一种是在代码中使用cc.loader加载的图片, 这里将其称为动态图片
 * 
 * 对于静态资源
 * 1, 加载  在加载prefab时, cocos会将其依赖的图片一并加载, 所有不需要我们担心
 * 2, 释放  这里采用的引用计数的管理方法, 只需要调用destoryForm即可
 * 
 * 加载一个窗体
 * 第一步 加载prefab, 第二步 实例化prefab 获得 node
 * 所以销毁一个窗体 也需要两步, 销毁node, 销毁prefab
 */
export default class ResMgr {
    private static instance: ResMgr | null = null;
    public static get inst() {
        if(this.instance === null) {
            this.instance = new ResMgr();
        }
        return this.instance;
    }

    /** 
     * 采用计数管理的办法, 管理form所依赖的资源
     */
    private _prefabDepends: {[key: string]: Array<string>} = cc.js.createMap();
    private _dynamicTags: {[key: string]: Array<string>} = cc.js.createMap();       

    private _tmpAssetsDepends: string[] = [];                                       // 临时缓存
    private _assetsReference: {[key: string]: number} = cc.js.createMap();          // 资源引用计数

    
    /** 加载窗体 */
    public async loadForm(fid: string) {
        let result = await this._loadResWithReference<cc.Prefab>(fid, cc.Prefab);
        if(!result) return ;
        let {res, deps} = result;
        this._prefabDepends[fid] = deps;
        return cc.instantiate(res);
    }

    /** 销毁窗体 */
    public destoryForm(com: UIBase) {
        if(!com) return;
        EventCenter.targetOff(com);

        // 销毁依赖的资源
        this._destoryResWithReference(this._prefabDepends[com.fid]);

        delete this._prefabDepends[com.fid];

        // 销毁node
        com.node.destroy();
    }


    /** 动态资源管理, 通过tag标记当前资源, 统一释放 */
    public async loadDynamicRes<T>(url: string, type: typeof cc.Asset, tag: string) {
        let result = await this._loadResWithReference<T>(url, type);
        if(!result) return ;
        let {res, deps} = result;
        if(!this._dynamicTags[tag]) {
            this._dynamicTags[tag] = [];
        }
        this._dynamicTags[tag].push(...deps);
        return res;
    }

    /** 销毁动态资源  */
    public destoryDynamicRes(tag: string) {
        if(!this._dynamicTags[tag]) {       // 销毁
            return false;
        }
        this._destoryResWithReference(this._dynamicTags[tag])
        
        delete this._dynamicTags[tag];

        return true;
    }


    /** 加载资源并添加引用计数 */
    private async _loadResWithReference<T>(url: string, type: typeof cc.Asset) {
        let res = await CocosHelper.loadResSync<T>(url, type, this._addTmpAssetsDepends.bind(this));
        if(!res) {
            this._clearTmpAssetsDepends();    
            return null;
        }
        this._clearTmpAssetsDepends();
        //@ts-ignore
        let uuid = res._uuid;
        let deps = cc.assetManager.dependUtil.getDepsRecursively(uuid) || [];
        deps.push(uuid);
        this.addAssetsDepends(deps);

        return {
            res: res,
            deps: deps
        };
    }

    /** 更加引用销毁资源 */
    private _destoryResWithReference(deps: string[]) {
        let _toDeletes = this.removeAssetsDepends(deps);
        this._destoryAssets(_toDeletes);
        return true;
    } 

    /** 添加资源计数 */
    private addAssetsDepends(deps: Array<string>) {
        for(let s of deps) {
            if(this._checkIsBuiltinAssets(s)) continue;
            if(this._assetsReference[s]) {
                this._assetsReference[s] += 1;
            }else {
                this._assetsReference[s] = 1;
            }
        }
    }
    /** 删除资源计数 */
    private removeAssetsDepends(deps: Array<string>) {
        let _deletes: string[] = [];
        for(let s of deps) {
            if(!this._assetsReference[s] || this._assetsReference[s] === 0) continue;
            this._assetsReference[s] --;
            if(this._assetsReference[s] === 0) {     
                _deletes.push(s);
                delete this._assetsReference[s];                  // 删除key;
            }
        }
        return _deletes;
    }
    private _destoryAssets(urls: string[]) {
        for(const url of urls) {
            this._destoryAsset(url);
        }
    }
    /** 销毁资源 */
    private _destoryAsset(url: string) {
        if(this._checkIsBuiltinAssets(url)) return;
        cc.assetManager.assets.remove(url);               // 从缓存中清除
        let asset = cc.assetManager.assets.get(url);      // 销毁该资源
        asset && asset.destroy();
        cc.assetManager.dependUtil['remove'](url);        // 从依赖中删除
    }

    /** 临时添加资源计数 */
    private _addTmpAssetsDepends(completedCount: number, totalCount: number, item: any) {
        let deps = (cc.assetManager.dependUtil.getDepsRecursively(item.uuid) || []);
        deps.push(item.uuid);
        this.addAssetsDepends(deps);

        this._tmpAssetsDepends.push(...deps);
    }
    /** 删除临时添加的计数 */
    private _clearTmpAssetsDepends() {
        for(let s of this._tmpAssetsDepends) {
            if(!this._assetsReference[s] || this._assetsReference[s] === 0) continue;
            this._assetsReference[s] --;
            if(this._assetsReference[s] === 0) {
                delete this._assetsReference[s];           // 这里不清理缓存
            }
        }
        this._tmpAssetsDepends = [];
    }

    /** 检查是否是builtin内的资源 */
    private _checkIsBuiltinAssets(url: string) {
        let asset = cc.assetManager.assets.get(url);
        if(asset && asset['_name'].indexOf("builtin") != -1) {
            return true;
        }
        return false;
    }

    /** 计算当前纹理数量和缓存 */
    public computeTextureCache() {
        let cache = cc.assetManager.assets;
        let totalTextureSize = 0;
        let count = 0;
        cache.forEach((item: cc.Asset, key: string) => {      
            //@ts-ignore
            let className = item.__classname__;      
            let type = (item && className) ? className : '';
            if(type == 'cc.Texture2D') {
                let texture = item as cc.Texture2D;
                let textureSize = texture.width * texture.height * ((texture['_native'] === '.jpg' ? 3 : 4) / 1024 / 1024);
                // debugger
                totalTextureSize += textureSize;
                count ++;
            }
        });
        return `缓存 [纹理总数:${count}][纹理缓存:${totalTextureSize.toFixed(2) + 'M'}]`;
    }

}