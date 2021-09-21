import SceneMgr from "../../UIFrame/SceneMgr";
import UIConfig from "../../UIScript/UIConfig";
import UIECSView from "../../UIScript/UIECSView";

export class ViewMainComponent extends es.Component {

    private view: UIECSView = null;

    async onAddedToEntity() {
        console.log("======== on start", UIConfig.ECSView.prefabUrl)
        this.view = await SceneMgr.open(UIConfig.ECSView.prefabUrl) as UIECSView;
    }

    async onRemovedFromEntity() {
        await SceneMgr.close(UIConfig.ECSView.prefabUrl);
        this.view = null;
    }
}