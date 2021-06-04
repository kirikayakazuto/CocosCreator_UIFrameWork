import { IArrayWillChange, IArrayWillSplice, IInterceptor, IMapWillChange, IObjectWillChange, IObservableArray, IObservableValue, IValueWillChange, Lambda, ObservableMap, ObservableSet, ISetWillChange } from "../mobx";
export declare function intercept<T>(value: IObservableValue<T>, handler: IInterceptor<IValueWillChange<T>>): Lambda;
export declare function intercept<T>(observableArray: IObservableArray<T>, handler: IInterceptor<IArrayWillChange<T> | IArrayWillSplice<T>>): Lambda;
export declare function intercept<K, V>(observableMap: ObservableMap<K, V>, handler: IInterceptor<IMapWillChange<K, V>>): Lambda;
export declare function intercept<V>(observableMap: ObservableSet<V>, handler: IInterceptor<ISetWillChange<V>>): Lambda;
export declare function intercept<K, V>(observableMap: ObservableMap<K, V>, property: K, handler: IInterceptor<IValueWillChange<V>>): Lambda;
export declare function intercept(object: object, handler: IInterceptor<IObjectWillChange>): Lambda;
export declare function intercept<T extends object, K extends keyof T>(object: T, property: K, handler: IInterceptor<IValueWillChange<any>>): Lambda;
