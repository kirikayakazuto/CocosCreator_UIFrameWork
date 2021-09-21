import { Batcher } from "./ECS/Graphics/Batcher";
import { Input } from "./ECS/Input/Input";
import { KeyboardUtils } from "./ECS/Input/KeyboardUtils";
import BaseScene from "./ECS/Scenes/BaseScene";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    onLoad() {        
    }

    start () {
        es.Core.debugRenderEndabled = true;
        es.Core.create(true);

        es.Graphics.instance = new es.Graphics(new Batcher());

        KeyboardUtils.init();
        Input.initialize();

        es.Core.scene = new BaseScene();
    }

    onDestroy() {

    }  
    
    update(dt: number) {
        es.Core.emitter.emit(es.CoreEvents.frameUpdated, dt);
    }
}
