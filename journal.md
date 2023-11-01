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



