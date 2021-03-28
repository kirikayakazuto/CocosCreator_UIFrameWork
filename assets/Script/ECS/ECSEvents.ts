/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSEvent } from "./ECSEvent";
import { Constructor } from "./__private";

/**
 * 事件队列
 */
export interface ECSEvents {
    /**
     * 追加事件到队列
     *
     * @param event
     */
    push(event: ECSEvent): void;

    /**
     * 取得指定事件的列表
     *
     * @param constructor
     */
    fetch<T extends ECSEvent>(constructor: Constructor<T>): T[];

    /**
     * 检查是否存在指定事件
     *
     * @param constructor
     */
    has<T extends ECSEvent>(constructor: Constructor<T>): boolean;

    /**
     * 清理所有事件
     */
    clear(): void;
}
