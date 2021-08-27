/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSComponents } from "./ECSComponents";
import { ECSEntities } from "./ECSEntities";
import { ECSEvents } from "./ECSEvents";
import { ECSSystems } from "./ECSSystems";

/**
 * ECS 运行环境
 *
 * ECSEnvironment 会确保加入的 system 一定是在 system.load() 方法结束后，
 * 才会调用 system.start() 方法。
 *
 * 当系统需要异步加载资源时，需要将 system.load()
 * 方法定义为 async function，并且使用 await 操作。
 *
 * 如果是在调用 ECSEnvironment.start() 之前加入的 system。
 * ECSEnvironment 会保证所有 system.load() 方法结束后，
 * 才会依次调用这些系统的 system.start() 方法。
 *
 * ----
 *
 * ECSEnvironment 运作流程：
 *
 * - 按照优先级执行所有 system
 *   - 如果某个 system 生成了事件，会立即放入事件队列
 *   - 每个 system 执行时都可以查询事件队列
 * - 清理事件队列
 */
export interface ECSEnvironment {
    /**
     * 事件集合
     */
    readonly events: ECSEvents;

    /**
     * 系统集合
     */
    readonly systems: ECSSystems;

    /**
     * 实体集合
     */
    readonly entities: ECSEntities;

    /**
     * 组件集合
     */
    readonly components: ECSComponents;

    /**
     * 启动环境
     */
    start(): void;

    /**
     * 停止环境
     */
    stop(): void;

    /**
     * 更新状态
     *
     * @param dt
     */
    update(dt: number): void;

    /**
     * 更新状态并保留事件
     *
     * @param dt
     * @param keepEvents
     */
    update(dt: number, keepEvents: boolean): void;
}
