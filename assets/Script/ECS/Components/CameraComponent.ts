class CameraInset {
    left: number = 0;
    right: number = 0;
    top: number = 0;
    bottom: number = 0;
}

export class CameraComponent extends es.Component implements es.IUpdatable, es.ICamera {

    private _areMatrixesDirty: boolean = true;                          
    private _areBoundsDirty: boolean = true;

    private _transformMatrix: es.Matrix2D = es.Matrix2D.identity;
    public get transformMatrix() {
        if (this._areBoundsDirty)
            this.updateMatrixes();

        return this._transformMatrix;
    }

    private _inverseTransformMatrix = es.Matrix2D.identity;
    public get inverseTransformMatrix() {
        if(this._areBoundsDirty) this.updateMatrixes();
        return this._inverseTransformMatrix;
    }

    private _origin: es.Vector2 = es.Vector2.zero;
    public get origin() {
        return this._origin;
    }
    public set origin(val: es.Vector2) {
        if(this._origin.equals(val)) return ;
        this._origin = val;
        this._areMatrixesDirty = true;
    }

    private _ratio: es.Vector2 = es.Vector2.one;
    public get ratio() {
        return this._ratio;
    }
    public set ratio(val: es.Vector2) {
        if(this.ratio.equals(val)) return ;
        this._ratio = val;
        this._areMatrixesDirty = true;
    }

    private _inset: CameraInset = new CameraInset();

    private _bounds: es.Rectangle = new es.Rectangle();
    public get bounds() {
        if(this._areMatrixesDirty) {
            this.updateMatrixes();
        }
        if(!this._areBoundsDirty) return this._bounds;
        let viewport = cc.view.getViewportRect();
        let topLeft = this.screenToWorldPoint(new es.Vector2(this._inset.left, this._inset.top));
        let bottomRight = this.screenToWorldPoint(new es.Vector2(viewport.width - this._inset.right,
            viewport.height - this._inset.bottom));

        if (this.entity.transform.rotation != 0) {
            let topRight = this.screenToWorldPoint(new es.Vector2(viewport.width - this._inset.right,
                this._inset.top));
            let bottomLeft = this.screenToWorldPoint(new es.Vector2(this._inset.left,
                viewport.height - this._inset.bottom));

            let minX = Math.min(topLeft.x, bottomRight.x, topRight.x, bottomLeft.x);
            let maxX = Math.max(topLeft.x, bottomRight.x, topRight.x, bottomLeft.x);
            let minY = Math.min(topLeft.y, bottomRight.y, topRight.y, bottomLeft.y);
            let maxY = Math.max(topLeft.x, bottomRight.y, topRight.y, bottomLeft.y);

            this._bounds.location = new es.Vector2(minX, minY);
            this._bounds.width = maxX - minX;
            this._bounds.height = maxY - minY;
        } else {
            this._bounds.location = topLeft;
            this._bounds.width = bottomRight.x - topLeft.x;
            this._bounds.height = bottomRight.y - topLeft.y;
        }

        this._areBoundsDirty = false;
        
        return null;
    }
    
    public get position() {
        return this.entity.transform.position;
    }

    public get rotation() {
        return this.entity.transform.rotation;
    }

    private camera: cc.Camera = null;

    constructor() {
        super();
        this.camera = cc.find('Canvas/Camera')?.getComponent(cc.Camera);
        if(!this.camera) {
            this.camera = new cc.Node('Camera').addComponent(cc.Camera);
            this.camera.node.parent = cc.find("Canvas");
        }

        const visibleSize = cc.view.getVisibleSize();
        this.origin = new es.Vector2(visibleSize.width/2, visibleSize.height/2);

        const canvasSize = cc.view.getCanvasSize();
        this.ratio = new es.Vector2(visibleSize.width / canvasSize.width, visibleSize.height / canvasSize.height);
    }

    public forceMatrixUpdate() {
        this._areMatrixesDirty = true;
    }

    public onEntityTransformChanged(comp: es.ComponentTransform) {
        this._areMatrixesDirty = true;
    }

    public screenToWorldPoint(screenPosition: es.Vector2): es.Vector2 {
        this.updateMatrixes();
        es.Vector2Ext.transformR(screenPosition.multiply(this.ratio), this._inverseTransformMatrix, screenPosition);
        return screenPosition;
    }

    public worldToScreenPoint(worldPosition: es.Vector2): es.Vector2 {
        this.updateMatrixes();
        es.Vector2Ext.transformR(worldPosition.multiply(this.ratio), this._transformMatrix, worldPosition);
        return worldPosition;
    }

    public updateMatrixes() {
        if(!this._areBoundsDirty) return ;
        let tempMat: es.Matrix2D = new es.Matrix2D();
        es.Matrix2D.createTranslation(-this.entity.transform.position.x, -this.entity.transform.position.y, this._transformMatrix);

        if (this.entity.transform.rotation != 0) {
            es.Matrix2D.createRotation(this.entity.transform.rotation, tempMat);
            this._transformMatrix = this._transformMatrix.multiply(tempMat);
        }

        es.Matrix2D.createTranslation(Math.trunc(this._origin.x), Math.trunc(this._origin.y), tempMat);
        this._transformMatrix = this._transformMatrix.multiply(tempMat);

        this._inverseTransformMatrix = es.Matrix2D.invert(this._transformMatrix);

        this._areBoundsDirty = true;
        this._areMatrixesDirty = false;
    }

    update() {
        
    }
}