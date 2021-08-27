/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSComponentInterface } from "./ECSComponent";
import { ECSComponents } from "./ECSComponents";
import { Constructor } from "./__private";

/**
 * 用于生成实体唯一 ID
 */
let nextEntityId: number = 0;

/**
 * 实体基础类
 */
export class ECSEntity {
    /**
     * 实体 ID
     */
    readonly id: string;

    /**
     * 实体的所有组件
     */
    readonly components = new Map<string, ECSComponentInterface>();

    /**
     * 实体当前是否可用
     */
    private enabled = false;

    /**
     * 全局组件集合，由 ECS 指定，让 Entity 可以直接将组件添加到 ECS 中
     */
    globalComponentsRef: ECSComponents | undefined = undefined;

    /**
     * 构造函数
     */
    constructor() {
        nextEntityId++;
        this.id = nextEntityId.toString();
    }

    /**
     * 返回实体可用状态
     */
    isEnabled(): boolean {
        return this.enabled;
    }

    /**
     * 设置实体的所有组件是否可用
     *
     * @param enabled
     */
    setEnabled(enabled: boolean): ECSEntity {
        if (this.enabled === enabled || !this.globalComponentsRef) {
            // 状态未改变，或者还未添加到 ECS 中的实体，设置 enabled 不起作用
            return this;
        }

        this.enabled = enabled;
        const ref = this.globalComponentsRef;
        if (enabled) {
            // 把组件添加到全局组件列表
            this.components.forEach((component) => ref.add(component));
        } else {
            // 从全局组件列表移除组件
            this.components.forEach((component) => ref.delete(component));
        }
        return this;
    }

    /**
     * 添加组件到实体
     *
     * @param component
     */
    addComponent(component: ECSComponentInterface): ECSEntity {
        const name = component.name;
        if (this.components.has(name)) {
            throw new RangeError(
                `[ECS] component '${name}' already exists in entity '${this.id}'`
            );
        }
        component.entityId = this.id;
        if (this.globalComponentsRef) {
            this.globalComponentsRef.add(component);
        }
        this.components.set(name, component);
        return this;
    }

    /**
     * 检查指定的组件是否存在
     *
     * @param constructor
     */
    hasComponent<T extends ECSComponentInterface>(
        constructor: Constructor<T>
    ): boolean {
        return this.components.has(constructor.name);
    }

    /**
     * 取得指定名字的组件
     *
     * @param constructor
     */
    getComponent<T extends ECSComponentInterface>(
        constructor: Constructor<T>
    ): T {
        const name = constructor.name;
        const component = this.components.get(name);
        if (!component) {
            throw new RangeError(
                `[ECS] not found component '${name}' in entity '${this.id}'`
            );
        }
        return component as T;
    }

    /**
     * 移除组件
     *
     * @param constructor
     */
    removeComponent<T extends ECSComponentInterface>(
        constructor: Constructor<T>
    ): ECSEntity {
        const name = constructor.name;
        const component = this.components.get(name);
        if (!component) {
            throw new RangeError(
                `[ECS] not found component '${name}' in entity '${this.id}'`
            );
        }
        if (this.globalComponentsRef) {
            this.globalComponentsRef.delete(component);
        }
        this.components.delete(name);
        return this;
    }

    /**
     * 移除所有组件
     */
    removeAllComponents(): ECSEntity {
        if (this.globalComponentsRef) {
            const ref = this.globalComponentsRef;
            this.components.forEach((component) => ref.delete(component));
        }
        this.components.clear();
        return this;
    }
}
