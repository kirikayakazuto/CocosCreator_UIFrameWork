type Intersect = {x: number, y: number, param: number, angle?: number} 
export default class LightUtils {

    public static init() {
        
    }
    /** 获得结点多边形s */
    public static getItemPolygons(nodes: cc.Node[], worldCenterPos: cc.Vec2 = cc.v2(0, 0)) {
        let polygons: cc.Vec2[][] = [];
        for(let i=0; i<nodes.length; i++) {
            let com = nodes[i].getComponent(cc.PolygonCollider);
            if(!com) continue;
            let obj: cc.Vec2[] = [];
            for(const e of com.points) {
                obj.push(cc.v2(e.x, e.y));
            }
            for(let j=0; j<obj.length; j++) {
                obj[j].addSelf(nodes[i].getPosition()).subSelf(worldCenterPos);
            }
            polygons[i] = obj;
        }
        return polygons;
    }

    /** 获得所有射线与多边形的交点 */
    public static getIntersect(light: cc.Vec2, polygons: cc.Vec2[][]) {
        let rayStart = light;
        let rayEnds = this.getRayEnds(polygons);
        let intersects: Intersect[] = [];
        for(const rayEnd of rayEnds) {
            // 这里需要对rayend 进行一次分散, 因为在与多边形交点判断时, 需要判断光线在交点周围的情况
            // 这里可以做一次优化, 主要是可以不计算三角函数 牺牲一些精度, 让rayEnd左右移动确定值实现分散
            let angle = Math.atan2(rayEnd.y-rayStart.y,rayEnd.x-rayStart.x);
            for(let i=-1; i<=1; i++) {
                let tmpRayEnd = cc.v2(Math.cos(angle+i*0.00001)+rayEnd.x ,Math.sin(angle + i*0.00001)+rayEnd.y);
                let intersect = this.getIntersectByPolygons(polygons, rayStart, tmpRayEnd);
                if(!intersect) continue;
                // 计算角度 用来对交点进行排序
                intersect.angle = angle;
                intersects.push(intersect);
            }
        }
        intersects = intersects.sort(function(a,b){
            return a.angle-b.angle; // 升序
        });

        return intersects;
    }
    /** 获得射线 */
    private static getRayEnds(polygons: cc.Vec2[][]) {
        let rayEnds: cc.Vec2[] = [];
        let set = {};
        for(let i=0; i<polygons.length; i++) {
            let seg = polygons[i];
            for(let j=0; j<seg.length; j++) {
                let key = seg[j].x + ',' + seg[j].y;
                if(key in set) {
                    continue;
                }
                rayEnds.push(seg[j]);
            }
        }
        return rayEnds;
    }

    /** 获得射线和多边形们最近交点 */
    private static getIntersectByPolygons(polygons: cc.Vec2[][], rayStart: cc.Vec2, rayEnd: cc.Vec2) {
        let closestIntersect: Intersect = null;
        for(let i=0; i<polygons.length; i++) {
            let seg = polygons[i];
            for(let j=0; j<seg.length; j++) {
                let intersect = this.getIntersectBySegment(rayStart, rayEnd, seg[j], j === seg.length-1 ? seg[0] : seg[j+1]);
                if(!intersect) continue;
                if(!closestIntersect || intersect.param < closestIntersect.param) {
                    closestIntersect = intersect;
                }
            }
        }
        return closestIntersect;
    }

    /** 寻找射线和线段的交点 */
    private static getIntersectBySegment(ray1: cc.Vec2, ray2: cc.Vec2, seg1: cc.Vec2, seg2: cc.Vec2): Intersect{
        let r_px = ray1.x;
        let r_py = ray1.y;
        let r_dx = ray2.x - ray1.x;
        let r_dy = ray2.y - ray1.y;

        let s_px = seg1.x;
        let s_py = seg1.y;
        let s_dx = seg2.x - seg1.x;
        let s_dy = seg2.y - seg1.y;

        let r_mag = Math.sqrt(r_dx*r_dx+r_dy*r_dy);
        let s_mag = Math.sqrt(s_dx*s_dx+s_dy*s_dy);
        if(r_dx/r_mag==s_dx/s_mag && r_dy/r_mag==s_dy/s_mag){
            // Unit vectors are the same.
            return null;
        }

        let T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx);
        let T1 = (s_px+s_dx*T2-r_px)/r_dx;

        // Must be within parametic whatevers for RAY/SEGMENT
        if(T1<0) return null;
        if(T2<0 || T2>1) return null;

        // Return the POINT OF INTERSECTION
        return {
            x: r_px+r_dx*T1,
            y: r_py+r_dy*T1,
            param: T1
        };
    }

    /** 通过角度剔除交点, 角度是逆时针方向 */
    public static getIntersectByAngle(startAngle: number, angleRange: number, light: cc.Vec2, polygons: cc.Vec2[][]) {
        let endAngle = startAngle + angleRange;
        startAngle *= 0.017453;
        endAngle *= 0.017453;
        // 本质就是以light为原点搭建坐标系
        let rayEnd1 = cc.v2(Math.cos(startAngle), Math.sin(startAngle)).add(light);
        let rayEnd2 = cc.v2(Math.cos(endAngle), Math.sin(endAngle)).add(light);

        // 算交点
        let intersect1 = this.getIntersectByPolygons(polygons, light, rayEnd1);
        intersect1.angle = startAngle;
        let intersect2 = this.getIntersectByPolygons(polygons, light, rayEnd2);
        intersect2.angle = endAngle;

        // 获得所有交点
        let intersects = this.getIntersect(light, polygons);
        // 剔除角度外的交点, 这里可以优化, 因为intersects是有序的, 可以使用二分法查找
        // 二分法, 已优化
        let start = this.binarySearchIntersects(intersects, startAngle, true);
        let end = this.binarySearchIntersects(intersects, endAngle, false);
        intersects = intersects.slice(start, end+1);

        intersects.unshift({x:light.x, y: light.y, param: 0}, intersect1)
        intersects.push(intersect2);

        return intersects;
    }

    /** 绘制light */
    public static drawLight(graphics: cc.Graphics, light: cc.Vec2, polygons: cc.Vec2[][]) {
        graphics.clear();
        // 圆形
        // let intersects = LightUtils.getIntersect(light, polygons);
        // 扇形
        let intersects = LightUtils.getIntersectByAngle(60, 60, light, polygons);
        graphics.moveTo(intersects[0].x, intersects[0].y);
        for(let i=1; i<intersects.length; i++) {
            let intersect = intersects[i];
            graphics.lineTo(intersect.x, intersect.y);
        }
        graphics.moveTo(intersects[0].x, intersects[0].y);
        
        graphics.fill();

        for(let i=0; i<intersects.length; i++) {
            let intersect = intersects[i];
            graphics.moveTo(light.x, light.y);
            graphics.lineTo(intersect.x, intersect.y);
            graphics.stroke();
        }
    }

    public static binarySearchIntersects(arr: Intersect[], angle: number, findFlag = false) {
        let start = 0, end = arr.length-1;
        while(end-start > 1){
            var idx = Math.floor((start + end) / 2);
            if (angle < arr[idx].angle) {
                end = idx;
            } else if (angle > arr[idx].angle) {
                   start = idx
            } else {
                return idx;
            }
        }
        // 没有找到对应的值
        return findFlag ? end : start;
    }



}