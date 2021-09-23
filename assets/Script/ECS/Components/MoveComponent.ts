export class MoveComponent extends es.Component {
    public position: es.Vector2 = es.Vector2.zero;
    public time: number = 0;

    constructor() {
        super();
        this.position = this.entity.position;
    }
    public onAddedToEntity() {
        console.log("[movecomponent]: on added to entity");
        
    }

    public onRemovedFromEntity() {
        this.position = es.Vector2.zero;
    }

    public setPosition(x: number, y: number, time = 1) {
        console.log("[movecomponent] set position");
        this.position.x = x;
        this.position.y = y;
        this.time = time;
    }
}