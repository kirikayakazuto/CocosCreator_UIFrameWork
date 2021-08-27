/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSEnvironment } from "./ECSEnvironment";

/**
 * 系统接口
 */
export abstract class ECSSystem {
    /**
     * 返回类名
     */
    get name(): string {
        return this.constructor.name;
    }

    /**
     * 系统是否处于允许状态
     */
    enabled = true;

    /**
     * 执行时的优先级，数字更小的系统会更优先执行
     */
    priority = 0;

    /**
     * 系统所属的 ECS，由 ECS 设置
     */
    private ecsInstance: ECSEnvironment | undefined;

    /**
     * 系统所在的 ECS 环境
     */
    get ecs(): ECSEnvironment {
        if (!this.ecsInstance) {
            throw new TypeError("[ECS] System.ecs is undefined");
        }
        return this.ecsInstance;
    }

    /**
     * 设置系统所属 ECS 环境
     */
    setEnvironment(env: ECSEnvironment | undefined) {
        this.ecsInstance = env;
    }

    /**
     * 系统载入
     */
    async load() {}

    /**
     * 系统卸载
     */
    unload(): void {}

    /**
     * 启动系统
     */
    start(): void {}

    /**
     * 停止系统
     */
    stop(): void {}

    /**
     * 更新状态
     *
     * @param dt
     */
    update(dt: number): void {}
}
