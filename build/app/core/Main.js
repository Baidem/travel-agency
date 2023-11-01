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
    // INIT APPLICATION //
    Main.prototype.initDefaultListeners = function () {
        var _this = this;
        this.app.whenReady().then(function () {
            console.log("check ! Main.ts initDefaultListeners, app.whenReady");
            _this.generateMainWindow();
        });
        // Fix darwin closed main window
        this.app.on("activate", function () {
            if (electron_1.BrowserWindow.length === 0 && process.platform === "darwin") {
                _this.generateMainWindow();
            }
        });
        this.app.on("window-all-closed", function () {
            if (process.platform !== "darwin") {
                electron_1.app.quit();
            }
        });
    };
    // GENERATE MAIN WINDOW //
    Main.prototype.generateMainWindow = function () {
        var travelItems = travel_item_service_1.default.getAll();
        // HOME PAGE CREATE
        WindowManager_1.default.createWindow(WindowManager_1.WindowNameMapper.HOME, travelItems);
        // HERE WINDOWS EVENTS
    };
    return Main;
}());
exports.default = Main;
