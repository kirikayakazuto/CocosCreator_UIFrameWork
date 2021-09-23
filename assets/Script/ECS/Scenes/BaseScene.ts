import CocosHelper from "../../UIFrame/CocosHelper";
import { CameraComponent } from "../Components/CameraComponent";
import { MoveComponent } from "../Components/MoveComponent";
import { NodeComponent } from "../Components/NodeComponent";
import { ViewMainComponent } from "../Components/ViewMainComponent";
import { MoveSystem } from "../System/MoveSystem";
import { sampleScene } from "./RenderScene";

@sampleScene("BaseScene")
export default class BaseScene extends es.Scene {
    public initialize() {
        console.log("============ initialize")
        this.addEntityProcessor(new MoveSystem());

    }

    async onStart() {
        console.log("======== on start")
        let entity = this.createEntity('ViewMain');
        let viewMain = entity.addComponent(new ViewMainComponent());
        await viewMain.showView();

        let monster = this.createEntity("monster");

        let prefab = await CocosHelper.loadResSync("items/MoveItem", cc.Prefab) as cc.Prefab;
        let node = cc.instantiate(prefab);
        node.parent = entity.getComponent(ViewMainComponent).view.node;
        monster.addComponent(new NodeComponent(node));

        let move = monster.addComponent(new MoveComponent());
        
        move.setPosition(100, 100, 5);
    }

    restart() {
        es.Core.scene = new BaseScene();
    }
}