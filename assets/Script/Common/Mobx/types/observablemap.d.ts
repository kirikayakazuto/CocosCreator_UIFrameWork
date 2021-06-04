import { $mobx, IEnhancer, IInterceptable, IInterceptor, IListenable, Lambda, ObservableValue, IAtom } from "../mobx";
export interface IKeyValueMap<V = any> {
    [key: string]: V;
}
export declare type IMapEntry<K = any, V = any> = [K, V];
export declare type IMapEntries<K = any, V = any> = IMapEntry<K, V>[];
export declare type IMapDidChange<K = any, V = any> = {
    observableKind: "map";
    debugObjectName: string;
} & ({
    object: ObservableMap<K, V>;
    name: K;
    type: "update";
    newValue: V;
    oldValue: V;
} | {
    object: ObservableMap<K, V>;
    name: K;
    type: "add";
    newValue: V;
} | {
    object: ObservableMap<K, V>;
    name: K;
    type: "delete";
    oldValue: V;
});
export interface IMapWillChange<K = any, V = any> {
    object: ObservableMap<K, V>;
    type: "update" | "add" | "delete";
    name: K;
    newValue?: V;
}
export declare const ADD = "add";
export declare const DELETE = "delete";
export declare type IObservableMapInitialValues<K = any, V = any> = IMapEntries<K, V> | IKeyValueMap<V> | Map<K, V>;
export declare class ObservableMap<K = any, V = any> implements Map<K, V>, IInterceptable<IMapWillChange<K, V>>, IListenable {
    enhancer_: IEnhancer<V>;
    name_: string;
    [$mobx]: {};
    data_: Map<K, ObservableValue<V>>;
    hasMap_: Map<K, ObservableValue<boolean>>;
    keysAtom_: IAtom;
    interceptors_: any;
    changeListeners_: any;
    dehancer: any;
    constructor(initialData?: IObservableMapInitialValues<K, V>, enhancer_?: IEnhancer<V>, name_?: string);
    private has_;
    has(key: K): boolean;
    set(key: K, value: V): this;
    delete(key: K): boolean;
    private updateHasMapEntry_;
    private updateValue_;
    private addValue_;
    get(key: K): V | undefined;
    private dehanceValue_;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    entries(): IterableIterator<IMapEntry<K, V>>;
    [Symbol.iterator](): IterableIterator<IMapEntry<K, V>>;
    forEach(callback: (value: V, key: K, object: Map<K, V>) => void, thisArg?: any): void;
    /** Merge another object into this object, returns this. */
    merge(other: ObservableMap<K, V> | IKeyValueMap<V> | any): ObservableMap<K, V>;
    clear(): void;
    replace(values: ObservableMap<K, V> | IKeyValueMap<V> | any): ObservableMap<K, V>;
    get size(): number;
    toString(): string;
    toJSON(): [K, V][];
    get [Symbol.toStringTag](): string;
    /**
     * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
     * for callback details
     */
    observe_(listener: (changes: IMapDidChange<K, V>) => void, fireImmediately?: boolean): Lambda;
    intercept_(handler: IInterceptor<IMapWillChange<K, V>>): Lambda;
}
export declare var isObservableMap: (thing: any) => thing is ObservableMap<any, any>;
