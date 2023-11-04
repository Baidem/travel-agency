import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ipcRendererCustom", {
    onceInitData: (cb: any) => {
        ipcRenderer.once("init-data", cb);
    },
    onDetailItemEdited: (cb: any) => {
        ipcRenderer.on('detail-item-edited', cb);
    },
    sendAskDisplayEditItemForm: (id: number) => {
        ipcRenderer.send("ask-display-edit-item-form", id);
    },
    invokeDeleteItem: (id: number, cb: any) => {
        ipcRenderer
            .invoke('delete-item', id)
            .then(cb)
    }

});



