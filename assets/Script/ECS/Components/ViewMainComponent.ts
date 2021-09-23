import SceneMgr from "../../UIFrame/SceneMgr";
import UIConfig from "../../UIScript/UIConfig";
import UIECSView from "../../UIScript/UIECSView";

export class ViewMainComponent extends es.Component {

    public view: UIECSView = null;

    public async showView() {
        this.view = await SceneMgr.open(UIConfig.ECSView.prefabUrl) as UIECSView;
        return this.view;
    }

    async onAddedToEntity() {
        console.log("======== on start", UIConfig.ECSView.prefabUrl);
    }

    async onRemovedFromEntity() {
        await SceneMgr.close(UIConfig.ECSView.prefabUrl);
        this.view = null;
    }
}