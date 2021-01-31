///<reference path="../../editor/editor-assetDB.d.ts"/>
///<reference path="../../editor/editor-main.d.ts"/>
///<reference path="../../editor/editor-renderer.d.ts"/>
///<reference path="../../editor/editor-scene.d.ts"/>
///<reference path="../../editor/editor-share.d.ts"/>
///<reference path="../../editor/engine.d.ts"/>
///<reference path="../../creator.d.ts"/>

module main2 {
	export function load() {
		// execute when package loaded
	};

	export function unload() {
		// execute when package unloaded
	};

	// register your ipc messages here
	export const messages = {
		/**打开面板 */
		open() {
			let uuid_ss = Editor.Selection.curSelection('node');
			for (let uuid_s of uuid_ss) {
				Editor.Scene.callSceneScript('ui-node', 'update_nodes', uuid_s);
			}
			// Editor.Panel.open('ui-node');
		},
	};
}

module.exports = main2;