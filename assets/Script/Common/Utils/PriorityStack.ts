import { PriorityElement } from "./PriorityQueue";

/** 带优先级的栈 */
export default class PriorityStake<T> {
    private stack: Array<PriorityElement<T>> = new Array<PriorityElement<T>>();

    public push(e: T, pIdx: number = 0) {
        this.stack.push(new PriorityElement(e, pIdx));
        this._adjust();
    }
    public pop() {
        if(this.stack.length <= 0) return null;
        return this.stack.pop();
    }

    private _adjust() {
        for(let i=this.stack.length-1; i>0; i--) {
            if(this.stack[i] < this.stack[i-1]) {
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
            if(e.data === t) {
                return true;
            }
        }
        return false;
    }
}