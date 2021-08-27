/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSComponents } from "../ECSComponents";
import { ECSEntities } from "../ECSEntities";
import { ECSEnvironment } from "../ECSEnvironment";
import { ECSEvents } from "../ECSEvents";
import { ECSSystems } from "../ECSSystems";
import { ECSEntitiesImpl } from "./ECSEntitiesImpl";
import { ECSEventsImpl } from "./ECSEventsImpl";
import { ECSSystemsImpl } from "./ECSSystemsImpl";

/**
 * ECS 实现
 */
export class ECSImpl implements ECSEnvironment {
    /**
     * 所有事件
     */
    readonly events: ECSEvents;

    /**
     * 所有系统
     */
    readonly systems: ECSSystems;

    /**
     * 所有实体
     */
    readonly entities: ECSEntities;

    /**
     * 所有组件
     */
    readonly components: ECSComponents;

    /**
     * 所有系统的内部实现
     */
    private systemsImpl: ECSSystemsImpl;

    /**
     * 所有实体的内部实现
     */
    private entitiesImpl: ECSEntitiesImpl;

    /**
     * 构造函数
     */
    constructor() {
        this.events = new ECSEventsImpl();
        this.systems = this.systemsImpl = new ECSSystemsImpl(this);
        this.entities = this.entitiesImpl = new ECSEntitiesImpl();
        this.components = this.entitiesImpl.components;
    }

    /**
     * 启动所有系统
     */
    start(): void {
        this.systemsImpl.start();
    }

    /**
     * 停止所有系统
     */
    stop(): void {
        this.systemsImpl.stop();
    }

    /**
     * 更新所有系统并清理事件，如果 keepEvents = true，则保留事件
     *
     * @param dt
     * @param keepEvents 是否保留事件
     */
    update(dt: number, keepEvents: boolean = false): void {
        this.systemsImpl.update(dt);
        if (keepEvents !== true) {
            // 由于输入系统产生的事件可能在 update() 之前，
            // 所以只能在 update 之后再清理事件
            this.events.clear();
        }
    }
}
