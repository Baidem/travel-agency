import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ipcRendererCustom", {
    onceInitData: (cb: any) => {
        ipcRenderer.once("init-data", cb);
    },
    invokeAddNewItem: (newItem: any, cb: any) => {
        ipcRenderer.invoke("add-new-item", newItem)
        .then(cb);
    },
});
