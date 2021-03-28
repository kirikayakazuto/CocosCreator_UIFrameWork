/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSEntities } from "../ECSEntities";
import { ECSEntity } from "../ECSEntity";
import { ECSComponentsImpl } from "./ECSComponentsImpl";

/**
 * 实体集合的实现
 */
export class ECSEntitiesImpl implements ECSEntities {
    /**
     * 跟踪所有组件
     */
    readonly components = new ECSComponentsImpl();

    /**
     * 跟踪所有实体
     */
    private entities = new Set<ECSEntity>();

    /**
     * 按照实体 ID 跟踪所有实体
     */
    private entitiesById = new Map<string, ECSEntity>();

    /**
     * 所有实体的总数
     */
    size(): number {
        return this.entities.size;
    }

    /**
     * 检查指定 ID 的实体是否存在
     *
     * @param id
     */
    has(id: string): boolean {
        return this.entitiesById.has(id);
    }

    /**
     * 取得指定 ID 的实体
     *
     * @param id
     */
    get(id: string): ECSEntity {
        const entity = this.entitiesById.get(id);
        if (!entity) {
            throw new RangeError(`[ECS] not found entity '${id}'`);
        }
        return entity;
    }

    /**
     * 添加实体
     *
     * @param entity
     */
    add(entity: ECSEntity): void {
        entity.globalComponentsRef = this.components;
        entity.setEnabled(true);
        this.entities.add(entity);
        this.entitiesById.set(entity.id, entity);
    }

    /**
     * 删除指定 ID 的实体
     *
     * @param id
     */
    delete(id: string): void;

    /**
     * 删除指定实体
     *
     * @param entity
     */
    delete(entity: ECSEntity): void;

    delete(entity: string | ECSEntity): void {
        if (typeof entity === "string") {
            entity = this.get(entity);
        }
        entity.setEnabled(false);
        entity.globalComponentsRef = undefined;
        this.entities.delete(entity);
        this.entitiesById.delete(entity.id);
    }

    /**
     * 删除所有实体
     */
    clear(): void {
        this.entities.forEach((entity) => this.delete(entity));
    }
}
