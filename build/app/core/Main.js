"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var WindowManager_1 = __importStar(require("./WindowManager"));
var travel_item_service_1 = __importDefault(require("../services/travel-item.service"));
var Main = /** @class */ (function () {
    function Main() {
        this.app = electron_1.app;
        this.initDefaultListeners();
    }
    // ** INIT APPLICATION ** //
    Main.prototype.initDefaultListeners = function () {
        var _this = this;
        this.app.whenReady().then(function () {
            console.log("Check! Main.ts initDefaultListeners, app.whenReady");
            _this.generateMainWindow();
        });
        // Fix darwin closed main window
        this.app.on("activate", function () {
            if (electron_1.BrowserWindow.getAllWindows().length === 0 && process.platform === "darwin") {
                _this.generateMainWindow();
            }
        });
        this.app.on("window-all-closed", function () {
            if (process.platform !== "darwin") {
                electron_1.app.quit();
            }
        });
    };
    // ** GENERATE MAIN WINDOW ** //
    Main.prototype.generateMainWindow = function () {
        var travelItems = travel_item_service_1.default.getAll();
        // HOME PAGE CREATE //
        WindowManager_1.default.createWindow(WindowManager_1.WindowNameMapper.HOME, travelItems);
        // !! HERE WINDOWS EVENTS !! //
        // ASK SHOW NEW ITEM FORM //
        electron_1.ipcMain.on("ask-show-new-item-form", function (e, type) {
            console.log("Check! new-item.controller.ts ipcMain.on('ask-show-new-item-form', ...)");
            if (WindowManager_1.default.hasWindow(WindowManager_1.WindowNameMapper.NEW_ITEM)) {
                WindowManager_1.default.getWindow(WindowManager_1.WindowNameMapper.NEW_ITEM).show();
            }
            else {
                WindowManager_1.default.createWindow(WindowManager_1.WindowNameMapper.NEW_ITEM, type, 600, 840);
                var newItemWindow = WindowManager_1.default.getWindow(WindowManager_1.WindowNameMapper.NEW_ITEM);
                // ** HANDLE ADD NEW-ITEM ** //
                electron_1.ipcMain.handle("add-new-item", function (e, newItem) {
                    console.log("Check! ipcMain.handle('add-new-item', ...)", newItem.id);
                    var travelItemList = travel_item_service_1.default.getAll();
                    newItem.id = travelItemList.length > 0 ? travelItemList[travelItemList.length - 1].id + 1 : 1;
                    console.log("newItem.id", newItem.id);
                    // INSERT NEW ITEM //
                    travel_item_service_1.default.insert(newItem);
                    // SEND NEW-ITEM-ADDED TO HOME WINDOW OR CREATE A NEW ONE //
                    if (WindowManager_1.default.hasWindow(WindowManager_1.WindowNameMapper.HOME)) {
                        var homeWindow = WindowManager_1.default.getWindow(WindowManager_1.WindowNameMapper.HOME);
                        homeWindow.webContents.send("new-item-added", newItem);
                    }
                    else {
                        var travelItemList_1 = travel_item_service_1.default.getAll();
                        WindowManager_1.default.createWindow(WindowManager_1.WindowNameMapper.HOME, travelItemList_1);
                    }
                    // RETURN SUCCESS AND MESSAGE //
                    return {
                        success: true,
                        msg: "The new travel has been added successfully",
                    };
                });
                // ON CLOSED REMOVE HANDLER //
                newItemWindow.on('closed', function () {
                    electron_1.ipcMain.removeHandler('add-new-item');
                });
            }
        });
        // ** ASK SHOW EDIT-ITEM ** //
        electron_1.ipcMain.on('ask-show-edit-item-form', function (e, id) {
            console.log("Check! ipcMain.on('ask-show-edit-item-form', ...)", id);
            if (WindowManager_1.default.hasWindow(WindowManager_1.WindowNameMapper.EDIT_ITEM)) {
                WindowManager_1.default.getWindow(WindowManager_1.WindowNameMapper.EDIT_ITEM).show();
            }
            else {
                var itemToEdit = travel_item_service_1.default.getById(id);
                console.log("itemToEdit", itemToEdit);
                if (!itemToEdit) {
                    console.log("Item does not exist");
                    throw "Item does not exist";
                }
                WindowManager_1.default.createWindow(WindowManager_1.WindowNameMapper.EDIT_ITEM, itemToEdit, 600, 840);
                var editWindow = WindowManager_1.default.getWindow(WindowManager_1.WindowNameMapper.EDIT_ITEM);
                // HANDLE EDIT-ITEM //
                electron_1.ipcMain.handle('edit-item', function (e, editedItem) {
                    console.log("Check! ipcMain.handle('edit-item', ...)", editedItem.id);
                    // Update travel list
                    travel_item_service_1.default.update(editedItem);
                    // SEND ITEM-EDITED TO HOME WINDOW OR CREATE A NEW ONE //
                    if (WindowManager_1.default.hasWindow(WindowManager_1.WindowNameMapper.HOME)) {
                        var homeWindow = WindowManager_1.default.getWindow(WindowManager_1.WindowNameMapper.HOME);
                        homeWindow.webContents.send('item-edited', editedItem);
                    }
                    else {
                        var travelItemList = travel_item_service_1.default.getAll();
                        WindowManager_1.default.createWindow(WindowManager_1.WindowNameMapper.HOME, travelItemList);
                    }
                    // SEND ITEM-EDITED TO DETAIL WINDOW OR CREATE A NEW ONE //
                    if (WindowManager_1.default.hasWindow(WindowManager_1.WindowNameMapper.DETAIL_ITEM)) {
                        var detailWindow = WindowManager_1.default.getWindow(WindowManager_1.WindowNameMapper.DETAIL_ITEM);
                        detailWindow.webContents.send('detail-item-edited', editedItem);
                    }
                    else {
                        var travelItemList = travel_item_service_1.default.getAll();
                        WindowManager_1.default.createWindow(WindowManager_1.WindowNameMapper.DETAIL_ITEM, editedItem);
                    }
                    // RETURN SUCCESS AND MESSAGE //
                    return {
                        success: true,
                        msg: 'The change was made successfully.'
                    };
                });
                // ON CLOSED REMOVE HANDLER //
                editWindow.on('closed', function () {
                    electron_1.ipcMain.removeHandler('edit-item');
                });
            }
        });
        // ** ASK DISPLAY EDIT-ITEM ** //
        electron_1.ipcMain.on('ask-display-edit-item-form', function (e, id) {
            console.log("Check! ipcMain.on('ask-display-edit-item-form', ...)", id);
            if (WindowManager_1.default.hasWindow(WindowManager_1.WindowNameMapper.EDIT_ITEM)) {
                WindowManager_1.default.getWindow(WindowManager_1.WindowNameMapper.EDIT_ITEM).show();
            }
            else {
                var itemToEdit = travel_item_service_1.default.getById(id);
                console.log("itemToEdit", itemToEdit);
                if (!itemToEdit) {
                    console.log("Item does not exist");
                    throw "Item does not exist";
                }
                WindowManager_1.default.createWindow(WindowManager_1.WindowNameMapper.EDIT_ITEM, itemToEdit, 600, 840);
                var editWindow = WindowManager_1.default.getWindow(WindowManager_1.WindowNameMapper.EDIT_ITEM);
                // HANDLE EDIT-ITEM //
                electron_1.ipcMain.handle('edit-item', function (e, editedItem) {
                    console.log("Check! ipcMain.handle('edit-item', ...)", editedItem.id);
                    // Update travel list
                    travel_item_service_1.default.update(editedItem);
                    // SEND ITEM-EDITED TO HOME WINDOW OR CREATE A NEW ONE //
                    if (WindowManager_1.default.hasWindow(WindowManager_1.WindowNameMapper.HOME)) {
                        var homeWindow = WindowManager_1.default.getWindow(WindowManager_1.WindowNameMapper.HOME);
                        homeWindow.webContents.send('item-edited', editedItem);
                    }
                    else {
                        var travelItemList = travel_item_service_1.default.getAll();
                        WindowManager_1.default.createWindow(WindowManager_1.WindowNameMapper.HOME, travelItemList);
                    }
                    // SEND ITEM-EDITED TO DETAIL WINDOW OR CREATE A NEW ONE //
                    if (WindowManager_1.default.hasWindow(WindowManager_1.WindowNameMapper.DETAIL_ITEM)) {
                        var detailWindow = WindowManager_1.default.getWindow(WindowManager_1.WindowNameMapper.DETAIL_ITEM);
                        detailWindow.webContents.send('detail-item-edited', editedItem);
                    }
                    else {
                        var travelItemList = travel_item_service_1.default.getAll();
                        WindowManager_1.default.createWindow(WindowManager_1.WindowNameMapper.DETAIL_ITEM, editedItem);
                    }
                    // RETURN SUCCESS AND MESSAGE //
                    return {
                        success: true,
                        msg: 'The change was made successfully.'
                    };
                });
                // ON CLOSED REMOVE HANDLER //
                editWindow.on('closed', function () {
                    electron_1.ipcMain.removeHandler('edit-item');
                });
            }
        });
        // ** ASK SHOW DETAIL ITEM ** //
        electron_1.ipcMain.on('ask-show-detail-item', function (e, id) {
            console.log("Check! ipcMain.on('ask-show-detail-item', ...)", id);
            if (WindowManager_1.default.hasWindow(WindowManager_1.WindowNameMapper.DETAIL_ITEM)) {
                WindowManager_1.default.getWindow(WindowManager_1.WindowNameMapper.DETAIL_ITEM).show();
            }
            else {
                var travelItem = travel_item_service_1.default.getById(id);
                console.log("travelItem", travelItem);
                if (!travelItem) {
                    console.log("Item does not exist");
                    throw "Item does not exist";
                }
                WindowManager_1.default.createWindow(WindowManager_1.WindowNameMapper.DETAIL_ITEM, travelItem, 1000, 600);
                var detailWindow = WindowManager_1.default.getWindow(WindowManager_1.WindowNameMapper.DETAIL_ITEM);
                // HANDLE EDIT-ITEM //
                // ipcMain.handle('edit-item', (e: any, editedItem: any) => {
                //     console.log("Check! ipcMain.handle('edit-item', ...)", editedItem.id);
                //     // Update travel list
                //     travelItemService.update(editedItem);
                //     // SEND ITEM-EDITED TO HOME WINDOW OR CREATE A NEW ONE //
                //     if (windowManager.hasWindow(WindowNameMapper.HOME)) {
                //         const homeWindow = windowManager.getWindow(WindowNameMapper.HOME);
                //         homeWindow.webContents.send('item-edited', editedItem);
                //     } else {
                //         const travelItemList = travelItemService.getAll();
                //         windowManager.createWindow(WindowNameMapper.HOME, travelItemList);
                //     }
                //     // RETURN SUCCESS AND MESSAGE //
                //     return {
                //         success: true,
                //         msg: 'The change was made successfully.'
                //     };
                // });
                // // ON CLOSED //
                // detailWindow.on('closed', () => {
                //     ipcMain.removeHandler('edit-item');
                // });
            }
        });
    };
    return Main;
}());
exports.default = Main;
