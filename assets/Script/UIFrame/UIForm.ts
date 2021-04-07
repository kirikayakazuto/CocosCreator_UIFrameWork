import { FormType } from "./config/SysDefine";
import { ModalType } from "./Struct";
import UIBase from "./UIBase";

export class UIScreen extends UIBase {
    formType = FormType.Screen;
    
}

export class UIWindow extends UIBase {
    formType = FormType.Window;    
    modalType = new ModalType();                // 阴影类型
    priority = 0;                               // 优先级(会影响弹窗的层级, 先判断优先级, 在判断添加顺序)
     
}

export class UIFixed extends UIBase {
    formType = FormType.Fixed;
}

export class UITips extends UIBase {
    formType = FormType.Tips;
}

