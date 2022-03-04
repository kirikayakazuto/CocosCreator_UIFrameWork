import UIConfig from "./UIConfig";
import FormMgr from "./UIFrame/FormMgr";
const BAN_FALG = (cc.RenderFlow.FLAG_RENDER | cc.RenderFlow.FLAG_POST_RENDER);
const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    onLoad() {        
    }

    start () {
        FormMgr.open(UIConfig.UINavigator, null, {loadingForm: UIConfig.UILoading});
    }
    
    onDestroy() {

    }      
}
