import { Broadcast } from "../Utils/BroadCast";

export class BuildingData {
    id: number;
    state: string;
}

export class BroadcastCenter {
    static buildingState = new Broadcast<BuildingData>();    
}


BroadcastCenter.buildingState.on((data) => {
    console.log(data.id, data.state);
}, this);


BroadcastCenter.buildingState.dispatch({id: 1, state: "success"});

