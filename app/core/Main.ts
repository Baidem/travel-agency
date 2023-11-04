import { BrowserWindow, app, ipcMain, dialog} from "electron";
import App = Electron.App;
import windowManager, { WindowNameMapper } from "./WindowManager";
import travelItemService from "../services/travel-item.service";

export default class Main {
    private app: App;

    constructor() {
        this.app = app;
        this.initDefaultListeners();
    }

    // ** INIT APPLICATION ** //
    private initDefaultListeners(): void {
        this.app.whenReady().then(() => {
            this.generateMainWindow();
        });

        // Fix darwin closed main window
        this.app.on("activate", () => {
            if (BrowserWindow.getAllWindows().length === 0 && process.platform === "darwin") {
                this.generateMainWindow();
            }
        });

        this.app.on("window-all-closed", () => {
            if (process.platform !== "darwin") {
                app.quit();
            }
        });
    }

    // ** GENERATE MAIN WINDOW ** //
    private generateMainWindow(): void {
        const travelItems = travelItemService.getAll();
       
        // HOME PAGE CREATE //
        windowManager.createWindow(WindowNameMapper.HOME, travelItems);

        // !! HERE WINDOWS EVENTS !! //
        // ** ASK SHOW NEW ITEM FORM ** //
        ipcMain.on("ask-show-new-item-form", (e: any) => {
            if (windowManager.hasWindow(WindowNameMapper.NEW_ITEM)) {
                windowManager.getWindow(WindowNameMapper.NEW_ITEM).show();
            } else {
                windowManager.createWindow(WindowNameMapper.NEW_ITEM, {}, 500, 800);

                const newItemWindow = windowManager.getWindow(WindowNameMapper.NEW_ITEM);
                
                // ** HANDLE ADD NEW-ITEM ** //
                ipcMain.handle("add-new-item", (e, newItem) => {
                    const travelItemList = travelItemService.getAll();
                    newItem.id = travelItemList.length > 0 ? travelItemList[travelItemList.length - 1].id + 1 : 1;
                    // INSERT NEW ITEM //
                    travelItemService.insert(newItem);
       
                    // SEND NEW-ITEM-ADDED TO HOME WINDOW OR CREATE A NEW ONE //
                    if (windowManager.hasWindow(WindowNameMapper.HOME)) {
                        const homeWindow = windowManager.getWindow(WindowNameMapper.HOME);
                        homeWindow.webContents.send("new-item-added", newItem);
                    } else {
                        const travelItemList = travelItemService.getAll();
                        windowManager.createWindow(WindowNameMapper.HOME, travelItemList);
                    }

                    // RETURN SUCCESS AND MESSAGE //
                    return {
                        success: true,
                        msg: "Successfully added !",
                    };
                });

                // ON CLOSED REMOVE HANDLER //
                newItemWindow.on('closed', () => {
                    ipcMain.removeHandler('add-new-item');
                });
            }
        });
        
        // ** ASK DISPLAY EDIT-ITEM ** //
        ipcMain.on('ask-display-edit-item-form', (e: any, id: number) => {
            
            if (windowManager.hasWindow(WindowNameMapper.EDIT_ITEM)) {
                windowManager.getWindow(WindowNameMapper.EDIT_ITEM).show();
            } else {
                const itemToEdit = travelItemService.getById(id);
                
                if (!itemToEdit) throw "Item does not exist"; 
                
                windowManager.createWindow(WindowNameMapper.EDIT_ITEM, itemToEdit, 500, 800);
        
                const editWindow = windowManager.getWindow(WindowNameMapper.EDIT_ITEM);
                
                // HANDLE EDIT-ITEM //
                ipcMain.handle('edit-item', (e: any, editedItem: any) => {
                    
                    // Update travel list
                    travelItemService.update(editedItem);
            
                    // SEND ITEM-EDITED TO HOME WINDOW OR CREATE A NEW ONE //
                    if (windowManager.hasWindow(WindowNameMapper.HOME)) {
                        const homeWindow = windowManager.getWindow(WindowNameMapper.HOME);
                        homeWindow.webContents.send('item-edited', editedItem);
                    } else {
                        const travelItemList = travelItemService.getAll();
                        windowManager.createWindow(WindowNameMapper.HOME, travelItemList);
                    }

                    // SEND DETAIL-ITEM-EDITED TO DETAIL WINDOW OR CREATE A NEW ONE //
                    if (windowManager.hasWindow(WindowNameMapper.DETAIL_ITEM)) {
                        const detailWindow = windowManager.getWindow(WindowNameMapper.DETAIL_ITEM);
                        detailWindow.webContents.send('detail-item-edited', editedItem);
                    } else {
                        const travelItemList = travelItemService.getAll();
                        windowManager.createWindow(WindowNameMapper.DETAIL_ITEM, editedItem);
                    }
        
                    // RETURN SUCCESS AND MESSAGE //
                    return {
                        success: true,
                        msg: 'Successfully modified !'
                    };
                });
                
                // ON CLOSED REMOVE HANDLER //
                editWindow.on('closed', () => {
                    ipcMain.removeHandler('edit-item');
                });
            }
        });

        // ** ASK SHOW DETAIL ITEM ** //
        ipcMain.on('ask-show-detail-item', (e: any, id: number) => {
            
            if (windowManager.hasWindow(WindowNameMapper.DETAIL_ITEM)) {
                windowManager.getWindow(WindowNameMapper.DETAIL_ITEM).show();
            } else {
                const travelItem = travelItemService.getById(id);
                
                if (!travelItem) throw "Item does not exist"; 
                
                windowManager.createWindow(WindowNameMapper.DETAIL_ITEM, travelItem, 1000, 520);
        
                const detailWindow = windowManager.getWindow(WindowNameMapper.DETAIL_ITEM);
                
                // -- HANDLE DELETE-ITEM -- //
                ipcMain.handle('delete-item', (e: any, id: number) => {
                    // DIALOG BOX //
                    const choice = dialog.showMessageBoxSync({
                        title: 'Delete item',
                        message: 'Are you sure you want to delete the element permanently !',
                        buttons: ['Cancel', 'Yes']
                    })
                    // YES //
                    if(choice) {
                        
                        travelItemService.delete(id)
                        if(windowManager.hasWindow(WindowNameMapper.HOME)) {
                            const homeWindow = windowManager.getWindow(WindowNameMapper.HOME)
                            homeWindow.webContents.send('item-deleted', id)
                        }
                        else {
                            const travelItemList = travelItemService.getAll()
                            windowManager.createWindow(WindowNameMapper.HOME, travelItemList)
                        }
                        return { 
                            success: true,
                            msg: "This element has just been removed! You can close this window please."
                         }
                    }
                    // CANCEL //
                    return { 
                        success: false,
                        msg: "The deletion of this item has been cancelled."
                     }
                });
                
                // ON CLOSED REMOVE HANDLER//
                detailWindow.on('closed', () => {
                    ipcMain.removeHandler('delete-item');
                });
            }
        });

    }
}
