/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSSystem } from "../ECSSystem";
import { ECSSystems } from "../ECSSystems";
import { Constructor } from "../__private";
import { ECSImpl } from "./ECSImpl";

/**
 * ECS 系统集合的实现
 */
export class ECSSystemsImpl implements ECSSystems {
    /**
     * 所有已经载入完成的系统，按照优先级排序
     */
    private readonly loaded: ECSSystem[] = [];

    /**
     * 按照名字查找所有已经载入完成的系统
     */
    private readonly loadedByName = new Map<string, ECSSystem>();

    /**
     * 保存正在载入中的系统，当 ECSSystem.load() 方法完成后移动到 loaded 队列
     */
    private readonly loading = new Map<string, [ECSSystem, boolean]>();

    /**
     * 系统的运行状态
     */
    private readonly systemsRunning = new Map<string, boolean>();

    /**
     * 当前运行状态
     */
    private running = false;

    /**
     * 下一个优先级值，后添加的系统会自动使用更大的优先级数值
     */
    private nextPriority = 0;

    /**
     * 构造函数
     *
     * @param ecs 所属 ECS
     */
    constructor(readonly ecs: ECSImpl) {
        this.ecs = ecs;
    }

    /**
     * 启动所有系统
     */
    start(): void {
        if (this.running) {
            throw new RangeError("[ECS] already is running");
        }
        this.running = true;
        this.checkLoading();
    }

    /**
     * 停止所有系统
     */
    stop(): void {
        if (!this.running) {
            throw new RangeError("[ECS] not running");
        }

        // 停止所有正在运行的系统
        this.loadedByName.forEach((system, name) => {
            if (this.systemsRunning.get(name) === true) {
                system.stop();
            }
            this.systemsRunning.set(name, false);
        });

        this.running = false;
    }

    /**
     * 更新所有系统
     *
     * @param dt
     */
    update(dt: number): void {
        for (const system of this.loaded) {
            if (system.enabled) {
                system.update(dt);
            }
        }
    }

    /**
     * 取得指定的系统
     *
     * @param constructor
     */
    get<T extends ECSSystem>(constructor: Constructor<T>): T {
        const name = constructor.name;
        const system = this.loadedByName.get(name);
        if (!system) {
            throw new RangeError(`[ECS] not found system '${name}'`);
        }
        return system as T;
    }

    /**
     * 添加系统
     *
     * @param system
     * @param priority
     */
    add(system: ECSSystem, priority?: number): ECSSystems {
        const name = system.name;
        if (typeof name !== "string" || name.length === 0) {
            throw new RangeError(
                `[ECS] system '${system}' not set name by @ecsclass`
            );
        }
        if (this.loadedByName.has(name)) {
            throw new RangeError(`[ECS] system '${name}' already exists`);
        }
        if (this.loading.has(name)) {
            throw new RangeError(`[ECS] system '${name}' already in loading`);
        }

        // 设置系统运行初始状态
        system.setEnvironment(this.ecs);
        if (typeof priority === "number") {
            system.priority = priority;
            if (priority > this.nextPriority) {
                this.nextPriority = priority + 1;
            }
        } else {
            system.priority = this.nextPriority;
            this.nextPriority++;
        }
        this.systemsRunning.set(system.name, false);

        // 加入 loading 列表
        this.loading.set(name, [system, false]);
        system
            .load()
            .then(() => {
                // 更新 loading 列表状态
                this.loading.set(name, [system, true]);
                // 检查 loading 列表
                this.checkLoading();
            })
            .catch((e) => {
                throw e;
            });

        return this;
    }

    /**
     * 删除指定系统
     *
     * @param system
     */
    delete(system: ECSSystem): ECSSystems {
        const name = system.name;
        if (this.loadedByName.has(name)) {
            // 从载入完成的列表中删除指定 system
            for (let i = 0, l = this.loaded.length; i < l; i++) {
                if (this.loaded[i].name === name) {
                    this.loaded.splice(i, 1);
                    break;
                }
            }
            this.loadedByName.delete(name);
        } else if (this.loading.has(name)) {
            // 从正在载入的列表中删除指定 system
            this.loading.delete(name);
        } else {
            throw new RangeError(`[ECS] not found system '${name}`);
        }

        // 检查是否需要停止系统
        if (this.systemsRunning.get(name)) {
            system.stop();
        }
        this.systemsRunning.delete(name);

        // 卸载系统
        system.unload();
        system.setEnvironment(undefined);

        // 检查载入中的系统
        this.checkLoading();

        return this;
    }

    /**
     * 删除所有系统
     */
    clear(): ECSSystems {
        this.loadedByName.forEach((system) => this.delete(system));
        this.loading.forEach(([system]) => this.delete(system));
        return this;
    }

    /**
     * 按照优先级对所有系统排序，数值小的优先执行
     */
    sort(): ECSSystems {
        this.loaded.sort((a: ECSSystem, b: ECSSystem): number => {
            if (a.priority > b.priority) {
                return 1;
            } else if (a.priority < b.priority) {
                return -1;
            } else {
                return 0;
            }
        });
        return this;
    }

    //// private

    /**
     * 检查 loading 列表中的所有系统是否都已经载入完成
     */
    private checkLoading(): void {
        // 已经载入完成的系统移动到 loaded 列表
        // 未载入完成的保持在 loading 列表中
        const removes: string[] = [];
        this.loading.forEach(([system, loaded], name) => {
            if (loaded) {
                this.loaded.push(system);
                this.loadedByName.set(name, system);
                removes.push(name);
            }
        });
        // 从正在载入列表清理已经完成载入的系统
        removes.forEach((name) => this.loading.delete(name));

        // 重新排序
        this.sort();

        if (this.loading.size > 0) {
            // 如果还有系统未加载完成，则继续等待
            return;
        }

        if (!this.running) return;

        // 启动所有还未启动的系统
        for (const system of this.loaded) {
            if (this.systemsRunning.get(system.name) !== true) {
                system.start();
                this.systemsRunning.set(system.name, true);
            }
        }
    }
}
