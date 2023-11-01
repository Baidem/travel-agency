import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ipcRendererCustom", {
  onceInitData: (cb: any) => {
    console.log("check ! home.preload.ts onceInitData");
    ipcRenderer.once("init-data", cb);
  },


});
