import { PriorityElement } from "./PriorityQueue";

type StackCompare<T> = (a: T, b: T) => boolean;

/** 带优先级的栈 */
export default class PriorityStack<T> {
    private compare: StackCompare<T> = (a: T, b: T) => a === b;
    constructor(compare?: StackCompare<T>) {
        this.compare = compare;
    }
    private stack: Array<PriorityElement<T>> = new Array<PriorityElement<T>>();
    private _size = 0;
    public get size() {
        return this._size;
    }

    public clear() {
        this.stack.length = 0;
        this._size = 0;
        return true;
    }

    public getTopEPriority() {
        if(this.stack.length <= 0) return -1;
        return this.stack[this.stack.length-1].priority;
    }

    public getTopElement() {
        if(this.stack.length <= 0) return null;
        return this.stack[this.stack.length-1].data;
    }

    public getElements() {
        let elements: T[] = [];
        for(const e of this.stack) {
            elements.push(e.data);
        }
        return elements;
    }

    public push(e: T, priority: number = 0) {
        this.stack.push(new PriorityElement(e, priority));
        this._size ++;
        this._adjust();
    }

    public pop() {
        if(this.stack.length <= 0) return null;
        this._size --;
        return this.stack.pop().data;
    }

    private _adjust() {
        for(let i=this.stack.length-1; i>0; i--) {
            if(this.stack[i].priority < this.stack[i-1].priority) {
                this._swap(i, i-1);
            }
            
        }
    }

    private _swap(a: number, b: number) {
        let tmp = this.stack[a];
        this.stack[a] = this.stack[b];
        this.stack[b] = tmp;
    }

    /** 是否有这个元素 */
    public hasElement(t: T) {
        for(const e of this.stack) {
            if(this.compare(e.data, t)) {
                return true;
            }
        }
        return false;
    }

    public remove(t: T) {
        for(let i=this.stack.length-1; i>=0; i--) {
            if(this.compare(this.stack[i].data, t)) {
                this.stack.splice(i, 1);
                this._size --;
                return true;
            }
        }
        return false;
    }
}