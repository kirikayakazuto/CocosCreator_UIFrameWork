
export class Broadcast<T> {

    private bindings: ListenerBinding<T>[] = [];

    on(listener: (...params: T[]) => void, target: any): ListenerBinding<T> {
        var binding = new ListenerBinding(listener, target, false, this);
        this.bindings.push(binding);
        return binding;
    }

    once(listener: (...params: T[]) => void, target: any): ListenerBinding<T> {
        var binding = new ListenerBinding(listener, target, true, this);
        this.bindings.push(binding);
        return binding;
    }

    dispatch(...params: T[]) {
        var flag = false;
        for (let item of this.bindings) {
            if (!item.hasDestroyed) {
                item.execute.apply(item, params);
            } else {
                flag = true;
            }
        }
        if (flag) {
            for (let i = 0; i < this.bindings.length; i++) {
                if (this.bindings[i].hasDestroyed) {
                    this.bindings.splice(i, 1);
                    i--;
                }
            }
        }
    }

    get(listener: (...params: T[]) => void, target: any): ListenerBinding<T> | null {
        for (let item of this.bindings) {
            if (item.listener == listener && item.target == target && !item.hasDestroyed) return item;
        }
        return null;
    }

    has(listener: (...params: T[]) => void, target: any): boolean {
        for (let item of this.bindings) {
            if (item.listener == listener && item.target == target && !item.hasDestroyed) return true;
        }
        return false;
    }

    remove(listener: (...params: T[]) => void, target: any) {
        for (let item of this.bindings) {
            if (item.listener == listener && item.target == target && !item.hasDestroyed) {
                return item.destroy();
            }
        }
    }

    removeAll() {
        while (this.bindings.length) {
            this.bindings.pop()?.destroy();
        }
    }
}

export class ListenerBinding<T> {

    constructor(listener: (...params: T[]) => void, target: any, once: boolean, boradcast: Broadcast<T>) {
        this.listener = listener;
        this.target = target;
        this.once = once;
        this.broadcast = boradcast;
        this.hasDestroyed = false;
    }

    readonly listener: (...params: T[]) => void;

    readonly target: any;

    readonly once: boolean;

    readonly broadcast: Broadcast<T>;

    readonly hasDestroyed: boolean;

    execute(...params: T[]): any {
        if (!this.hasDestroyed) {
            let result = this.listener.apply(this.target, params);
            if (this.once) {
                this.destroy();
            }
            return result;
        }
        return null;
    }

    destroySelf = () => {
        this.destroy();
    }

    destroy(): void {
        (this.listener as any) = null;
        (this.target as any) = null;
        (this.once as any) = null;
        (this.broadcast as any) = null;
        (this.hasDestroyed as any) = true;
    }
}

