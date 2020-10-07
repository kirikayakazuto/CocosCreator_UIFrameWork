import { EventCenter } from "../../UIFrame/EventCenter";
import { EventType } from "../../UIFrame/EventType";
import { BlockState } from "./BlockType";
import ModelBase from "./ModelBase";

class BlockModel {
    private models: {[name: string]: ModelBase} = {};
    public regiestModel(name: string, model: ModelBase) {
        this.models[name] = model;
    }

    public getModel(name: string) {
        return this.models[name];
    }

    private blackBlockState: BlockState = 0;
    public changeState(state: BlockState) {
        if(this.blackBlockState === state) {
            return ;
        }
        this.blackBlockState = state;
        EventCenter.emit(EventType.BlackBlockState, this.blackBlockState);
    }

}

export default new BlockModel();