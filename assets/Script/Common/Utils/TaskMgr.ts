import PriorityQueue from "./PriorityQueue";

/**
 * author: honmono
 * desc: 一个命令队列， 
 */
export enum CommandType {
    // 自定义命令类型
}
export class Command {
    type: CommandType;
    data: any;
}

/** 命令队列 */
export default class TaskMgr {

    private static _instance: TaskMgr = null;
    public static get inst() {
        if(!this._instance) {
            this._instance = new TaskMgr();
        }
        return this._instance;
    }

    private _cmdMap: {[key:string]: PriorityQueue<Command>} = cc.js.createMap(); 
    private _debugHistory: Array<Command> = [];

    private _debug = false;
    public setDebug(debug = true) {
        this._debug = debug;
    }

    /**
     * @param command 命令
     * @param pIdx 优先级 数值越大优先级越高  默认是0
     */
    public pushCommand(key: string, command: Command, pIdx: number = 0) {
        if(this._debug) {
            this._debugHistory.push(command);
        }
        let cmdQueue = this._cmdMap[key];
        if(!cmdQueue) {
            cmdQueue = this._cmdMap[key] = new PriorityQueue<Command>();
        }
        cmdQueue.enqueue(command, pIdx);
    }

    /** 获得一个命令 */
    public popCommand(key: string) {
        let cmdQueue = this._cmdMap[key];
        if(!cmdQueue) return null;
        return cmdQueue.dequeue();
    }

    /** 是否有这个命令 */
    public hasCommand(ele: Command, key?: string) {
        if(key) {
            let cmdQueue = this._cmdMap[key];
            return cmdQueue.hasElement(ele);
        }
        for(let key in this._cmdMap) {
            if(this._cmdMap[key].hasElement(ele)) return true;
        }
        return false;
    }
}
