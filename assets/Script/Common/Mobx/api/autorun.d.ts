import { IEqualsComparer, IReactionDisposer, IReactionPublic } from "../mobx";
export interface IAutorunOptions {
    delay?: number;
    name?: string;
    /**
     * Experimental.
     * Warns if the view doesn't track observables
     */
    requiresObservable?: boolean;
    scheduler?: (callback: () => void) => any;
    onError?: (error: any) => void;
}
/**
 * Creates a named reactive view and keeps it alive, so that the view is always
 * updated if one of the dependencies changes, even when the view is not further used by something else.
 * @param view The reactive view
 * @returns disposer function, which can be used to stop the view from being updated in the future.
 */
export declare function autorun(view: (r: IReactionPublic) => any, opts?: IAutorunOptions): IReactionDisposer;
export declare type IReactionOptions = IAutorunOptions & {
    fireImmediately?: boolean;
    equals?: IEqualsComparer<any>;
};
export declare function reaction<T>(expression: (r: IReactionPublic) => T, effect: (arg: T, prev: T, r: IReactionPublic) => void, opts?: IReactionOptions): IReactionDisposer;
