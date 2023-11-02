import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ipcRendererCustom", {
    onceInitData: (cb: any) => {
        console.log("check ! detail-item.preload.ts onceInitData");
        ipcRenderer.once("init-data", cb);
    },
    onDetailItemEdited: (cb: any) => {
        console.log("check ! detail-item.preload.ts onDetailItemEdited");
        ipcRenderer.on('detail-item-edited', cb);
    },
    sendAskDisplayEditItemForm: (id: number) => {
        console.log("check ! home.preload.ts sendAskDisplayEditItemForm", id);
        ipcRenderer.send("ask-display-edit-item-form", id);
    },
});


