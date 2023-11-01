import { BrowserWindow } from "electron";
import path from "path";

export enum WindowNameMapper {
    HOME = "home",
    DETAIL_ITEM = "detail-item",
    NEW_ITEM = "new-item",
    EDIT_ITEM = "edit-item",
}

type Windows = Map<WindowNameMapper, BrowserWindow>;

// CLASS WINDOW MANAGER //
class WindowManager {

    private windows: Windows;

    constructor() {
        this.windows = new Map<WindowNameMapper, BrowserWindow>();
    }

    // METHODS //
    getWindow(windowName: WindowNameMapper): BrowserWindow {
        if (this.hasWindow(windowName)) {
            return this.windows.get(windowName) as BrowserWindow;
        }
        throw "La vue n'existe pas.";
    }
    
    addWindow(windowName: WindowNameMapper, windowToAdd: BrowserWindow): void {
        this.windows.set(windowName, windowToAdd);
    }
    
    deleteWindow(windowName: WindowNameMapper): boolean {
        if (this.hasWindow(windowName)) {
            return this.windows.delete(windowName);
        }
        throw "La vue n'existe pas.";
    }
    
    hasWindow(windowName: WindowNameMapper): boolean {
        return this.windows.has(windowName);
    }

    createWindow(templateName: WindowNameMapper, templateData?: any,
        width = 1400, height = 1200): void {

        const win = new BrowserWindow({
            width, height,
            webPreferences: {
                // on arrête d'exposer les node_modules côté front
                nodeIntegration: false,
                // on isole tout pour éviter les problèmes
                contextIsolation: true,
                // on donne à notre vue le fichier preload.js pour qu'elle expose
                // la clé et la méthode loadController
                preload: path.join(__dirname, "..", "preloads", `${templateName}.preload.js`),
            },
        });

        win
            .loadFile(path.join(__dirname, "..", "..", "src", "views", templateName, `${templateName}.html`))
            .then(() => {
                if (templateData) {
                    console.log("on send les donnees");
                    win.webContents.send("init-data", templateData);
                }
            });

        win
            .on("closed", () => {
                this.deleteWindow(templateName);
            });
        
        this.addWindow(templateName, win);
        console.log("create window " + templateName + " !!!");
    }
}

export default new WindowManager();