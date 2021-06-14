/** 交点 */
export class Intersection {
    x: number;
    y: number;
    len: number;
    angle?: number;

    constructor(x: number, y: number, len: number, angle?: number) {
        this.x = x;
        this.y = y;
        this.len = len;
        this.angle = angle;
    }
}