declare const __modular;

function hookCtor(func: Function) {
    return function (...params) {
        let result = func.call(this, ...params) || this;
        func['___ins'] = result;
        return result;
    };
}
export default class DebugWindowUtil {
    private static getModuleName(modules: string) {
        if (typeof modules !== 'string') {
            return modules;
        }
        return modules.split('/').pop().split('.')[0];
    }
    public static init() {
        const require = typeof __modular !== 'undefined' ? __modular : {};
        if (!require || !require.modules) {
            return;
        }
        const installedModules = require.modules;
        let allExports = {};
        function addExports(k, obj, modName) {
            let name = k;
            if(obj && obj.name) {
                name = obj.name;
            }
            if (allExports[k]) {
                return addExports(k + modName, obj, modName);
            }
            let wraped = obj;
            // if(obj.prototype && Object.keys(obj).length > 1 && !wraped.__origin){
            //     wraped = hookCtor(obj);
            //     wraped.__origin = obj;
            //     Object.setPrototypeOf(wraped, obj);
            // }
            allExports[name] = wraped;
            return wraped;
        }

        for (let k in installedModules) {
            const module = installedModules[k];
            const file = module.file;
            const exports = module.module ? module.module.exports : {};
            const modName = this.getModuleName(file);
            for (let k in exports) {
                if (k === '__esModule') {
                    continue;
                } else if (k === 'default') {
                    exports[k] = addExports(modName, exports[k], modName);
                    if (!exports[modName]) {
                        exports[modName] = exports[k];
                    }
                } else {
                    exports[k] = addExports(k, exports[k], modName);
                }
            }

            window[`${modName}_mod`] = exports;
        }
        for (let k in allExports) {
            if (window[k]) { continue; }
            window[k] = allExports[k];
        }
    }
}