import { MoveComponent } from "../Components/MoveComponent";

export class MoveSystem extends es.EntityProcessingSystem {

    constructor() {
        super(es.Matcher.empty().all(MoveComponent));
    }

    processEntity(entity: es.Entity) {
        const move = entity.getComponent(MoveComponent);
        if(!move.enabled) return ;
        move.enabled = false;

        if(move.time <= 0) {
            entity.setPosition(move.position.x, move.position.y);
            entity.removeComponent(move);
            return ;
        }

        entity.tweenPositionTo(move.position, move.time).setCompletionHandler(() => {
            entity.removeComponent(move);
        }).start();
    }


}