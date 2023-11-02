import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ipcRendererCustom", {
  onceInitData: (cb: any) => {
    console.log("check ! home.preload.ts onceInitData");
    ipcRenderer.once("init-data", cb);
  },
  sendAskShowNewItemForm: () => {
    console.log("check ! home.preload.ts sendAskShowNewItemForm");
    ipcRenderer.send("ask-show-new-item-form");
  },
  onNewItemAdded: (cb: any) => {
    console.log("check ! home.preload.ts onNewItemAdded");
    ipcRenderer.on('new-item-added', cb);
  },

});
