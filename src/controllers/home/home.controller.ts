console.log("check ! home.controller.ts");

// -- GENERATE HTML CARD -- //
const generateCard = (travelItem: any) => {

    // Constants
    const divCardList = document.querySelector("#card-list");
    const divCol = document.createElement("div");
    const divInter = document.createElement("div");
    const divCard = document.createElement("div");
    const divCardBody = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("h5");
    const destination = document.createElement("p");
    const shortDescription = document.createElement("p");
    const price = document.createElement("p");
    const btnDetail = document.createElement("button");
    const btnEdit = document.createElement("button");

    // classList and args
    divCol.classList.add("col-lg-4");
    divCard.classList.add("card", "mb-3", "shadow", "bg-primary-subtle");;
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
    price.textContent = `${travelItem.price} €`;
    btnDetail.textContent = "Show travel details";
    btnEdit.textContent = "Edit travel details";

    // data-set
    img.dataset.id = travelItem.id;
    title.dataset.id = travelItem.id;
    destination.dataset.id = travelItem.id;
    shortDescription.dataset.id = travelItem.id;
    price.dataset.id = travelItem.id;

    // events
    btnDetail.addEventListener("click", (e) => {
        e.preventDefault();
        (window as any).ipcRendererCustom.sendAskShowDetailItem(travelItem.id);
    })
    btnEdit.addEventListener("click", (e) => {
        e.preventDefault();
        (window as any).ipcRendererCustom.sendAskShowEditItemForm(travelItem.id);
    })

    // apppend all components
    divCardBody.append(title, destination, shortDescription, price, btnDetail, btnEdit);
    divCard.append(img, divCardBody);
    divInter.appendChild(divCard);
    divCol.appendChild(divCard);
    divCardList?.appendChild(divCol);
}

//// ** ELECTRON COMMUNICATION ** ////
// ONCE INIT DATA //
const onceInitDataCb = (e: any, travelItemList: any) => {
    console.log("Check ! init-data cb", travelItemList);
    // update travel card list
    travelItemList.forEach((travelItem: any) => {
        generateCard(travelItem);
      });
}
(window as any).ipcRendererCustom.onceInitData(onceInitDataCb); // preload

// -- ON NEW ITEM ADDED -- //
const onNewItemAddedCb = (e: any, travelItem: any) => {
    generateCard(travelItem);
}
(window as any).ipcRendererCustom.onNewItemAdded(onNewItemAddedCb); // preload

// -- ON ITEM EDITED -- //
// CALL BACK //
const onItemEditedCb = (e: any, editedItem: any) => {
    console.log("check ! home.controller.ts const onItemEditedCb = (e: any, editedItem: any) => {...}", editedItem.id);
    
    const image = document.querySelector(`.item-img[data-id='${editedItem.id}']`) as HTMLImageElement;
    if(image) image.src = editedItem.image;

    const title = document.querySelector(`.item-title[data-id='${editedItem.id}']`)
    if(title) title.textContent = editedItem.title;

    const destination = document.querySelector(`.item-destination[data-id='${editedItem.id}']`)
    if(destination) destination.textContent = editedItem.destination;

    const shortDescription = document.querySelector(`.iteitem-short-description[data-id='${editedItem.id}']`)
    if(shortDescription) shortDescription.textContent = editedItem.shortDescription;

    const price = document.querySelector(`.item-price[data-id='${editedItem.id}']`)
    if(price) price.textContent = `${editedItem.price} €`;
}
// PRELOAD //
(window as any).ipcRendererCustom.onItemEdited(onItemEditedCb)

//// ** JS EVENTS ** ////
const btnAddTravel = document.querySelector(".ask-show-new-item-form");
  
btnAddTravel!.addEventListener("click", (e) => {
    e.preventDefault();
    (window as any).ipcRendererCustom.sendAskShowNewItemForm();
});