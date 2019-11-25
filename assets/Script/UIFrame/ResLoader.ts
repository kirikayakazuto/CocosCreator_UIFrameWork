import CocosHelper from "./CocosHelper";
import BaseUIForm from "./BaseUIForm";

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
export default class ResLoader {
    private static instance: ResLoader = null;
    public static getInstance() {
        if(this.instance === null) {
            this.instance = new ResLoader();
        }
        return this.instance;
    }
    /** 
     * 采用计数管理的办法, 管理form所依赖的资源
     */
    private staticDepends:{[key: string]: number} = {};
    private dynamicDepends: {[key: string]: Array<string>} = {};

    /** 加载窗体 */
    public async loadForm(formName: string) {
        let form: any = await CocosHelper.loadRes(formName, cc.Prefab);
        let deps = cc.loader.getDependsRecursively(formName);
        this.addStaticDepends(deps);
        return form;
    }
    /** 销毁窗体 */
    public destoryForm(com: BaseUIForm) {
        if(!com) {
            cc.log("只支持销毁继承了BaseUIForm的窗体!");
            return;
        }
        let deps = cc.loader.getDependsRecursively(com.UIFormName);
        this.removeStaticDepends(deps);
        com.node.destroy();
        cc.loader.releaseRes(com.UIFormName);
    }


    /** 静态资源的计数管理 */
    private addStaticDepends(deps: Array<string>) {
        for(let s of deps) {
            if(this.staticDepends[s]) {
                this.staticDepends[s] += 1;
            }else {
                this.staticDepends[s] = 1;
            }
        }
    }
    private removeStaticDepends(deps: Array<string>) {
        for(let s of deps) {
            if(!this.staticDepends[s] || this.staticDepends[s] === 0) continue;
            this.staticDepends[s] --;
            if(this.staticDepends[s] === 0) {
                // 可以销毁
                cc.loader.release(s);
                delete this.staticDepends[s];
            }
        }
    }


    /** 动态资源管理, 通过tag标记当前资源, 统一释放 */
    public async loadDynamicRes(url: string, type: typeof cc.Asset, tag: string) {
        let sources = await CocosHelper.loadRes(url, type);
        if(!tag) tag = url;
        if(!this.dynamicDepends[tag]) {
            this.dynamicDepends[tag] = [];
        }
        this.dynamicDepends[tag].push(url);

        return sources;
    }

    /** 销毁动态资源  没有做引用计数的处理 */
    public destoryDynamicRes(tag: string) {
        if(!this.dynamicDepends[tag]) {       // 销毁
            return false;
        }
        for(const key in this.dynamicDepends) {
            cc.loader.release(this.dynamicDepends[key]);
        }
        return true;
    }
}