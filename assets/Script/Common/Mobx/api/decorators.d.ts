import { Annotation, AnnotationsMap } from "../mobx";
export declare const storedAnnotationsSymbol: unique symbol;
/**
 * Creates a function that acts as
 * - decorator
 * - annotation object
 */
export declare function createDecoratorAnnotation(annotation: Annotation): PropertyDecorator & Annotation;
/**
 * Stores annotation to prototype,
 * so it can be inspected later by `makeObservable` called from constructor
 */
export declare function storeAnnotation(prototype: any, key: PropertyKey, annotation: Annotation): void;
/**
 * Collects annotations from prototypes and stores them on target (instance)
 */
export declare function collectStoredAnnotations(target: any): AnnotationsMap<any, any>;
