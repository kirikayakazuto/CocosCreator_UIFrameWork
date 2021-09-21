import { CameraComponent } from "../Components/CameraComponent";
import { ViewMainComponent } from "../Components/ViewMainComponent";
import { MoveSystem } from "../System/MoveSystem";
import { sampleScene } from "./RenderScene";

@sampleScene("BaseScene")
export default class BaseScene extends es.Scene {
    public initialize() {
        console.log("============ initialize")
        this.addEntityProcessor(new MoveSystem());
    }

    onStart() {
        console.log("======== on start")
        let entity = this.createEntity('ViewMain');
        entity.addComponent(new ViewMainComponent());

        
    }

    restart() {
        es.Core.scene = new BaseScene();
    }
}