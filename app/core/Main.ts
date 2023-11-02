import { BrowserWindow, app, ipcMain } from "electron";
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
            console.log("Check! Main.ts initDefaultListeners, app.whenReady");
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
        // ASK SHOW NEW ITEM FORM //
        ipcMain.on("ask-show-new-item-form", (e: any, type: string) => {
            console.log("Check! new-item.controller.ts ipcMain.on('ask-show-new-item-form', ...)");
            if (windowManager.hasWindow(WindowNameMapper.NEW_ITEM)) {
                windowManager.getWindow(WindowNameMapper.NEW_ITEM).show();
            } else {
                windowManager.createWindow(WindowNameMapper.NEW_ITEM, type, 600, 840);

                const newItemWindow = windowManager.getWindow(WindowNameMapper.NEW_ITEM);
                
                // ** HANDLE ADD NEW-ITEM ** //
                ipcMain.handle("add-new-item", (e, newItem) => {
                    console.log("Check! ipcMain.handle('add-new-item', ...)", newItem.id);
                    const travelItemList = travelItemService.getAll();
                    newItem.id = travelItemList.length > 0 ? travelItemList[travelItemList.length - 1].id + 1 : 1;
                    console.log("newItem.id", newItem.id);
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
                        msg: "The new travel has been added successfully",
                    };
                });

                newItemWindow.on('closed', () => {
                    ipcMain.removeHandler('add-new-item');
                });
            }
        });
        
        // ** ASK SHOW EDIT-ITEM ** //
        ipcMain.on('ask-show-edit-item-form', (e: any, id: number) => {
            console.log("Check! ipcMain.on('ask-show-edit-item-form', ...)", id);
            
            if (windowManager.hasWindow(WindowNameMapper.EDIT_ITEM)) {
                windowManager.getWindow(WindowNameMapper.EDIT_ITEM).show();
            } else {
                const itemToEdit = travelItemService.getById(id);
                console.log("itemToEdit", itemToEdit);
                
                if (!itemToEdit) {
                    console.log("Item does not exist");
                    throw "Item does not exist";
                } 
                
                windowManager.createWindow(WindowNameMapper.EDIT_ITEM, itemToEdit, 600, 840);
        
                const editWindow = windowManager.getWindow(WindowNameMapper.EDIT_ITEM);
                
                // HANDLE EDIT-ITEM //
                ipcMain.handle('edit-item', (e: any, editedItem: any) => {
                    console.log("Check! ipcMain.handle('edit-item', ...)", editedItem.id);
                    
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
        
                    // RETURN SUCCESS AND MESSAGE //
                    return {
                        success: true,
                        msg: 'The change was made successfully.'
                    };
                });
                
                // ON CLOSED //
                editWindow.on('closed', () => {
                    ipcMain.removeHandler('edit-item');
                });
            }
        });
    }
}
