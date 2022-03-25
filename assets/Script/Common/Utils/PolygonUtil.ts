import * as cc from "cc";

export class PolygonUtil {
    /**
     * 
     * @param l0 
     * @param l1 
     * @param polygon 逆时针
     * @param useDichotomy 
     */
    public static splitPolygonByLine(l0: cc.Vec2, l1: cc.Vec2, polygon: cc.Vec2[], useDichotomy = false) {
        let result: number[] = [];
        for(let i=polygon.length-1; i>=0; i--) {
            let p0 = polygon[i], 
            p1 = i==0 ? polygon[polygon.length-1] : polygon[i-1];
            let [n, p] = this.lineCrossPoint(p0, p1, l0, l1);
            if(n == -1) continue;
            polygon.splice(i, -1, p);
            result.push(i+1);
        }
        return result;
    }
    //求两条线段的交点
    //返回值：[n,p] n:0相交，1在共有点，-1不相交  p:交点
    public static lineCrossPoint(p1:cc.Vec2,p2:cc.Vec2,q1:cc.Vec2,q2:cc.Vec2): [number, cc.Vec2]{
        let a = p1,b = p2,c = q1,d = q2;
        let s1,s2,s3,s4;
        let d1,d2,d3,d4;
        let p:cc.Vec2 = new cc.Vec2(0,0);
        d1=this.dblcmp(s1=this.ab_cross_ac(a,b,c),0);
        d2=this.dblcmp(s2=this.ab_cross_ac(a,b,d),0);
        d3=this.dblcmp(s3=this.ab_cross_ac(c,d,a),0);
        d4=this.dblcmp(s4=this.ab_cross_ac(c,d,b),0);
    
        //如果规范相交则求交点
        if ((d1^d2)==-2 && (d3^d4)==-2)
        {
            p.x=(c.x*s2-d.x*s1)/(s2-s1);
            p.y=(c.y*s2-d.y*s1)/(s2-s1);
            return [0,p];
        }
    
        //如果不规范相交
        if (d1==0 && this.point_on_line(c,a,b)<=0)
        {
            p=c;
            return [1,p];
        }
        if (d2==0 && this.point_on_line(d,a,b)<=0)
        {
            p=d;
            return [1,p];
        }
        if (d3==0 && this.point_on_line(a,c,d)<=0)
        {
            p=a;
            return [1,p];
        }
        if (d4==0 && this.point_on_line(b,c,d)<=0)
        {
            p=b;
            return [1,p];
        }
        //如果不相交
        return [-1, cc.v2()];
    }
    //两条线段是否跨立
    //即非平行
    public static isLineSegmentCross(P1:cc.Vec2,P2:cc.Vec2,Q1:cc.Vec2,Q2:cc.Vec2)
    {
        if(
            ((Q1.x-P1.x)*(Q1.y-Q2.y)-(Q1.y-P1.y)*( Q1.x-Q2.x)) * ((Q1.x-P2.x)*(Q1.y-Q2.y)-(Q1.y-P2.y)*(Q1.x-Q2.x)) < 0 ||
            ((P1.x-Q1.x)*(P1.y-P2.y)-(P1.y-Q1.y)*(P1.x-P2.x)) * ((P1.x-Q2.x)*(P1.y-P2.y)-(P1.y-Q2.y)*( P1.x-P2.x)) < 0
        ) 
        {
            return true;
        }
        return false;
    }
 
    //求a点是不是在线段上，>0不在，=0与端点重合，<0在。
    public static point_on_line(a: cc.Vec2,p1: cc.Vec2, p2: cc.Vec2) 
    {
        return this.dblcmp(this.dot(p1.x-a.x,p1.y-a.y,p2.x-a.x,p2.y-a.y),0);
    }
    //点发出的右射线和线段的关系
    // 返回值: -1:不相交, 0:相交, 1:点在线段上
    public static rayPointToLine(point:cc.Vec2,linePA:cc.Vec2,linePB:cc.Vec2){
        // 定义最小和最大的X Y轴值  
        let minX = Math.min(linePA.x,linePB.x);
        let maxX = Math.max(linePA.x,linePB.x);
        let minY = Math.min(linePA.y,linePB.y);
        let maxY = Math.max(linePA.y,linePB.y);  
 
        // 射线与边无交点的其他情况  
        if (point.y < minY || point.y > maxY || point.x > maxX) {  
            return -1;  
        }  
 
        // 剩下的情况, 计算射线与边所在的直线的交点的横坐标  
        let x0 = linePA.x + ((linePB.x - linePA.x) / (linePB.y - linePA.y)) * (point.y - linePA.y);  
        if(x0 > point.x)
        {
            return 0;
        }
        if(x0 == point.x)
        {
            return 1;
        }
        return -1;
    }
 
    //点和多边形的关系
    //返回值: -1:在多边形外部, 0:在多边形内部, 1:在多边形边线内, 2:跟多边形某个顶点重合
    public static relationPointToPolygon(point:cc.Vec2,polygon:cc.Vec2[])
    {
        let count = 0;
        for(let i = 0;i<polygon.length;++i)
        {
            if(polygon[i].equals(point))
            {
                return 2;
            }
 
            let pa = polygon[i];
            let pb = polygon[0];
            if(i < polygon.length -1)
            {
                pb = polygon[i+1];
            }
            
            let re = this.rayPointToLine(point,pa,pb);
            if(re == 1) 
            {
                return 1;
            }
            if(re == 0)
            {
                count++;
            }
        }
        if(count %2 == 0)
        {
            return -1;
        } 
        return 0;
    }
 
    //线段对多边形进行切割
    //返回多边形数组
    //如果没有被切割，返回空数组
    public static lineCutPolygon(pa:cc.Vec2,pb:cc.Vec2,polygon:cc.Vec2[]){
        let ret:Array<cc.Vec2[]> = [];
 
        let points:cc.Vec2[] = [];
        let pointIndex:number[] = [];
 
        //将所有的点以及交点组成一个点序列
        for(let i = 0;i<polygon.length;++i)
        {
            points.push(polygon[i]);
 
            let a = polygon[i];
            let b = polygon[0];
            if(i < polygon.length -1) b = polygon[i+1];
 
            let c = this.lineCrossPoint(pa,pb,a,b);
            if(c[0] == 0){
                pointIndex.push(points.length);
                points.push(c[1] as cc.Vec2);
            }
            else if(c[0] > 0)
            {
                if((c[1] as cc.Vec2).equals(a))
                {
                    pointIndex.push(points.length-1);
                }
                else
                {
                    pointIndex.push(points.length);
                }
            }
        }
        if(pointIndex.length > 1)
        {
            //准备从第一个交点开始拆，先弄清楚第一个交点是由外穿内，还是内穿外
            let cp0 = points[pointIndex[0]];
            let cp1 = points[pointIndex[1]];
 
            let r = this.relationPointToPolygon(new cc.Vec2((cp0.x + cp1.x)/2,(cp0.y+cp1.y)/2),polygon);
            let inPolygon:boolean = r >=0;
            
            // if(pointIndex.length > 2 && cc.pDistance(cp0,cp1) > cc.pDistance(cp0,points[pointIndex[pointIndex.length-1]])) {
            if(pointIndex.length > 2 && cp0.subtract(cp1).length() > cp0.subtract(points[pointIndex[pointIndex.length-1]]).length()) {
                cp1 = points[pointIndex[pointIndex.length-1]];
                r = this.relationPointToPolygon(new cc.Vec2((cp0.x + cp1.x)/2,(cp0.y+cp1.y)/2),polygon);
                inPolygon = r <0;
            }
            
            let firstInPolygon = inPolygon;//起始点是从外面穿到里面
 
            let index = 0;
            let startIndex = pointIndex[index];
            let oldPoints = [];
            let newPoints = [];
            let count = 0;
 
            oldPoints.push(points[startIndex]);
            if(inPolygon)
            {
                newPoints.push(points[startIndex]);
            }
 
            index++;
            count++;
            startIndex++;
 
            while(count < points.length)
            {
                if(startIndex == points.length) startIndex = 0;
                let p = points[startIndex];
                if(index >= 0 && startIndex == pointIndex[index])
                {
                    //又是一个交点
                    index++;
                    if(index >= pointIndex.length) index = 0;
                    if(inPolygon){
                        //原来是在多边形内部
                        //产生了新的多边形
                        newPoints.push(p);
                        ret.push(newPoints);
                        newPoints = [];
                    }
                    else
                    {
                        //开始新的多边形
                        newPoints = [];
                        newPoints.push(p);
                    }
                    oldPoints.push(p);
                    inPolygon = !inPolygon;
                }                
                else
                {
                    //普通的点
                    if(inPolygon)
                    {
                        newPoints.push(p);
                    }
                    else
                    {
                        oldPoints.push(p);
                    }
                }
                startIndex++;
                count++;
            }
            if(inPolygon)
            {
                if(!firstInPolygon && newPoints.length > 1)
                {
                    //如果起始点是从里面穿出去，到这里跟起始点形成闭包
                    newPoints.push(points[pointIndex[0]]);
                    ret.push(newPoints);
                }
                else
                {
                    //结束了，但是现在的状态是穿在多边形内部
                    //把newPoints里面的回复到主多边形中
                    for(let i = 0;i<newPoints.length;++i)
                    {
                        oldPoints.push(newPoints[i]);
                    }
                }
                
            }
 
            ret.push(oldPoints);
        }
        return ret;
    }
 
    
    private static ab_cross_ac(a: cc.Vec2, b: cc.Vec2, c: cc.Vec2) //ab与ac的叉积
    {
        return this.cross(b.x-a.x,b.y-a.y,c.x-a.x,c.y-a.y);
    }
    private static dot(x1: number,y1: number,x2: number,y2: number){
        return x1*x2+y1*y2;
    }
    private static cross(x1: number,y1: number,x2: number,y2: number){
        return x1*y2 - x2*y1;
    }
    private static dblcmp(a:number,b:number)
    {
        if (Math.abs(a-b)<=0.000001) return 0;
        if (a>b) return 1;
        else return -1;
    }
}