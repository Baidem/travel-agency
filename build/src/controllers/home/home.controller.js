"use strict";
console.log("check ! home.controller.ts");
// -- GENERATE HTML CARD -- //
var generateCard = function (travelItem) {
    // Constants
    var divCardList = document.querySelector("#card-list");
    var divCol = document.createElement("div");
    var divInter = document.createElement("div");
    var divCard = document.createElement("div");
    var img = document.createElement("img");
    var divCardBody = document.createElement("div");
    var title = document.createElement("h5");
    var destination = document.createElement("p");
    var shortDescription = document.createElement("p");
    var price = document.createElement("p");
    var btnDetail = document.createElement("button");
    // classList and args
    divCol.classList.add("col-lg-4");
    divCard.classList.add("card", "mb-3", "shadow", "bg-primary-subtle");
    ;
    img.classList.add("card-img-top");
    img.alt = "travel illustration";
    divCardBody.classList.add("card-body");
    title.classList.add("card-title");
    destination.classList.add("card-text");
    shortDescription.classList.add("card-text");
    price.classList.add("card-text");
    btnDetail.classList.add("btn", "btn-sm", "btn-outline-secondary");
    btnDetail.type = "button";
    // textContent and args from data travelItem
    img.src = travelItem.image;
    title.textContent = travelItem.title;
    shortDescription.textContent = travelItem.shortDescription;
    price.textContent = "".concat(travelItem.price, " \u20AC");
    btnDetail.textContent = "Show travel details";
    // events
    btnDetail.addEventListener("click", function () { });
    // apppend all components
    divCardBody.append(title, destination, shortDescription, price, btnDetail);
    divCard.append(img, divCardBody);
    divInter.appendChild(divCard);
    divCol.appendChild(divCard);
    divCardList === null || divCardList === void 0 ? void 0 : divCardList.appendChild(divCol);
};
//// ** ELECTRON COMMUNICATION ** ////
// ONCE INIT DATA //
var onceInitDataCb = function (e, travelItemList) {
    console.log("Check ! init-data cb", travelItemList);
    // update travel card list
    travelItemList.forEach(function (travelItem) {
        generateCard(travelItem);
    });
};
window.ipcRendererCustom.onceInitData(onceInitDataCb); // preload
// ON NEW ITEM ADDED //
var onNewItemAddedCb = function (e, travelItem) {
    generateCard(travelItem);
};
window.ipcRendererCustom.onNewItemAdded(onNewItemAddedCb); // preload
//// ** JS EVENTS ** ////
var btnAddTravel = document.querySelector(".ask-show-new-item-form");
btnAddTravel.addEventListener("click", function (e) {
    e.preventDefault();
    window.ipcRendererCustom.sendAskShowNewItemForm();
});
