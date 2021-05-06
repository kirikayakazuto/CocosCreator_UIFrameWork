export default class WindowMgr {
    private static _inst = new WindowMgr();
    public static get inst() {
        return this._inst;
    }

    /**
     * 可以做
     * 关闭上一个window时 打开下一个window
     */
    public openWindow() {
        
    }
}