// ONCE INIT DATA NEW-ITEM CALL BACK //
const onceInitDataNewItemCb = (e: any) => {
    console.log("check ! new-item.controller.ts onceInitDataNewItemCb");
};
(window as any).ipcRendererCustom.onceInitData(onceInitDataNewItemCb);

// FORM EVENT SUBMIT //
const form = document.querySelector("form")!;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const dataForm = new FormData(e.target as HTMLFormElement);
  const newTravelItem = {
    image: dataForm.get("image"),
    title: dataForm.get("title"),
    destination: dataForm.get("destination"),
    shortDescription: dataForm.get("shortDescription"),
    longDescription: dataForm.get("longDescription"),
    price: parseFloat(dataForm.get("price") as string),
  };

  // INVOKE ADD NEW ITEM
  (window as any).ipcRendererCustom.invokeAddNewItem(
    newTravelItem,
    (res: any) => {
        const divMessage = document.querySelector("#response-message")! as HTMLElement;
        divMessage.textContent = res.msg;
        divMessage.hidden = false;
        divMessage.classList.remove("alert-sucess", "alert-danger");
        res.success
            ? divMessage.classList.add("alert-success")
            : divMessage.classList.add("alert-danger");
    }
  );
});