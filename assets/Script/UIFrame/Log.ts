Function.prototype.before = function(foo: Function) {
    const that = this;
    return function(...args: any) {
        if(!foo.apply(that, args)) return ;
        that.apply(that, args);
    }
}

let log = console.log.before((...args: any) => {
    return args[0];
});

export default class Log {
    static d = log;
}

