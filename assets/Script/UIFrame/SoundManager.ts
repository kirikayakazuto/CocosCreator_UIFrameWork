import CocosHelper from "./CocosHelper";

/**
 * 声音管理
 */
export default class SoundManager {
    private static instance: SoundManager = null;
    public static getInstance() {
        if(this.instance == null) {
            this.instance = new SoundManager();
        }
        return this.instance;
    }
    /** 初始化 */
    public init() {
        let obj = this.getVolumeToLocal();
        if(obj){
            cc.audioEngine.setMusicVolume(obj.musicVolume);
            cc.audioEngine.setEffectsVolume(obj.effectVolume);
        }else {
            cc.audioEngine.setMusicVolume(1);
            cc.audioEngine.setEffectsVolume(1);
        }
    }
    /** 播放背景音乐 */
    public async playBackGroundMusic(url: string, volume?: number) {
        let sound = await CocosHelper.loadRes(url, cc.AudioClip) as cc.AudioClip;
        if(volume != undefined) {
            cc.audioEngine.setMusicVolume(volume);
        }
        cc.audioEngine.playMusic(sound, true);
    }
    /** 播放音效,不用担心会重复loadRes会消耗网络, 有缓存 */
    public async playEffectMusic(url: string,  volume?: number) {
        if(!url || url.length === 0) return ;
        let sound = await CocosHelper.loadRes(url, cc.AudioClip) as cc.AudioClip;
        if(volume != undefined) {
            cc.audioEngine.setEffectsVolume(volume);
        }
        cc.audioEngine.playEffect(sound, false);
    }
    /** 打开声音 */
    public setSoundVolume(musicVolume?: number, effectVolume?: number) {
        if(musicVolume != undefined) {
            cc.audioEngine.setMusicVolume(musicVolume);
        }
        if(effectVolume != undefined){
            cc.audioEngine.setEffectsVolume(effectVolume);
        }
        this.setVolumeToLocal(cc.audioEngine.getMusicVolume(), cc.audioEngine.getEffectsVolume());
    }

    /**  */
    public getVolumeToLocal() {
        let objStr = cc.sys.localStorage.getItem("Volume");
        if(!objStr) {
            return null;
        }
        return JSON.parse(objStr);
    }
    /** 保存到本地 */
    public setVolumeToLocal(musicVolume: number, effectVolume: number) {
        let obj = {
            musicVolume: musicVolume,
            effectVolume: effectVolume
        }
        cc.sys.localStorage.setItem("Volume", JSON.stringify(obj));
    }
}