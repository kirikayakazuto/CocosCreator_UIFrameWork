const name_s = "ui-node";
/* ***************库*************** */
// @ts-ignore
const fs = require('fire-fs');
// @ts-ignore
const electron = require('electron');
/* ***************自定义*************** */

module panel {
	// css style for panel
	export const style = fs.readFileSync(Editor.url('packages://' + name_s + '/panel/index.css'));
	// html template for panel
	export const template = fs.readFileSync(Editor.url('packages://' + name_s + '/panel/index.html'));

	export const $ = {};

	export function ready() {
		// @ts-ignore
		return new (<any>globalThis).Vue(<vue>{
			// @ts-ignore
			el: this.shadowRoot,
			data: {},
			methods: {
				/**选择路径按钮 */
				update() {
					Editor.log("update");
					let uuid_ss = Editor.Selection.curSelection('node');
					for (let uuid_s of uuid_ss) {
						Editor.Scene.callSceneScript('ui-node', 'update_nodes', uuid_s);
					}
				},
			},
			// init: ()=> {},
			// created: ()=> {},
		});
	}
	// register your ipc messages here
	export const messages = {
	};
}

Editor.Panel.extend(panel);