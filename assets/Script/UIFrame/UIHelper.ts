import CocosHelper from "./CocosHelper";
import { SysDefine } from "./config/SysDefine";
import BaseUIBinder from "./BaseUIBinder";

/*
 * @Author: 邓朗   基于论坛中的uikiller 
 * @Date: 2019-09-19 14:28:09 
 * @Last Modified by: 邓朗
 * @Last Modified time: 2019-10-07 16:36:20
 * 
 * UIHelper的功能, 在用脚本控制UI的时候, 绑定UI是一件很烦人的事情, 尤其是将UI拖到面板上绑定, 就更加繁琐, 
 * 或者在onload, start上 使用getChildByName() 或者cc.find() 查找结点, 又会显得代码冗长
 * 大部分时候, 在我创建这个结点的时候, 我就已经想好要让这个结点完成什么功能了(针对渲染结点), 所有我希望在取名字的
 * 时候,通过特殊的命名规则, 就可以在脚本中直接使用此结点,  UIHelper就来完成此功能
 */

export default class UIHelper {
    private static instance: UIHelper = null;
    public static getInstance() {
        if(this.instance === null) {
            this.instance = new UIHelper();
        }
        return this.instance;
    }
    // 绑定组件
    public bindComponent(component: BaseUIBinder) {
        this.bindNode(component.node, component);
    }
    // 绑定node
    public bindNode(node: cc.Node, component: BaseUIBinder) {
        if (component.$collector === node.uuid) {
            cc.warn(`重复绑定退出.${node.name}`)
            return;
        }
        component.$collector = node.uuid;
        this._bindSubNode(node, component);
    }
    
    // 绑定子节点
    private _bindSubNode(node: cc.Node, component: BaseUIBinder) {
        // 检测前缀是否符合绑定规范
        let name = node.name;
        if(CocosHelper.checkBindChildren(name)) {
            if (CocosHelper.checkNodePrefix(name)) {
                // 获得这个组件的类型 和 名称
                let names = CocosHelper.getPrefixNames(name);
                if(names === null || names.length !== 2 || !SysDefine.SeparatorMap[names[0]]) {
                    cc.log(`${name} 命令不规范, 请使用_lab$xxx的格式!`);
                    return ;
                }
                // 未定义的类型
                if(!component[`${names[0]}s`]) {
                    cc.log(`${name[0]}s没有在BaseUIForm中定义, 并不会影响运行`);
                    component[`${names[0]}s`] = {};
                }
                if(component[`${names[0]}s`][names[1]]) {
                    cc.log(`${name} 已经被绑定了, 请检查您是否出现了重名的情况!`);
                }
                if(SysDefine.SeparatorMap[names[0]] === 'cc.Node') {
                    component[`${names[0]}s`][names[1]] = node;
                }else {
                    component[`${names[0]}s`][names[1]] = node.getComponent(SysDefine.SeparatorMap[names[0]]);
                }
                
            }
            // 绑定子节点
            node.children.forEach((target: cc.Node) => {
                this._bindSubNode(target, component);
            });
        }
        
    }
}