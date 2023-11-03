// -- GENERATE HTML CARD -- //
const generateCard = (travelItem: any) => {

    // Constants
    const divCardList = document.querySelector("#card-list");
    const divColMain = document.createElement("div");
    const divInter = document.createElement("div");
    const divCard = document.createElement("div");
    const divCardBody = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("h5");
    const destination = document.createElement("p");
    const shortDescription = document.createElement("p");
    const price = document.createElement("p");

    // classList and args
    divColMain.classList.add("item-col-main", "col-lg-4");
    divCard.classList.add("card", "mb-3", "shadow", "bg-primary-subtle");;
    img.classList.add("item-img", "card-img-top");
    img.alt = "travel illustration";
    divCardBody.classList.add("card-body");
    title.classList.add("item-title", "card-title");
    destination.classList.add("item-destination", "card-text");
    shortDescription.classList.add("item-short-description", "card-text");
    price.classList.add("item-price", "card-text");

    // textContent and args from data travelItem
    img.src = travelItem.image;
    title.textContent = travelItem.title;
    destination.textContent = travelItem.destination;
    shortDescription.textContent = travelItem.shortDescription;
    price.textContent = `${travelItem.price.toFixed(2)} €`;

    // data-set
    divColMain.dataset.id = travelItem.id;
    img.dataset.id = travelItem.id;
    title.dataset.id = travelItem.id;
    destination.dataset.id = travelItem.id;
    shortDescription.dataset.id = travelItem.id;
    price.dataset.id = travelItem.id;

    // events
    divCard.addEventListener("mouseenter", (e) => {
        divCard.classList.add("bg-warning-subtle")
        divCard.classList.remove("bg-primary-subtle")
    });
    
    divCard.addEventListener("mouseleave", (e) => {
        divCard.classList.add("bg-primary-subtle")
        divCard.classList.remove("bg-warning-subtle")
    });

    divCard.addEventListener("click", (e) => {
        e.preventDefault();
        (window as any).ipcRendererCustom.sendAskShowDetailItem(travelItem.id);
    })

    // apppend all components
    divCardBody.append(title, destination, shortDescription, price);
    divCard.append(img, divCardBody);
    divInter.appendChild(divCard);
    divColMain.appendChild(divCard);
    divCardList?.appendChild(divColMain);
}

//// ** ELECTRON COMMUNICATION ** ////
// -- ONCE INIT DATA -- //
// CALL BACK //
const onceInitDataCb = (e: any, travelItemList: any) => {
    console.log("Check ! init-data cb", travelItemList);
    // update travel card list
    travelItemList.forEach((travelItem: any) => {
        generateCard(travelItem);
      });
}
// PRELOAD //
(window as any).ipcRendererCustom.onceInitData(onceInitDataCb);

// -- ON NEW ITEM ADDED -- //
// CALL BACK //
const onNewItemAddedCb = (e: any, travelItem: any) => {
    generateCard(travelItem);
}
// PRELOAD //
(window as any).ipcRendererCustom.onNewItemAdded(onNewItemAddedCb);

// -- ON ITEM DELETED -- //
// CALL BACK //
const onItemDeletedCb = (e: any, id: number) => {
    const colMain = document.querySelector(`.item-col-main[data-id='${id}']`);
    colMain!.remove();
}
// PRELOAD //
(window as any).ipcRendererCustom.onItemDeleted(onItemDeletedCb);

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
    if(price) price.textContent = `${editedItem.price.toFixed(2)} €`;
}
// PRELOAD //
(window as any).ipcRendererCustom.onItemEdited(onItemEditedCb)

//// ** JS EVENTS ** ////
const btnAddTravel = document.querySelector(".ask-show-new-item-form");
  
btnAddTravel!.addEventListener("click", (e) => {
    e.preventDefault();
    (window as any).ipcRendererCustom.sendAskShowNewItemForm();
});