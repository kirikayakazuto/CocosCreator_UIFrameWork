/**
 * @Author: 邓朗 
 * @Describe: 全局消息管理(增强版)   先发布, 后订阅一样可以得到对应消息
 * @Date: 2019-06-06 10:59:29  
 * @Last Modified time: 2019-06-06 10:59:29 
 */
export default class GEventManager {
    private static _eventMap: {[key: string]: Array<ElementEvent>} = {};
    private static _bufferEventMap: {[key: string]: Array<any>} = {};          // 缓存的消息

    /**
     * 发布一个事件
     * @param eventName 
     * @param parameter 
     */
    public static emit(eventName: string, parameter: any) {
        let array = this._eventMap[eventName];
        if(array === undefined) {
            // 将消息存入
            if(this._bufferEventMap[eventName] === undefined) {
                this._bufferEventMap[eventName] = [];
            }
            this._bufferEventMap[eventName].push(parameter);
            return ;
        }
        for(let i=0; i<array.length; i++) {
            let element = array[i];
            if(element) element.callback.call(element.target, parameter);
        }
    }

    /**
     * 订阅一个时间
     * @param eventName 
     * @param callback 
     * @param target 
     */
    public static on(eventName: string, callback: Function, target: any) {
        if(this._eventMap[eventName] === undefined) {
            this._eventMap[eventName] = [];
        }
        this._eventMap[eventName].push({callback: callback, target: target});

        // 新订阅一个事件, 那么看看是不是有缓存的消息, 发布出去
        if(this._bufferEventMap[eventName] != undefined) {
            for(let i=0; i<this._bufferEventMap[eventName].length; i++) {
                callback.call(target, this._bufferEventMap[eventName][i]);
            }
            this._bufferEventMap[eventName] = undefined;
        }
    }

    /**
     * 取消监听一个事件
     * @param eventName 
     * @param callback 
     * @param target 
     */
    public static off(eventName: string, callback: Function, target: any) {
        let array = this._eventMap[eventName];
        if(array === undefined) return ;
        for(let i=0; i<array.length; i++) {
            let element = array[i];
            if(element && element.callback === callback && element.target === target) {
                array[i] = undefined;
                break;
            }
        }
    }
}

export class ElementEvent {
    callback: Function;
    target: any;
}