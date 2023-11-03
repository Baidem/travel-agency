"use strict";
console.log("check ! home.controller.ts");
// -- GENERATE HTML CARD -- //
var generateCard = function (travelItem) {
    // Constants
    var divCardList = document.querySelector("#card-list");
    var divColMain = document.createElement("div");
    var divInter = document.createElement("div");
    var divCard = document.createElement("div");
    var divCardBody = document.createElement("div");
    var img = document.createElement("img");
    var title = document.createElement("h5");
    var destination = document.createElement("p");
    var shortDescription = document.createElement("p");
    var price = document.createElement("p");
    var btnDetail = document.createElement("button");
    var btnEdit = document.createElement("button");
    // classList and args
    divColMain.classList.add("item-col-main", "col-lg-4");
    divCard.classList.add("card", "mb-3", "shadow", "bg-primary-subtle");
    ;
    img.classList.add("item-img", "card-img-top");
    img.alt = "travel illustration";
    divCardBody.classList.add("card-body");
    title.classList.add("item-title", "card-title");
    destination.classList.add("item-destination", "card-text");
    shortDescription.classList.add("item-short-description", "card-text");
    price.classList.add("item-price", "card-text");
    btnDetail.classList.add("btn", "btn-sm", "btn-outline-secondary", "me-2");
    btnDetail.type = "button";
    btnEdit.classList.add("btn", "btn-sm", "btn-outline-secondary", "me-2");
    btnEdit.type = "button";
    // textContent and args from data travelItem
    img.src = travelItem.image;
    title.textContent = travelItem.title;
    shortDescription.textContent = travelItem.shortDescription;
    price.textContent = "".concat(travelItem.price, " \u20AC");
    btnDetail.textContent = "Show travel details";
    btnEdit.textContent = "Edit travel details";
    // data-set
    divColMain.dataset.id = travelItem.id;
    img.dataset.id = travelItem.id;
    title.dataset.id = travelItem.id;
    destination.dataset.id = travelItem.id;
    shortDescription.dataset.id = travelItem.id;
    price.dataset.id = travelItem.id;
    // events
    btnDetail.addEventListener("click", function (e) {
        e.preventDefault();
        window.ipcRendererCustom.sendAskShowDetailItem(travelItem.id);
    });
    btnEdit.addEventListener("click", function (e) {
        e.preventDefault();
        window.ipcRendererCustom.sendAskShowEditItemForm(travelItem.id);
    });
    // apppend all components
    divCardBody.append(title, destination, shortDescription, price, btnDetail, btnEdit);
    divCard.append(img, divCardBody);
    divInter.appendChild(divCard);
    divColMain.appendChild(divCard);
    divCardList === null || divCardList === void 0 ? void 0 : divCardList.appendChild(divColMain);
};
//// ** ELECTRON COMMUNICATION ** ////
// -- ONCE INIT DATA -- //
// CALL BACK //
var onceInitDataCb = function (e, travelItemList) {
    console.log("Check ! init-data cb", travelItemList);
    // update travel card list
    travelItemList.forEach(function (travelItem) {
        generateCard(travelItem);
    });
};
// PRELOAD //
window.ipcRendererCustom.onceInitData(onceInitDataCb);
// -- ON NEW ITEM ADDED -- //
// CALL BACK //
var onNewItemAddedCb = function (e, travelItem) {
    generateCard(travelItem);
};
// PRELOAD //
window.ipcRendererCustom.onNewItemAdded(onNewItemAddedCb);
// -- ON ITEM DELETED -- //
// CALL BACK //
var onItemDeletedCb = function (e, id) {
    var colMain = document.querySelector(".item-col-main[data-id='".concat(id, "']"));
    colMain === null || colMain === void 0 ? void 0 : colMain.remove;
};
// PRELOAD //
window.ipcRendererCustom.onItemDeleted(onItemDeletedCb);
// -- ON ITEM EDITED -- //
// CALL BACK //
var onItemEditedCb = function (e, editedItem) {
    console.log("check ! home.controller.ts const onItemEditedCb = (e: any, editedItem: any) => {...}", editedItem.id);
    var image = document.querySelector(".item-img[data-id='".concat(editedItem.id, "']"));
    if (image)
        image.src = editedItem.image;
    var title = document.querySelector(".item-title[data-id='".concat(editedItem.id, "']"));
    if (title)
        title.textContent = editedItem.title;
    var destination = document.querySelector(".item-destination[data-id='".concat(editedItem.id, "']"));
    if (destination)
        destination.textContent = editedItem.destination;
    var shortDescription = document.querySelector(".iteitem-short-description[data-id='".concat(editedItem.id, "']"));
    if (shortDescription)
        shortDescription.textContent = editedItem.shortDescription;
    var price = document.querySelector(".item-price[data-id='".concat(editedItem.id, "']"));
    if (price)
        price.textContent = "".concat(editedItem.price, " \u20AC");
};
// PRELOAD //
window.ipcRendererCustom.onItemEdited(onItemEditedCb);
//// ** JS EVENTS ** ////
var btnAddTravel = document.querySelector(".ask-show-new-item-form");
btnAddTravel.addEventListener("click", function (e) {
    e.preventDefault();
    window.ipcRendererCustom.sendAskShowNewItemForm();
});
