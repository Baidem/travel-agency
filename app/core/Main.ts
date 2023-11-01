import { BrowserWindow, app } from "electron";
import App = Electron.App;
import windowManager, { WindowNameMapper } from "./WindowManager";
import travelItemService from "../services/travel-item.service";


export default class Main {
    private app: App;

    constructor() {
        this.app = app;
        this.initDefaultListeners();
    }

    // INIT APPLICATION //
    private initDefaultListeners(): void {
    
        this.app.whenReady().then(() => {
            console.log("app ready !!!");
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

    // GENERATE MAIN WINDOW //
    private generateMainWindow(): void {

    const travelItems = travelItemService.getAll();
   
    // HOME PAGE CREATE
    windowManager.createWindow(WindowNameMapper.HOME, travelItems);

    // HERE WINDOWS EVENTS

  }

}
