import { Intersection } from "./LightStruct";

export default class LightUtils {

    /** 获得所有射线与多边形的交点 */
    public static getIntersections(light: cc.Vec2, polygons: cc.Vec2[][]) {
        let rayStart = light;
        let rayEnds = this.getRayEnds(polygons);            // 
        let intersects: Intersection[] = [];
        for(const rayEnd of rayEnds) {
            // 这里需要对rayend 进行一次分散, 因为在与多边形交点判断时, 需要判断光线在交点周围的情况
            // 这里可以做一次优化, 主要是可以不计算三角函数 牺牲一些精度, 让rayEnd左右移动确定值实现分散
            let angle = Math.atan2(rayEnd.y-rayStart.y,rayEnd.x-rayStart.x);
            for(let i=-1; i<=1; i++) {
                let tmpRayEnd = cc.v2(Math.cos(angle+i*0.00001)+rayEnd.x, Math.sin(angle + i*0.00001)+rayEnd.y);
                let intersect = this.getIntersection(polygons, rayStart, tmpRayEnd);
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
    /** 获得射线, 做了一次去除 */
    private static getRayEnds(polygons: cc.Vec2[][]) {
        let rayEnds: cc.Vec2[] = [];
        let set = {};
        for(let i=0; i<polygons.length; i++) {
            let seg = polygons[i];
            for(let j=0; j<seg.length; j++) {
                // let key = seg[j].x + ',' + seg[j].y;
                // if(key in set) {
                //     continue;
                // }
                rayEnds.push(seg[j]);
            }
        }
        return rayEnds;
    }

    /** 获得射线和多边形们最近交点 */
    private static getIntersection(polygons: cc.Vec2[][], rayStart: cc.Vec2, rayEnd: cc.Vec2) {
        let closestIntersect: Intersection = null;  // 交点
        for(let i=0; i<polygons.length; i++) {
            let seg = polygons[i];
            for(let j=0; j<seg.length; j++) {
                let intersect = this._doGetIntersection(rayStart, rayEnd, seg[j], j === seg.length-1 ? seg[0] : seg[j+1]);
                if(!intersect) continue;
                if(!closestIntersect || intersect.len < closestIntersect.len) {
                    closestIntersect = intersect;
                }
            }
        }
        return closestIntersect;
    }
    
    // private static _doGetIntersection(ray1: cc.Vec2, ray2: cc.Vec2, seg1: cc.Vec2, seg2: cc.Vec2): Intersection {  
    //     let area_abc = (ray1.x - seg1.x) * (ray2.y - seg1.y) - (ray1.y - seg1.y) * (ray2.x - seg1.x);  
    //     let area_abd = (ray1.x - seg2.x) * (ray2.y - seg2.y) - (ray1.y - seg2.y) * (ray2.x - seg2.x);   
    //     // 面积符号相同则两点在线段同侧,不相交 
    //     if (area_abc * area_abd >= 0) return null;
    //     // 三角形cda 面积的2倍  
    //     let area_cda = (seg1.x - ray1.x) * (seg2.y - ray1.y) - (seg1.y - ray1.y) * (seg2.x - ray1.x);
    //     // 三角形cdb 面积的2倍  
    //     let area_cdb = area_cda + area_abc - area_abd;
    //     if (area_cda * area_cdb >= 0) return null;

    //     //计算交点坐标  
    //     let t = area_cda / (area_abd - area_abc);
    //     let dx = t * (ray2.x - ray1.x),  dy = t * (ray2.y - ray1.y);  

    //     return {
    //         x: ray1.x + dx,
    //         y: ray1.y + dy,
    //         len: dx * dx + dy * dy
    //     }      
    // }  

    /** 通过角度剔除交点, 角度是逆时针方向 */
    public static getIntersectionByAngle(startAngle: number, angleRange: number, light: cc.Vec2, polygons: cc.Vec2[][]) {
        let endAngle = startAngle + angleRange;
        startAngle *= 0.017453;
        endAngle *= 0.017453;
        // 本质就是以light为原点搭建坐标系
        let rayEnd1 = cc.v2(Math.cos(startAngle), Math.sin(startAngle)).add(light);
        let rayEnd2 = cc.v2(Math.cos(endAngle), Math.sin(endAngle)).add(light);

        // 算交点
        let intersect1 = this.getIntersection(polygons, light, rayEnd1);
        intersect1.angle = startAngle;
        let intersect2 = this.getIntersection(polygons, light, rayEnd2);
        intersect2.angle = endAngle;

        // 获得所有交点
        let intersects = this.getIntersections(light, polygons);
        // 剔除角度外的交点, 这里可以优化, 因为intersects是有序的, 可以使用二分法查找
        // 二分法, 已优化
        let start = this.binarySearchIntersects(intersects, startAngle, true);
        let end = this.binarySearchIntersects(intersects, endAngle, false);
        intersects = intersects.slice(start, end+1);

        intersects.unshift({x:light.x, y: light.y, len: 0}, intersect1)
        intersects.push(intersect2);

        return intersects;
    }


    public static binarySearchIntersects(arr: Intersection[], angle: number, findFlag = false) {
        let start = 0, end = arr.length-1;
        while(end-start > 1){
            let idx = Math.floor((start + end) / 2);
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

    /** 寻找射线和线段的交点 */
    private static _doGetIntersection(ray1: cc.Vec2, ray2: cc.Vec2, seg1: cc.Vec2, seg2: cc.Vec2) {
        let r_px = ray1.x;
        let r_py = ray1.y;
        let r_dx = ray2.x - ray1.x;
        let r_dy = ray2.y - ray1.y;

        let s_px = seg1.x;
        let s_py = seg1.y;
        let s_dx = seg2.x - seg1.x;
        let s_dy = seg2.y - seg1.y;

        // 射线长度
        let r_mag = Math.sqrt(r_dx * r_dx + r_dy * r_dy);
        // 线段长度
        let s_mag = Math.sqrt(s_dx * s_dx + s_dy * s_dy);
        // 两向量方向相同, return
        if(r_dx / r_mag == s_dx / s_mag && r_dy / r_mag == s_dy / s_mag){
            // Unit vectors are the same.
            return null;
        }

        let T2 = (r_dx * (s_py - r_py) + r_dy * (r_px - s_px)) / (s_dx * r_dy - s_dy * r_dx);
        let T1 = (s_px + s_dx * T2 - r_px) / r_dx;

        // Must be within parametic whatevers for RAY/SEGMENT
        if(T1 < 0) return null;
        if(T2 < 0 || T2 > 1) return null;

        // Return the POINT OF INTERSECTION
        return {
            x: r_px + r_dx * T1,
            y: r_py + r_dy * T1,
            len: T1
        };
    }
}