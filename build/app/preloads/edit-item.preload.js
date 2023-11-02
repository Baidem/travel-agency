"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('ipcRendererCustom', {
    onceInitData: function (cb) {
        console.log("check ! new-item.preload.ts onceInitData");
        electron_1.ipcRenderer.once('init-data', cb);
    },
    invokeAddNewItem: function (newItem, cb) {
        console.log("check ! new-item.preload.ts invokeAddNewItem");
        electron_1.ipcRenderer
            .invoke('add-new-item', newItem)
            .then(cb);
    },
    invokeEditItem: function (itemEdited, cb) {
        console.log("check ! new-item.preload.ts invokeEditItem", itemEdited.id);
        electron_1.ipcRenderer.invoke('edit-item', itemEdited)
            .then(cb);
    },
});
