
import { _decorator, Component, Node } from 'cc';
import { FormType } from './UIFrame/config/SysDefine';
import FormMgr from './UIFrame/FormMgr';
const { ccclass, property } = _decorator;

 
@ccclass('Main')
export class Main extends Component {

    start () {
        FormMgr.open({
            prefabUrl: "forms/UIHome",
            type: FormType.Screen
        });
    }
}
