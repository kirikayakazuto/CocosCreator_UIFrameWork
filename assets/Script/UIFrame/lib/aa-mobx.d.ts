
type IObservableMapInitialValues<K, V> = IMapEntries<K, V> | KeyValueMap<V> | IMap<K, V>

// interface IMobxConfigurationOptions {
//     +enforceActions?: boolean | "strict",
//     computedRequiresReaction?: boolean,
//     isolateGlobalState?: boolean,
//     disableErrorBoundaries?: boolean,
//     arrayBuffer?: number,
//     reactionScheduler?: (f: () => void) => void
// }

interface IMobxConfigurationOptions {

}

declare function configure(options: IMobxConfigurationOptions): void

interface IAutorunOptions {
  delay?: number,
  name?: string,
  scheduler?: (callback: () => void) => any,
  onError?: (error: any) => void
}

interface IReactionOptions extends IAutorunOptions {
  fireImmediately?: boolean,
  equals?: IEqualsComparer<any>
}

interface IInterceptable<T> {
  interceptors: IInterceptor<T>[] | any,
  intercept(handler: IInterceptor<T>): Lambda
}

type IEqualsComparer<T> = (a: T, b: T) => boolean

type IInterceptor<T> = (change: T) => T

type IMapEntry<K, V> = [K, V]

type IMapEntries<K, V> = IMapEntry<K, V>[]

interface IMap<K, V> {
  clear(): void,
  delete(key: K): boolean,
  forEach(callbackfn: (value: V, index: K, map: IMap<K, V>) => void, thisArg?: any): void,
  get(key: K): V | any,
  has(key: K): boolean,
  set(key: K, value?: V): any,
  size: number
}

declare function isObservableMap(x: any): boolean

interface IComputedValueOptions<T> {
  get?: () => T,
  set?: (value: T) => void,
  name?: string,
  equals?: IEqualsComparer<T>,
  context?: any
}

interface IComputed {
  <T>(func: () => T, setter?: (value: T) => void): IComputedValue<T>,
  <T>(func: () => T, options: IComputedValueOptions<T>): IComputedValue<T>,
  (target: Object, key: string, baseDescriptor?: PropertyDescriptor): void,
  struct(target: Object, key: string, baseDescriptor?: PropertyDescriptor): void
}

interface IDependencyTree {
  name: string,
  dependencies?: IDependencyTree[]
}

interface IObserverTree {
  name: string,
  observers?: IObserverTree[]
}

interface IAtom {
  reportObserved: () => void,
  reportChanged: () => void
}

interface IComputedValue<T> {
  get(): T,
  set(value: T): void,
  observe(listener: (newValue: T, oldValue: T) => void, fireImmediately?: boolean): Lambda
}

interface IObservable { }

interface IDepTreeNode {
  name: string,
  observing?: IObservable[]
}

interface IDerivation {
  name: string
}

interface IReactionPublic {
  dispose: () => void,
  trace: (enterBreakPoint?: boolean) => void
}

declare class IListenable {
  observe(handler: (change: any, oldValue?: any) => void, fireImmediately?: boolean): Lambda
}

interface IObservableArray<T> extends Array<T> {
  spliceWithArray(index: number, deleteCount?: number, newItems?: T[]): T[],
  observe(
    listener: (changeData: IArrayChange<T> | IArraySplice<T>) => void,
    fireImmediately?: boolean
  ): Lambda,
  intercept(handler: IInterceptor<IArrayWillChange<T> | IArrayWillSplice<T>>): Lambda,
  intercept(handler: IInterceptor<IArrayChange<T> | IArraySplice<T>>): Lambda,
  intercept<T>(handler: IInterceptor<IArrayChange<T> | IArraySplice<T>>): Lambda,
  clear(): T[],
  replace(newItems: T[]): T[],
  find(
    predicate: (item: T, index: number, array: Array<T>) => boolean,
    thisArg?: any,
    fromIndex?: number
  ): T | any,
  findIndex(
    predicate: (item: T, index: number, array: Array<T>) => boolean,
    thisArg?: any,
    fromIndex?: number
  ): number,
  remove(value: T): boolean
}

interface IArrayChange<T> {
  type: "update",
  object: IObservableArray<T>,
  index: number,
  newValue: T,
  oldValue: T
}

interface IArraySplice<T> {
  type: "splice",
  object: IObservableArray<T>,
  index: number,
  added: T[],
  addedCount: number,
  removed: T[],
  removedCount: number
}

interface IArrayWillChange<T> {
  type: "update",
  object: IObservableArray<T>,
  index: number,
  newValue: T
}

interface IArrayWillSplice<T> {
  type: "splice",
  object: IObservableArray<T>,
  index: number,
  added: T[],
  removedCount: number
}

type KeyValueMap<V> = {
  [key: string]: V
}

interface IMapChange<K, T> {
  object: ObservableMap<K, T>,
  type: "update" | "add" | "delete",
  name: K,
  newValue?: any,
  oldValue?: any
}

interface IMapWillChange<K, T> {
  object: ObservableMap<K, T>,
  type: "update" | "add" | "delete",
  name: K,
  newValue?: any
}

interface IObservableObject { }

interface IObjectChange {
  name: string,
  object: any,
  type: "update" | "add" | "remove",
  oldValue?: any,
  newValue: any
}

interface IObjectWillChange {
  object: any,
  type: "update" | "add" | "remove",
  name: string,
  newValue: any
}

interface IValueWillChange<T> {
  object: any,
  type: "update",
  newValue: T
}

interface IValueDidChange<T> extends IValueWillChange<T> {
  oldValue?: T
}

interface IObservableValue<T> {
  get(): T,
  set(value: T): void,
  intercept(handler: IInterceptor<IValueWillChange<T>>): Lambda,
  observe(listener: (change: IValueDidChange<T>) => void, fireImmediately?: boolean): Lambda
}

interface IEnhancer<T> {
  (newValue: T, oldValue: T | void, name: string): T
}

interface IObservableFactory {
  // observable overloads
  (target: Object, key: string, baseDescriptor?: PropertyDescriptor): any,
  <T>(value: Array<T>): IObservableArray<T>,
  <T>(value: null | void): IObservableValue<T>,
  (value: null | void): IObservableValue<any>,
  <T>(value: IMap<string | number | boolean, T>): ObservableMap<T, any>,
  <T, Object>(value: T): T
}

type IObservableDecorator = {
  (target: Object, property: string, descriptor?: PropertyDescriptor): void,
  enhancer: IEnhancer<any>
}

type CreateObservableOptions = {
  name?: string,
  deep?: boolean,
  defaultDecorator?: IObservableDecorator
}

declare class IObservableFactories {
  box<T>(value?: T, options?: CreateObservableOptions): IObservableValue<T>
  array<T>(initialValues?: T[], options?: CreateObservableOptions): IObservableArray<T>
  map<K, V>(
    initialValues?: IObservableMapInitialValues<K, V>,
    options?: CreateObservableOptions
  ): ObservableMap<K, V>
  object<T>(props: T, options?: CreateObservableOptions): T & IObservableObject
  ref(target: Object, property?: string, descriptor?: PropertyDescriptor): IObservableDecorator
  shallow(
    target: Object,
    property?: string,
    descriptor?: PropertyDescriptor
  ): IObservableDecorator
  deep(target: Object, property?: string, descriptor?: PropertyDescriptor): IObservableDecorator
}

interface Iterator<T> {
  next(): {
    done: boolean,
    value?: T
  }
}

interface Lambda {
  (): void,
  name?: string
}

interface IActionFactory {
  (a1: any, a2?: any, a3?: any, a4?: any, a6?: any): any,
  bound(target: Object, propertyKey: string, descriptor?: PropertyDescriptor): void
}

declare class ObservableMap<K, V> {
  constructor(initialData?: IMapEntries<K, V> | KeyValueMap<V>, valueModeFunc?: Function);
  has(key: K): boolean
  set(key: K, value: V): void
  delete(key: K): boolean
  get(key: K): V
  keys(): Iterator<K>
  values(): Iterator<V>
  entries(): IMapEntries<K, V> & Iterator<IMapEntry<K, V>>
  forEach(callback: (value: V, key: K, object: KeyValueMap<V>) => void, thisArg?: any): void
  merge(other: ObservableMap<K, V> | KeyValueMap<V>): ObservableMap<K, V>
  clear(): void
  replace(other: ObservableMap<K, V> | KeyValueMap<V>): ObservableMap<K, V>
  size: number
  toJS(): Map<K, V>
  toPOJO(): KeyValueMap<V>
  toJSON(): KeyValueMap<V>
  toString(): string
  observe(listener: (changes: IMapChange<K, V>) => void, fireImmediately?: boolean): Lambda
  intercept(handler: IInterceptor<IMapWillChange<K, V>>): Lambda
}

declare function action(
  targetOrName: any,
  propertyKeyOrFuc?: any,
  descriptor?: PropertyDescriptor
): any
declare function action<T>(name: string, func: T): T
declare function action<T>(func: T): T

declare function runInAction<T>(name: string, block: () => T): T
declare function runInAction<T>(block: () => T): T
declare function isAction(thing: any): boolean
declare function autorun(
  nameOrFunction: string | ((r: IReactionPublic) => any),
  options?: IAutorunOptions
): any
declare function reaction<T>(
  expression: (r: IReactionPublic) => T,
  effect: (arg: T, r: IReactionPublic) => void,
  opts?: IReactionOptions
): any

interface IWhenOptions {
  name?: string,
  timeout?: number,
  onError?: (error: any) => void
}

declare function when(cond: () => boolean, effect: Lambda, options?: IWhenOptions): any
declare function when(cond: () => boolean, options?: IWhenOptions): Promise<any>

declare function computed<T>(
  target: any,
  key?: string,
  baseDescriptor?: PropertyDescriptor
): any

declare function extendObservable<A, B>(
  target: A,
  properties: B,
  decorators?: any,
  options?: any
): A & B

declare function intercept(
  object: Object,
  property: string,
  handler: IInterceptor<any>
): Lambda

declare function isComputed(value: any): boolean
declare function isComputedProp(value: any, property: string): boolean

declare function isObservable(value: any): boolean
declare function isObservableProp(value: any, property: string): boolean

declare var observable: IObservableFactory &
  IObservableFactories & {
  deep: {
    struct<T>(initialValue?: T): T
  },
  ref: {
    struct<T>(initialValue?: T): T
  }
}

declare function observe<T>(
  value: IObservableValue<T> | IComputedValue<T>,
  listener: (change: IValueDidChange<T>) => void,
  fireImmediately?: boolean
): Lambda
declare function observe<T>(
  observableArray: IObservableArray<T>,
  listener: (change: IArrayChange<T> | IArraySplice<T>) => void,
  fireImmediately?: boolean
): Lambda
declare function observe<K, T>(
  observableMap: ObservableMap<K, T>,
  listener: (change: IMapChange<K, T>) => void,
  fireImmediately?: boolean
): Lambda
declare function observe<K, T>(
  observableMap: ObservableMap<K, T>,
  property: string,
  listener: (change: IValueDidChange<T>) => void,
  fireImmediately?: boolean
): Lambda
declare function observe(
  object: any,
  listener: (change: IObjectChange) => void,
  fireImmediately?: boolean
): Lambda
declare function observe(
  object: any,
  property: string,
  listener: (change: IValueDidChange<any>) => void,
  fireImmediately?: boolean
): Lambda

interface ToJSOptions {
  detectCycles?: boolean,
  exportMapsAsObjects?: boolean
}

declare function toJS<T>(source: T, options?: ToJSOptions): T

declare function untracked<T>(action: () => T): T

declare function spy(listener: (change: any) => void): Lambda

declare function transaction<T>(action: () => T, thisArg?: any, report?: boolean): T

declare function isObservableArray(thing: any): boolean

declare function isObservableObject<T>(thing: T): boolean

declare function isArrayLike(x: any): boolean

declare class Reaction {
  name: string
  isDisposed: boolean
  constructor(name: string, onInvalidate: () => void)
  schedule(): void
  isScheduled(): boolean
  track(fn: () => void): void
  dispose(): void
  getDisposer(): Lambda & {
    $mosbservable: Reaction
  }
  toString(): string
  trace(enterBreakPoint?: boolean): void
}

declare function createAtom(
  name: string,
  onBecomeObservedHandler?: () => void,
  onBecomeUnobservedHandler?: () => void
): IAtom

declare function decorate<T>(target: T, decorators: any): T

declare function flow<T>(fn: (...args: any[]) => T): (...args: any[]) => Promise<T>
declare function flow<T>(
  name: string,
  fn: (...args: any[]) => T
): (...args: any[]) => Promise<T>

declare function keys<K>(map: ObservableMap<K, any>): K[]
declare function keys(obj: any): string[]

declare function values<K, T>(map: ObservableMap<K, T>): T[]
declare function values<T>(ar: IObservableArray<T>): T[]
declare function values(obj: any): any[]

declare function set<V>(obj: ObservableMap<string, V>, values: { [key: string]: V }): void
declare function set<K, V>(obj: ObservableMap<K, V>, key: K, value: V): void
declare function set<T>(obj: IObservableArray<T>, index: number, value: T): void
declare function set(obj: any, values: { [key: string]: any }): void
declare function set(obj: any, key: string, value: any): void

declare function remove<K, V>(obj: ObservableMap<K, V>, key: K): void
declare function remove<T>(obj: IObservableArray<T>, index: number): void
declare function remove(obj: any, key: string): void

declare function has<K>(obj: ObservableMap<K, any>, key: K): boolean
declare function has<T>(obj: IObservableArray<T>, index: number): boolean
declare function has(obj: any, key: string): boolean

declare function get<K, V>(obj: ObservableMap<K, V>, key: K): V | void
declare function get<T>(obj: IObservableArray<T>, index: number): T | void
declare function get(obj: any, key: string): any

declare function onReactionError(
  handler: (error: any, derivation: IDerivation) => void
): () => void

declare function onBecomeObserved(
  value: IObservable | IComputedValue<any> | IObservableArray<any> | ObservableMap<any, any>,
  listener: Lambda
): Lambda
declare function onBecomeObserved<K>(
  value: ObservableMap<K, any> | Object,
  property: K,
  listener: Lambda
): Lambda

declare function onBecomeUnobserved(
  value: IObservable | IComputedValue<any> | IObservableArray<any> | ObservableMap<any, any>,
  listener: Lambda
): Lambda
declare function onBecomeUnobserved<K>(
  value: ObservableMap<K, any> | Object,
  property: K,
  listener: Lambda
): Lambda

declare function getAtom(thing: any, property?: string): IDepTreeNode
declare function getDebugName(thing: any, property?: string): string
declare function getDependencyTree(thing: any, property?: string): IDependencyTree
declare function getObserverTree(thing: any, property?: string): IObserverTree
