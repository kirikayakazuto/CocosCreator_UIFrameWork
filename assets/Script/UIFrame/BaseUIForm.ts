import CocosHelper from "./CocosHelper";
import UIManager from "./UIManager";
import UIType from "./UIType";
import { UIFormType } from "./config/SysDefine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseUIForm extends cc.Component {

    /** 窗体类型 */
    public CurrentUIType = new UIType();
    public NodeName = "";

    /**
     * 显示状态
     */
    public DisPlay() {
        this.node.active = true;
        if(this.CurrentUIType.UIForms_Type == UIFormType.PopUp) {

        }
    }
    public Hiding() {
        this.node.active = false;
    }
    public ReDisPlay() {
        this.node.active = true;
    }
    public Freeze() {
        this.node.active = true;
    }


    /**
     * 注册点击事件
     */
    public RigisterNodeEvent(nodeName: string, eventName: string, callback: Function, targer: any) {
        let node = CocosHelper.FindChildInNode(nodeName, this.node);
        if(!node) {
            return ;
        }
        node.on(eventName, callback, targer);
    }
    public OffRigisterNodeEvent(nodeName: string, eventName: string, callback: Function, targer: any) {
        let node = CocosHelper.FindChildInNode(nodeName, this.node);
        if(!node) {
            return ;
        }
        node.off(eventName, callback, targer);
    }

    /**
     * 窗口生命周期
     */
    public OpenUIForm(uiFormName: string) {
        this.NodeName = uiFormName;
        UIManager.GetInstance().ShowUIForms(uiFormName);
    }
    public CloseUIForm() {
        UIManager.GetInstance().CloseUIForms(this.NodeName);
    }

    /**
     * 消息机制
     */
    public SendMessage() {

    }
    public ReceiveMessage(messagType: string, callback: Function, targer: any) {

    }

    /**
     * 语言配置
     * @param id 配置表对应的id
     */
    public getText(id: string) {

    }



}
