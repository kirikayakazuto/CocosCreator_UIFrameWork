import { SysDefine } from "./config/SysDefine";
class LoadProgress {
    public url: string;
    public completedCount: number;
    public totalCount: number;
}

export default class CocosHelper {

    /** 加载进度 */
    public static loadProgress = new LoadProgress();

    /** 等待时间, 秒为单位 */
    public static sleep = function(time: number) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, time * 1000)    
        });
    }

    /**  */
    public static async runSyncAction(node: cc.Node, ...actions: cc.FiniteTimeAction[]) {
        if(!actions || actions.length <= 0) return ;
        return new Promise((resolve, reject) => {
            actions.push(cc.callFunc(() => {
                resolve(true);
            }))
            node.runAction(cc.sequence(actions));
        });
    }
    
    /** 加载资源 */
    public static loadRes = (url: string, type: typeof cc.Asset, progressCallback?: (completedCount: number, totalCount: number, item: any) => void) => {
        if (!url || !type) {
            cc.log("参数错误", url, type);
            return;
        }
        CocosHelper.loadProgress.url = url;
        progressCallback = progressCallback ? progressCallback : CocosHelper._progressCallback;
        return new Promise((resolve, reject) => {
            cc.loader.loadRes(url, type, progressCallback, (err, asset) => {
                if (err) {
                    cc.log(`[资源加载] 错误 ${err}`);
                    resolve(null);
                    return;
                }
                resolve(asset);
            });
        });
    }

    private static _progressCallback(completedCount: number, totalCount: number, item: any) {
        CocosHelper.loadProgress.completedCount = completedCount;
        CocosHelper.loadProgress.totalCount = totalCount;
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

    private static _getComponentName(component: cc.Component) {
        return component.name.match(/<.*>$/)[0].slice(1, -1);
    }
}