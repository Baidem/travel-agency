let itemToEditGlobal: any = undefined

// ** ONCE INIT DATA EDIT ITEM ** //
// CALL BACK //
const onceInitDataEditItemCb = (e: any, itemToEdit: any) => {
    const imageUrlInput = document.getElementById('imageUrlInput') as HTMLInputElement;
    imageUrlInput.value = itemToEdit.image;

    const titleInput = document.getElementById('titleInput') as HTMLInputElement;
    titleInput.value = itemToEdit.title;

    const destinationInput = document.getElementById('destinationInput') as HTMLInputElement;
    destinationInput.value = itemToEdit.destination;

    const shortDescriptionInput = document.getElementById('shortDescriptionInput') as HTMLInputElement;
    shortDescriptionInput.value = itemToEdit.shortDescription;

    const longDescriptionInput = document.getElementById('longDescriptionInput') as HTMLInputElement;
    longDescriptionInput.value = itemToEdit.longDescription;

    const priceInput = document.getElementById('priceInput') as HTMLInputElement;
    priceInput.value = itemToEdit.price.toString();

    itemToEditGlobal = itemToEdit;
}
// PRELOAD //
(window as any).ipcRendererCustom.onceInitData(onceInitDataEditItemCb);

// ** FORM SUBMIT EVENT ** //
const editForm = document.getElementById('edit-item-form')!;

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const dataForm = new FormData(e.target as HTMLFormElement);
    itemToEditGlobal.image = dataForm.get('image');
    itemToEditGlobal.title = dataForm.get('title');
    itemToEditGlobal.destination = dataForm.get('destination');
    itemToEditGlobal.shortDescription = dataForm.get('shortDescription');
    itemToEditGlobal.longDescription = dataForm.get('longDescription');

    let price: any = dataForm.get('price');
    price = price ? (!isNaN(price) ? parseFloat(price.replace(',', '.')) : 0) : 0;

    itemToEditGlobal.price = price;

    // INVOKE EDIT ITEM //
    (window as any).ipcRendererCustom.invokeEditItem(itemToEditGlobal, (res: any) => {
        const divMessage = document.querySelector('#response-message')! as HTMLElement
        divMessage.textContent = res.msg
        divMessage.hidden = false

        divMessage.classList.remove('alert-success', 'alert-danger')
        res.success ? divMessage.classList.add('alert-success') : divMessage.classList.add('alert-danger')
    })
})
