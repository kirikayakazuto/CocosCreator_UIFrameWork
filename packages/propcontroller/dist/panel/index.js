"use strict";
// panel/index.js, this filename needs to match the one registered in package.json
Editor.Panel.extend({
    // css style for panel
    style: "\n      :host { margin: 5px; }\n      h2 { color: #f90; }\n    ",
    // html template for panel
    template: "\n      <h2>buttonplus</h2>\n      <hr />\n      <div>State: <span id=\"label\">--</span></div>\n      <hr />\n      <ui-button id=\"btn\">Send To Main</ui-button>\n    ",
    // element and variable binding
    $: {
        btn: '#btn',
        label: '#label',
    },
    // method executed when template and styles are successfully loaded and initialized
    ready: function () {
        this.$btn.addEventListener('confirm', function () {
            Editor.Ipc.sendToMain('buttonplus:clicked');
        });
    },
    // register your ipc messages here
    messages: {}
});
