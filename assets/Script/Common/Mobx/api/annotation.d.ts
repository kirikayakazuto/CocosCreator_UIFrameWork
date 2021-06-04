import { ObservableObjectAdministration } from "../mobx";
export declare const enum MakeResult {
    Cancel = 0,
    Break = 1,
    Continue = 2
}
export declare type Annotation = {
    annotationType_: string;
    make_(adm: ObservableObjectAdministration, key: PropertyKey, descriptor: PropertyDescriptor, source: object): MakeResult;
    extend_(adm: ObservableObjectAdministration, key: PropertyKey, descriptor: PropertyDescriptor, proxyTrap: boolean): boolean | null;
    options_?: any;
};
export declare type AnnotationMapEntry = Annotation | true | false;
export declare type AnnotationsMap<T, AdditionalFields extends PropertyKey> = {
    [P in Exclude<keyof T, "toString">]?: AnnotationMapEntry;
} & Record<AdditionalFields, AnnotationMapEntry>;
export declare function isAnnotation(thing: any): boolean;
export declare function isAnnotationMapEntry(thing: any): boolean;
