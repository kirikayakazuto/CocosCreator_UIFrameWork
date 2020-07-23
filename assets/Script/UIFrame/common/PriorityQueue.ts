/**
 * @author denglang
 * 优先队列
 */
export class PriorityElement<T> {
    public data: T;
    public pIdx: number;
    
    constructor(data: T, pIdx: number) {
        this.data = data;
        this.pIdx = pIdx;
    }
}

export default class PriorityQueue<T> {
    private queue: Array<PriorityElement<T>> = new Array<PriorityElement<T>>(32);
    private size: number = 0;

    constructor() {
    }

    public enqueue(e: T, pIdx: number = 0) {
        if(this.size > this.queue.length) {
            this._expand();
        }
        this.queue[this.size++] = new PriorityElement(e, pIdx);
        this.upAdjust();
    }

    public dequeue() {
        if(this.size <= 0) return null;
        const head = this.queue[0];
        this.queue[0] = this.queue[--this.size];
        this.downAdjust();
        return head.data;
    }

    private upAdjust() {
        let childIndex = this.size - 1;
        let parentIndex = Math.floor(childIndex/2);
        let tmp = this.queue[childIndex]

        while(childIndex > 0 && tmp.pIdx > this.queue[parentIndex].pIdx) {
            this.queue[childIndex] = this.queue[parentIndex];
            childIndex = parentIndex;
            parentIndex = Math.floor(parentIndex/2);
        }

        this.queue[childIndex] = tmp;
    }

    private downAdjust() {
        let parentIndex = 0;
        let tmp = this.queue[parentIndex];
        let childIndex = 1;
        while(childIndex < this.size) {
            if(childIndex + 1 < this.size && this.queue[childIndex+1].pIdx > this.queue[childIndex].pIdx) {
                childIndex ++;
            }
            if(tmp.pIdx >= this.queue[childIndex].pIdx) {
                break;
            }

            this.queue[parentIndex] = this.queue[childIndex];
            parentIndex = childIndex;
            childIndex = 2 * childIndex + 1;
        }
        this.queue[parentIndex] = tmp;
    }

    private _expand() {
        let newSize = Math.round(this.queue.length * 1.2) + 1;
        const oldQueue = this.queue;
        this.queue = new Array(newSize);
        for(let i=0; i<oldQueue.length; i++) {
            this.queue[i] = oldQueue[i];
        }
    }

    toString() {
        let s = '';
        for(let i=0; i<this.size; i++) {
            s += this.queue[i].data;
        }
        return s;
    }
}