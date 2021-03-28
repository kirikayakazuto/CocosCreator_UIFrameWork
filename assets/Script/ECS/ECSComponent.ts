/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

/**
 * 组件接口
 */
export interface ECSComponentInterface {
    /**
     * 组件的类名
     */
    name: string;

    /**
     * 组件的所有者实体 ID
     */
    entityId: string;
}

/**
 * 组件
 */
export abstract class ECSComponent implements ECSComponentInterface {
    /**
     * 组件的类名
     */
    get name(): string {
        return this.constructor.name;
    }

    /**
     * 组件的所有者实体 ID
     */
    entityId = "";
}
