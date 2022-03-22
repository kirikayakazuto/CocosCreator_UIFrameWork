import UIManager from "./UIManager";
import { ModalOpacity, SysDefine } from "./config/SysDefine";
import CocosHelper from "./CocosHelper";
import { UIWindow } from "./UIForm";
import WindowMgr from "./WindowMgr";

const BAN_FALG = (cc.RenderFlow.FLAG_RENDER | cc.RenderFlow.FLAG_POST_RENDER);

/**
 * @Author: 邓朗 
 * @Describe: 
 * @Date: 2019-05-30 23:35:26  
 * @Last Modified time: 2019-05-30 23:35:26 
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class UIModalScript extends cc.Component {

    public fid: string;
    private pixelData: Uint8Array = null;
    private blurCamera: cc.Camera = null;
    
    private sprite: cc.Sprite = null;
    /**
     * 初始化
     */
    public init(camera: cc.Camera, pixel: Uint8Array) {
        this.blurCamera = camera;
        this.pixelData = pixel;
        let size = cc.view.getVisibleSize();
        this.node.height = size.height;
        this.node.width = size.width;

        this.node.addComponent(cc.Button);
        this.node.on('click', this.clickMaskWindow, this);
        
        let sprite = this.sprite = this.node.addComponent(cc.Sprite)
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        sprite.type = cc.Sprite.Type.SIMPLE;
        sprite.spriteFrame = new cc.SpriteFrame(this.getSingleTexture());

        this.node.color = new cc.Color(0, 0, 0);
        this.node.opacity = 0;
        this.node.active = false;
    }

    // 
    public async showModal(lucenyType: number, time: number = 0.6, isEasing: boolean = true) {
        let o = 0;
        switch (lucenyType) {
            case ModalOpacity.None:    
                this.node.active = false;
            break;        
            case ModalOpacity.OpacityZero:   
                o = 0;
            break;
            case ModalOpacity.OpacityLow:    
                o = 63;
            break;
            case ModalOpacity.OpacityHalf:   
                o = 126;
            break;
            case ModalOpacity.OpacityHigh:
                o = 189;
            break;
            case ModalOpacity.OpacityFull:
                o = 255;
            break;
            case ModalOpacity.GaussianBlur:
                o = 255;
                this.genGaussBlur(this.pixelData, this.blurCamera).then((texture: cc.Texture2D) => {
                    this.sprite.spriteFrame = new cc.SpriteFrame(texture);
                    this.sprite.spriteFrame.setFlipY(true);
                });
                this.node.color = new cc.Color(255, 255, 255);
            break;
        }
        if(!this.node.active) return ;
        if(isEasing) {
            await CocosHelper.runTweenSync(this.node, cc.tween().to(time, {opacity: o}));
        }else {
            this.node.opacity = o;
        }
    }

    public async clickMaskWindow() {
        let com = UIManager.getInstance().getForm(this.fid) as UIWindow;
        if(com && com.modalType.clickMaskClose) {
            await WindowMgr.close(this.fid);
        }
    }

    /** 代码创建一个单色texture */
    private _texture: cc.Texture2D = null;
    private getSingleTexture() {
        if(this._texture) return this._texture;
        let data: any = new Uint8Array(2 * 2 * 4);
        for(let i=0; i<2; i++) {
            for(let j=0; j<2; j++) {
                data[i*2*4 + j*4+0] = 255;
                data[i*2*4 + j*4+1] = 255;
                data[i*2*4 + j*4+2] = 255;
                data[i*2*4 + j*4+3] = 255;
            }
        }
        let texture = new cc.Texture2D();
        texture.name = 'single color'
        texture.initWithData(data, cc.Texture2D.PixelFormat.RGBA8888, 2, 2);
        texture.handleLoadedTexture();
        this._texture = texture;
        // texture.packable = true;
        texture.addRef();

        return this._texture;
    }

    private async genGaussBlur(pixes: Uint8Array, camera: cc.Camera) {

        let dirtyNodes: cc.Node[] = [];
        let disrenderChildren = () => {
            // 不渲染自己和最上层的window
            this.node._renderFlag &= ~cc.RenderFlow.FLAG_RENDER;
            let windows = UIManager.getInstance().getUIROOT().getChildByName(SysDefine.SYS_POPUP_NODE).children;
            for(let i=windows.length-1; i>=0; i--) {
                if(windows[i].zIndex > this.node.zIndex) {
                    let node = windows[i];
                    if(!node._activeInHierarchy || node.opacity == 0) continue;
                    let flag = node._renderFlag & cc.RenderFlow.FLAG_CHILDREN;
                    node._renderFlag &= ~flag;
                    dirtyNodes.push(node);
                }
            }
        }
        let rerenderChildren = () => {
            for(const node of dirtyNodes) {
                //let flag = node._renderFlag & cc.RenderFlow.FLAG_CHILDREN;
                node._renderFlag |= cc.RenderFlow.FLAG_CHILDREN;
            }
        }
        let renderTexture = new cc.RenderTexture();
        renderTexture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, cc.game._renderContext.STENCIL_INDEX8);
        camera.enabled = true;
        camera.targetTexture = renderTexture;
        disrenderChildren();
        camera.render();
        rerenderChildren();
        renderTexture.readPixels(pixes, 0, 0, renderTexture.width, renderTexture.height);
        pixes = await getGaussBlur(pixes, renderTexture.width, renderTexture.height, 5, 0);
        camera.enabled = false;
        renderTexture.initWithData(pixes, cc.Texture2D.PixelFormat.RGBA8888, renderTexture.width, renderTexture.height);
        return renderTexture;
    }
}

async function getGaussBlur(pixes: Uint8Array, width: number, height: number,radius: number, sigma: number) {
    let gaussMatrix = [],
        gaussSum = 0,
        x: number, y: number,
        r: number, g: number, b: number, a: number,
        i: number, j: number, k: number, len: number;


    radius = Math.floor(radius) || 3;
    sigma = sigma || radius / 3;

    a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
    b = -1 / (2 * sigma * sigma);
    //生成高斯矩阵
    for (i = 0, x = -radius; x <= radius; x++, i++){
        g = a * Math.exp(b * x * x);
        gaussMatrix[i] = g;
        gaussSum += g;
    }

    //归一化, 保证高斯矩阵的值在[0,1]之间
    for (i = 0, len = gaussMatrix.length; i < len; i++) {
        gaussMatrix[i] /= gaussSum;
    }

    //x 方向一维高斯运算
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            r = g = b = a = 0;
            gaussSum = 0;
            for(j = -radius; j <= radius; j++){
                k = x + j;
                if(k >= 0 && k < width){//确保 k 没超出 x 的范围
                    //r,g,b,a 四个一组
                    i = (y * width + k) * 4;
                    r += pixes[i] * gaussMatrix[j + radius];
                    g += pixes[i + 1] * gaussMatrix[j + radius];
                    b += pixes[i + 2] * gaussMatrix[j + radius];
                    gaussSum += gaussMatrix[j + radius];
                }
            }
            i = (y * width + x) * 4;
            // 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题
            pixes[i] = r / gaussSum;
            pixes[i + 1] = g / gaussSum;
            pixes[i + 2] = b / gaussSum;
            pixes[i + 3] = 255;
        }
        await CocosHelper.callInNextTick();
    }

    //y 方向一维高斯运算
    for (x = 0; x < width; x++) {
        for (y = 0; y < height; y++) {
            r = g = b = a = 0;
            gaussSum = 0;
            for(j = -radius; j <= radius; j++){
                k = y + j;
                if(k >= 0 && k < height){//确保 k 没超出 y 的范围
                    i = (k * width + x) * 4;
                    r += pixes[i] * gaussMatrix[j + radius];
                    g += pixes[i + 1] * gaussMatrix[j + radius];
                    b += pixes[i + 2] * gaussMatrix[j + radius];
                    gaussSum += gaussMatrix[j + radius];
                }
            }
            i = (y * width + x) * 4;
            pixes[i] = r / gaussSum;
            pixes[i + 1] = g / gaussSum;
            pixes[i + 2] = b / gaussSum;
            pixes[i + 3] = 255;
        }
        await CocosHelper.callInNextTick();
    }

    //end
    return pixes;
}