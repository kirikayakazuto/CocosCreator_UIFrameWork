/**
 * 数学计算工具类
 */
export class MathUtils {

    public static clamp(a: number, b: number, x: number) {        
        if(a > b) {
            let t = a;
            a = b;
            b = t;
        }
        if(x < a) return a;
        if(x > b) return b;
        return x;
    }
    /**
     * 弧度制转换为角度值
     * @param radian 弧度制
     * @returns {number}
     */
    public static getAngle(radian: number): number {
        return 180 * radian / Math.PI;
    }

    /**
     * 角度值转换为弧度制
     * @param angle
     */
    public static getRadian(angle: number): number {
        return angle / 180 * Math.PI;
    }

    /**
     * 获取两点间弧度
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    public static getRadian2(p1X: number, p1Y: number, p2X: number, p2Y: number): number {
        var xdis: number = p2X - p1X;
        var ydis: number = p2Y - p1Y;
        return Math.atan2(ydis, xdis);
    }

    /**
     * 获取两点间距离
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    public static getDistance(p1X: number, p1Y: number, p2X: number, p2Y: number): number {
        var disX: number = p2X - p1X;
        var disY: number = p2Y - p1Y;
        var disQ: number = disX * disX + disY * disY;
        return Math.sqrt(disQ);
    }

    public static toFixedStr(value: number, fixCount: number): string {
        return value.toFixed(fixCount).replace(/\.?0*$/, '');
    }

    public static toPercentStr(value: number, fixCount: number): string {
        return this.toFixedStr(value * 100, fixCount) + "%";
    }

    public static toFixedWan(value: number): string {
        const wanFix = 100000;
        let wanFloat = wanFix / 10;
        var v = Math.floor(value / wanFloat) * wanFloat;
        return value > wanFix ? `${MathUtils.toFixedStr(v / wanFix * 10, 1)}万` : value.toString();
    }

    //value = ceil(e*(a*(level^d) + b*(level) + c))
    public static getFinalValueBasedOnParams(level: number, paramList: Array<number>, needCeil?: boolean): number {
        if (paramList.length < 5) {
            return 0;
        }
        let ret = paramList[4] * (paramList[0] * Math.pow(level, paramList[3]) + paramList[1] * level + paramList[2]);
        if (needCeil) {
            ret = Math.ceil(ret);
        }
        return ret;
    }

    /**
    * 获取一个区间的随机数
    * @param $from 最小值
    * @param $end 最大值
    * @returns {number}
    */
    public static limit($from: number, $end: number): number {
        $from = Math.min($from, $end);
        $end = Math.max($from, $end);
        var range: number = $end - $from;
        return $from + Math.random() * range;
    }

    /**
     * 获取一个区间的随机数(帧数)
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    public static limitInteger($from: number, $end: number): number {
        return Math.round(MathUtils.limit($from, $end));
    }

    /**
     * 在一个数组中随机获取一个元素
     * @param arr 数组
     * @returns {any} 随机出来的结果
     */
    public static randomArray<T>(arr: Array<T>): T {
        var index: number = Math.floor(Math.random() * arr.length);
        return arr[index];
    }
}