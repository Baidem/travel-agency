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
            console.log("check ! Main.ts initDefaultListeners, app.whenReady");
            this.generateMainWindow();
        });
    

        // Fix darwin closed main window
        this.app.on("activate", () => {
            if (BrowserWindow.length === 0 && process.platform === "darwin") {
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

    // !! HERE WINDOWS EVENTS !!  //
    // ASK SHOW NEW ITEM FORM //
    ipcMain.on("ask-show-new-item-form", (e: any, type: string) => {
        console.log("check ! new-item.controller.ts ipcMain.on(\"ask-show-new-item-form\", ...)");
        if (windowManager.hasWindow(WindowNameMapper.NEW_ITEM)) {
            windowManager.getWindow(WindowNameMapper.NEW_ITEM).show();
        } else {
            windowManager.createWindow(WindowNameMapper.NEW_ITEM, type, 600, 840);
  
            const newItemWindow = windowManager.getWindow(
                WindowNameMapper.NEW_ITEM
            );
            
            // HANDLE ADD NEW-ITEM //
            ipcMain.handle("add-new-item", (e, newItem) => {
                console.log("check ! ipcMain.handle(\"add-new-item\", ...)");
                const travelItemList = travelItemService.getAll();
                newItem.id = travelItemList.length > 0 ? travelItemList[travelItemList.length - 1].id + 1 : 1;
                travelItemService.insert(newItem);
   
                if (windowManager.hasWindow(WindowNameMapper.HOME)) {
                    const homeWindwow = windowManager.getWindow(WindowNameMapper.HOME);
                    homeWindwow.webContents.send("new-item-added", newItem);
                }
                else {
                    windowManager.createWindow(WindowNameMapper.HOME, travelItemList)
                }
                return {
                    success: true,
                    msg: "The new travel has been added successfully",
                };
            });
  
            // ON CLOSED //
            newItemWindow.on("closed", () => {
                console.log("check ! newItemWindow.on(\"closed\", ...)");
                ipcMain.removeHandler("add-new-item");
            });
        }
      });
  

  }

}
