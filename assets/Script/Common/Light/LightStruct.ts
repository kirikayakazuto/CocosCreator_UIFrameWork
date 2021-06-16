/** 交点 */
export class Intersection {
    x: number;
    y: number;
    len: number;                // 该点到光源的距离
    angle?: number;             // 角度, 需要排序用

    constructor(x: number, y: number, len: number, angle?: number) {
        this.x = x;
        this.y = y;
        this.len = len;
        this.angle = angle;
    }
}