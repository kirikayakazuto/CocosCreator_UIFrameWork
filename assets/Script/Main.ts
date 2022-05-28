import UINavigator from "./UIScript/UINavigator";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {
    
    onLoad() {

    }

    start () {
        UINavigator.open();
    }
    
    onDestroy() {
        
    }
}