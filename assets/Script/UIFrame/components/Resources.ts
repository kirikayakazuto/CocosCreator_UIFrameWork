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
    
    start () {

    }

    // update (dt) {}
}
