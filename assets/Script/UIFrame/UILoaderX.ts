export default class UILoaderX {
    private static instance: UILoaderX = null;
    public static getInstance() {
        if(this.instance === null) {
            this.instance = new UILoaderX();
        }
        return this.instance;
    }

    /** 加载资源文件 */
    public loadRes = function(url: string, type: typeof cc.Asset) {
        if (!url || !type) {
            cc.log("参数错误", url, type);
            return;
        }
        return new Promise((resolve, reject) => {
            cc.loader.loadRes(url, type, (err, asset) => {
                if (err) {
                    cc.log(`[资源加载] 错误 ${err}`);
                    reject(err);
                    
                }else {
                    resolve(asset);
                }
            });
        });
    }
    /** 释放一个结点 */
    public releaseNode(node: cc.Node) {

    }

    public 

}