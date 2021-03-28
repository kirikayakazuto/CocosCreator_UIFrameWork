/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

/**
 * 构造函数类型
 */
export type Constructor<T = unknown> = new (...args: any[]) => T;

/**
 * ecsclass() 装饰器为 class 添加有效的 name 属性
 *
 * @param name
 */
export function ecsclass(name: string) {
    return (ctor: Function) => {
        Object.defineProperty(ctor, "name", {
            value: name,
            writable: false,
        });
    };
}
