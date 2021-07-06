///<reference path="../../../editor/editor-assetDB.d.ts"/>
///<reference path="../../../editor/editor-main.d.ts"/>
///<reference path="../../../editor/editor-renderer.d.ts"/>
///<reference path="../../../editor/editor-scene.d.ts"/>
///<reference path="../../../editor/editor-share.d.ts"/>
///<reference path="../../../editor/engine.d.ts"/>
///<reference path="../../../creator.d.ts"/>

module main {
	export function load() {
		// execute when package loaded
		require("electron").ipcMain.on("scene:apply-prefab", () => {
			Editor.Scene.callSceneScript("propcontroller", "start");
		});
	};

	export function unload() {
		// execute when package unloaded
	};

	// register your ipc messages here
	export const messages = {
		/**打开面板 */
		run() {
            Editor.Scene.callSceneScript("propcontroller", "start");
		},
		/** 添加脚本 */
		addScript() {
			Editor.Scene.callSceneScript("propcontroller", "copyScript");
		},
	};
}




module.exports = main;