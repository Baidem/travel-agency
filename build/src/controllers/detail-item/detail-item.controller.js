"use strict";
console.log("check ! detail-item.controller.ts");
// -- GENERATE HTML CARD -- //
var generateTravelCard = function (travelItem) {
    console.log("Check ! detail-item.controller.ts generateTravelCard", travelItem);
    // Constants
    var image = document.querySelector("img");
    var title = document.querySelector("#title");
    var destination = document.querySelector("#destination");
    var shortDescription = document.querySelector("#short-description");
    var longDescription = document.querySelector("#long-description");
    var price = document.querySelector("#price");
    var btnEdit = document.querySelector("#btn-edit");
    var btnDelete = document.querySelector("#btn-delete");
    // Text content
    image.src = travelItem.image;
    title.textContent = travelItem.title;
    destination.textContent = travelItem.destination;
    shortDescription.textContent = travelItem.shortDescription;
    longDescription.textContent = travelItem.longDescription;
    price.textContent = travelItem.price;
    // events
    btnEdit.addEventListener("click", function (e) {
        e.preventDefault();
        window.ipcRendererCustom.sendAskDisplayEditItemForm(travelItem.id);
    });
    btnDelete.addEventListener("click", function (e) {
        e.preventDefault();
        //!!!!!
    });
};
//// ** ELECTRON COMMUNICATION ** ////
// ONCE INIT DATA //
var onceInitDataDetailItemCb = function (e, travelItem) {
    console.log("Check ! init-data cb", travelItem);
    // update travel card
    generateTravelCard(travelItem);
};
window.ipcRendererCustom.onceInitData(onceInitDataDetailItemCb); // preload
// -- ON ITEM EDITED -- //
// CALL BACK //
var onDetailItemEditedCb = function (e, editedItem) {
    console.log("check ! detail-item.controller.ts const onItemEditedCb = (e: any, editedItem: any) => {...}", editedItem.id);
    var image = document.querySelector('img');
    if (image)
        image.src = editedItem.image;
    var title = document.querySelector("#title");
    if (title)
        title.textContent = editedItem.title;
    var shortDescription = document.querySelector("#short-description");
    if (shortDescription)
        shortDescription.textContent = editedItem.shortDescription;
    var longDescription = document.querySelector("#long-description");
    if (longDescription)
        longDescription.textContent = editedItem.shortDescription;
    var price = document.querySelector("#price");
    if (price)
        price.textContent = "".concat(editedItem.price, " \u20AC");
};
// PRELOAD //
window.ipcRendererCustom.onDetailItemEdited(onDetailItemEditedCb);
