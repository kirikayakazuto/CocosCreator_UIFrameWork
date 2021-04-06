import { FormType } from "./config/SysDefine";
import { ModalType } from "./Struct";
import UIBase from "./UIBase";

export class UIScreen extends UIBase {
    formType = FormType.Screen;

}

export class UIWindow extends UIBase {
    formType = FormType.Window;
    modalType = new ModalType();
}

export class UIFixed extends UIBase {
    formType = FormType.Fixed;
}

export class UITips extends UIBase {
    formType = FormType.Tips;
}

