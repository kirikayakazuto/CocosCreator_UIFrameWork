import PropController from "../Common/Components/PropController";
import { UIScreen } from "../UIFrame/UIForm";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIProp extends UIScreen {

    @property(PropController) building: PropController = null;
    @property(PropController) building2: PropController = null;
    
    // onLoad () {}

    start () {

    }

    onCtrl1(event, data) {
        this.building.doControl(data);
    }

    onCtrl2(event, data) {
        this.building2.doControl(data);
    }

    // update (dt) {}
}
