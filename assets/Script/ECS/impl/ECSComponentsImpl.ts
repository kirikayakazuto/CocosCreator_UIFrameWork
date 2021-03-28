/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSComponentInterface } from "../ECSComponent";
import { ECSComponents } from "../ECSComponents";
import { Constructor } from "../__private";

/**
 * 组件集合的实现
 */
export class ECSComponentsImpl implements ECSComponents {
    /**
     * 按照类型分组的所有组件
     */
    private components = new Map<string, ECSComponentInterface[]>();

    /**
     * 返回组件总数
     */
    size(): number {
        return this.components.size;
    }

    /**
     * 返回包含特定类型组件的数组
     *
     * @param constructor
     */
    all<T extends ECSComponentInterface>(constructor: Constructor<T>): T[] {
        const components = this.components.get(constructor.name);
        return components ? (components as T[]) : (EMPTY as T[]);
    }

    /**
     * 取得指定类型组件中的第一个
     *
     * @param constructor
     */
    get<T extends ECSComponentInterface>(constructor: Constructor<T>): T {
        const components = this.all<T>(constructor);
        if (components.length === 0) {
            throw new RangeError(
                `[ECS] not found component '${constructor.name}'`
            );
        }
        return components[0];
    }

    /**
     * 添加组件
     *
     * @param component
     */
    add(component: ECSComponentInterface): void {
        const name = component.name;
        if (typeof name !== "string" || name.length === 0) {
            throw new RangeError(
                `[ECS] component '${component}' not set name by @ecsclass`
            );
        }

        let components = this.components.get(name);
        if (!components) {
            components = [];
            this.components.set(name, components);
        }
        components.push(component);
    }

    /**
     * 删除特定组件
     *
     * @param component
     */
    delete(component: ECSComponentInterface): void {
        const components = this.components.get(component.name);
        if (components) {
            const i = components.indexOf(component);
            if (i >= 0) components.splice(i, 1);
        }
    }
}

//// private

/**
 * 预定义的空组件集合
 */
const EMPTY: ECSComponentInterface[] = [];
