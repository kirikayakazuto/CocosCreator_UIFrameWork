export class MoveComponent extends es.Component {
    public position: es.Vector2 = es.Vector2.zero;
    public time: number = 0;


    public onAddedToEntity() {
        this.position = this.entity.position;
    }

    public onRemovedFromEntity() {
        this.position = es.Vector2.zero;
    }

    public setPosition(x: number, y: number) {
        this.position.setTo(x, y);
    }
}