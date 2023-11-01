"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowNameMapper = void 0;
var electron_1 = require("electron");
var path_1 = __importDefault(require("path"));
var WindowNameMapper;
(function (WindowNameMapper) {
    WindowNameMapper["HOME"] = "home";
    WindowNameMapper["DETAIL_ITEM"] = "detail-item";
    WindowNameMapper["NEW_ITEM"] = "new-item";
    WindowNameMapper["EDIT_ITEM"] = "edit-item";
})(WindowNameMapper || (exports.WindowNameMapper = WindowNameMapper = {}));
// CLASS WINDOW MANAGER //
var WindowManager = /** @class */ (function () {
    function WindowManager() {
        this.windows = new Map();
    }
    // METHODS //
    WindowManager.prototype.getWindow = function (windowName) {
        if (this.hasWindow(windowName)) {
            return this.windows.get(windowName);
        }
        throw "La vue n'existe pas.";
    };
    WindowManager.prototype.addWindow = function (windowName, windowToAdd) {
        this.windows.set(windowName, windowToAdd);
    };
    WindowManager.prototype.deleteWindow = function (windowName) {
        if (this.hasWindow(windowName)) {
            return this.windows.delete(windowName);
        }
        throw "La vue n'existe pas.";
    };
    WindowManager.prototype.hasWindow = function (windowName) {
        return this.windows.has(windowName);
    };
    WindowManager.prototype.createWindow = function (templateName, templateData, width, height) {
        var _this = this;
        if (width === void 0) { width = 1400; }
        if (height === void 0) { height = 1200; }
        var win = new electron_1.BrowserWindow({
            width: width,
            height: height,
            webPreferences: {
                // on arrête d'exposer les node_modules côté front
                nodeIntegration: false,
                // on isole tout pour éviter les problèmes
                contextIsolation: true,
                // on donne à notre vue le fichier preload.js pour qu'elle expose
                // la clé et la méthode loadController
                preload: path_1.default.join(__dirname, "..", "preloads", "".concat(templateName, ".preload.js")),
            },
        });
        win
            .loadFile(path_1.default.join(__dirname, "..", "..", "src", "views", templateName, "".concat(templateName, ".html")))
            .then(function () {
            if (templateData) {
                console.log("check ! windowManager win.webContents.send(\"init-data\", " + templateName);
                win.webContents.send("init-data", templateData);
            }
        });
        win
            .on("closed", function () {
            _this.deleteWindow(templateName);
        });
        this.addWindow(templateName, win);
        console.log("check ! WindowManager createWindow(...) template: " + templateName);
    };
    return WindowManager;
}());
exports.default = new WindowManager();
