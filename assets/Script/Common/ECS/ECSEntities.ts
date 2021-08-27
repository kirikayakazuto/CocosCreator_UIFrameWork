/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSEntity } from "./ECSEntity";

/**
 * 实体集合
 */
export interface ECSEntities {
    /**
     * 返回实体总数
     */
    size(): number;

    /**
     * 检查指定实体是否存在
     *
     * @param id
     */
    has(id: string): boolean;

    /**
     * 获取指定实体
     *
     * @param id
     */
    get(id: string): ECSEntity;

    /**
     * 添加实体
     *
     * @param entity
     */
    add(entity: ECSEntity): void;

    /**
     * 按照 ID 移除指定实体
     *
     * @param id
     */
    delete(id: string): void;

    /**
     * 移除实体
     *
     * @param entity
     */
    delete(entity: ECSEntity): void;

    /**
     * 移除所有实体
     */
    clear(): void;
}
