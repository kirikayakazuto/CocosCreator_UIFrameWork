import ResManager from "../ResManager";

/**
 * 进入场景前 就必须加载的资源可以从这里加载
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class Resources extends cc.Component {

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
        // todo...

        
    }

    // update (dt) {}
}
