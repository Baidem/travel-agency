let globalTravelItem: any;

// -- UPDATE HTML CARD -- //
function updateTravelCard(globalTravelItem: any) {
    console.log("Check ! detail-item.controller.ts generateTravelCard", globalTravelItem);
    if (globalTravelItem) {
        // Constants
        const image = document.querySelector("img");
        const title = document.querySelector("#title");
        const destination = document.querySelector("#destination");
        const shortDescription = document.querySelector("#short-description");
        const longDescription = document.querySelector("#long-description");
        const price = document.querySelector("#price");

        // Text content
        image!.src = globalTravelItem.image;
        title!.textContent = globalTravelItem.title;
        destination!.textContent = globalTravelItem.destination;
        shortDescription!.textContent = globalTravelItem.shortDescription;
        longDescription!.textContent = globalTravelItem.longDescription;
        price!.textContent = `${globalTravelItem.price.toFixed(2)} €`;
    }
}

//// ** ELECTRON COMMUNICATION ** ////
// -- ONCE INIT DATA -- //
const onceInitDataDetailItemCb = (e: any, travelItem: any) => {
    console.log("Check ! init-data cb", travelItem);
    // update travel card
    globalTravelItem = travelItem;
    updateTravelCard(globalTravelItem);
}
(window as any).ipcRendererCustom.onceInitData(onceInitDataDetailItemCb); // preload

// -- ON ITEM EDITED -- //
// CALL BACK //
const onDetailItemEditedCb = (e: any, editedItem: any) => {
    console.log("check ! detail-item.controller.ts const onItemEditedCb = (e: any, editedItem: any) => {...}", editedItem.id);
    // update travel card
    globalTravelItem = editedItem;
    updateTravelCard(globalTravelItem);
}
// PRELOAD //
(window as any).ipcRendererCustom.onDetailItemEdited(onDetailItemEditedCb);


//// ** JS EVENTS ** ////
const btnEdit = document.querySelector("#btn-edit");
const btnDelete = document.querySelector("#btn-delete");

// -- SEND ASK DISPLAY EDIT ITEM FORM -- //
btnEdit!.addEventListener("click", (e) => {
    e.preventDefault();
    if (globalTravelItem){
        (window as any).ipcRendererCustom.sendAskDisplayEditItemForm(globalTravelItem.id);
    }
})

// -- INVOKE DELETEITEM -- //
btnDelete!.addEventListener("click", (e) => {
    e.preventDefault();
    if (globalTravelItem){
        // PRELOAD //
        (window as any).ipcRendererCustom.invokeDeleteItem(globalTravelItem.id, invokeDeleteItemCb);
    }
})
// CALL BACK THEN//
const invokeDeleteItemCb = (res: any) => {
    console.log("check ! detail-item.controller.ts const invokeDeleteItemCb = (res: any)");

    const divMessage = document.querySelector('#response-message')! as HTMLElement;
    divMessage.textContent = res.msg;
    divMessage.hidden = false;

    divMessage.classList.remove('alert-warning', 'alert-danger');
    res.success ? divMessage.classList.add('alert-warning') : divMessage.classList.add('alert-danger');

    if (res.success) {
        btnDelete?.remove();
        btnEdit?.remove();
    }
};