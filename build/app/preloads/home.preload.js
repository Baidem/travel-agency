"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("ipcRendererCustom", {
    onceInitData: function (cb) {
        console.log("check ! home.preload.ts onceInitData");
        electron_1.ipcRenderer.once("init-data", cb);
    },
    sendAskShowNewItemForm: function () {
        console.log("check ! home.preload.ts sendAskShowNewItemForm");
        electron_1.ipcRenderer.send("ask-show-new-item-form");
    },
    onNewItemAdded: function (cb) {
        console.log("check ! home.preload.ts onNewItemAdded");
        electron_1.ipcRenderer.on("new-item-added", cb);
    },
    sendAskShowEditItemForm: function (id) {
        console.log("check ! home.preload.ts sendAskShowEditItemForm", id);
        electron_1.ipcRenderer.send("ask-show-edit-item-form", id);
    },
    onItemEdited: function (cb) {
        console.log("check ! home.preload.ts onItemEdited");
        electron_1.ipcRenderer.on("item-edited", cb);
    },
});
