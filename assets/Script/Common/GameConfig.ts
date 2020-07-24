export default class GameConfig {

    public static gameId = '';
    //游戏版本
    public static readonly version = '0.0.1';

    public static _debugUserId = '';
    public static get debugUserId() {
        return this._debugUserId;
    }
}