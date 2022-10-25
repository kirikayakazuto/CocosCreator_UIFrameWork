const ClassMap: {[key: string]: Object} = cc.js.createMap();

export const RigisterClass = (name: string) => {
    return function (target: any) {
        ClassMap[name] = target;
    }
}

export const GetClassByName = (name: string) => {
    return ClassMap[name];
}

