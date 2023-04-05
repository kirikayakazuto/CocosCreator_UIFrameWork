import PropController from "./Common/Components/PropController";
import UINavigator from "./UIScript/UINavigator";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {
    
    @property(PropController) building: PropController = null;
    onLoad() {
        
    }

    start () {
        UINavigator.open();
    }
    
    onDestroy() {
        
    }
}