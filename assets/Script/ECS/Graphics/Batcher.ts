const MAX_STROKE = 4096;
export class Batcher implements es.IBatcher {
    private camera: es.ICamera = null;
    private graphics: cc.Graphics = null;
    private strokeNum = 0;
    

    constructor() {
        this.graphics = cc.find("Canvas/Graphics")?.getComponent(cc.Graphics);
        if(!this.graphics) {
            this.graphics = new cc.Node("Graphics").addComponent(cc.Graphics);
            this.graphics.node.parent = cc.find("Canvas");
        }
    }

    begin(cam: es.ICamera) {
        this.graphics.clear();
        this.camera = cam;
        this.strokeNum = 0;
    }

    end() {
        if(this.strokeNum <= 0) return ;
        this.strokeNum = 0;
        this.graphics.stroke();
    }

    drawPoints(points: es.Vector2[], color: es.Color, thickness?: number) {
        if(points.length < 2) return ;
        for (let i = 1; i < points.length; i++)
            this.drawLine(points[i - 1], points[i], color, thickness);
    }

    drawPolygon(position: es.Vector2, points: es.Vector2[], color: es.Color, closePoly: boolean, thickness?: number) {
        if (points.length < 2)
        return;

        for (let i = 1; i < points.length; i ++)
            this.drawLine(es.Vector2.add(position, points[i - 1]), es.Vector2.add(position, points[i]), color, thickness);

        if (closePoly)
            this.drawLine(es.Vector2.add(position, points[points.length - 1]), es.Vector2.add(position, points[0]), color, thickness);
    }

    drawHollowRect(x: number, y: number, width: number, height: number, color: es.Color, thickness?: number) {
        this.graphics.strokeColor = cc.color(color.r, color.g, color.b);
        this.graphics.lineWidth = thickness;

        const tl = es.Vector2Ext.round(new es.Vector2(x, y));
        const tr = es.Vector2Ext.round(new es.Vector2(x + width, y));
        const br = es.Vector2Ext.round(new es.Vector2(x + width, y + height));
        const bl = es.Vector2Ext.round(new es.Vector2(x, y + height));

        this.drawLine(tl, tr, color, thickness);
        this.drawLine(tr, br, color, thickness);
        this.drawLine(br, bl, color, thickness);
        this.drawLine(bl, tl, color, thickness);
    }

    drawCircle(position: es.Vector2, radius: number, color: es.Color, thickness?: number) {
        const bounds = new es.Rectangle(position.x - radius, position.y - radius, radius * 2, radius * 2);
        if (this.camera && !this.camera.bounds.intersects(bounds))
            return;

        this.graphics.strokeColor = cc.color(color.r, color.g, color.b);
        this.graphics.lineWidth = thickness;
        this.graphics.circle(position.x, position.y, radius);
        this.strokeNum ++;
        this.flushBatch();
    }

    drawCircleLow(position: es.Vector2, radius: number, color: es.Color, thickness?: number, resolution?: number): any {
        let last = es.Vector2.unitX.multiplyScaler(radius);
        let lastP = es.Vector2Ext.perpendicularFlip(last);

        for (let i = 1; i <= resolution; i ++) {
            const at = es.MathHelper.angleToVector(i * es.MathHelper.PiOver2 / resolution, radius);
            const atP = es.Vector2Ext.perpendicularFlip(at);

            this.drawLine(es.Vector2.add(position, last), es.Vector2.add(position, at), color, thickness);
            this.drawLine(position.sub(last), position.sub(at), color, thickness);
            this.drawLine(es.Vector2.add(position, lastP), es.Vector2.add(position, atP), color, thickness);
            this.drawLine(position.sub(lastP), position.sub(atP), color, thickness);

            last = at;
            lastP = atP;
        }
    }

    drawRect(x: number, y: number, width: number, height: number, color: es.Color): any {
        const rect = new es.Rectangle(x, y, width, height);
        if (!this.camera || !this.camera.bounds.intersects(rect)) return;
            
        this.graphics.strokeColor = cc.color(color.r, color.g, color.b);
        this.graphics.lineWidth = 1;
        this.graphics.rect(Math.trunc(x), Math.trunc(y), Math.trunc(width), Math.trunc(height));
        this.strokeNum ++;
        this.flushBatch();
    }

    drawLine(start: es.Vector2, end: es.Vector2, color: es.Color, thickness: number): any {
        const bounds = es.RectangleExt.boundsFromPolygonVector([start, end]);
        if(!this.camera || !this.camera.bounds.intersects(bounds)) return ;

        this.graphics.lineWidth = thickness;
        this.graphics.strokeColor = cc.color(color.r, color.g, color.b);
        this.graphics.moveTo(start.x, start.y);
        this.graphics.lineTo(end.x, end.y);
        this.strokeNum ++;
        this.flushBatch();
    }

    drawPixel(position: es.Vector2, color: es.Color, size?: number): any {
        const destRect = new es.Rectangle(Math.trunc(position.x), Math.trunc(position.y), size, size);
        if(size != 1) {
            destRect.x -= Math.trunc(size * 0.5);
            destRect.y -= Math.trunc(size * 0.5);
        }
        if(!this.camera || !this.camera.bounds.intersects(destRect)) return ;

        this.graphics.strokeColor = cc.color(color.r, color.g, color.b);
        this.graphics.lineWidth = size;
        this.graphics.rect(destRect.x, destRect.y, destRect.width, destRect.height);
        this.strokeNum ++;
        this.flushBatch();
    }

    public flushBatch() {
        if(this.strokeNum >= MAX_STROKE) {
            this.strokeNum = 0;
            this.graphics.clear();
        }
    }
}