import { CameraComponent } from "../Components/CameraComponent";
const TAG = "RenderScene";

export var sampleList: {[key: string] : new () => RenderScene} = cc.js.createMap();

export function sampleScene(name: string) {
    return function(target: any) {
        if(sampleList[name]) {
            cc.log(TAG, "sampleList has same name:" + name)
        }
        sampleList[name] = target;
    }
}

export class RenderScene extends es.Scene {
    constructor() {
        super();

        let cameraEntity = this.createEntity("camera");
        this.camera = cameraEntity.addComponent(new CameraComponent());
    }
}