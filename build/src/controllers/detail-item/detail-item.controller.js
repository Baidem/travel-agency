"use strict";
console.log("check ! detail-item.controller.ts");
var globalTravelItem;
// -- UPDATE HTML CARD -- //
function updateTravelCard(globalTravelItem) {
    console.log("Check ! detail-item.controller.ts generateTravelCard", globalTravelItem);
    if (globalTravelItem) {
        // Constants
        var image = document.querySelector("img");
        var title = document.querySelector("#title");
        var destination = document.querySelector("#destination");
        var shortDescription = document.querySelector("#short-description");
        var longDescription = document.querySelector("#long-description");
        var price = document.querySelector("#price");
        // Text content
        image.src = globalTravelItem.image;
        title.textContent = globalTravelItem.title;
        destination.textContent = globalTravelItem.destination;
        shortDescription.textContent = globalTravelItem.shortDescription;
        longDescription.textContent = globalTravelItem.longDescription;
        price.textContent = "".concat(globalTravelItem.price, " \u20AC");
    }
}
//// ** ELECTRON COMMUNICATION ** ////
// -- ONCE INIT DATA -- //
var onceInitDataDetailItemCb = function (e, travelItem) {
    console.log("Check ! init-data cb", travelItem);
    // update travel card
    globalTravelItem = travelItem;
    updateTravelCard(globalTravelItem);
};
window.ipcRendererCustom.onceInitData(onceInitDataDetailItemCb); // preload
// -- ON ITEM EDITED -- //
// CALL BACK //
var onDetailItemEditedCb = function (e, editedItem) {
    console.log("check ! detail-item.controller.ts const onItemEditedCb = (e: any, editedItem: any) => {...}", editedItem.id);
    // update travel card
    globalTravelItem = editedItem;
    updateTravelCard(globalTravelItem);
};
// PRELOAD //
window.ipcRendererCustom.onDetailItemEdited(onDetailItemEditedCb);
//// ** JS EVENTS ** ////
var btnEdit = document.querySelector("#btn-edit");
var btnDelete = document.querySelector("#btn-delete");
// -- SEND ASK DISPLAY EDIT ITEM FORM -- //
btnEdit.addEventListener("click", function (e) {
    e.preventDefault();
    if (globalTravelItem) {
        window.ipcRendererCustom.sendAskDisplayEditItemForm(globalTravelItem.id);
    }
});
// -- INVOKE DELETEITEM -- //
btnDelete.addEventListener("click", function (e) {
    e.preventDefault();
    if (globalTravelItem) {
        // PRELOAD //
        window.ipcRendererCustom.invokeDeleteItem(globalTravelItem.id, invokeDeleteItemCb);
    }
});
// CALL BACK //
var invokeDeleteItemCb = function (res) {
    var divMessage = document.querySelector('#response-message');
    divMessage.textContent = res.msg;
    divMessage.hidden = false;
    divMessage.classList.remove('alert-success', 'alert-danger');
    res.success ? divMessage.classList.add('alert-warning') : divMessage.classList.add('alert-danger');
};
