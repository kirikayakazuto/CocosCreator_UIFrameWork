import CocosHelper from "../../UIFrame/CocosHelper";
import { CommonUtils } from "../Utils/CommonUtils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CameraCapture extends cc.Component {

    static inst: CameraCapture = null;

    @property(cc.Node)
    captureNode: cc.Node = null;

    private camera: cc.Camera = null;
    onLoad () {
        CameraCapture.inst = this;
        this.camera = this.getComponent(cc.Camera);
        if(!this.camera) {
            this.camera = this.addComponent(cc.Camera);
        }
        this.node.active = false;

    }

    start () {}

    captureTexture() {
        this.node.active = true;
        this.captureNode.active = false;
        let data = CocosHelper.captureScreen(this.camera, this.captureNode);
        this.captureNode.active = true;
        this.node.active = false;
        
        return data;
    }


}
