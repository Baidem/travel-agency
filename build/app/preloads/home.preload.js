"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("ipcRendererCustom", {
    onceInitData: function (cb) {
        console.log("check ! home.preload.ts onceInitData");
        electron_1.ipcRenderer.once("init-data", cb);
    },
});
