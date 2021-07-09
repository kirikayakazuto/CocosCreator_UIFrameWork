"use strict";
Vue.component("skeleton2d", { 
    template: '\n    '+
    '<ui-prop\n      v-prop="target.paused"\n      :multi-values="multi"\n    >\n    </ui-prop>\n  '+
    '<template v-for="prop in target">\n      '+
        '<component\n        v-if="prop.attrs.visible !== false"\n        :is="prop.compType"\n        :target.sync="prop"\n        :indent="0"\n      ></component>\n    '+
    '</template>\n    '+
    
    '<ui-button\n        class="blue"\n        @confirm="searchClips"\n        style="margin-left: 15px;margin-right: 15px;margin-top:15px;"\n    >\n        '+
        '{{T(\'COMPONENT.attach_util.generate_attached_node\')}}\n    '+
    '</ui-button>\n  ', 
    
    props: { 
        target: { 
            twoWay: !0, type: Object 
        } 
    },

    methods: { 
        T: Editor.T, 
        searchClips() { 
            Editor.Ipc.sendToPanel("scene", "scene:generate_attached_node", this.target.uuid.value) 
        },
        replay(event, d){
            this.target.replay && this.target.replay();
        }
    } 
});