console.log("on entre dans le controller");


//// ELECTRON COMMUNICATION ////
const onceInitDataCb = (e: any, data: any) => {
    console.log("on passe dans le cb du init-data", data);
}
(window as any).ipcRendererCustom.onceInitData(onceInitDataCb);
