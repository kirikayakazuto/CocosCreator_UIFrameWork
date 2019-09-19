import { SysDefine } from "./config/SysDefine";

export default class CocosHelper {
    /**
     * 寻找子节点
     */
    public static FindChildInNode(nodeName: string, rootNode: cc.Node): cc.Node {
        if(rootNode.name == nodeName) {
            return rootNode;
        }

        for(let i=0; i<rootNode.childrenCount; i++) {
            let node = this.FindChildInNode(nodeName, rootNode.children[i]);
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