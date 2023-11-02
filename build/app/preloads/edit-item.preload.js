"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('ipcRendererCustom', {
    onceInitData: function (cb) {
        console.log("check ! new-item.preload.ts onceInitData");
        electron_1.ipcRenderer.once('init-data', cb);
    },
    invokeEditItem: function (itemEdited, cb) {
        console.log("check ! new-item.preload.ts invokeEditItem", itemEdited.id);
        electron_1.ipcRenderer.invoke('edit-item', itemEdited)
            .then(cb);
    },
});
