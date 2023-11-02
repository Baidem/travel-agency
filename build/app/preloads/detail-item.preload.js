"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("ipcRendererCustom", {
    onceInitData: function (cb) {
        console.log("check ! detail-item.preload.ts onceInitData");
        electron_1.ipcRenderer.once("init-data", cb);
    },
    onDetailItemEdited: function (cb) {
        console.log("check ! detail-item.preload.ts onDetailItemEdited");
        electron_1.ipcRenderer.on('detail-item-edited', cb);
    },
    sendAskDisplayEditItemForm: function (id) {
        console.log("check ! home.preload.ts sendAskDisplayEditItemForm", id);
        electron_1.ipcRenderer.send("ask-display-edit-item-form", id);
    },
});
