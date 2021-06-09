export default class Quadtree {

    private _maxObject = 10;
    private _maxLevel = 4;
    private _level = 0;
    private _bound: cc.Rect = null;
    private objects: cc.Rect[]    = [];
    private nodes: Quadtree[]   = new Array<Quadtree>(4);
    
    constructor(bound: cc.Rect, maxObjects?: number, maxLevels?: number, level?: number) {
        this._bound = bound;
        this._maxObject = maxObjects || this._maxObject;
        this._maxLevel = maxLevels || this._maxLevel;
        this._level = level || this._level;
    }

    public split() {
        let nextLevel   = this._level + 1;
        let subWidth    = this._bound.width/2;
        let subHeight   = this._bound.height/2;
        let x           = this._bound.x;
        let y           = this._bound.y;
 
        //top right node
        this.nodes[0] = new Quadtree(cc.rect(x+subWidth, y, subWidth, subHeight), this._maxObject, this._maxLevel, nextLevel);
        
        //top left node
        this.nodes[1] = new Quadtree(cc.rect(x, y, subWidth, subHeight), this._maxObject, this._maxLevel, nextLevel);
        
        //bottom left node
        this.nodes[2] = new Quadtree(cc.rect(x, y+subHeight, subWidth, subHeight), this._maxObject, this._maxLevel, nextLevel);
        
        //bottom right node
        this.nodes[3] = new Quadtree(cc.rect(x + subWidth, y+subHeight, subWidth, subHeight), this._maxObject, this._maxLevel, nextLevel);
    }

    public getIndex(pRect: cc.Rect) {
        let indexes: number[] = [],
        verticalMidpoint    = this._bound.x + (this._bound.width/2),
        horizontalMidpoint  = this._bound.y + (this._bound.height/2);    

        let startIsNorth = pRect.y < horizontalMidpoint,
            startIsWest  = pRect.x < verticalMidpoint,
            endIsEast    = pRect.x + pRect.width > verticalMidpoint,
            endIsSouth   = pRect.y + pRect.height > horizontalMidpoint;    

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

    public insert(pRect: cc.Rect) {
        let i = 0;
        let indexes: number[] = [];
         
        //if we have subnodes, call insert on matching subnodes
        if(this.nodes.length) {
            indexes = this.getIndex(pRect);
     
            for(i=0; i<indexes.length; i++) {
                this.nodes[indexes[i]].insert(pRect);     
            }
            return;
        }
     
        //otherwise, store object here
        this.objects.push(pRect);

        //max_objects reached
        if(this.objects.length > this._maxObject && this._level < this._maxLevel) {

            //split if we don't already have subnodes
            if(!this.nodes.length) {
                this.split();
            }
            
            //add all objects to their corresponding subnode
            for(i=0; i<this.objects.length; i++) {
                indexes = this.getIndex(this.objects[i]);
                for(let k=0; k<indexes.length; k++) {
                    this.nodes[indexes[k]].insert(this.objects[i]);
                }
            }

            //clean up this node
            this.objects = [];
        }
    }

    public retrieve(pRect: cc.Rect): cc.Rect[] {
         
        let indexes = this.getIndex(pRect),
            returnObjects = this.objects;
            
        //if we have subnodes, retrieve their objects
        if(this.nodes.length) {
            for(let i=0; i<indexes.length; i++) {
                returnObjects = returnObjects.concat(this.nodes[indexes[i]].retrieve(pRect));
            }
        }

        //remove duplicates
        returnObjects = returnObjects.filter(function(item, index) {
            return returnObjects.indexOf(item) >= index;
        });
     
        return returnObjects;
    }

    public clear() {
        this.objects = [];
        for(let i=0; i < this.nodes.length; i++) {
            if(this.nodes.length) {
                this.nodes[i].clear();
              }
        }
        this.nodes = [];
    }
}