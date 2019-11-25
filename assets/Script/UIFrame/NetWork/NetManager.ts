import { ISocket, IMsg } from "./NetInterface";
import GEventManager from "../GEventManager";
import CWebSocket from "./CWebSocket";

enum SocketState {
    Closed,             // 已关闭
    Connecting,         // 连接中
    Connected,          // 已连接
}

type connectOption = string | {ip: string, port: number, protocol: string};
/** 
 * 网络中心服务
 * 
 * 连接网络, 重连
 * 
 */
export default class NetManager {
    /** 单例 */
    public static instance: NetManager = null;
    public static getInstance() {
        if(this.instance == null) {
            this.instance = new NetManager();
        }
        return this.instance;
    }

    /** 属性 */
    private state : SocketState = SocketState.Closed;       // 状态
    private socket: ISocket;                                // socket

    /** 连接网络相关 */
    private connectOption : connectOption;                   // 连接参数
    private reconnectTimes: number = 0;                      // 重连次数 -1表示一直重连， 0表示不重连， 其他为重连次数
    /**  */
    private eventHandlers : {[key: number]: Array<EventHandler>} = cc.js.createMap();
    

    /** 连接网络 */
    public connect(connectOption: connectOption, reconnectTimes: number) {
        if(!this.socket) {
            this.socket = new CWebSocket();
            this.addEventToSocket();
        }
        this.connectOption = connectOption;     
        this.reconnectTimes = reconnectTimes;
        
        if(this.socket && this.state === SocketState.Closed) {
            this.socket.connect(this.connectOption);
        }
        this.state = SocketState.Connecting;   // 连接中
    }
    /** 发送数据 */
    public send(msg: IMsg) {
        if(this.state !== SocketState.Connected) {
            cc.log('网络未连接！无法发送数据');
            return false;
        }
        return this.socket.send(msg);
    }
    /** 带回调的请求 */
    public request(msg: IMsg, callback: Function, target?: Object) {
        this.onEventHandler(msg.cmd, callback, target);
        this.send(msg);
    }


    /** 添加监听事件 */
    private addEventToSocket() {
        let self = this;
        /** 连接成功 */
        this.socket.onConnect = function(e) {
            cc.log('连接网络成功!');
            self.state = SocketState.Connected;
            GEventManager.emit('NetWork_Connect', null);
        }
        /** 收到消息 */
        this.socket.onMessage = function(msg: IMsg) {
            let arr = self.eventHandlers[msg.cmd];
            if(!arr) {
                cc.log(`收到一个未知命令:${msg.cmd}`);
                return ;
            }
            for(const e of arr) {
                if(e.target) e.callback.call(e.target, msg.data);
                else e.callback(msg.data);
            }
        }
        /** 连接被关闭 */
        this.socket.onClose = function(e) {
            if(self.reconnectTimes < 0) {
                self.connect(self.connectOption, self.reconnectTimes);
                return ;
            }
            if(self.reconnectTimes === 0) {
                cc.log(`连接关闭！`);
                return ;
            }
            self.reconnectTimes --;
            self.connect(self.connectOption, self.reconnectTimes);
        }
        /** 网络错误 */
        this.socket.onError = function(e) {
            cc.log(`网络错误！`);
        }
    }

    /**
     * ----------------------- 事件句柄 -----------------------------
     */
    public onEventHandler(cmd: number, callback: Function, target?: Object, once = false) {
        if(!this.eventHandlers[cmd]) {
            this.eventHandlers[cmd] = [];
        }
        this.eventHandlers[cmd].push(new EventHandler(callback, target, once));
    }
    /** 监听一次，收到该事件则取消监听 */
    public onceEventHandler(cmd: number, callback: Function, target?: Object) {
        this.onEventHandler(cmd, callback, target, true);
    }
    public offEventHandler(cmd: number, callback: Function, target?: Object) {
        let arr = this.eventHandlers[cmd];
        if(!arr) {
            cc.log(`没有这个命令${cmd}，请注意`);
            return ;
        }
        for(let i=arr.length-1; i>=0; i--) {
            if(arr[i] && arr[i].callback === callback && arr[i].target === target) {
                arr.splice(i, 1);
            }
        }
        if(arr.length === 0) {
            this.clearEventHandler[cmd];
        }
    }
    public clearEventHandler(cmd: number) {
        if(!this.eventHandlers[cmd]) {
            return ;
        }
        this.eventHandlers[cmd] = null;
        delete this.eventHandlers[cmd];
    }
}

/** 事件 */
class EventHandler {
    callback: Function;
    target: Object;
    once: boolean;

    constructor(callback: Function, target: Object, once: boolean) {
        this.callback = callback;
        this.target = target;
        this.once = once;
    }
}