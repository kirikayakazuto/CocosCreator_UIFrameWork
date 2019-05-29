import { UIFormType, UIFormShowMode, UIFormLucenyType } from "./config/SysDefine";

export default class UIType {
    //是否清空“栈集合”
    public IsClearStack = false;
    //UI窗体（位置）类型
    public UIForms_Type = UIFormType.Normal;
    //UI窗体显示类型
    public UIForms_ShowMode = UIFormShowMode.Normal;
    //UI窗体透明度类型
    public UIForm_LucencyType = UIFormLucenyType.Lucency;

    constructor(formtype?: UIFormType, showMode?: UIFormShowMode, lucencyType?: UIFormLucenyType, isClearStack?: boolean) {
        this.UIForms_Type = formtype || this.UIForms_Type;
        this.UIForms_ShowMode = showMode || this.UIForms_ShowMode;
        this.UIForm_LucencyType = lucencyType || this.UIForm_LucencyType;
        this.IsClearStack = isClearStack || this.IsClearStack;
    }

}