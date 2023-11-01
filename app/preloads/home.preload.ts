import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ipcRendererCustom", {
  onceInitData: (cb: any) => {
    console.log("on passe dans le onceInitData");

    ipcRenderer.once("init-data", cb);
  },


});
