export default class GEventManager {
    private static _eventMap: {[key: string]: Array<ElementEvent>} = {};

    public static emit(eventName: string, parameter: any) {
        let array = this._eventMap[eventName];
        if(array === undefined) return ;
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