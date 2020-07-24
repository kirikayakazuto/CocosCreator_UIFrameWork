import ResMgr from "../../UIFrame/ResMgr";

/**
 * 进入场景前 就必须加载的资源可以从这里加载
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class ResHelper extends cc.Component {

    @property([cc.Prefab])
    prefabs: cc.Prefab[] = [];

    @property({type: [cc.Texture2D]})
    textures: cc.Texture2D[] = [];

    @property({type: [cc.AudioClip]})
    audioClips: cc.Texture2D[] = [];

    @property([cc.AnimationClip])
    animClips: cc.AnimationClip[] = [];
    
    onLoad() {
        // onload 执行， 那么表示上面的数据都加载到了
        // 那么把这些资源放到resMsg中
        for(const pre of this.prefabs) {
            ResMgr.inst.addStub(pre, cc.Prefab);
        }

        for(const texture of this.textures) {
            ResMgr.inst.addStub(texture, cc.Texture2D);
        }

        for(const audioClip of this.audioClips) {
            ResMgr.inst.addStub(audioClip, cc.AudioClip);
        }

        for(const animClip of this.animClips) {
            ResMgr.inst.addStub(animClip, cc.AnimationClip);
        }
    }

    // update (dt) {}
}
