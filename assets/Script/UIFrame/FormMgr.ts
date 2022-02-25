import FixedMgr from "./FixedMgr";
import SceneMgr from "./SceneMgr";
import WindowMgr from "./WindowMgr";

class FormMgr {
    async open(form: {prefabUrl: string, type: string}) {
        switch(form.type) {
            case "UIScreen":
                await SceneMgr.open(form.prefabUrl);
            break;
            case "UIWindow":
                await WindowMgr.open(form.prefabUrl);
            break;
            case "UIFixed":
                await FixedMgr.open(form.prefabUrl);
            break;
            case "UITips":
                //await TipsMgr.open(form.prefabUrl);
                break;
        }
    }
}

export default new FormMgr();