"use strict";
console.log("on entre dans le controller");
//// ELECTRON COMMUNICATION ////
var onceInitDataCb = function (e, data) {
    console.log("on passe dans le cb du init-data", data);
};
window.ipcRendererCustom.onceInitData(onceInitDataCb);
