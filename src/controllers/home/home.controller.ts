console.log("check ! home.controller.ts");

// -- GENERATE HTML CARD -- //
const generateCard = (travelItem: any) => {

    // Constants
    const divCardList = document.querySelector("#card-list");
    const divCol = document.createElement("div");
    const divInter = document.createElement("div");
    const divCard = document.createElement("div");
    const img = document.createElement("img");
    const divCardBody = document.createElement("div");
    const title = document.createElement("h5");
    const destination = document.createElement("p");
    const shortDescription = document.createElement("p");
    const price = document.createElement("p");
    const btnDetail = document.createElement("button");

    // classList and args
    divCol.classList.add("col-lg-4");
    divCard.classList.add("card", "mb-3", "shadow", "bg-primary-subtle");;
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
    price.textContent = `${travelItem.price} €`;
    btnDetail.textContent = "Show travel details";

    // apppend all components
    divCardBody.append(title, destination, shortDescription, price, btnDetail);
    divCard.append(img, divCardBody);
    divInter.appendChild(divCard);
    divCol.appendChild(divCard);
    divCardList?.appendChild(divCol);
}


//// ELECTRON COMMUNICATION ////
const onceInitDataCb = (e: any, travelItemList: any) => {
    console.log("Check ! init-data cb", travelItemList);
    // update travel card list
    travelItemList.forEach((travelItem: any) => {
        generateCard(travelItem);
      });
}
(window as any).ipcRendererCustom.onceInitData(onceInitDataCb);
