"use strict";
Vue.component("cc-mask",{
    template:
    '\n        <ui-prop\n            v-prop="target.type"\n            :multi-values="multi"    \n        ></ui-prop>\n'+
    '        <ui-prop\n            v-prop="target.inverted"\n            :multi-values="multi"  \n        ></ui-prop>\n'+
    '        <cc-array-prop :target.sync="target.polygon" v-show="isPolygon()"></cc-array-prop>\n' +
    '        <ui-prop min="3"\n            v-show="isEllipseType()"\n            v-prop="target.segements"\n            :multi-values="multi"  \n        ></ui-prop>\n'+
    '        <ui-prop\n            v-show="isImageStencilType()"\n            v-prop="target.alphaThreshold"\n            :multi-values="multi"  \n        ></ui-prop>\n'+
    '        <ui-prop\n            v-show="isImageStencilType()"\n            v-prop="target.spriteFrame"\n            :multi-values="multi"  \n        ></ui-prop>\n'+
    '        <div class="horizontal layout end-justified" style="padding:5px 0;margin-bottom:5px;"\n            v-show="target.spriteFrame.value.uuid && isImageStencilType()"\n        >\n'+
    '            <ui-button\n                v-on:confirm="onAppImageSizeClick"\n            >Resize to Target</ui-button>\n'+
    '        <div>\n  ',
    props:{
        target:{twoWay:!0,type:Object},
        multi:{type:Boolean}}, 
        methods:{
            isRectType(){return this.target.type.value===cc.Mask.Type.RECT},
            isEllipseType(){return this.target.type.value===cc.Mask.Type.ELLIPSE},
            isImageStencilType(){return this.target.type.value===cc.Mask.Type.IMAGE_STENCIL},
            isPolygon() {return this.target.type.value===cc.MaskPlus.Type.Polygon},
            onAppImageSizeClick(e){
                var t={id:this.target.uuid.value,path:"_resizeToTarget",type:"Boolean",isSubProp:!1,value:!0};
                Editor.Ipc.sendToPanel("scene","scene:set-property",t)
        }
    }
});
