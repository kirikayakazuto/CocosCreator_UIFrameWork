let lPolygonId = 1;
export class LPolygon{
    id: number;
    points: cc.Vec2[] = [];
    rect: cc.Rect = null;

    constructor(points: cc.Vec2[]) {
        this.id = lPolygonId++;
        this.points = points;
        let point = this.points[0];
        let xMin = point.x;
        let xMax = point.x;
        let yMin = point.y;
        let yMax = point.y;
        for(let i=0; i<this.points.length; i++) {
            if(points[i].x < xMin) xMin = points[i].x;
            if(points[i].x > xMax) xMax = points[i].x;
            if(points[i].y < yMin) yMin = points[i].y;
            if(points[i].y > yMax) yMax = points[i].y;
        }
        this.rect = cc.rect(xMin, yMin, xMax-xMin, yMax-yMin);
    }
}
