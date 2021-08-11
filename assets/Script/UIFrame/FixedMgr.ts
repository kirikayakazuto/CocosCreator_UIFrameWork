import UIManager from "./UIManager";

class FixedMgr {
    public async open(url: string) {
        return await UIManager.getInstance().openForm(url);
    }
    public async close(url: string) {
        return await UIManager.getInstance().closeForm(url);
    }
}

export default new FixedMgr();