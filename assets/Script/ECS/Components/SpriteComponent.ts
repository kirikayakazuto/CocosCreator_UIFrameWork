import { Batcher } from "../Graphics/Batcher";
import { CameraComponent } from "./CameraComponent";

export class SpriteComponent extends es.RenderableComponent {

    private _sprite: cc.Sprite = null;
    public get sprite() {
        return this._sprite;
    }
    public set sprite(val: cc.Sprite) {
        this._sprite = val;
        if (this._sprite != null) {
            const node = this._sprite.node;
            //@ts-ignore
            const originPoint = node._anchorPoint;
            if (originPoint) {
                const scale = this.entity ? this.entity.transform.scale : new es.Vector2(this._sprite.node.scaleX, this._sprite.node.scaleY);
                this._origin = new es.Vector2(originPoint.x * this.getwidth() / scale.x, originPoint.y * this.getheight() / scale.y);
            }
        }
    }

    private _origin: es.Vector2 = null;
    public get origin() {
        return this._origin;
    }
    public set origin(value: es.Vector2) {
        if (!this._origin.equals(value)) {
            this._origin = value;
            this._areBoundsDirty = true;
        }
    }

    constructor(sprite: cc.Sprite) {
        super();
        this.sprite = sprite;
    }

    onAddedToEntity() {
        super.onAddedToEntity();
        if (!this._sprite.node.parent) {
            cc.find('Canvas')?.addChild(this._sprite.node);
        }
    }

    onRemovedFromEntity() {
        super.onRemovedFromEntity();
        this._sprite.node.removeFromParent();
        this._sprite.node.destroy();
    }

    public getBounds() {
        if(this._areBoundsDirty) {
            this._areBoundsDirty = false;        
            if(!this._sprite || !this._sprite.spriteFrame) return null;
            this._bounds.calculateBounds(this.entity.transform.position, this._localOffset, this._origin, this.entity.transform.scale, this.entity.transform.rotation, this.getwidth(), this.getheight());
        }
        return this._bounds;
    }

    public getWidth() {
        return this._sprite.node.width;
    }
    public getHeight() {
        return this._sprite.node.height;
    }

    public render(batcher: Batcher, camera: CameraComponent): void {

    }
}