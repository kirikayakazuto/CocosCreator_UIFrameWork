import { Broadcast } from "../../UIFrame/BroadCast";

export class TestData {
    id: number;
    name: string;
}

export class TmpBroadcast {
    static testData = new Broadcast<TestData>();    
}

TmpBroadcast.testData.on((data) => {
    data.id
}, this);
TmpBroadcast.testData.dispatch({id: 1, name: ""});
