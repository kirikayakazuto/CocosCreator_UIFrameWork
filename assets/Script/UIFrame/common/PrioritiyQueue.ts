/** 优先队列， 可以通过优先级改变队列中物品的位置 */
export class PrioritiyQueue<T extends {priority: number}> {
    public queue: Array<T>;
    public front = 0;
    public rear = 0;                // rear 所指向的位置不存放item
    private size = 0;
    private length = 0;

    constructor(len: number = 10) {
        this.queue = new Array<T>(len);
        this.length = len;
    }
    /** 入队 对T进行优先级排序 */
    public enqueue(item: T) {
        if(this.size === this.length-1) {
            this.alloc();
        }
        let insertFlag = this.rear;
        for(let i=this.front; i<this.rear; i=(i+1)%this.length) {
            if(item.priority < this.queue[i].priority) { 
                insertFlag = i;        // 插入点
                break;
            }
        }
        // front到insertFlag不处理， insertFlag后面的依次向后移动一位
        //for(let i=this.getRealIndex(this.rear-1); i!=insertFlag; i=this.getRealIndex(i-1)) {
            //this.queue[this.getRealIndex(i+1)] = this.queue[i];
        //}
        for(let i=insertFlag; i<this.rear; i=this.getRealIndex(i+1)) {
            console.log(this.queue[i]);
        }
        this.queue[insertFlag] = item; 

        this.size ++;
        this.rear = (this.rear + 1) % this.length;
        return true;
    }
    /** 出队 */
    public dequeue() {
        if(this.size === 0) return null;
        this.size --;
        let item = this.queue[this.front];
        this.front = (this.front + 1) % this.length;
        return item;
    }
    /** 获得大小 */
    public getSize() {
        return this.size;
    }

    public isEmpty() {
        return this.size === 0;
    }

    public walkAllItem(cb: (index: number, item: T) => boolean) {
        let count = 0;
        for(let i=this.front; i<this.rear; i=(i+1)%this.length) {
            if(!cb(count++, this.queue[i])) break;
        }
    }

    /** 分配空间 */
    private alloc() {
        let newQueue = new Array<T>(this.length * 2);
        this.walkAllItem((index, item) => {
            newQueue[index] = item;
            return true;
        });
        console.log(newQueue)
        this.front = 0;
        this.rear = this.length-1;
        this.length = this.length * 2;
        this.queue = newQueue;
    }

    private getRealIndex(index: number) {
        if(index < 0) {
            return index + this.length;
        }
        if(index >= this.length) {
            return index % this.length;
        }
    }
}