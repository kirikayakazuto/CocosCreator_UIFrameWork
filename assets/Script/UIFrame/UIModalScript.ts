import UIManager from "./UIManager";
import { ModalOpacity, SysDefine } from "./config/SysDefine";
import CocosHelper from "./CocosHelper";
import { UIWindow } from "./UIForm";
import WindowMgr from "./WindowMgr";

const BAN_FALG = (cc.RenderFlow.FLAG_RENDER | cc.RenderFlow.FLAG_POST_RENDER);

/**
 * @Author: honmono 
 * @Describe: 
 * @Date: 2019-05-30 23:35:26  
 * @Last Modified time: 2019-05-30 23:35:26 
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class UIModalScript extends cc.Component {

    public fid: string;
    private sprite: cc.Sprite = null;
    private camera: cc.Camera = null;
    /**
     * 初始化
     */
    public init() {
        let size = cc.view.getVisibleSize();
        this.node.height = size.height;
        this.node.width = size.width;

        this.node.addComponent(cc.Button);
        this.node.on('click', this.clickMaskWindow, this);
        
        this.sprite = this.node.addComponent(cc.Sprite)
        this.useNormalSprite(this.sprite);

        this.node.color = new cc.Color(255, 255, 255);
        this.node.opacity = 0;
        this.node.active = false;

        let node = new cc.Node("BlurCamera");
        this.camera = node.addComponent(cc.Camera);
        cc.find('Canvas').addChild(node);        
    }


    // 
    public async showModal(lucenyType: number, time: number = 0.6, isEasing: boolean = true, dualBlur = false) {
        if(dualBlur) {
            this.useDualBlurSprite(this.camera);
            this.node.color = cc.Color.WHITE;
        } else {
            this.useNormalSprite(this.sprite);
            this.node.color = cc.Color.BLACK;
        }

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
        texture.addRef();

        return this._texture;
    }

    private useNormalSprite(sprite: cc.Sprite) {
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        sprite.type = cc.Sprite.Type.SIMPLE;
        sprite.spriteFrame = new cc.SpriteFrame(this.getSingleTexture());
    }


    private _renderTexture: cc.RenderTexture = null;
    private _renderTextures: cc.RenderTexture[] = [];
    private useDualBlurSprite(camera: cc.Camera) {
        let dirtyNodes: cc.Node[] = [];
        let disRenderChildren = () => {
            // 不渲染tips
            let tips = UIManager.getInstance().getUIROOT().getChildByName(SysDefine.SYS_TOPTIPS_NODE).children;
            for(const node of tips) {
                if(!node._activeInHierarchy || node.opacity == 0) continue;
                node['_dirtyRenderFlag'] = node._renderFlag;
                node._renderFlag &= ~(cc.RenderFlow.FLAG_CHILDREN | cc.RenderFlow.FLAG_RENDER);
                dirtyNodes.push(node);
            }
            // 不渲染自己和最上层的window
            this.node._renderFlag &= ~cc.RenderFlow.FLAG_RENDER;
            let windows = UIManager.getInstance().getUIROOT().getChildByName(SysDefine.SYS_POPUP_NODE).children;
            for(let i=windows.length-1; i>=0; i--) {
                if(windows[i].zIndex > this.node.zIndex) {
                    let node = windows[i];
                    if(!node._activeInHierarchy || node.opacity == 0) continue;
                    node['_dirtyRenderFlag'] = node._renderFlag;
                    node._renderFlag &= ~(cc.RenderFlow.FLAG_CHILDREN | cc.RenderFlow.FLAG_RENDER);
                    dirtyNodes.push(node);
                }
            }
        }
        let rerenderChildren = () => {
            for(const node of dirtyNodes) {
                node._renderFlag = node['_dirtyRenderFlag'];
            }
        }
        if(!this._renderTexture) {
            let renderTexture = this._renderTexture = new cc.RenderTexture();
            renderTexture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, cc.game._renderContext.STENCIL_INDEX8);
        }
        camera.enabled = true;
        camera.targetTexture = this._renderTexture;
        disRenderChildren();
        camera.render();
        rerenderChildren();
        this.sprite.spriteFrame.setTexture(camera.targetTexture);
        this.sprite.markForRender(true)
        this.renderDualBlur(camera, 3);
        camera.enabled = false;
    }

    private renderDualBlur(camera: cc.Camera, iterations: number) {
        let size = cc.view.getVisibleSize();
        if(this._renderTextures.length <= 0) {
            for (let i = 0; i < iterations; i++) {
                let r = Math.pow(2, i);
                let renderTexture = new cc.RenderTexture();
                renderTexture.initWithSize((cc.visibleRect.width / r) | 0, (cc.visibleRect.height / r) | 0);
                this._renderTextures.push(renderTexture);
            }
        }
        if(!MaterialDown) {
            MaterialDown = this.genMaterial(EFFECT_DOWN);
            MaterialDown.setProperty('v_halfpixel', [0.5 / size.width, 0.5 / size.height]);
            MaterialDown.setProperty('v_offset', [4, 4]);
        }
        this.sprite.setMaterial(0, MaterialDown);
        for (let i = 0; i < iterations; i++) {
            camera.targetTexture = this._renderTextures[i];
            camera.render(this.sprite.node);
            this.sprite.spriteFrame.setTexture(camera.targetTexture);
            this.sprite.markForRender(true)
        }
        if(!MaterialUp) {
            MaterialUp = this.genMaterial(EFFECT_UP);
            MaterialUp.setProperty('v_halfpixel', [0.5 / size.width, 0.5 / size.height]);
            MaterialUp.setProperty('v_offset', [4, 4]);
        }
        this.sprite.setMaterial(0, MaterialUp);
        for (let i = iterations - 1; i > 0; i--) {
            camera.targetTexture = this._renderTextures[i - 1];
            camera.render(this.sprite.node);
            this.sprite.spriteFrame.setTexture(camera.targetTexture);
            this.sprite.markForRender(true)
        }
        this.sprite.setMaterial(0, cc.Material.getBuiltinMaterial('2d-sprite'));
    }

    public genMaterial(effect: any) {
        //@ts-ignore
        let asset = cc.deserialize(effect, {priority: 0, responseType: "json"});
        asset.onLoad && asset.onLoad();
        asset.__onLoadInvoked__ = true;

        return cc.Material.create(asset, 0);
    }
}
let MaterialDown: cc.Material = null;
let MaterialUp: cc.Material = null;
const EFFECT_UP = {
  "__type__": "cc.EffectAsset",
  "_name": "BlurUp",
  "_objFlags": 0,
  "_native": "",
  "properties": null,
  "techniques": [
    {
      "passes": [
        {
          "blendState": {
            "targets": [
              {
                "blend": true
              }
            ]
          },
          "rasterizerState": {
            "cullMode": 0
          },
          "properties": {
            "texture": {
              "value": "white",
              "type": 29
            },
            "alphaThreshold": {
              "value": [
                0.5
              ],
              "type": 13
            }
          },
          "program": "BlurUp|vs|fs"
        }
      ]
    }
  ],
  "shaders": [
    {
      "hash": 3005313742,
      "glsl3": {
        "vert": "\nprecision highp float;\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nin vec3 a_position;\nin vec4 a_color;\nout vec4 v_color;\n#if USE_TEXTURE\nin vec2 a_uv0;\nout vec2 v_uv0;\n#endif\nvoid main () {\n  vec4 pos = vec4(a_position, 1);\n  #if CC_USE_MODEL\n  pos = cc_matViewProj * cc_matWorld * pos;\n  #else\n  pos = cc_matViewProj * pos;\n  #endif\n  #if USE_TEXTURE\n  v_uv0 = a_uv0;\n  #endif\n  v_color = a_color;\n  gl_Position = pos;\n}",
        "frag": "\nprecision highp float;\n#if USE_ALPHA_TEST\n  uniform ALPHA_TEST {\n    float alphaThreshold;\n  };\n#endif\nvoid ALPHA_TEST (in vec4 color) {\n  #if USE_ALPHA_TEST\n      if (color.a < alphaThreshold) discard;\n  #endif\n}\nvoid ALPHA_TEST (in float alpha) {\n  #if USE_ALPHA_TEST\n      if (alpha < alphaThreshold) discard;\n  #endif\n}\nin vec4 v_color;\n#if USE_TEXTURE\nin vec2 v_uv0;\nuniform sampler2D texture;\n#endif\nuniform CustomUniform {\n  vec2 v_halfpixel;\n  vec2 v_offset;\n};\nvoid main () {\n  vec4 o = vec4(1, 1, 1, 1);\n  vec4 sum = texture2D(texture, v_uv0) * 4.0;\n  sum += texture2D(texture, v_uv0 - v_halfpixel.xy * v_offset);\n  sum += texture2D(texture, v_uv0 + v_halfpixel.xy * v_offset);\n  sum += texture2D(texture, v_uv0 + vec2(v_halfpixel.x, -v_halfpixel.y) * v_offset);\n  sum += texture2D(texture, v_uv0 - vec2(v_halfpixel.x, -v_halfpixel.y) * v_offset);\n  o = sum / 8.0;\n  o *= v_color;\n  ALPHA_TEST(o);\n  #if USE_BGRA\n    gl_FragColor = o.bgra;\n  #else\n    gl_FragColor = o.rgba;\n  #endif\n}"
      },
      "glsl1": {
        "vert": "\nprecision highp float;\nuniform mat4 cc_matViewProj;\nuniform mat4 cc_matWorld;\nattribute vec3 a_position;\nattribute vec4 a_color;\nvarying vec4 v_color;\n#if USE_TEXTURE\nattribute vec2 a_uv0;\nvarying vec2 v_uv0;\n#endif\nvoid main () {\n  vec4 pos = vec4(a_position, 1);\n  #if CC_USE_MODEL\n  pos = cc_matViewProj * cc_matWorld * pos;\n  #else\n  pos = cc_matViewProj * pos;\n  #endif\n  #if USE_TEXTURE\n  v_uv0 = a_uv0;\n  #endif\n  v_color = a_color;\n  gl_Position = pos;\n}",
        "frag": "\nprecision highp float;\n#if USE_ALPHA_TEST\n  uniform float alphaThreshold;\n#endif\nvoid ALPHA_TEST (in vec4 color) {\n  #if USE_ALPHA_TEST\n      if (color.a < alphaThreshold) discard;\n  #endif\n}\nvoid ALPHA_TEST (in float alpha) {\n  #if USE_ALPHA_TEST\n      if (alpha < alphaThreshold) discard;\n  #endif\n}\nvarying vec4 v_color;\n#if USE_TEXTURE\nvarying vec2 v_uv0;\nuniform sampler2D texture;\n#endif\nuniform vec2 v_halfpixel;\nuniform vec2 v_offset;\nvoid main () {\n  vec4 o = vec4(1, 1, 1, 1);\n  vec4 sum = texture2D(texture, v_uv0) * 4.0;\n  sum += texture2D(texture, v_uv0 - v_halfpixel.xy * v_offset);\n  sum += texture2D(texture, v_uv0 + v_halfpixel.xy * v_offset);\n  sum += texture2D(texture, v_uv0 + vec2(v_halfpixel.x, -v_halfpixel.y) * v_offset);\n  sum += texture2D(texture, v_uv0 - vec2(v_halfpixel.x, -v_halfpixel.y) * v_offset);\n  o = sum / 8.0;\n  o *= v_color;\n  ALPHA_TEST(o);\n  #if USE_BGRA\n    gl_FragColor = o.bgra;\n  #else\n    gl_FragColor = o.rgba;\n  #endif\n}"
      },
      "builtins": {
        "globals": {
          "blocks": [
            {
              "name": "CCGlobal",
              "defines": []
            }
          ],
          "samplers": []
        },
        "locals": {
          "blocks": [
            {
              "name": "CCLocal",
              "defines": []
            }
          ],
          "samplers": []
        }
      },
      "defines": [
        {
          "name": "USE_TEXTURE",
          "type": "boolean",
          "defines": []
        },
        {
          "name": "CC_USE_MODEL",
          "type": "boolean",
          "defines": []
        },
        {
          "name": "USE_ALPHA_TEST",
          "type": "boolean",
          "defines": []
        },
        {
          "name": "USE_BGRA",
          "type": "boolean",
          "defines": []
        }
      ],
      "blocks": [
        {
          "name": "ALPHA_TEST",
          "members": [
            {
              "name": "alphaThreshold",
              "type": 13,
              "count": 1
            }
          ],
          "defines": [
            "USE_ALPHA_TEST"
          ],
          "binding": 0
        },
        {
          "name": "CustomUniform",
          "members": [
            {
              "name": "v_halfpixel",
              "type": 14,
              "count": 1
            },
            {
              "name": "v_offset",
              "type": 14,
              "count": 1
            }
          ],
          "defines": [],
          "binding": 1
        }
      ],
      "samplers": [
        {
          "name": "texture",
          "type": 29,
          "count": 1,
          "defines": [
            "USE_TEXTURE"
          ],
          "binding": 30
        }
      ],
      "record": null,
      "name": "BlurUp|vs|fs"
    }
  ]
};
const EFFECT_DOWN = {
  "__type__": "cc.EffectAsset",
  "_name": "BlurDown",
  "_objFlags": 0,
  "_native": "",
  "properties": null,
  "techniques": [
    {
      "passes": [
        {
          "blendState": {
            "targets": [
              {
                "blend": true
              }
            ]
          },
          "rasterizerState": {
            "cullMode": 0
          },
          "properties": {
            "texture": {
              "value": "white",
              "type": 29
            },
            "alphaThreshold": {
              "value": [
                0.5
              ],
              "type": 13
            }
          },
          "program": "BlurDown|vs|fs"
        }
      ]
    }
  ],
  "shaders": [
    {
      "hash": 4206633856,
      "glsl3": {
        "vert": "\nprecision highp float;\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nin vec3 a_position;\nin vec4 a_color;\nout vec4 v_color;\n#if USE_TEXTURE\nin vec2 a_uv0;\nout vec2 v_uv0;\n#endif\nvoid main () {\n  vec4 pos = vec4(a_position, 1);\n  #if CC_USE_MODEL\n  pos = cc_matViewProj * cc_matWorld * pos;\n  #else\n  pos = cc_matViewProj * pos;\n  #endif\n  #if USE_TEXTURE\n  v_uv0 = a_uv0;\n  #endif\n  v_color = a_color;\n  gl_Position = pos;\n}",
        "frag": "\nprecision highp float;\n#if USE_ALPHA_TEST\n  uniform ALPHA_TEST {\n    float alphaThreshold;\n  };\n#endif\nvoid ALPHA_TEST (in vec4 color) {\n  #if USE_ALPHA_TEST\n      if (color.a < alphaThreshold) discard;\n  #endif\n}\nvoid ALPHA_TEST (in float alpha) {\n  #if USE_ALPHA_TEST\n      if (alpha < alphaThreshold) discard;\n  #endif\n}\nin vec4 v_color;\n#if USE_TEXTURE\nin vec2 v_uv0;\nuniform sampler2D texture;\n#endif\nuniform CustomUniform {\n  vec2 v_halfpixel;\n  vec2 v_offset;\n};\nvoid main () {\n  vec4 o = vec4(1, 1, 1, 1);\n  vec4 sum = texture2D(texture, v_uv0 + vec2(-v_halfpixel.x * 2.0, 0.0) * v_offset);\n  sum += texture2D(texture, v_uv0 + vec2(-v_halfpixel.x, v_halfpixel.y) * v_offset) * 2.0;\n  sum += texture2D(texture, v_uv0 + vec2(0.0, v_halfpixel.y * 2.0) * v_offset);\n  sum += texture2D(texture, v_uv0 + vec2(v_halfpixel.x, v_halfpixel.y) * v_offset) * 2.0;\n  sum += texture2D(texture, v_uv0 + vec2(v_halfpixel.x * 2.0, 0.0) * v_offset);\n  sum += texture2D(texture, v_uv0 + vec2(v_halfpixel.x, -v_halfpixel.y) * v_offset) * 2.0;\n  sum += texture2D(texture, v_uv0 + vec2(0.0, -v_halfpixel.y * 2.0) * v_offset);\n  sum += texture2D(texture, v_uv0 + vec2(-v_halfpixel.x, -v_halfpixel.y) * v_offset) * 2.0;\n  o = sum / 12.0;\n  o *= v_color;\n  ALPHA_TEST(o);\n  #if USE_BGRA\n    gl_FragColor = o.bgra;\n  #else\n    gl_FragColor = o.rgba;\n  #endif\n}"
      },
      "glsl1": {
        "vert": "\nprecision highp float;\nuniform mat4 cc_matViewProj;\nuniform mat4 cc_matWorld;\nattribute vec3 a_position;\nattribute vec4 a_color;\nvarying vec4 v_color;\n#if USE_TEXTURE\nattribute vec2 a_uv0;\nvarying vec2 v_uv0;\n#endif\nvoid main () {\n  vec4 pos = vec4(a_position, 1);\n  #if CC_USE_MODEL\n  pos = cc_matViewProj * cc_matWorld * pos;\n  #else\n  pos = cc_matViewProj * pos;\n  #endif\n  #if USE_TEXTURE\n  v_uv0 = a_uv0;\n  #endif\n  v_color = a_color;\n  gl_Position = pos;\n}",
        "frag": "\nprecision highp float;\n#if USE_ALPHA_TEST\n  uniform float alphaThreshold;\n#endif\nvoid ALPHA_TEST (in vec4 color) {\n  #if USE_ALPHA_TEST\n      if (color.a < alphaThreshold) discard;\n  #endif\n}\nvoid ALPHA_TEST (in float alpha) {\n  #if USE_ALPHA_TEST\n      if (alpha < alphaThreshold) discard;\n  #endif\n}\nvarying vec4 v_color;\n#if USE_TEXTURE\nvarying vec2 v_uv0;\nuniform sampler2D texture;\n#endif\nuniform vec2 v_halfpixel;\nuniform vec2 v_offset;\nvoid main () {\n  vec4 o = vec4(1, 1, 1, 1);\n  vec4 sum = texture2D(texture, v_uv0 + vec2(-v_halfpixel.x * 2.0, 0.0) * v_offset);\n  sum += texture2D(texture, v_uv0 + vec2(-v_halfpixel.x, v_halfpixel.y) * v_offset) * 2.0;\n  sum += texture2D(texture, v_uv0 + vec2(0.0, v_halfpixel.y * 2.0) * v_offset);\n  sum += texture2D(texture, v_uv0 + vec2(v_halfpixel.x, v_halfpixel.y) * v_offset) * 2.0;\n  sum += texture2D(texture, v_uv0 + vec2(v_halfpixel.x * 2.0, 0.0) * v_offset);\n  sum += texture2D(texture, v_uv0 + vec2(v_halfpixel.x, -v_halfpixel.y) * v_offset) * 2.0;\n  sum += texture2D(texture, v_uv0 + vec2(0.0, -v_halfpixel.y * 2.0) * v_offset);\n  sum += texture2D(texture, v_uv0 + vec2(-v_halfpixel.x, -v_halfpixel.y) * v_offset) * 2.0;\n  o = sum / 12.0;\n  o *= v_color;\n  ALPHA_TEST(o);\n  #if USE_BGRA\n    gl_FragColor = o.bgra;\n  #else\n    gl_FragColor = o.rgba;\n  #endif\n}"
      },
      "builtins": {
        "globals": {
          "blocks": [
            {
              "name": "CCGlobal",
              "defines": []
            }
          ],
          "samplers": []
        },
        "locals": {
          "blocks": [
            {
              "name": "CCLocal",
              "defines": []
            }
          ],
          "samplers": []
        }
      },
      "defines": [
        {
          "name": "USE_TEXTURE",
          "type": "boolean",
          "defines": []
        },
        {
          "name": "CC_USE_MODEL",
          "type": "boolean",
          "defines": []
        },
        {
          "name": "USE_ALPHA_TEST",
          "type": "boolean",
          "defines": []
        },
        {
          "name": "USE_BGRA",
          "type": "boolean",
          "defines": []
        }
      ],
      "blocks": [
        {
          "name": "ALPHA_TEST",
          "members": [
            {
              "name": "alphaThreshold",
              "type": 13,
              "count": 1
            }
          ],
          "defines": [
            "USE_ALPHA_TEST"
          ],
          "binding": 0
        },
        {
          "name": "CustomUniform",
          "members": [
            {
              "name": "v_halfpixel",
              "type": 14,
              "count": 1
            },
            {
              "name": "v_offset",
              "type": 14,
              "count": 1
            }
          ],
          "defines": [],
          "binding": 1
        }
      ],
      "samplers": [
        {
          "name": "texture",
          "type": 29,
          "count": 1,
          "defines": [
            "USE_TEXTURE"
          ],
          "binding": 30
        }
      ],
      "record": null,
      "name": "BlurDown|vs|fs"
    }
  ]
};