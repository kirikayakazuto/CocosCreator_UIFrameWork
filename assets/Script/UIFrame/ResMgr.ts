import CocosHelper from "./CocosHelper";
import UIBase from "./UIBase";
import { EventCenter } from "./EventCenter";
import { timeStamp } from "console";

/**
 * 资源加载, 针对的是Form
 * 首先将资源分为两类
 * 一种是在编辑器时将其拖上去图片, 这里将其称为静态图片, 
 * 一种是在代码中使用cc.loader加载的图片, 这里将其称为动态图片
 * 
 * 对于静态资源
 * 1, 加载  在加载prefab时, cocos会将其依赖的图片一并加载, 所有不需要我们担心
 * 2, 释放  这里采用的引用计数的管理方法, 只需要调用destoryForm即可
 */
export default class ResMgr {
    private static instance: ResMgr = null;
    public static get inst() {
        if(this.instance === null) {
            this.instance = new ResMgr();
        }
        return this.instance;
    }
    /** 
     * 采用计数管理的办法, 管理form所依赖的资源
     */
    private _prefabs: {[key: string]: cc.Prefab} = cc.js.createMap();
    private _staticDepends:{[key: string]: number} = cc.js.createMap();
    private _dynamicDepends: {[key: string]: number} = cc.js.createMap();
    private _dynamicTags: {[key: string]: Array<string>} = cc.js.createMap();
    private _tmpStaticDepends: Array<string> = [];

    private _stubRes: {[type: string]: {[name: string]: cc.Asset}} = {};
    public addStub(res: cc.Asset, type: typeof cc.Asset) {
        let content = this._stubRes[type.name];
        if(!content) {
            content = this._stubRes[type.name] = {};
        }
        content[res.name] = res;
    }
    public getStubRes(resName: string, type: typeof cc.Asset) {
        let content = this._stubRes[type.name];
        if(!content) {
            return null;
        }
        return content[resName];
    }

    private _addTmpStaticDepends(completedCount: number, totalCount: number, item: any) {
        this._tmpStaticDepends[this._tmpStaticDepends.length] = item.url;
        if(this._staticDepends[item.url]) {
            this._staticDepends[item.url] ++;
        }else {
            this._staticDepends[item.url] = 1;
        }
    }
    private _clearTmpStaticDepends() {
        for(let s of this._tmpStaticDepends) {
            if(!this._staticDepends[s] || this._staticDepends[s] === 0) continue;
            this._staticDepends[s] --;
            if(this._staticDepends[s] === 0) {
                delete this._staticDepends[s];           // 这里不清理缓存
            }
        }
        this._tmpStaticDepends = [];
    }

    /** 加载窗体 */
    public async loadForm(formName: string) {
        let form = await CocosHelper.loadResSync<cc.Prefab>(formName, cc.Prefab, this._addTmpStaticDepends.bind(this));
        this._prefabs[formName] = form;

        this._clearTmpStaticDepends();
        let deps = cc.assetManager.dependUtil.getDepsRecursively(form['_uuid']);
        this.addStaticDepends(deps);
        return form;
    }

    /** 销毁窗体 */
    public destoryForm(com: UIBase) {
        if(!com) return;
        EventCenter.targetOff(com);
        let prefab = this._prefabs[com.fid];
        let uuid = prefab['_uuid'];
        let deps = cc.assetManager.dependUtil.getDepsRecursively(uuid);
        
        this.removeStaticDepends(deps);
        com.node.destroy();
        prefab.destroy();
        cc.assetManager.assets.remove(uuid);
        cc.assetManager.dependUtil['remove'](uuid);

        this._prefabs[com.fid] = null;
        delete this._prefabs[com.fid];
    }


    /** 静态资源的计数管理 */
    private addStaticDepends(deps: Array<string>) {
        for(let s of deps) {
            if(this._staticDepends[s]) {
                this._staticDepends[s] += 1;
            }else {
                this._staticDepends[s] = 1;
            }
        }
    }
    private removeStaticDepends(deps: Array<string>) {
        for(let s of deps) {
            if(!this._staticDepends[s] || this._staticDepends[s] === 0) continue;
            this._staticDepends[s] --;
            if(this._staticDepends[s] === 0) {
                // 可以销毁
                cc.assetManager.releaseAsset(cc.assetManager.assets.get(s));
                cc.assetManager.assets.remove(s);
                delete this._staticDepends[s];
            }
        }
    }
    /** 动态资源管理, 通过tag标记当前资源, 统一释放 */
    public async loadDynamicRes<T>(url: string, type: typeof cc.Asset, tag: string) {
        let sources = await CocosHelper.loadResSync<T>(url, type);
        
        let uuid = sources['_uuid'];
        if(this._dynamicDepends[uuid]) {
            this._dynamicDepends[uuid] += 1;
        }else {
            this._dynamicDepends[uuid] = 1;
        }

        if(!this._dynamicTags[tag]) {
            this._dynamicTags[tag] = [];
        }
        this._dynamicTags[tag].push(uuid);
        
        return sources;
    }

    /** 销毁动态资源  */
    public destoryDynamicRes(tag: string) {
        if(!this._dynamicTags[tag]) {       // 销毁
            return false;
        }
        for(const s of this._dynamicTags[tag]) {
            if(!this._dynamicDepends[s] || this._dynamicDepends[s] == 0) continue;
            this._dynamicDepends[s] --;
            if(this._dynamicDepends[s] == 0) {      // 应该被销毁了
                cc.assetManager.releaseAsset(cc.assetManager.assets.get(s));
                cc.assetManager.assets.remove(s);
                delete this._dynamicDepends[s];
            }
        }
        this._dynamicTags[tag] = null;
        delete this._dynamicTags[tag];

        return true;
    }

    /** 计算当前纹理数量和缓存 */
    public computeTextureCache() {
        let cache = cc.assetManager.assets;
        let totalTextureSize = 0;
        let count = 0;
        cache.forEach((item: cc.Asset, key: string) => {            
            let type = (item && item['__classname__']) ? item['__classname__'] : '';
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