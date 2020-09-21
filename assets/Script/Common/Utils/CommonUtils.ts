import CocosHelper from "../../UIFrame/CocosHelper";

export interface TypeConstructor<T> {
    new():T;
}

export interface IRandomGenerator {
    nextInt(start:number, endAndNotIncluded:number) : number;
    next01():number;
}

let kDefaultRandomGenerator = {
    nextInt(start:number, endAndNotIncluded:number) : number {
        return Math.floor(Math.random() * (endAndNotIncluded - start)) + start;
    },
    next01() : number {
        return Math.random();
    }
};

export class CommonUtils {
    public static isArray(target:any) : boolean {
        if (typeof Array.isArray === "function") {
            return Array.isArray(target);
        }else{
            return Object.prototype.toString.call(target) === "[object Array]";
        }
    }

    public static foramtDate(dateObj:Date, format:string) {
        var date : any = {
            "M+": dateObj.getMonth() + 1,
            "d+": dateObj.getDate(),
            "h+": dateObj.getHours(),
            "m+": dateObj.getMinutes(),
            "s+": dateObj.getSeconds(),
            "q+": Math.floor((dateObj.getMonth() + 3) / 3),
            "S+": dateObj.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (dateObj.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    }

    public static getElemClamped<T>(arr:T[], index:number) : T {
        return arr[Math.max(0, Math.min(arr.length - 1, index))];
    }

    public static randomIntClosedRange(min:number, max:number) : number {            //random integer in [min,max]
        return Math.floor(Math.random() * (max - min + 0.9999) + min);
    }

    public static indexOf<T>(val:T, arr:T[]) : number {
        for(let i = 0; i < arr.length; i++) {
            if(arr[i] == val) {
                return i;
            }
        }
        return -1;
    }

    public static indexOfArr<T>(arr:T[], ...values:T[]) : number {
        let paramCount = values.length;
        let found = false;
        for(let i = 0; i <= arr.length - paramCount; i+=paramCount) {
            found = true;
            for(let j = 0; j < paramCount; j++) {
                if(arr[i + j] !== values[j]) {
                    found = false;
                    break;
                }
            }
            if(found) {
                return i;
            }
        }
        return -1;
    }

    public static floatEqual(left:number, right:number, epsilon:number = 0.000001) : boolean {
        return Math.abs(left - right) < epsilon;
    }

    public static formatTimeInterval(seconds:number, alwaysShowMinutes:boolean = false, alwaysShowHours:boolean = false) {
        alwaysShowMinutes = alwaysShowHours || alwaysShowMinutes;
        let ret = "";
        let hour = Math.floor(seconds / 3600);
        seconds = seconds % 3600;
        let minute = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        if(alwaysShowHours || hour > 0) {
            if(hour < 10) {
                ret += "0";
            }
            ret += hour + ":";
        }
        if(alwaysShowMinutes || minute > 0 || hour > 0) {
            if(minute < 10) {
                ret += "0";
            }
            ret += minute + ":";
        }
        if(seconds < 10) {
            ret += "0";
        }
        ret += seconds;
        return ret;
    }

    public static alignNumber(input:number, divider:number) : number {
        input = input - Math.floor(input / divider) * divider;
        return input;
    }

    public static formatNumber(num:number) {
        var str = "" + Math.floor(num);
        var newStr = "";
        var count = 0;
        // 当数字是整数
        if (str.indexOf(".") == -1) {
            for (var i = str.length - 1; i >= 0; i--) {
                if (count % 3 == 0 && count != 0) {
                    newStr = str.charAt(i) + "," + newStr;
                } else {
                    newStr = str.charAt(i) + newStr;
                }
                count++;
            }
            str = newStr;
            return str;
        }
        // 当数字带有小数
        else {
            for (var i = str.indexOf(".") - 1; i >= 0; i--) {
                if (count % 3 == 0 && count != 0) {
                    newStr = str.charAt(i) + "," + newStr;
                } else {
                    newStr = str.charAt(i) + newStr; //逐个字符相接起来
                }
                count++;
            }
            str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
            return str;
        }
    }

    public static updateLabelSize(label:cc.Label) {
        label["_updateRenderData"](true);
    }

    public static lerp(begin:number, end:number, factor:number) {
        return begin + (end - begin) * factor;
    }

    public static shuffle(container:any[], randGenerator:IRandomGenerator = kDefaultRandomGenerator, start:number = 0, count:number = -1):void {
        randGenerator = randGenerator || kDefaultRandomGenerator;
        if(count < 0) {
            count = container.length - start;
        }
        for(let i = 0; i < count; i++) {
            let idx = randGenerator.nextInt(start, start + count - i);
            let temp = container[idx];
            container[idx] = container[count - i - 1 + start];
            container[count - i - 1 + start] = temp;
        }
    }

    public static setItemSpriteFrame(sprite:cc.Sprite, url:string, successCB:(sprite:cc.Sprite)=>void = null) {
        sprite["spriteFrameName"] = url;
        CocosHelper.loadResSync(url, cc.SpriteFrame).then((spriteFrame:cc.SpriteFrame)=>{
            if(sprite.isValid && sprite["spriteFrameName"] == url) {
                sprite.spriteFrame = spriteFrame;
                if(successCB) {
                    successCB(sprite);
                }
            }
        });
    }

    public static addSimpleClick(target:cc.Node, cb:()=>void) {
        let targetNode = target;
        let lastTouchPos : cc.Vec2 = null;
        targetNode.on(cc.Node.EventType.TOUCH_START, (e:cc.Event.EventTouch)=>{
            lastTouchPos = e.getLocation();
        }, this);
        targetNode.on(cc.Node.EventType.TOUCH_END, (e:cc.Event.EventTouch)=>{
            if(lastTouchPos) {
                let delta = lastTouchPos.subSelf(e.getLocation()).mag();
                if(delta < 3) {
                    cb();
                }
            }
        }, this);
    }

    public static isGoodNumber(num:any) {
        return (typeof num) === "number" && !Number.isNaN(num);
    }

    public static getVisibleRect() {
        let visibleRect = cc.view.getViewportRect();
        visibleRect = cc.rect(visibleRect.origin.x / -cc.view.getScaleX(), visibleRect.origin.y / -cc.view.getScaleY(), 
        (visibleRect.size.width + visibleRect.origin.x * 2) / cc.view.getScaleX(), (visibleRect.size.height + visibleRect.origin.y * 2) / cc.view.getScaleY());
        return visibleRect;
    }

    public static httpGet(url:string, cb: Function) {
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            // cc.log("Get: readyState:" + xhr.readyState + " status:" + xhr.status);
            if (xhr.readyState === 4 && xhr.status == 200) {
                let respone = xhr.responseText;
                let rsp = JSON.parse(respone);
                cb(rsp);
            } else if (xhr.readyState === 4 && xhr.status == 401) {
                cb({"ret":1});
            } else {
                //callback(-1);
            }
        };
        xhr.withCredentials = true;
        xhr.open('GET', url, true);
        xhr.withCredentials = false;
        // if (cc.sys.isNative) {
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type,authorization');
        xhr.setRequestHeader("Content-Type", "application/json");
        //xhr.setRequestHeader('Authorization', 'Bearer ' + cc.myGame.gameManager.getToken());
        // xhr.setRequestHeader('Authorization', 'Bearer ' + "");
        // }

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 8000;// 8 seconds for timeout

        xhr.send();
    }

    /**
     * Box-Muller algorithm
     * @param avg 
     */
    public static randomGaussian(avg:number, variant:number, randGenerator:IRandomGenerator = kDefaultRandomGenerator) : number {
        randGenerator = randGenerator || kDefaultRandomGenerator;
        let x1 = randGenerator.next01();
        let x2 = randGenerator.next01();
        let standard = Math.sqrt(-2 * Math.log(x1)) * Math.cos(2 * Math.PI * x2);
        return standard * variant + avg;
    }

    public static deepCopy(dst:Object, src:Object) {
        for(let field in src) {
            this._deepCopyFields(dst, src, field);
        }
    }

    public static constructObjectMap(obj: any): Map<string, any> {
        let map = new Map();
        for(let key in obj) {
            let val = obj[key]
            if(typeof val === "object") {
                map.set(key, this.constructObjectMap(val));
            } else {
                map.set(key, val);
            }
        }
        return map
    }

    private static _deepCopyFields(dst:Object, src:Object, field:any) {
        let value = src[field];
        if(typeof value == "number" || typeof value == "string") {
            dst[field] = value;
        } else if(this.isArray[value]) {
            let dstArr = dst[field] = [];
            for(let i = 0; i < value.length; i++) {
                this._deepCopyFields(dstArr, value, i);
            }
        } else if(value == null) {
            dst[field] = null;
        } else if(typeof value == "object") {
            let dstObj = new value.constructor();
            for(let field in src) {
                this._deepCopyFields(dstObj, value, field);
            }
        }
    }

    static unitArr: Array<string> = ["", "K", "M", "B"];
    static constNum: number = 3;

    /**
     * 格式化数字变成K,M,B
     * @param value 
     */
    static formatNumberToEng(value: number): string {
        if (value < 1 && value > 0) {
            return 1 + "";
        }
        value = Math.floor(value);
        var exp = Math.floor(CommonUtils.getExponent(value));
        if (exp < 13) {
            if (exp < 4) {
                return value + "";
            }

            var unitIt = Math.floor(exp / CommonUtils.constNum);
            var rem = exp % CommonUtils.constNum;
            var numStr = String(value / Math.pow(10, unitIt * CommonUtils.constNum)).substr(0, CommonUtils.constNum + rem);
            return numStr + CommonUtils.getUnit(exp);
        } else {
            var _num = value / Math.pow(10, exp);
            return _num.toFixed(3) + "e" + exp;
        }
    }

    private static getExponent(value) {
        var exp = 0;
        while (value >= 10) {
            exp++;
            value /= 10;
        }
        return exp;
    }

    private static getUnit(exp: number): string {
        var unitIt = Math.floor(exp / CommonUtils.constNum);
        if (exp < 13) {
            return CommonUtils.unitArr[unitIt];
        } else {
            var unitIt = Math.floor(exp / CommonUtils.constNum);
            return "e" + unitIt * CommonUtils.constNum;
        }
    }

    /**
     * 转化成带有小数点的K,M,B
     * @param number 
     * @param decimals 
     */
    static formatEngNumber(number: any, decimals: number = 2): string {
        var str: string;
        var num: number;
        number = <number><any>number;

        if (number >= 1000000) {
            num = number / 1000000;
            str = (Math.floor(num / 0.001) * 0.001).toFixed(decimals);
            return this.formatEndingZero(str) + "M";
        } else if (number >= 1000) {
            num = number / 1000;
            str = (Math.floor(num / 0.001) * 0.001).toFixed(decimals);
            return this.formatEndingZero(str) + "K";
        } else {
            return number + "";
        }
    }

    static formatEndingZero(c: string): string {
        if (c.indexOf(".") != -1) {
            if (this.endWith(c, "00")) {
                return c.substring(0, c.length - 3);
            } else if (this.endWith(c, "0")) {
                return c.substring(0, c.length - 1);
            }
        }

        return c;
    }

    static endWith(c: string, suffix: string): boolean {
        return (suffix == c.substring(c.length - suffix.length));
    }

    static makeMaxWidthLabel(label: cc.Label,width:number) : cc.Label {
        let obj = {};
        obj["__proto__"] = label;
        Object.defineProperty(obj, "string", {
            configurable:true,
            enumerable:true,
            get() {
                return label.string;
            },
            set(str) {
                label.overflow = cc.Label.Overflow.NONE;
                label.string = str;
                label["_updateRenderData"](true);
                if(label.node.width > width) {
                    label.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
                    label.node.setContentSize(width, 1);
                    label.string = str;
                }
            }
        });
        return <cc.Label>obj;
    }

    public static climeUserName(name: string, showLen = 14) {
        let len = name.length;
        while (this.strlen(name) > showLen) {
            name = name.substring(0, name.length - 1);
        }
        if (name.length != len) {
            name = name + "..."
        }
        return name;
    }

    private static strlen(str) {
        let len = 0;
        for (let i = 0; i < str.length; i++) {
          let c = str.charCodeAt(i);
          //单字节加1 
          if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
          } else {
            len += 2;
          }
        }
        return len;
    }

    /** 打乱数组 */
    public static shuffleArr(arr: any[]) {
        let _swap = (a: number, b: number) => {
            let tmp = arr[a];
            arr[a] = arr[b];
            arr[b] = tmp;
        }
        let len = arr.length;
        for(let i=0; i<len; i++) {
            let idx = Math.floor(Math.random() * (len - i));
            _swap(idx, len-i-1);
        }
        return arr;
    }
}