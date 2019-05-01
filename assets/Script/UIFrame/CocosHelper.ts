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
}