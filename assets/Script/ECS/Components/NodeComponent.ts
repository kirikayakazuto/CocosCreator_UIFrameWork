export class NodeComponent extends es.Component {
    public node: cc.Node = null;
    constructor(node: cc.Node) {
        super();
        this.node = node;
    }

    public onAddedToEntity() {
        this.syncTransform();
    }

    public onRemovedFromEntity() {
        this.node.removeFromParent();
        this.node.destroy();
    }

    public onEntityTransformChanged(componentTransform: es.ComponentTransform) {
        switch(componentTransform) {
            case es.ComponentTransform.position:
                this.node.setPosition(this.transform.position.x, this.transform.position.y);
                break;
            case es.ComponentTransform.rotation:
                this.node.rotation = this.transform.rotation;
                break;
            case es.ComponentTransform.scale:
                this.node.setScale(this.transform.scale.x, this.transform.scale.y);
                break;
        }
    }

    private syncTransform() {
        this.transform.setPosition(this.node.x, this.node.y);
        this.transform.setRotation(this.node.rotation);
        this.transform.setScale(new es.Vector2(this.node.scaleX, this.node.scaleY));
    }

}