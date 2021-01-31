"use strict";
var name_s = "ui-node";
/* ***************库*************** */
// @ts-ignore
var fs = require('fire-fs');
// @ts-ignore
var electron = require('electron');
/* ***************自定义*************** */
var panel;
(function (panel) {
    // css style for panel
    panel.style = fs.readFileSync(Editor.url('packages://' + name_s + '/panel/index.css'));
    // html template for panel
    panel.template = fs.readFileSync(Editor.url('packages://' + name_s + '/panel/index.html'));
    panel.$ = {};
    function ready() {
        // @ts-ignore
        return new globalThis.Vue({
            // @ts-ignore
            el: this.shadowRoot,
            data: {},
            methods: {
                /**选择路径按钮 */
                update: function () {
                    Editor.log("update");
                    var uuid_ss = Editor.Selection.curSelection('node');
                    for (var _i = 0, uuid_ss_1 = uuid_ss; _i < uuid_ss_1.length; _i++) {
                        var uuid_s = uuid_ss_1[_i];
                        Editor.Scene.callSceneScript('ui-node', 'update_nodes', uuid_s);
                    }
                },
            },
        });
    }
    panel.ready = ready;
    // register your ipc messages here
    panel.messages = {};
})(panel || (panel = {}));
Editor.Panel.extend(panel);
