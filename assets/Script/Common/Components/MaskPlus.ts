enum MaskPlusType {
    /**
     * !#en Rect mask.
     * !#zh 使用矩形作为遮罩
     * @property {Number} RECT
     */
    RECT = 0,
    /**
     * !#en Ellipse Mask.
     * !#zh 使用椭圆作为遮罩
     * @property {Number} ELLIPSE
     */
    ELLIPSE = 1,
    /**
     * !#en Image Stencil Mask.
     * !#zh 使用图像模版作为遮罩
     * @property {Number} IMAGE_STENCIL
     */
    IMAGE_STENCIL = 2,

    Polygon = 3,
}
/**
 * 遮罩扩展
 * 自定义多边形遮罩
 */
const {ccclass, property, executeInEditMode, menu, help, inspector} = cc._decorator;
@ccclass
@menu('i18n:MAIN_MENU.component.renderers/Mask') 
@executeInEditMode
@help('i18n:COMPONENT.help_url.mask')
@inspector('packages://maskplus/inspector.js')
export default class MaskPlus extends cc.Mask {

    @property({type: cc.Enum(MaskPlusType), override: true})
    _type: MaskPlusType = 0;
    @property({type: cc.Enum(MaskPlusType), override: true})
    get type() {
        return this._type; 
    }
    
    set type(value) {
        if (this._type !== value) {
            this['_resetAssembler']();
        }

        this._type = value;
        if (this._type !== MaskPlusType.IMAGE_STENCIL) {
            this.spriteFrame = null;
            this.alphaThreshold = 0;
            this._updateGraphics();
        }
        
        this['_activateMaterial']();
    }

    @property({type: [cc.Vec2], serializable: true})
    _polygon: cc.Vec2[] = [];
    @property({type: [cc.Vec2], serializable: true})
    public get polygon() {
        return this._polygon;
    }
    public set polygon(points: cc.Vec2[]) {
        this._polygon = points;
        this._updateGraphics();
    }


    _updateGraphics () {
        let node = this.node;
        let graphics = this['_graphics'];
        // Share render data with graphics content
        graphics.clear(false);
        let width = node['_contentSize'].width;
        let height = node['_contentSize'].height;
        let x = -width * node['_anchorPoint'].x;
        let y = -height * node['_anchorPoint'].y;
        if (this['_type'] === MaskPlusType.RECT) {
            graphics.rect(x, y, width, height);
        }
        else if (this['_type'] === MaskPlusType.ELLIPSE) {
            let center = cc.v2(x + width / 2, y + height / 2);
            let radius = {
                x: width / 2,
                y: height / 2
            };
            let points = super['_calculateCircle'](center, radius, this['_segments']);
            for (let i = 0; i < points.length; ++i) {
                let point = points[i];
                if (i === 0) {
                    graphics.moveTo(point.x, point.y);
                }
                else {
                    graphics.lineTo(point.x, point.y);
                }
            }
            graphics.close();
        }else if(this['_type'] === MaskPlusType.Polygon) {
            if(this._polygon.length === 0) this._polygon.push(cc.v2(0, 0));
            graphics.moveTo(this._polygon[0].x, this._polygon[0].y);
            for(let i=1; i<this._polygon.length; i++) {
                graphics.lineTo(this._polygon[i].x, this._polygon[i].y);
            }
            graphics.lineTo(this._polygon[0].x, this._polygon[0].y);
        }

        if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
            graphics.stroke();
        }
        else {
            graphics.fill();
        }
    }

}
