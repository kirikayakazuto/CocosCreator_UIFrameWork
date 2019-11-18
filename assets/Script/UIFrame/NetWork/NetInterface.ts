/** socket接口 */
export interface ISocket {
    onConnect: (event: any) => void;             // 连接回调
    onMessage: (msg: {cmd: number, data: any}) => void;          // 消息回调
    onError: (event: any) => void;               // 错误回调
    onClose: (event: any) => void;               // 关闭回调
    
    connect: (option: string | {ip: string, port: number, protocol: string}) => boolean;                 // 连接接口
    
    send: (data: IMsg) => boolean;                       // 数据发送接口
    close: (meg: any) => boolean;                       // 关闭接口
}

/** 数据格式 */
export interface IMsg {
    cmd: number;
    data: any;
}