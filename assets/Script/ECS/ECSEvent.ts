/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

/**
 * 事件
 */
export abstract class ECSEvent {
    /**
     * 返回类名
     */
    get name(): string {
        return this.constructor.name;
    }

    /**
     * 构造函数
     *
     * 如果 `unique = true`，则同名事件即便多次添加到队列，也只会保留一个。
     *
     * @param unique 同名事件是否保持唯一性
     */
    constructor(readonly unique: boolean = false) {}
}
