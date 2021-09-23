import { Batcher } from "./ECS/Graphics/Batcher";
import { Input } from "./ECS/Input/Input";
import { KeyboardUtils } from "./ECS/Input/KeyboardUtils";
import BaseScene from "./ECS/Scenes/BaseScene";
import SceneMgr from "./UIFrame/SceneMgr";
import WindowMgr from "./UIFrame/WindowMgr";
import UIConfig from "./UIScript/UIConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    onLoad() {        
    }

    start () {
        SceneMgr.open(UIConfig.Navigator.prefabUrl);
        // es.Core.debugRenderEndabled = true;
        // es.Core.create(true);

        // es.Graphics.instance = new es.Graphics(new Batcher());

        // KeyboardUtils.init();
        // Input.initialize();

        // es.Core.scene = new BaseScene();
    }

    onDestroy() {

    }  
    
    update(dt: number) {
        // es.Core.emitter.emit(es.CoreEvents.frameUpdated, dt);
    }
}
