/**
 * @Author: 邓朗 
 * @Date: 2019-06-12 15:08:40  
 * @Describe: 窗体基类
 * 窗体流程
 * 使用UIManager.getInstance().showUIForms("YourUIFormName"); 加载窗体时(如果是首次加载, 会将窗体加载到全局窗体缓存中), 将窗体挂载到对应类型节点上
 * 1, 首先为UIFormName赋值为YourUIFormName
 * 2, 掉用init方法, 这个时候你可以为窗体进行初始化操作, init方法在onload之后执行
 * 3, 将窗体加载到了结点对应类型的窗体缓存中
 * 4, 执行DisPlay方法, 如果你重写了ShowPopUpAnimation方法(播放入场动画, 不要忘了在方法内执行callback), 那么会执行它
 * 5, 关闭窗口请执行CloseUIForm方法, 调用了CloseUIForm方法, 会调用HidePopUpAnimation方法播放出场动画, 在将窗体从结点对应类型的窗体缓存中删除
 */
import UIManager from "./UIManager";
import UIType from "./UIType";
import { UIFormType } from "./config/SysDefine";
import UIMaskManager from "./UIMaskManager";
import GEventManager from "./GEventManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseUIForm extends cc.Component {

    /** 窗体名字,该窗体的唯一标示(请不要对这个值进行赋值操作, 内部已经实现了对应的赋值) */
    public UIFormName: string;
    /** 窗体类型 */
    public CurrentUIType = new UIType();
    /** 是否点击阴影关闭弹窗 */
    public ClickMaskClose = false;
    /** 关闭窗口后销毁 (注意, 此销毁会销毁结点资源,以及其依赖的资源,例如cc.Sprite的图片, 音频等等, 如果你只想销毁结点,请手动调用node的destory方法) */
    public CloseAndDestory = false;
    
    /**
     * 消息初始化
     * 子类需重写此方法
     * @param obj
     */
    public init(obj?: any) {
        // todo...
    }
    
    /**
     * 显示窗体
     */
    public DisPlay() {
        this.node.active = true;
        if(this.CurrentUIType.UIForms_Type == UIFormType.PopUp) {
            this.ShowPopUpAnimation(() => {
                UIMaskManager.getInstance().addMaskWindow(this.node, this.CurrentUIType.UIForm_LucencyType);    
            });
        }
    }
    /**
     * 隐藏, 已经进行删除操作(在全局表中有缓存), 需要重新showUIForm
     */
    public Hiding() {
        if(this.CurrentUIType.UIForms_Type == UIFormType.PopUp) {
            UIMaskManager.getInstance().removeMaskWindow(this.node); 
        }
        this.HidePopUpAnimation(() => {
            this.node.active = false;
        });
    }
    /**
     * 暂时无效果, 预计实现成(去除冻结的效果)
     */
    public ReDisPlay() {
        if(this.CurrentUIType.UIForms_Type == UIFormType.PopUp) {}
    }
    /**
     * 暂时无效果,  预计实现成(冻结住窗口, 无妨响应任何点击事件)
     */
    public Freeze() {
        if(this.CurrentUIType.UIForms_Type == UIFormType.PopUp) {}
    }

    /**
     * 显示与关闭
     */
    public ShowUIForm(uiFormName: string, obj?: any) {
        UIManager.GetInstance().ShowUIForms(uiFormName, obj);
    }
    public CloseUIForm() {
        UIManager.GetInstance().CloseUIForms(this.UIFormName);
    }

    /**
     * 弹窗动画
     */
    public ShowPopUpAnimation(callback: Function) {
        callback();
    }
    public HidePopUpAnimation(callback: Function) {
        callback();
    }

    /**
     * 消息机制
     */
    public SendMessage(messagType: string, parmas: any) {
        GEventManager.emit(messagType, parmas);
    }
    public ReceiveMessage(messagType: string, callback: Function, targer: any) {
        GEventManager.on(messagType, callback, targer);
    }
}
