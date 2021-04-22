import Const from "./Const";

const fs = require('fire-fs');

module scene {
    /** 
     * 入口
     * 1, 查看是否启用了controller, 即检查根结点是否有PropController脚本即可
     * 2, 查找所有PropSelector, 根据所属控制器和所属type, 生成json文件并保持到本地
     * 3, 将json文件绑定到对应的controller中
     *      
     */
    export function start() { 
        let childs = cc.director.getScene().children;
        if(childs.length < 3) return null;
        let NodeRoot = childs[1];

        if(!NodeRoot.getComponent("PropController")) {
            Editor.warn(`${NodeRoot.name} 没有挂载 PropController 脚本`);
            return;
        }
    }
}
module.exports = scene;