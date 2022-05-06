import UINavigator from "./UIScript/UINavigator";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {
    @property(cc.Sprite) spBg: cc.Sprite = null;
    onLoad() {

    }

    start () {
        UINavigator.open();
        
    }
    
    onDestroy() {
        
    }
    public genMaterial(effect: any) {
        //@ts-ignore
        let asset = cc.deserialize(effect, {priority: 0, responseType: "json"});
        asset.onLoad && asset.onLoad();
        asset.__onLoadInvoked__ = true;
    
        return cc.Material.create(asset, 0);
    }
}




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
    "hash": 104409166,
    "glsl3": {
      "vert": "\nprecision highp float;\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nin vec3 a_position;\nin vec4 a_color;\nout vec4 v_color;\n#if USE_TEXTURE\nin vec2 a_uv0;\nout vec2 v_uv0;\n#endif\nvoid main () {\n  vec4 pos = vec4(a_position, 1);\n  #if CC_USE_MODEL\n  pos = cc_matViewProj * cc_matWorld * pos;\n  #else\n  pos = cc_matViewProj * pos;\n  #endif\n  #if USE_TEXTURE\n  v_uv0 = a_uv0;\n  #endif\n  v_color = a_color;\n  gl_Position = pos;\n}",
      "frag": "\nprecision highp float;\n#if USE_ALPHA_TEST\n  uniform ALPHA_TEST {\n    float alphaThreshold;\n  };\n#endif\nvoid ALPHA_TEST (in vec4 color) {\n  #if USE_ALPHA_TEST\n      if (color.a < alphaThreshold) discard;\n  #endif\n}\nvoid ALPHA_TEST (in float alpha) {\n  #if USE_ALPHA_TEST\n      if (alpha < alphaThreshold) discard;\n  #endif\n}\nin vec4 v_color;\n#if USE_TEXTURE\nin vec2 v_uv0;\nuniform sampler2D texture;\n#endif\nuniform CustomUniform {\n  vec2 v_halfpixel;\n  vec2 v_offset;\n};\nvoid main () {\n  vec4 o = vec4(1, 1, 1, 1);\n  vec4 sum = texture2D(texture, clamp(uv + vec2(-v_halfpixel.x * 2.0, 0.0) * v_offset, 0., 1.));\n  sum += texture2D(texture, clamp(uv + vec2(-v_halfpixel.x, v_halfpixel.y) * v_offset, 0., 1.)) * 2.0;\n  sum += texture2D(texture, clamp(uv + vec2(0.0, v_halfpixel.y * 2.0) * v_offset, 0., 1.));\n  sum += texture2D(texture, clamp(uv + vec2(v_halfpixel.x, v_halfpixel.y) * v_offset, 0., 1.)) * 2.0;\n  sum += texture2D(texture, clamp(uv + vec2(v_halfpixel.x * 2.0, 0.0) * v_offset, 0., 1.));\n  sum += texture2D(texture, clamp(uv + vec2(v_halfpixel.x, -v_halfpixel.y) * v_offset, 0., 1.)) * 2.0;\n  sum += texture2D(texture, clamp(uv + vec2(0.0, -v_halfpixel.y * 2.0) * v_offset, 0., 1.));\n  sum += texture2D(texture, clamp(uv + vec2(-v_halfpixel.x, -v_halfpixel.y) * v_offset, 0., 1.)) * 2.0;\n  o = sum / 12.0;\n  o *= v_color;\n  ALPHA_TEST(o);\n  #if USE_BGRA\n    gl_FragColor = o.bgra;\n  #else\n    gl_FragColor = o.rgba;\n  #endif\n}"
    },
    "glsl1": {
      "vert": "\nprecision highp float;\nuniform mat4 cc_matViewProj;\nuniform mat4 cc_matWorld;\nattribute vec3 a_position;\nattribute vec4 a_color;\nvarying vec4 v_color;\n#if USE_TEXTURE\nattribute vec2 a_uv0;\nvarying vec2 v_uv0;\n#endif\nvoid main () {\n  vec4 pos = vec4(a_position, 1);\n  #if CC_USE_MODEL\n  pos = cc_matViewProj * cc_matWorld * pos;\n  #else\n  pos = cc_matViewProj * pos;\n  #endif\n  #if USE_TEXTURE\n  v_uv0 = a_uv0;\n  #endif\n  v_color = a_color;\n  gl_Position = pos;\n}",
      "frag": "\nprecision highp float;\n#if USE_ALPHA_TEST\n  uniform float alphaThreshold;\n#endif\nvoid ALPHA_TEST (in vec4 color) {\n  #if USE_ALPHA_TEST\n      if (color.a < alphaThreshold) discard;\n  #endif\n}\nvoid ALPHA_TEST (in float alpha) {\n  #if USE_ALPHA_TEST\n      if (alpha < alphaThreshold) discard;\n  #endif\n}\nvarying vec4 v_color;\n#if USE_TEXTURE\nvarying vec2 v_uv0;\nuniform sampler2D texture;\n#endif\nuniform vec2 v_halfpixel;\nuniform vec2 v_offset;\nvoid main () {\n  vec4 o = vec4(1, 1, 1, 1);\n  vec4 sum = texture2D(texture, clamp(uv + vec2(-v_halfpixel.x * 2.0, 0.0) * v_offset, 0., 1.));\n  sum += texture2D(texture, clamp(uv + vec2(-v_halfpixel.x, v_halfpixel.y) * v_offset, 0., 1.)) * 2.0;\n  sum += texture2D(texture, clamp(uv + vec2(0.0, v_halfpixel.y * 2.0) * v_offset, 0., 1.));\n  sum += texture2D(texture, clamp(uv + vec2(v_halfpixel.x, v_halfpixel.y) * v_offset, 0., 1.)) * 2.0;\n  sum += texture2D(texture, clamp(uv + vec2(v_halfpixel.x * 2.0, 0.0) * v_offset, 0., 1.));\n  sum += texture2D(texture, clamp(uv + vec2(v_halfpixel.x, -v_halfpixel.y) * v_offset, 0., 1.)) * 2.0;\n  sum += texture2D(texture, clamp(uv + vec2(0.0, -v_halfpixel.y * 2.0) * v_offset, 0., 1.));\n  sum += texture2D(texture, clamp(uv + vec2(-v_halfpixel.x, -v_halfpixel.y) * v_offset, 0., 1.)) * 2.0;\n  o = sum / 12.0;\n  o *= v_color;\n  ALPHA_TEST(o);\n  #if USE_BGRA\n    gl_FragColor = o.bgra;\n  #else\n    gl_FragColor = o.rgba;\n  #endif\n}"
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
    "hash": 104409166,
    "glsl3": {
      "vert": "\nprecision highp float;\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nin vec3 a_position;\nin vec4 a_color;\nout vec4 v_color;\n#if USE_TEXTURE\nin vec2 a_uv0;\nout vec2 v_uv0;\n#endif\nvoid main () {\n  vec4 pos = vec4(a_position, 1);\n  #if CC_USE_MODEL\n  pos = cc_matViewProj * cc_matWorld * pos;\n  #else\n  pos = cc_matViewProj * pos;\n  #endif\n  #if USE_TEXTURE\n  v_uv0 = a_uv0;\n  #endif\n  v_color = a_color;\n  gl_Position = pos;\n}",
      "frag": "\nprecision highp float;\n#if USE_ALPHA_TEST\n  uniform ALPHA_TEST {\n    float alphaThreshold;\n  };\n#endif\nvoid ALPHA_TEST (in vec4 color) {\n  #if USE_ALPHA_TEST\n      if (color.a < alphaThreshold) discard;\n  #endif\n}\nvoid ALPHA_TEST (in float alpha) {\n  #if USE_ALPHA_TEST\n      if (alpha < alphaThreshold) discard;\n  #endif\n}\nin vec4 v_color;\n#if USE_TEXTURE\nin vec2 v_uv0;\nuniform sampler2D texture;\n#endif\nuniform CustomUniform {\n  vec2 v_halfpixel;\n  vec2 v_offset;\n};\nvoid main () {\n vec2 uv = v_uv0;\n  vec4 o = vec4(1, 1, 1, 1);\n  vec4 sum = texture2D(texture, clamp(uv + vec2(-v_halfpixel.x * 2.0, 0.0) * v_offset, 0., 1.));\n  sum += texture2D(texture, clamp(uv + vec2(-v_halfpixel.x, v_halfpixel.y) * v_offset, 0., 1.)) * 2.0;\n  sum += texture2D(texture, clamp(uv + vec2(0.0, v_halfpixel.y * 2.0) * v_offset, 0., 1.));\n  sum += texture2D(texture, clamp(uv + vec2(v_halfpixel.x, v_halfpixel.y) * v_offset, 0., 1.)) * 2.0;\n  sum += texture2D(texture, clamp(uv + vec2(v_halfpixel.x * 2.0, 0.0) * v_offset, 0., 1.));\n  sum += texture2D(texture, clamp(uv + vec2(v_halfpixel.x, -v_halfpixel.y) * v_offset, 0., 1.)) * 2.0;\n  sum += texture2D(texture, clamp(uv + vec2(0.0, -v_halfpixel.y * 2.0) * v_offset, 0., 1.));\n  sum += texture2D(texture, clamp(uv + vec2(-v_halfpixel.x, -v_halfpixel.y) * v_offset, 0., 1.)) * 2.0;\n  o = sum / 12.0;\n  o *= v_color;\n  ALPHA_TEST(o);\n  #if USE_BGRA\n    gl_FragColor = o.bgra;\n  #else\n    gl_FragColor = o.rgba;\n  #endif\n}"
    },
    "glsl1": {
      "vert": "\nprecision highp float;\nuniform mat4 cc_matViewProj;\nuniform mat4 cc_matWorld;\nattribute vec3 a_position;\nattribute vec4 a_color;\nvarying vec4 v_color;\n#if USE_TEXTURE\nattribute vec2 a_uv0;\nvarying vec2 v_uv0;\n#endif\nvoid main () {\n  vec4 pos = vec4(a_position, 1);\n  #if CC_USE_MODEL\n  pos = cc_matViewProj * cc_matWorld * pos;\n  #else\n  pos = cc_matViewProj * pos;\n  #endif\n  #if USE_TEXTURE\n  v_uv0 = a_uv0;\n  #endif\n  v_color = a_color;\n  gl_Position = pos;\n}",
      "frag": "\nprecision highp float;\n#if USE_ALPHA_TEST\n  uniform float alphaThreshold;\n#endif\nvoid ALPHA_TEST (in vec4 color) {\n  #if USE_ALPHA_TEST\n      if (color.a < alphaThreshold) discard;\n  #endif\n}\nvoid ALPHA_TEST (in float alpha) {\n  #if USE_ALPHA_TEST\n      if (alpha < alphaThreshold) discard;\n  #endif\n}\nvarying vec4 v_color;\n#if USE_TEXTURE\nvarying vec2 v_uv0;\nuniform sampler2D texture;\n#endif\nuniform vec2 v_halfpixel;\nuniform vec2 v_offset;\nvoid main () {\n  vec4 o = vec4(1, 1, 1, 1);\n vec2 uv = v_uv0;\n  vec4 sum = texture2D(texture, clamp(uv + vec2(-v_halfpixel.x * 2.0, 0.0) * v_offset, 0., 1.));\n  sum += texture2D(texture, clamp(uv + vec2(-v_halfpixel.x, v_halfpixel.y) * v_offset, 0., 1.)) * 2.0;\n  sum += texture2D(texture, clamp(uv + vec2(0.0, v_halfpixel.y * 2.0) * v_offset, 0., 1.));\n  sum += texture2D(texture, clamp(uv + vec2(v_halfpixel.x, v_halfpixel.y) * v_offset, 0., 1.)) * 2.0;\n  sum += texture2D(texture, clamp(uv + vec2(v_halfpixel.x * 2.0, 0.0) * v_offset, 0., 1.));\n  sum += texture2D(texture, clamp(uv + vec2(v_halfpixel.x, -v_halfpixel.y) * v_offset, 0., 1.)) * 2.0;\n  sum += texture2D(texture, clamp(uv + vec2(0.0, -v_halfpixel.y * 2.0) * v_offset, 0., 1.));\n  sum += texture2D(texture, clamp(uv + vec2(-v_halfpixel.x, -v_halfpixel.y) * v_offset, 0., 1.)) * 2.0;\n  o = sum / 12.0;\n  o *= v_color;\n  ALPHA_TEST(o);\n  #if USE_BGRA\n    gl_FragColor = o.bgra;\n  #else\n    gl_FragColor = o.rgba;\n  #endif\n}"
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
