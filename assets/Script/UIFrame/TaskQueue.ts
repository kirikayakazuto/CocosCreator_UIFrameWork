/**
 * author: denglang
 * desc: 一个命令队列， 
 */
export enum CommandType {
    // 自定义命令类型
}
/**
 * 命令类型， 以及一些自定义数据
 */
export class Command {
    public commandType: CommandType;
    public data: any;
    public prioritiy: number;               // 优先级， 数值越小， 优先级越高

    constructor(commandType: CommandType, data: any, prioritiy: number = 10) {
        this.commandType = commandType;
        this.data = data;
    }
}
/** 命令队列 */
export default class CommandQueue {
    private currCommand: Command = null;
    private commands: Array<Command> = [];
    private historyCommands: Array<Command> = [];           /** debug 用 */

    public pushCommand(command: Command) {
        this.commands.push(command);
    }
}
