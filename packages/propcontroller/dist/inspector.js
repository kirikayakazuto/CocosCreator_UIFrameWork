// "use strict";Vue.component("points-base-collider",{template:'\n    <ui-prop name="Threshold">\n      <ui-input class="flex-1" v-value="target.threshold.value"></ui-input>\n      <ui-button\n        class="blue tiny"\n        @confirm="regeneratePoints"\n      >\n        Regenerate Points\n      </ui-button>\n    </ui-prop>\n    <template v-for="prop in target">\n      <component\n        v-if="prop.attrs.visible !== false"\n        :is="prop.compType"\n        :target.sync="prop"\n        :indent="0"\n      ></component>\n    </template>\n  ',props:{target:{twoWay:!0,type:Object}},methods:{T:Editor.T,regeneratePoints(){Editor.Ipc.sendToPanel("scene","scene:regenerate-polygon-points",this.target.uuid.value)}}});var e={dependencies:["packages://inspector/inspectors/comps/physics/points-base-collider.js"],template:'\n    <points-base-collider :target.sync="target"></points-base-collider>\n  ',props:{target:{twoWay:!0,type:Object}}};Vue.component("cc-physics-chain-collider",e),Vue.component("cc-polygon-collider",e);
"use strict";
Vue.component("propcontroller", {
    template:'\n    '+
    '   <ui-prop\n      v-prop="target.nodePathType"\n   :multi-values="multi"\n    >\n    </ui-prop>\n  '+
    '   <ui-prop\n      v-prop="target.open"\n   :multi-values="multi"\n    >\n    </ui-prop>\n  '+
    '   <ui-prop\n      v-prop="target.uid"\n   :multi-values="multi"\n    >\n    </ui-prop>\n  '+
    '   <ui-prop name="State">\n'+
    '      <ui-select @confirm="selectChange" :value="target.state.value">'+
    '       <option v-for="(i, item) in list" :value="i"> {{item}} </option>' +
    '      </ui-select>\n  '+
    '      <ui-button\n        class="blue tiny"\n        @confirm="refreshState"\n      >\n'+
    '        refresh state\n'+
    '      </ui-button>\n'+
    '    </ui-prop>\n'+
    '   <cc-array-prop :target.sync="target.states"></cc-array-prop>\n ' + 
    '   <ui-prop\n      v-prop="target.propertyJson"\n   :multi-values="multi"\n    >\n    </ui-prop>\n  '+
    '   ',    

    data: function () {
        let arr = [];
        let value = this.target.states.value;
        for(const e of value) {
            arr.push(e.value);
        }
        return {
          list: arr
        }
    },

    props:{
        target:{
            twoWay:!0,
            type:Object
        }
    },

    methods:{
        selectChange(event) {
            this.target.state.value = event.detail.value;
            let t = {
                nodeUuid: this.target.node.value.uuid,
                comUuid: this.target.uuid.value,
                state: event.detail.value
            }
            Editor.Scene.callSceneScript("propcontroller","setState",t);
        },
        refreshState(event, d){
            this.list = [];
            let value = this.target.states.value;
            for(const e of value) {
                this.list.push(e.value);
            }
        }
    }
});