/**@module Editor (share) */
declare module Editor {
    export module Scene {
        /**传递场景脚本事件 */
        export function callSceneScript(package_s_: string, type_s_: string, ...args: any[]): void;
    }
}