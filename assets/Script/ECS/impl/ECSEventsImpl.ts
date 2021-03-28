/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSEvent } from "../ECSEvent";
import { ECSEvents } from "../ECSEvents";
import { Constructor } from "../__private";

/**
 * 事件集合的实现
 */
export class ECSEventsImpl implements ECSEvents {
    /**
     * 所有事件
     */
    private events = new Map<string, ECSEvent[]>();

    /**
     * 追加事件到队列
     *
     * @param event
     */
    push(event: ECSEvent): void {
        const name = event.name;
        if (typeof name !== "string" || name.length === 0) {
            throw new RangeError(
                `[ECS] event '${event}' not set name by @ecsclass`
            );
        }

        let list = this.events.get(name);
        if (!list) {
            list = [];
            this.events.set(name, list);
        }
        if (event.unique) {
            list.length = 0;
        }
        list.push(event);
    }

    /**
     * 取得指定事件的列表
     *
     * @param constructor
     */
    fetch<T extends ECSEvent>(constructor: Constructor<T>): T[] {
        const events = this.events.get(constructor.name);
        return events ? (events as T[]) : (EMPTY as T[]);
    }

    /**
     * 检查是否存在指定事件
     *
     * @param constructor
     */
    has<T extends ECSEvent>(constructor: Constructor<T>): boolean {
        const events = this.events.get(constructor.name);
        return events ? events.length > 0 : false;
    }

    /**
     * 清理所有事件
     */
    clear(): void {
        this.events.clear();
    }
}

/// private

/**
 * 预定义的空事件集合
 */
const EMPTY: ECSEvent[] = [];
