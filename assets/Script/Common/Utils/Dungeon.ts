import { MathUtils } from "./MatchUtils";

export enum GridType {
    None,       // 未初始化
    Floor,      // 地板
    Wall,       // 墙
    OpenDoor,       // 门
    CloseDoor,  //
}

enum DirType {
    None,   // 不动
    Left,
    Right,
    Up,
    Down,
    All,
}

const ALL_DIR_TYPES = [DirType.Left, DirType.Right, DirType.Up, DirType.Down];

export class Dungeon {
    numRoomTries = 50;                      // 尝试生成房间的数量
    extraConnectorChance = 20;              // 房间和走廊连接机会
    roomExtraSize = 0;
    windingPercent = 50;
    width = 51;                             // 地图的宽
    height = 51;                            // 地图的高

    rooms: cc.Rect[] =[];                   // 房间
    map: number[] = [];                     // 原点是左下角
    regions: number[] = [];                      // 区间
    currentRegion = 0;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;        
        for(let i=0; i<width * height; i++) {
            this.map[i] = GridType.None;
            this.regions[i] = 0;
        }
    }

    public generate() {
        this.initMap();
        this.addRooms();
        this.fillMaze();
        this.connectRegions();
        this.removeDeadEnds();
        return this.map;
    }

    public initMap() {
        for(let i=0; i<this.width * this.height; i++) {
            this.map[i] = GridType.Wall;
            this.regions[i] = 0;
        }
    }
    public addRooms() {
        for(let i=0; i<this.numRoomTries; i++) {
            let size = MathUtils.limitInteger(1, 3+this.roomExtraSize) * 2 + 1;         // 是一个奇数
            let rectangularity = MathUtils.limitInteger(0, 1+Math.floor(size/2)) * 2;   // 控制矩形宽高比
            let w = size, h = size;
            if(0 === MathUtils.limitInteger(0, 1)) w += rectangularity;
            else h += rectangularity;

            let x = MathUtils.limitInteger(0, Math.floor((this.width-w)/2)) * 2 + 1;
            let y = MathUtils.limitInteger(0, Math.floor((this.height-h)/2)) * 2 + 1;

            let room = new cc.Rect(x, y, w, h);                                         // 生成一个房间矩形
            // 检查矩形是否符合规则 -> 即是否有重叠
            let overlaps = false;
            for(let r of this.rooms) {
                if(room.intersects(r)) {
                    overlaps = true;
                    break;
                }
            }
            if(overlaps) {      // 有重叠, 放弃该房间
                continue;
            }
            this.currentRegion ++;
            this._initRoomGrid(room);
            this.rooms.push(room);
        }
    }
    private _initRoomGrid(room: cc.Rect) {
        let tmpVec2 = cc.v2(0, 0);
        for(let i=room.x; i<room.width + room.x; i++) {
            for(let j=room.y; j<room.height + room.y; j++) {
                tmpVec2.x = i; tmpVec2.y = j;
                this.carveGrid(tmpVec2, GridType.Floor);
            }        
        }
        
    }
    /** 填充迷宫 */
    public fillMaze() {
        for(let y=1; y<this.height; y+=2) {
            for(let x=1; x<this.width; x+=2) {
                let grid = cc.v2(x, y);
                if(this.getGridType(grid) !== GridType.Wall) continue;
                this._growMaze(grid);
            }
        }
    }
    
    private _growMaze(start: cc.Vec2) {
        let cells: cc.Vec2[] = [];
        let lastDir = DirType.None;
        this.currentRegion ++;
        this.carveGrid(start, GridType.Floor);
        cells.push(start);
        while(cells !== null && cells.length !== 0) {
            let cell = cells[cells.length-1];
            let unmadeCells: DirType[] = [];
            for(let dir of ALL_DIR_TYPES) {
                if(this.canCarve(cell, dir)) unmadeCells.push(dir);
            }
            if(unmadeCells.length <= 0) {
                cells.pop();
                lastDir = DirType.None;
                continue;
            }
            // 当前grid有可以扩展的方向
            let dir = DirType.None;             
            if(unmadeCells.indexOf(lastDir) !== -1 && MathUtils.limitInteger(0, 100) > this.windingPercent) {
                dir = lastDir;
            }else {
                dir = MathUtils.randomArray(unmadeCells);
            }

            this.carveGrid(cell.add(this.getDirGridOffset(dir)), GridType.Floor);
            this.carveGrid(cell.add(this.getDirGridOffset(dir).mul(2)), GridType.Floor);
            cells.push(cell.add(this.getDirGridOffset(dir).mul(2)));
            lastDir = dir;
        }

    }
    public connectRegions() {
        let connectorRegions: {[key: number]: number[]} = {};
        let tmpVec2 = cc.v2(0, 0);
        for(let i=1; i<this.width-1; i++) {
            for(let j=1; j<this.height-1; j++) {
                tmpVec2.x = i; tmpVec2.y = j;
                if(this.getGridType(tmpVec2) !== GridType.Wall) continue;

                let regions: number[] = [];
                for(let dir of ALL_DIR_TYPES) {
                    let grid = tmpVec2.add(this.getDirGridOffset(dir));
                    let region = this.regions[grid.y * this.width + grid.x];
                    if(region !== 0 && regions.indexOf(region) == -1) regions.push(region);
                }
                if(regions.length < 2) continue;
                connectorRegions[j*this.width + i] = regions;
            }
        }

        let connectors: cc.Vec2[] = [];
        let keys = Object.keys(connectorRegions);
        for(let key of keys) {
            connectors.push(this.getGridByIdx(parseInt(key)));
        }

        let merged: {[key: number]: number} = {};
        let openRegions: Set<number> = new Set<number>();
        for(let i=0; i<=this.currentRegion; i++) {
            merged[i] = i;
            openRegions.add(i);
        }
        let count = 0;
        while(openRegions.size > 1 && count < 50) {
            count ++;
            let connector = MathUtils.randomArray<cc.Vec2>(connectors);
            this.addJunction(connector);

            let regions = connectorRegions[connector.y * this.width + connector.x].map((v) => merged[v]);
            
            let dest = regions[0];
            regions.shift();
            let sources = regions;
            for(let i=0; i<=this.currentRegion; i++) {
                if(sources.indexOf(merged[i]) !== -1) {
                    merged[i] = dest;
                }
            }

            for(let s of sources) {
                if(openRegions.has(s)) openRegions.delete(s);
            }
            connectors.filter((v) => {return !this.isRemove(merged, connectorRegions, connector, v)});
        }

    }
    private addJunction(grid: cc.Vec2) {
        if(MathUtils.limitInteger(0, 4)) {
            this.setGridType(grid, MathUtils.limitInteger(0, 3) ? GridType.OpenDoor : GridType.Floor);
        }else {
            this.setGridType(grid, GridType.CloseDoor);
        }
        
    }
    private isRemove(merged: {[key: number]: number}, connectRegions: {[key: number]: number[]}, connector: cc.Vec2, grid: cc.Vec2) {
        if(connector.sub(grid).len() < 2) return true;
        let regions = connectRegions[grid.y * this.width + grid.x].map((v) => merged[v]);
        let set = new Set<number>(regions);
        if(set.size > 1) return false;

        // if(MathUtils.limitInteger(0, this.extraConnectorChance)) this.addJunction(grid);
        return true;
    }
    public removeDeadEnds() {
        let done = false;
        let tmpVec2 = cc.v2(0, 0);
        let count = 0;
        while(!done && count < 500) {
            count ++;
            done = true;
            for(let i=1; i<this.width-1; i++) {
                for(let j=1; j<this.height-1; j++) {
                    tmpVec2.x = i; tmpVec2.y = j;
                    if(this.getGridType(tmpVec2) === GridType.Wall) continue;
                    let exists = 0;
                    for(let dir of ALL_DIR_TYPES) {
                        let grid = tmpVec2.add(this.getDirGridOffset(dir));
                        if(this.map[grid.y * this.width + grid.x] !== GridType.Wall) exists ++;
                    }                    
                    if(exists !== 1) continue;
                    done = false;
                    this.regions[j * this.height + i] = 0;
                    this.map[j * this.height + i] = GridType.Wall;
                }
            }
        }
    }
    public instanceMap() {

    }
    
    public getGridByIdx(idx: number) {
        let y = Math.floor(idx / this.width);
        let x = idx - y * this.width;
        return cc.v2(x, y);
    }

    /** 雕刻一个格子 */
    private carveGrid(grid: cc.Vec2, type: GridType) {
        if(!this.checkGrid(grid)) return ;
        this.setGridType(grid, type);
        this.regions[grid.y * this.width + grid.x] = this.currentRegion;
    }
    private setGridType(grid: cc.Vec2, type: GridType) {
        this.map[grid.y * this.width + grid.x] = type;
    }
    private checkGrid(grid: cc.Vec2) {
        if(grid.x <= 0 || grid.x >= this.width-1 || grid.y <= 0 || grid.y >= this.height-1) {
            console.log(" set grid type error: ", grid);
            return false;
        }
        return true;
    }
    private getGridType(grid: cc.Vec2) {
        return this.map[grid.y * this.width + grid.x];
    }

    private canCarve(grid: cc.Vec2, dir: DirType) {
        let dirGrid = this.getDirGridOffset(dir);
        let nextGrid = grid.add(dirGrid.mul(3));
        if(nextGrid.x < 0 || nextGrid.x >= this.width || nextGrid.y < 0 || nextGrid.y >= this.height) {
            return false;
        }

        nextGrid = grid.add(dirGrid.mul(2));
        return this.getGridType(nextGrid) === GridType.Wall;
    }

    private getDirGridOffset(dir: DirType) {
        let dirGrid = cc.v2(0, 0);
        switch(dir) {
            case DirType.Left:
                dirGrid.x = -1;
                break;
            case DirType.Right:
                dirGrid.x = 1;
                break;
            case DirType.Up:
                dirGrid.y = 1;
                break;
            case DirType.Down:
                dirGrid.y = -1;
                break;
        }
        return dirGrid;
    }
}
