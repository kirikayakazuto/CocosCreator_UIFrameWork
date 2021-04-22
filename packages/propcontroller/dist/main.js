"use strict";
///<reference path="../../../editor/editor-assetDB.d.ts"/>
///<reference path="../../../editor/editor-main.d.ts"/>
///<reference path="../../../editor/editor-renderer.d.ts"/>
///<reference path="../../../editor/editor-scene.d.ts"/>
///<reference path="../../../editor/editor-share.d.ts"/>
///<reference path="../../../editor/engine.d.ts"/>
///<reference path="../../../creator.d.ts"/>
var main;
(function (main) {
    function load() {
        // execute when package loaded
    }
    main.load = load;
    ;
    function unload() {
        // execute when package unloaded
    }
    main.unload = unload;
    ;
    // register your ipc messages here
    main.messages = {
        /**打开面板 */
        run: function () {
            Editor.Scene.callSceneScript("autobinder", "start");
        },
    };
})(main || (main = {}));
module.exports = main;
