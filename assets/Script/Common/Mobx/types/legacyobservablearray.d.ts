import { IEnhancer, IObservableArray } from "../mobx";
export declare function reserveArrayBuffer(max: number): void;
export declare function createLegacyArray<T>(initialValues: T[] | undefined, enhancer: IEnhancer<T>, name?: string): IObservableArray<T>;
