"use strict";
var itemToEditGlobal = undefined;
// ** ONCE INIT DATA EDIT ITEM ** //
// CALL BACK //
var onceInitDataEditItemCb = function (e, itemToEdit) {
    var imageUrlInput = document.getElementById('imageUrlInput');
    imageUrlInput.value = itemToEdit.image;
    var titleInput = document.getElementById('titleInput');
    titleInput.value = itemToEdit.title;
    var destinationInput = document.getElementById('destinationInput');
    destinationInput.value = itemToEdit.destination;
    var shortDescriptionInput = document.getElementById('shortDescriptionInput');
    shortDescriptionInput.value = itemToEdit.shortDescription;
    var longDescriptionInput = document.getElementById('longDescriptionInput');
    longDescriptionInput.value = itemToEdit.longDescription;
    var priceInput = document.getElementById('priceInput');
    priceInput.value = itemToEdit.price.toString();
    itemToEditGlobal = itemToEdit;
};
// PRELOAD //
window.ipcRendererCustom.onceInitData(onceInitDataEditItemCb);
// ** FORM SUBMIT EVENT ** //
var editForm = document.getElementById('edit-item-form');
editForm.addEventListener('submit', function (e) {
    console.log("check ! travel-item.controller.ts editForm.addEventListener('submit', ...)");
    e.preventDefault();
    var dataForm = new FormData(e.target);
    itemToEditGlobal.image = dataForm.get('image');
    itemToEditGlobal.title = dataForm.get('title');
    itemToEditGlobal.destination = dataForm.get('destination');
    itemToEditGlobal.shortDescription = dataForm.get('shortDescription');
    itemToEditGlobal.longDescription = dataForm.get('longDescription');
    itemToEditGlobal.price = parseFloat(dataForm.get('price'));
    // INVOKE EDIT ITEM //
    window.ipcRendererCustom.invokeEditItem(itemToEditGlobal, function (res) {
        var divMessage = document.querySelector('#response-message');
        divMessage.textContent = res.msg;
        divMessage.hidden = false;
        divMessage.classList.remove('alert-success', 'alert-danger');
        res.success ? divMessage.classList.add('alert-success') : divMessage.classList.add('alert-danger');
    });
});
