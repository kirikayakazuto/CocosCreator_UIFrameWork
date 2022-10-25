/**
 * @author honmono
 * 优先队列
 */
export class PriorityElement<T> {
    public data: T;
    public priority: number;
    
    constructor(data: T, priority: number) {
        this.data = data;
        this.priority = priority;
    }
}

export default class PriorityQueue<T> {
    private queue: Array<PriorityElement<T>> = new Array<PriorityElement<T>>(32);
    private _size: number = 0;

    public get size() {
        return this._size;
    }

    constructor() {
    }

    /** 是否有这个元素 */
    public hasElement(t: T) {
        for(const e of this.queue) {
            if(e.data === t) {
                return true;
            }
        }
        return false;
    }

    /** 入队 */
    public enqueue(e: T, priority: number = 0) {
        if(this._size > this.queue.length) {
            this._expand();
        }
        this.queue[this._size++] = new PriorityElement(e, priority);
        this.upAdjust();
    }

    /** 出队 */
    public dequeue() {
        if(this._size <= 0) return null;
        const head = this.queue[0];
        this.queue[0] = this.queue[--this._size];
        this.downAdjust();
        return head.data;
    }

    public clear() {
        this.queue = [];
        this._size = 0;
    }
    /** 上调, 入队时判断入队元素优先级 */
    private upAdjust() {
        let childIndex = this._size - 1;
        let parentIndex = Math.floor(childIndex/2);
        let tmp = this.queue[childIndex]

        while(childIndex > 0 && tmp.priority > this.queue[parentIndex].priority) {
            this.queue[childIndex] = this.queue[parentIndex];
            childIndex = parentIndex;
            parentIndex = Math.floor(parentIndex/2);
        }

        this.queue[childIndex] = tmp;
    }
    /** 出队 */
    private downAdjust() {
        let parentIndex = 0;
        let tmp = this.queue[parentIndex];
        let childIndex = 1;
        while(childIndex < this._size) {
            if(childIndex + 1 < this._size && this.queue[childIndex+1].priority > this.queue[childIndex].priority) {
                childIndex ++;
            }
            if(tmp.priority >= this.queue[childIndex].priority) {
                break;
            }

            this.queue[parentIndex] = this.queue[childIndex];
            parentIndex = childIndex;
            childIndex = 2 * childIndex + 1;
        }
        this.queue[parentIndex] = tmp;
    }
    /** 扩列 */
    private _expand() {
        let newSize = Math.round(this.queue.length * 1.2) + 1;
        const oldQueue = this.queue;
        this.queue = new Array(newSize);
        for(let i=0; i<oldQueue.length; i++) {
            this.queue[i] = oldQueue[i];
        }
    }

    public toString() {
        let s = '';
        for(let i=0; i<this._size; i++) {
            let data = this.queue[i].data;
            if(data.toString) {
                s += data.toString();
            }else {
                s += typeof data === "object" ? JSON.stringify(data) : data;
            }
        }
        return s;
    }
}