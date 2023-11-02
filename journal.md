# Installation :

- electron
- bootstap
- fontawesome

# .gitignore

- electron
- typeScript

# GitHub

- uploaded

# package.json

- main
- scripts : prepare-windows, prepare-linux, start

# tsconfig.json

- /tsconfig.json

# Architecture

- app : core, models, preloads, services
- src : controllers, views

# main.ts

- main.ts : import class Main.ts
- core/Main.ts :
  - import app, App
  - constructor
  - initDefaultListeners
  - generateMainWindow : vide

# WindowManager.ts

- core/WindowManager.ts :
  - enum WindowNameMapper : home, detail-item, new-item, edit-item
  - type Windows
  
  - CLASSE WindowManager
    - prop et constructeur
    - METHODES : 
      - getWindow, addWindow, deleteWindow, hasWindow, createWindow
    - win.loadFile(...).then(...)
    - win.on("closed", ()=>{...})
    - this.addWindow(...)

- singleton : export default new WindowManager();

# src

- création : src/controller/home/home.controller.ts
- création : src/views/home/home.html

# Main.ts

- import :  windowManager, WindowNameMapper
- generateMainWindow()
  - windowManager.createWindow(...)

# models/travel-item.model.ts

- interface
- namespase
  - generateFakeData()
  
# home.html creation

- link bootstrap
- h1
- script controller

# services

-services/travel-item.service.ts
  - getAll, getAllById, insert, update, delete
  - singleton : export default new travelItemService();

# controllers

- creation : src/controller/home.controller.ts
- test communication avec la vue

# Commit N°1 : prepare home page

# Design home page

- home.html : modèle html des cards
- home.controller.ts : generateCard(...) = modèle js des cards

# CHAINE DE CREATION DE LA HOME PAGE ET DE SES DATA: 

-> Mains.ts 
-> constructor() 
-> this.initDefaultListeners(); 
-> this.app.whenReady().then(...) 
-> generateMainWindow()
-> WindowManager.ts 
-> createWindow(templateName, templateData) 
-> win.loadFile(...)
  .then(()=>{... win.webcontents.send(
    "init-data",
    travelItemService.getAll()
  )}); 
-> home.preload.ts 
-> onceInitData(cb) 
-> home.controller.ts
-> (window as any).ipcRendererCustom.onceInitData(onceInitDataCb);
-> onceInitDataCb = ((...)=>{...})
-> generateCard(travelItemList)

# Commit N°2 : Chaine de création de la page home

# Preparation à la page new-item

- creation de src/contoller/new-item/new-item.controller.ts
- creation de src/views/new-item/new-item.html
- creation de app/preloads/new-item.preload.ts

# Design de new-item.html

- link bootstrap
- script controller
- header design
- form design

# Mains.ts : ouverture de la page

- import ipcMain from "electron"
- ipcMain.on("ask-show-new-item-form", ...)
  - ipcMain.handle("add-new-item", ...)
  - newItemWindow.on("closed", ...)
  - newItemWindow.on("closed", ...)

# home.controller.ts

- btnAddTravel!.addEventListener("click, ...)
- (window as any).ipcRendererCustom.onNewItemAdded(onNewItemAddedCb);

# home.preload.ts

- sendAskShowNewItemForm
- onNewItemAdded

# new-item.preload.ts

- onceInitData
- invokeAddNewItem

# new-item.controller.ts

- onceInitDataNewItemCb : inutile pour le moment mais pourra servir si évolution
- form.addEventListener"submit", (e) => {...}
  - (window as any).ipcRendererCustom.invokeAddNewItem(...)

# Commit N°3 : Page new travel avec mécanique


