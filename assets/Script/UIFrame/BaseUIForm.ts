/**
 * @Author: 邓朗 
 * @Date: 2019-06-12 15:08:40  
 * @Describe: 窗体基类
 * 窗体流程
 * 使用UIManager.getInstance().showUIForms("YourUIFormName"); 加载窗体时(如果是首次加载, 会将窗体加载到全局窗体缓存中), 将窗体挂载到对应类型节点上
 * 1, 首先为UIFormName赋值为YourUIFormName
 * 2, 调用init方法, 这个时候你可以为窗体进行初始化操作, 流程 init ->onload ->start
 * 3, 将窗体加载到了结点对应类型的窗体缓存中
 * 4, 执行DisPlay方法, 如果你重写了ShowPopUpAnimation方法(播放入场动画, 不要忘了在方法内执行callback), 那么会执行它
 * 5, 关闭窗口请执行CloseUIForm方法, 调用了CloseUIForm方法, 会调用HidePopUpAnimation方法播放出场动画, 在将窗体从结点对应类型的窗体缓存中删除
 */
import UIManager from "./UIManager";
import { UIFormType } from "./config/SysDefine";
import UIMaskManager from "./UIMaskManager";
import GEventManager from "./GEventManager";
import BaseUIView from "./BaseUIView";
import UIIndependentManager from "./UIIndependentManager";
import { UIType, MaskType } from "./FormType";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseUIForm extends cc.Component {

    /** 窗体名字,该窗体的唯一标示(请不要对这个值进行赋值操作, 内部已经实现了对应的赋值) */
    public UIFormName: string;
    /** 窗体类型 */
    public UIType = new UIType();
    /** 阴影类型, 只对PopUp类型窗体启用 */
    public MaskType = new MaskType();
    /** 关闭窗口后销毁, 会将其依赖的资源一并销毁, 采用了引用计数的管理, 不用担心会影响其他窗体 */
    public CloseAndDestory = false;

    public view: BaseUIView = null;

    /** 预先初始化 */
    public async __preInit(obj?: any) {
        if(!this.view) {
            this.view = this.getComponent(BaseUIView);
            this.view && this.view._preInit();
        }
        this.init(obj);
        await this.load();
        if(this.UIType.UIForms_Type === UIFormType.Normal) {
            UIIndependentManager.getInstance().hideLoadingForm();
        }   
    }
    
    /**
     * 消息初始化
     * 子类需重写此方法
     * @param obj
     */
    public init(obj?: any) {}

    /** 异步加载 */
    public async load() {
        // 可以在这里进行一些资源的加载, 具体实现可以看test下的代码
    }

    /**
     * 显示窗体
     */
    public DisPlay() {
        this.node.active = true;
        if(this.UIType.UIForms_Type == UIFormType.PopUp) {
            UIMaskManager.getInstance().addMaskWindow(this.node); 
            this.ShowPopUpAnimation(() => {
                UIMaskManager.getInstance().showMask(this.UIType.UIForm_LucencyType, this.MaskType.IsEasing, this.MaskType.EasingTime);
            });
        }
    }
    /**
     * 隐藏, 需要重新showUIForm
     */
    public Hiding() {
        if(this.UIType.UIForms_Type == UIFormType.PopUp) {
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
        this.node.active = true;
        if(this.UIType.UIForms_Type == UIFormType.PopUp) {}
    }
    /**
     * 暂时无效果,  预计实现成(冻结住窗口, 无法响应任何点击事件)
     */
    public Freeze() {
        if(this.UIType.UIForms_Type == UIFormType.PopUp) {}
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
