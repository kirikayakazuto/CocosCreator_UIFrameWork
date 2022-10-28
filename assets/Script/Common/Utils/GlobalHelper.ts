export default class GlobalHelper {
    private static _globalMap: { [k: string]: any } = {};
    public static Register(name: string, inst: any) {
        GlobalHelper[name] = inst;
    }
    public static Get<T>(name: string): T {
        return GlobalHelper._globalMap.hasOwnProperty(name) ? GlobalHelper._globalMap[name] as T : undefined;
    }
}

window["GlobalHelper"] = GlobalHelper;