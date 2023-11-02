"use strict";
// ONCE INIT DATA NEW-ITEM CALL BACK //
var onceInitDataNewItemCb = function (e) {
    console.log("check ! new-item.controller.ts onceInitDataNewItemCb");
};
window.ipcRendererCustom.onceInitData(onceInitDataNewItemCb);
// FORM EVENT SUBMIT //
var form = document.querySelector("form");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var dataForm = new FormData(e.target);
    var newTravelItem = {
        image: dataForm.get("image"),
        title: dataForm.get("title"),
        destination: dataForm.get("destination"),
        shortDescription: dataForm.get("shortDescription"),
        longDescription: dataForm.get("longDescription"),
        price: parseFloat(dataForm.get("price")),
    };
    // INVOKE ADD NEW ITEM
    window.ipcRendererCustom.invokeAddNewItem(newTravelItem, function (res) {
        var divMessage = document.querySelector("#response-message");
        divMessage.textContent = res.msg;
        divMessage.hidden = false;
        divMessage.classList.remove("alert-sucess", "alert-danger");
        res.success
            ? divMessage.classList.add("alert-success")
            : divMessage.classList.add("alert-danger");
    });
});
