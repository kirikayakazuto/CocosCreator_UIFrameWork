'use strict';

module.exports = {
  load () {
    // execute when package loaded
  },

  unload () {
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    'open' () {
      // open entry panel registered in package.json
      Editor.Panel.open('buttonplus');
    },
    'say-hello' () {
      Editor.Panel.open('buttonplus');

      // Editor.Ipc.sendToPanel('buttonplus', 'buttonplus:hello');
    },
    'clicked' () {
      
    }
  },
};