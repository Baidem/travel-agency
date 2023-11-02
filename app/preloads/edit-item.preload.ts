import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('ipcRendererCustom', {
        onceInitData: (cb: any) => {
            console.log("check ! new-item.preload.ts onceInitData");
            ipcRenderer.once('init-data', cb)
        },
        invokeAddNewItem: (newItem: any, cb: any) => {
            console.log("check ! new-item.preload.ts invokeAddNewItem");
            ipcRenderer
                .invoke('add-new-item', newItem)
                .then(cb)
        },
        invokeEditItem: (itemEdited: any, cb: any) => {
            console.log("check ! new-item.preload.ts invokeEditItem", itemEdited.id);
            ipcRenderer.invoke('edit-item', itemEdited)
            .then(cb);
        },
    }
)
