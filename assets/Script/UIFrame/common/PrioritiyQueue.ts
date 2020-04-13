/** 优先队列， 可以通过优先级改变队列中物品的位置 */
export class PrioritiyQueue<T extends {priority: number}> {
    public queue: Array<T>;
    private front = 0;
    private rear = 0;
    private size = 0;
    private length = 0;

    constructor(len: number = 10) {
        this.queue = new Array<T>(len);
        this.length = len;
    }
    /** 入队 对T进行优先级排序 */
    public enqueue(item: T) {
        if(this.size >= this.length) return false;
        let insertFlag = this.rear;
        for(let i=this.front; i<this.rear; i=(i+1)%this.length) {
            if(item.priority < this.queue[i].priority) { 
                insertFlag = i;        // 插入点
                break;
            }
        }
        // front到insertFlag不处理， insertFlag后面的依次向后移动一位
        for(let i=insertFlag; i<this.rear; i=(i+1)%this.length) {
            this.queue[(i+1)%this.length] = this.queue[i] ;
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
}

let queue = new PrioritiyQueue();
queue.enqueue({priority: 10});
queue.enqueue({priority: 10});
queue.enqueue({priority: 10});
queue.enqueue({priority: 9});
queue.enqueue({priority: 11});

queue.walkAllItem((index, item) => {
    console.log(index, item);
    return true;
});