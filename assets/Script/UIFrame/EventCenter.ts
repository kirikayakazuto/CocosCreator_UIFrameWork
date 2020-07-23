import { Pool, IPool } from "./common/Pool";


let idSeed = 1;         // 这里有一个小缺陷就是idSeed有最大值,Number.MAX_VALUE
export class EventCenter {
    private static _listeners: {[eventName: string]: {[id: string]: Array<EventInfo>}} = cc.js.createMap();
    private static _dispatching : number = 0;
    private static _removeCommands : RemoveCommand[] = [];
    private static uuid : string = "0";

    private static _eventPool: Pool<EventInfo> = new Pool<EventInfo>(() => {
        return new EventInfo();
    }, 10);

    public static on(eventName: string, callback: Function, target: any = undefined, once = false) {
        target = target || this;
        let targetId = target['uuid'] || target['id'];
        if(targetId === undefined) {
            target['uuid'] = targetId = idSeed++;
        }
        this.onById(eventName, targetId, target, callback, once);
    }
    public static once(eventName: string, callback: Function, target: any = undefined) {
        this.on(eventName, callback, target, true);
    }
    private static onById(eventName: string, targetId: string, target: any, cb: Function, once: boolean) {
        let collection = this._listeners[eventName];
        if(!collection) {
            collection = this._listeners[eventName] = {};
        }
        let events = collection[targetId];
        if(!events) {
            events = collection[targetId] = [];
        }
        let eventInfo = this._eventPool.alloc();
        eventInfo.init(cb, target, once);
        events.push(eventInfo);
    }
    public static off(eventName: string, callback: Function, target: any = undefined) {
        target = target || this;
        let targetId = target['uuid'] || target['id'];
        if(!targetId) return ;
        this.offById(eventName, callback, targetId);
    }
    public static targetOff(target: any) {
        target = target || this;
        let targetId = target['uuid'] || target['id'];
        if(!targetId) return ;
        for(let event in this._listeners) {
            let collection = this._listeners[event];
            if(collection.listenerMap[targetId] !== undefined) {
                delete collection.listenerMap[targetId];
            }
        }
    }
    private static offById(eventName: string, callback: Function, targetId: string) {
        if(this._dispatching > 0) {
            let cmd = new RemoveCommand(eventName, callback, targetId);
            this._removeCommands.push(cmd);
        }else {
            this.doOff(eventName, callback, targetId);
        }
    }
    private static doOff(eventName: string, callback: Function, targetId: string) {
        let collection = this._listeners[eventName];
        if(!collection) return ;
        let events = collection[targetId];
        if(!events) return ;
        for(let i=events.length-1; i>=0; i--) {
            if(events[i].callback === callback) {
                events.splice(i, 1);
            }
        }
        if(events.length === 0) {
            delete collection[targetId];
        }
    }

    private static doRemoveCommands() {
        if(this._dispatching !== 0) {
            return;
        }
        for(let cmd of this._removeCommands) {
            this.doOff(cmd.eventName, cmd.callback, cmd.targetId);
        }
        this._removeCommands.length = 0;
    }
    
    public static emit(eventId: string, ...param: any[]) {
        let collection = this._listeners[eventId];
        if(!collection) return false;
        this._dispatching ++;
        for(let targetId in collection) {
            for(let eventInfo of collection[targetId]) {
                eventInfo.callback.call(eventInfo.target, ...param);
            }
        }
        this._dispatching --;
        this.doRemoveCommands();
    }
}
class RemoveCommand {
    public eventName:string;
    public targetId:string;
    public callback: Function;

    constructor(eventName: string, callback: Function, targetId: string) {
        this.eventName = eventName;
        this.callback = callback;
        this.targetId = targetId;
    }
}
export class EventCollection {

}
export class EventInfo implements IPool {
    callback: Function;
    target: any;
    once: boolean;

    use() {

    }
    free() {
        this.callback = null;
        this.target = null;
        this.once = false;
    }

    init(callback: Function, target: Object, once: boolean) {
        this.callback = callback;
        this.target = target;
        this.once = once;
    }
}