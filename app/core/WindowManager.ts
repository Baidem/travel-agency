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
        throw "The view doesn't exist.";
    }
    
    addWindow(windowName: WindowNameMapper, windowToAdd: BrowserWindow): void {
        this.windows.set(windowName, windowToAdd);
    }
    
    deleteWindow(windowName: WindowNameMapper): boolean {
        if (this.hasWindow(windowName)) {
            return this.windows.delete(windowName);
        }
        throw "The view doesn't exist.";
    }
    
    hasWindow(windowName: WindowNameMapper): boolean {
        return this.windows.has(windowName);
    }

    createWindow(templateName: WindowNameMapper, templateData?: any,
        width = 1450, height = 1200): void {

        const win = new BrowserWindow({
            width, height,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: path.join(__dirname, "..", "preloads", `${templateName}.preload.js`),
            },
        });

        win
            .loadFile(path.join(__dirname, "..", "..", "src", "views", templateName, `${templateName}.html`))
            .then(() => {
                if (templateData) {
                    win.webContents.send("init-data", templateData);
                }
            });

        win
            .on("closed", () => {
                this.deleteWindow(templateName);
            });
        
        this.addWindow(templateName, win);
    }
}

export default new WindowManager();