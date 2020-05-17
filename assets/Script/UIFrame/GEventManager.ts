/**
 * @Author: 邓朗 
 * @Describe: 全局消息管理(增强版)   先发布, 后订阅一样可以得到对应消息, 需要注意的是, 未订阅前发布的消息会在第一个订阅时销毁
 * 简单来说, 就是发布一个NoListen类型的消息, 如果没有监听者, 那么此消息会被保留, 等到有监听者监听此消息时, 将消息发送给监听者, 然后将Nolisten消息删除
 * @Date: 2019-06-06 10:59:29  
 * @Last Modified time: 2019-06-06 10:59:29 
 */
export default class GEventManager {
    private static _allEvents: {[key: string]: Array<ElementEvent>} = cc.js.createMap();
    private static _bufferEventMap: {[key: string]: Array<any>} = cc.js.createMap();          // 缓存的消息

    private static _openAutoClear = false;                                      // 开启定时清理监听事件
    private static _clearTimers: Array<ElementTimer> = [];
    private static _autoClearTimeNumber = 10;                                   // 定时清理的间隔

    /**
     * 发布一个事件, 对于缓存的消息, 10s还没有被接收, 那么会定时回收
     * @param eventName 
     * @param parameter 
     */
    public static emit(eventName: string, ...parameter: any) {
        let array = this._allEvents[eventName];
        if(array === undefined) {
            // 将消息存入
            if(this._bufferEventMap[eventName] === undefined) {
                this._bufferEventMap[eventName] = [];
            }
            this._bufferEventMap[eventName].push(parameter);
            if(this._openAutoClear) this.autoClearBufferEvent(eventName);
            return ;
        }
        for(let i=0; i<array.length; i++) {
            let element = array[i];
            if(!element) continue;
            element.callback.call(element.target, ...parameter);
            element.once && array.splice(i, 1) && --i;
        }
    }

    /**
     * 订阅一个事件
     * @param eventName 
     * @param callback 
     * @param target
     */
    public static on(eventName: string, callback: Function, target: any, once = false) {
        if(this._allEvents[eventName] === undefined) {
            this._allEvents[eventName] = [];
        }
        this._allEvents[eventName].push(new ElementEvent(callback, target, once));

        // 新订阅一个事件, 那么看看是不是有缓存的消息, 发布出去
        if(this._bufferEventMap[eventName] != undefined) {
            for(let i=0; i<this._bufferEventMap[eventName].length; i++) {
                callback.call(target, ...this._bufferEventMap[eventName][i]);
            }
            this._bufferEventMap[eventName] = null;
            delete this._bufferEventMap[eventName];
        }
    }
    public static once(eventName: string, callback: Function, target: any) {
        this.on(eventName, callback, target, true);
    }

    /**
     * 取消监听一个事件
     * @param eventName 
     * @param callback 
     * @param target 
     */
    public static off(eventName: string, callback: Function, target: any) {
        let array = this._allEvents[eventName];
        if(array === undefined) return ;
        for(let i=array.length-1; i>0; i--) {
            let element = array[i];
            if(element && element.callback === callback && element.target === target) {
                array.splice(i, 1);
                break;
            }
        }
        if(array.length === 0) {
            this._allEvents[eventName] = null;
            delete this._allEvents[eventName];
        }
    }
    /**
     * 清空一个事件
     * @param eventName 
     */
    public static clear(eventName: string) {
        this._allEvents[eventName] = null;
        delete this._allEvents[eventName];
    }

    /** 清楚对象上所有注册的事件 */
    public static targetOff(target: Object) {
        for(const key in this._allEvents) {
            let arr = this._allEvents[key];
            for(let i=arr.length-1; i>=0; i--) {
                if(arr[i].target === target) {
                    arr.slice(i, 1);
                }
            }
        }
    }


    /** 自动清理bufferEventMap中的未接收消息 */
    private static autoClearBufferEvent(eventName: string) {
        
        for(const e of this._clearTimers) {
            if(e.eventName === eventName) {         // 当前event已经开启了定时回收
                return;
            }
        }

        let clearTimer = setTimeout(() => {
            clearEvent(eventName);
        }, this._autoClearTimeNumber * 1000);

        this._clearTimers.push(new ElementTimer(eventName, clearTimer));

        let clearEvent = (eventName: string) => {
            if(!this._bufferEventMap[eventName]) {
                return ;
            }
            this._bufferEventMap[eventName] = null;
            delete this._bufferEventMap[eventName];

            for(let i=this._clearTimers.length-1; i>=0; i--) {
                if(this._clearTimers[i].eventName === eventName) {
                    this._clearTimers.splice(i, 1);
                }
            }
        };
    }
    
}

export class ElementEvent {
    callback: Function;
    target: any;
    once: boolean;

    constructor(callback: Function, target: Object, once: boolean) {
        this.callback = callback;
        this.target = target;
        this.once = once;
    }
}

class ElementTimer {
    eventName: string;
    timer: NodeJS.Timer;

    constructor(evnetName: string, timer: NodeJS.Timer) {
        this.eventName = evnetName;
        this.timer = timer;
    }
}