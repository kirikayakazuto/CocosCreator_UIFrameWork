import { Broadcast } from "../UIFrame/BroadCast";

export class TestData {
    id: number;
    name: string;
}

export class TestBroadcast {
    static testData = new Broadcast<TestData>();
}