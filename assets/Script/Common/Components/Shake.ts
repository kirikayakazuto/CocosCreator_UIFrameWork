const {ccclass, property} = cc._decorator;
 
@ccclass
export default class Shake extends cc.ActionInterval
{
 
    private _initial_x : number = 0;
    private _initial_y : number = 0;
    private _strength_x: number = 0;
    private _strength_y: number = 0;
 
    /**
     *  创建抖动动画
     * @param {number} duration     动画持续时长
     * @param {number} strength_x   抖动幅度： x方向
     * @param {number} strength_y   抖动幅度： y方向
     * @returns {Shake}
     */
    public static create(duration:number,strength_x:number,strength_y:number): Shake {
        let act:Shake = new Shake();
        act.initWithDuration(duration, strength_x, strength_y);
        return act;
    }
 
    public initWithDuration(duration:number,strength_x:number,strength_y:number) {
        cc.ActionInterval.prototype['initWithDuration'].apply(this,arguments);
        this._strength_x = strength_x;
        this._strength_y = strength_y;
        return true;
    }
 
    public fgRangeRand(min:number,max:number) {
        let rnd:number = Math.random();
        return rnd * (max - min) + min;
    }
 
    public update(time:number) {
        let randx = this.fgRangeRand(-this._strength_x,this._strength_x);
        let randy = this.fgRangeRand(-this._strength_y,this._strength_y);
        this.getTarget().setPosition(randx + this._initial_x,randy + this._initial_y);
    }
 
    public startWithTarget(target:cc.Node) {
        cc.ActionInterval.prototype['startWithTarget'].apply(this,arguments);
        this._initial_x = target.x;
        this._initial_y = target.y;
    }
 
    public stop() {
        this.getTarget().setPosition(new cc.Vec2(this._initial_x,this._initial_y));
        cc.ActionInterval.prototype['stop'].apply(this);
    }
}