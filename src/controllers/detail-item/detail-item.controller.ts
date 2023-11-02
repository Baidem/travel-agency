console.log("check ! detail-item.controller.ts");

// -- GENERATE HTML CARD -- //
const generateTravelCard = (travelItem: any) => {
    console.log("Check ! detail-item.controller.ts generateTravelCard", travelItem);
    
    // Constants
    const image = document.querySelector("img");
    const title = document.querySelector("#title");
    const destination = document.querySelector("#destination");
    const shortDescription = document.querySelector("#short-description");
    const longDescription = document.querySelector("#long-description");
    const price = document.querySelector("#price");
    const btnEdit = document.querySelector("#btn-edit");
    const btnDelete = document.querySelector("#btn-delete");
    
    // Text content
    image!.src = travelItem.image;
    title!.textContent = travelItem.title;
    destination!.textContent = travelItem.destination;
    shortDescription!.textContent = travelItem.shortDescription;
    longDescription!.textContent = travelItem.longDescription;
    price!.textContent = travelItem.price;

    // events
    btnEdit!.addEventListener("click", (e) => {
        e.preventDefault();
        (window as any).ipcRendererCustom.sendAskDisplayEditItemForm(travelItem.id);
    })
    btnDelete!.addEventListener("click", (e) => {
        e.preventDefault();
        //!!!!!
    })
}

//// ** ELECTRON COMMUNICATION ** ////
// ONCE INIT DATA //
const onceInitDataDetailItemCb = (e: any, travelItem: any) => {
    console.log("Check ! init-data cb", travelItem);
    // update travel card
    generateTravelCard(travelItem);
}
(window as any).ipcRendererCustom.onceInitData(onceInitDataDetailItemCb); // preload

// -- ON ITEM EDITED -- //
// CALL BACK //
const onDetailItemEditedCb = (e: any, editedItem: any) => {
    console.log("check ! detail-item.controller.ts const onItemEditedCb = (e: any, editedItem: any) => {...}", editedItem.id);
    
    const image = document.querySelector('img');
    if(image) image.src = editedItem.image;

    const title = document.querySelector("#title");
    if(title) title.textContent = editedItem.title;

    const shortDescription = document.querySelector("#short-description")
    if(shortDescription) shortDescription.textContent = editedItem.shortDescription;

    const longDescription = document.querySelector("#long-description")
    if(longDescription) longDescription.textContent = editedItem.shortDescription;

    const price = document.querySelector("#price")
    if(price) price.textContent = `${editedItem.price} €`;
}
// PRELOAD //
(window as any).ipcRendererCustom.onDetailItemEdited(onDetailItemEditedCb);

