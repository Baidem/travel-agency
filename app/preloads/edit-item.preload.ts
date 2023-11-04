import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('ipcRendererCustom', {
        onceInitData: (cb: any) => {
            ipcRenderer.once('init-data', cb)
        },
        invokeEditItem: (itemEdited: any, cb: any) => {
            ipcRenderer.invoke('edit-item', itemEdited)
            .then(cb);
        },
    }
)
