import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ipcRendererCustom", {
    onceInitData: (cb: any) => {
        ipcRenderer.once("init-data", cb);
    },
    sendAskShowNewItemForm: () => {
        ipcRenderer.send("ask-show-new-item-form");
    },
    onNewItemAdded: (cb: any) => {
        ipcRenderer.on("new-item-added", cb);
    },
    onItemDeleted: (cb: any) => {
        ipcRenderer.on("item-deleted", cb);
    },
    onItemEdited: (cb: any) => {
        ipcRenderer.on("item-edited", cb);
    },
    sendAskShowDetailItem: (id: number) => {
        ipcRenderer.send("ask-show-detail-item", id);
    },

});
