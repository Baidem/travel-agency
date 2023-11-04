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

# COMMIT N°1 : prepare home page

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

# COMMIT N°2 : Chaine de création de la page home

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
    - homeWindwow.webContents.send("new-item-added", newItem)
    - return success
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

# COMMIT N°3 : Page new travel avec mécanique

# préparation de la page edit-item

- creation de src/contoller/edit-item/edit-item.controller.ts
- creation de src/views/edit-item/neditew-item.html
- creation de app/preloads/edit-item.preload.ts

# Design de edit-item.html

- link bootstrap
- script controller
- header design
- form design

# travelItemService.ts

- getById

# Mains.ts : ouverture de la page

- ipcMain.on("ask-show-edit-item-form", ...)
  - ipcMain.handle("edit-item", ...)
    - newItemWindow.on("closed", ...)
    - return success
  - newItemWindow.on("closed", ...)

# home.controller.ts

- const btnEdit = document.createElement("button");
- btnEdit.type = "button";
- btnEdit.textContent = "Edit travel details";
- btnEdit.addEventListener("click, ...)
  - (window as any).ipcRendererCustom.sendAskShowEditItemForm(travelItem.id);
- onItemEditedCb
- (window as any).ipcRendererCustom.onItemEdited(onItemEditedCb)

# home.preload.ts

- sendAskShowEditItemForm
- onItemEdited

# edit-item.controller.ts

- onceInitDataNewItemCb= (e, itemToEdit) => {...}
- editForm.addEventListener"submit", (e) => {...}
  - dataFom
  - invoke : (window as any).ipcRendererCustom.invokeAddNewItem(...)
  
# edit-item.preload.ts

- import { contextBridge, ipcRenderer } from 'electron'
- onceInitData
- invokeEditItem

### buggs

- X ouverture de la page edit
- X auto complét de long description
- X submit fail...

# COMMIT N°4 : Page edit travel avec mécanique

# préparation de la page detail-item

- creation de src/contoller/detail-item/detail-item.controller.ts
- creation de src/views/detail-item/detail-item.html
- creation de app/preloads/detail-item.preload.ts

# Design de detail-item.html

- link bootstrap
- script controller
- header design
- details design

# detail-item.controller.ts

- generateDetailItemCard(travelItem){...} //!!!! events des boutons à faire
- onceInitDataDetailItemCb= (e, itemToEdit) => {...} //!!!! preload à faire

# home.preload.ts

- sendAskShowDetailItemForm

# home.controller.ts

- const btnDetail = document.createElement("button");
- btnDetail.type = "button";
- btnDetail.textContent = "Show travel details";
- btnDetail.addEventListener("click, ...)
  - (window as any).ipcRendererCustom.sendAskShowDetailItem(travelItem.id);

# home.preload.ts

- sendAskShowEditItem
  - ipcRenderer.send("ask-show-detail-item", id)

# detail-item.controller.ts

- onDetailItemEditedCb = (e, editedItem) => {...}
- (window as any).ipcRendererCustom.onDetailItemEdited(onDetailItemEditedCb)
- btnEdit!.addEventListener("click", (e) => {...})

# detail-item.preload.ts

- onDetailItemEdited: (cb: any) => {...}
  - ipcRenderer.on('detail-item-edited', cb);
- sendAskDisplayEditItemForm: (id: number) => {...}
  - ipcRenderer.send("ask-display-edit-item-form", id);

# Mains.ts

- ipcMain.on('ask-display-edit-item-form', (e: any, id: number) => {...})

# COMMIT N°5 : bouton edit sur la page détail fonctionne, edit submit avec mise à jour sur home et détail ok !

# detail-item.controller.ts

- btnDelete!.addEventListener("click", (e) => {...})
  - e.e.preventDefault();
  - (window as any).ipcRendererCustom.invokeDeleteItem(travelItem.id, invokeDeleteItemCb);
- const invokeDeleteItemCb = (res: any) => {...}

# detail-preload.ts

- invokeDeleteItem: (id: number, cb: any) => {...}
  - ipcRenderer
            .invoke('delete-item', id)
            .then(cb)

# Main.ts

- ipcMain.handle('delete-item', (e: any, id: number) => {...})

# home.preload.ts

- onItemDeleted: (cb: any) => {...}
  - ipcRenderer.on("item-deleted", cb);
  
# home.controller.ts

- onItemDeletedCb
- (window as any).ipcRendererCustom.onItemDeleted(onItemDeletedCb);

# COMMIT N°6 : Break point

# Chaine de suppression d'un élément

* bouton delete : detail-item.html id="btn-delete"
* detail-item.controller.ts : btnDelete!.addEventListener("click", (e) => {...})
* detail-item.preload.ts: invokeDeleteItem(globalTravelItem.id, invokeDeleteItemCb)
* Mains.ts : ipcMain.handle('delete-item', ...)
  * homeWindow.webContents.send('item-deleted', id)
    * home.preload.ts : onItemDeleted: (cb: any) => {...}
    * then : home.controller.ts : onItemDeletedCb : colMain!.remove();
  * return success bool et message
* detail-item.preload.ts : invokeDeleteItem : then(cb)
* detail-item.controller.ts : invokeDeleteItemCb : rendu du message et supp btns

# COMMIT N°7 : ALL FEATURES

- design
- commentaires

# COMMIT N°8 : Version dev

- clean code

# COMMIT N°9 : Version delivery