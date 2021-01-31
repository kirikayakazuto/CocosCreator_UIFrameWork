///<reference path="../../editor/editor-assetDB.d.ts"/>
///<reference path="../../editor/editor-main.d.ts"/>
///<reference path="../../editor/editor-renderer.d.ts"/>
///<reference path="../../editor/editor-scene.d.ts"/>
///<reference path="../../editor/editor-share.d.ts"/>
///<reference path="../../editor/engine.d.ts"/>
///<reference path="../../creator.d.ts"/>
var main2;
(function (main2) {
    function load() {
        // execute when package loaded
    }
    main2.load = load;
    ;
    function unload() {
        // execute when package unloaded
    }
    main2.unload = unload;
    ;
    // register your ipc messages here
    main2.messages = {
        /**打开面板 */
        open: function () {
            var uuid_ss = Editor.Selection.curSelection('node');
            for (var _i = 0, uuid_ss_1 = uuid_ss; _i < uuid_ss_1.length; _i++) {
                var uuid_s = uuid_ss_1[_i];
                Editor.Scene.callSceneScript('ui-node', 'update_nodes', uuid_s);
            }
            // Editor.Panel.open('ui-node');
        },
    };
})(main2 || (main2 = {}));
module.exports = main2;
