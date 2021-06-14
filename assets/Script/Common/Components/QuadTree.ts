export class Bound {
    uid?: string;
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(x: number, y: number, width: number, height: number, uid = "") {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.uid = uid;
    }
}
/**
 * 四叉树
 */
export default class Quadtree {
    private _maxObject = 10;
    private _maxLevel = 4;
    private _level = 0;
    private _bound: Bound = null;
    private _objects: Bound[] = [];
    private _nodes: Quadtree[] = [];
    
    constructor(bound: Bound, maxObjects?: number, maxLevels?: number, level?: number) {
        this._bound = bound;
        this._maxObject = maxObjects || this._maxObject;
        this._maxLevel = maxLevels || this._maxLevel;
        this._level = level || this._level;
    }

    /** 切 */
    public split() {
        let nextLevel   = this._level + 1;
        let subWidth    = this._bound.width/2;
        let subHeight   = this._bound.height/2;
        let x           = this._bound.x;
        let y           = this._bound.y;
 
        //top right node
        this._nodes[0] = new Quadtree({
            uid: `${nextLevel}-top-right`,
            x: x+subWidth,
            y: y, 
            width: subWidth,
            height: subHeight
        }, this._maxObject, this._maxLevel, nextLevel);
        
        //top left node
        this._nodes[1] = new Quadtree({
            uid: `${nextLevel}-top-left`,
            x: x,
            y: y,
            width: subWidth,
            height: subHeight
        }, this._maxObject, this._maxLevel, nextLevel);
        
        //bottom left node
        this._nodes[2] = new Quadtree({
            uid: `${nextLevel}-bottom-left`,
            x: x,
            y: y+subHeight,
            width: subWidth,
            height: subHeight
        }, this._maxObject, this._maxLevel, nextLevel);
        
        //bottom right node
        this._nodes[3] = new Quadtree({
            uid: `${nextLevel}-bottom-right`,
            x: x + subWidth,
            y: y+subHeight,
            width: subWidth,
            height: subHeight
        }, this._maxObject, this._maxLevel, nextLevel);
    }

    /**  */
    public getIndex(bound: Bound) {
        let indexes: number[] = [],
        verticalMidpoint    = this._bound.x + (this._bound.width/2),
        horizontalMidpoint  = this._bound.y + (this._bound.height/2);    

        let startIsNorth = bound.y < horizontalMidpoint,
            startIsWest  = bound.x < verticalMidpoint,
            endIsEast    = bound.x + bound.width > verticalMidpoint,
            endIsSouth   = bound.y + bound.height > horizontalMidpoint;    

        //top-right quad
        if(startIsNorth && endIsEast) {
            indexes.push(0);
        }
        
        //top-left quad
        if(startIsWest && startIsNorth) {
            indexes.push(1);
        }

        //bottom-left quad
        if(startIsWest && endIsSouth) {
            indexes.push(2);
        }

        //bottom-right quad
        if(endIsEast && endIsSouth) {
            indexes.push(3);
        }
    
        return indexes;
    }

    /** 插入一个bound */
    public insert(bound: Bound) {
        let i = 0;
        let indexes: number[] = [];
         
        //if we have subnodes, call insert on matching subnodes
        if(this._nodes.length) {
            indexes = this.getIndex(bound);
     
            for(i=0; i<indexes.length; i++) {
                this._nodes[indexes[i]].insert(bound);     
            }
            return;
        }
     
        //otherwise, store object here
        this._objects.push(bound);

        //max_objects reached
        if(this._objects.length > this._maxObject && this._level < this._maxLevel) {

            //split if we don't already have subnodes
            if(!this._nodes.length) {
                this.split();
            }
            
            //add all objects to their corresponding subnode
            for(i=0; i<this._objects.length; i++) {
                indexes = this.getIndex(this._objects[i]);
                for(let k=0; k<indexes.length; k++) {
                    this._nodes[indexes[k]].insert(this._objects[i]);
                }
            }

            //clean up this node
            this._objects = [];
        }
    }

    public retrieve(bound: Bound): Bound[] {
         
        let indexes = this.getIndex(bound),
            returnObjects = this._objects;
            
        //if we have subnodes, retrieve their objects
        if(this._nodes.length) {
            for(let i=0; i<indexes.length; i++) {
                returnObjects = returnObjects.concat(this._nodes[indexes[i]].retrieve(bound));
            }
        }

        //remove duplicates
        returnObjects = returnObjects.filter(function(item, index) {
            return returnObjects.indexOf(item) >= index;
        });
     
        return returnObjects;
    }

    public clear() {
        this._objects = [];
        for(let i=0; i < this._nodes.length; i++) {
            if(this._nodes.length) {
                this._nodes[i].clear();
              }
        }
        this._nodes = [];
    }
}