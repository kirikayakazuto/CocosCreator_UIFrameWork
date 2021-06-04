import { CreateObservableOptions, AnnotationsMap } from "../mobx";
export declare function extendObservable<A extends Object, B extends Object>(target: A, properties: B, annotations?: AnnotationsMap<B, never>, options?: CreateObservableOptions): A & B;
