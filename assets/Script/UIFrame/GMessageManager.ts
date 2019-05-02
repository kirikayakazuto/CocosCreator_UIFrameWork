/**
 * 消息代理类
 */
export default class GMessageManager {

    private static _eventMap: {[key: string]: Array<ElementEvent>} = {};
    private static _eventMsg: {[key: string]: any} = {};

    public static emit(eventName: string, parameter: any) {
        let array = this._eventMap[eventName];
        if(array === undefined) {       // 没有 人监听
            this._eventMsg[eventName] = parameter;  // 缓存消息
            return ;
        }
        for(let i=0; i<array.length; i++) {
            let element = array[i];
            if(element) element.callback.call(element.target, parameter);
        }
        
    }

    public static on(eventName: string, callback: Function, target: any) {
        if(this._eventMap[eventName] === undefined) {
            this._eventMap[eventName] = [];
        }
        this._eventMap[eventName].push({callback: callback, target: target});

        if(this._eventMsg[eventName]) {     // 有缓存消息
            this.emit(eventName, this._eventMsg[eventName]);
            this._eventMsg[eventName] = null;
            delete this._eventMsg[eventName];
        }
    }

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