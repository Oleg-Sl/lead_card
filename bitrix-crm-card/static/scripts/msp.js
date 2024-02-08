import BitrixService from './bx24/api.js';
import { FIELD_MSP, FIELD_FABRIC } from './parameters/params_msp.js';
import { App } from './msp/app.js'


async function main() {
    let bx24 = new BitrixService();
    let app = new App(smartProcessId, bx24, portalUrl);
    await app.init();
}


document.addEventListener("DOMContentLoaded", async function() {
     BX24.init(async function(){
        await main();
        BX24.fitWindow();
     });
});









































// class App {
//     constructor(elemSmartId, bx24, portalUrl) {
//         this.smartProcessId = 172;
//         this.smartFabricsId = 149;
//         this.elemSmartId = elemSmartId;
//         this.portalUrl = portalUrl;
//         this.bx24 = bx24;
//         this.currentUserId = null;
//     }
//
//     async init() {
//        console.log("this.elemSmartId = ", this.elemSmartId);
//        console.log("this.portalUrl = ", this.portalUrl);
//        console.log("this.bx24 = ", this.bx24);
//         const data = await this.bx24.batch.getData({
//             user: 'user.current',
//             smartProcess: `crm.item.get?entityTypeId=${this.smartId}&id=${this.productId}`,
//             smartFabricList: `crm.item.list?entityTypeId=${this.smartFabricsId}&select[]=id&select[]=title&select[]=${FIELD_FABRIC.name}&select[]=${FIELD_FABRIC.photo}&select[]=${FIELD_FABRIC.type}&select[]=${FIELD_FABRIC.color}&order[id]=ASC`,
//             smartFabric: `crm.item.get?entityTypeId=${this.smartFabricsId}&id=$result[smartProcess][item][${FIELD_MSP.upholsteryFabricCollection}]&select[]=id&select[]=title&select[]=ufCrm17_1705390343&select[]=ufCrm17_1705390515&select[]=ufCrm17_1705828938`,
//             smartFabric_1: `crm.item.get?entityTypeId=${this.smartFabricsId}&id=$result[smartProcess][item][${FIELD_MSP.upholsteryFabricCollection_1}]&select[]=id&select[]=title&select[]=ufCrm17_1705390343&select[]=ufCrm17_1705390515&select[]=ufCrm17_1705828938`,
//             smartFabric_2: `crm.item.get?entityTypeId=${this.smartFabricsId}&id=$result[smartProcess][item][${FIELD_MSP.upholsteryFabricCollection_2}]&select[]=id&select[]=title&select[]=ufCrm17_1705390343&select[]=ufCrm17_1705390515&select[]=ufCrm17_1705828938`,
//             fields: `crm.item.fields?entityTypeId=${this.smartId}`,
//             createdBy: `user.get?id=$result[smartProcess][item][${FIELD_MSP.createdBy}]`,
//             updatedBy: `user.get?id=$result[smartProcess][item][${FIELD_MSP.createdBy}]`,
//         });

//         this.user = data?.result?.user;
//         this.createdUser = data?.result?.createdBy[0];
//         this.updatedUser = data?.result?.updatedBy[0];
//         this.data = data?.result?.smartProcess?.item;
//         this.smartFabricList = data?.result?.smartFabricList?.items;
//         const total = data?.result_total?.smartFabricList;
//         let allFabrics = await this.getAllFabrics(total);
//         this.smartFabricList = this.smartFabricList.concat(allFabrics);

//         this.smartFabric = data?.result?.smartFabric?.item;
//         this.smartFabric_1 = data?.result?.smartFabric_1?.item;
//         this.smartFabric_2 = data?.result?.smartFabric_2?.item;
//         this.fields = data?.result?.fields?.fields;

//         if (!this.data || !this.user) {
//             console.error(`Error get data or user from server for smart processId=${this.smartId}, productId=${this.productId}: `, data);
//             return;
//         }

//         console.log("data = ", this.data);
//         console.log("user = ", this.user);
//         console.log("fields = ", this.fields);

//         this.renderData();
//         this.renderFabrics();
//         this.renderPhotos();
//   }

//     initHandler() {

//     }

//     async renderPhotos() {
//         const photoFields = [
//             {field: FIELD_MSP.mainPhoto, id: 'imgMainPhoto'},
//             {field: FIELD_MSP.photo_1,   id: 'imgPhoto_1'},
//             {field: FIELD_MSP.photo_2,   id: 'imgPhoto_2'},
//             {field: FIELD_MSP.photo_3,   id: 'imgPhoto_3'},
//         ];
    
//         for (let i = 0; i < photoFields.length; i++) {
//             const field = photoFields[i].field;
//             const id = photoFields[i].id;
//             const photoUrl = this.data?.[field]?.urlMachine;
//             const elemImg = document.querySelector(`#${id}`);
//             this.renderPhoto(photoUrl, elemImg);
//         }
//     }

//     renderPhoto(photoUrl, elemImg) {
//         if (photoUrl) {
//             const filePhoto = portalUrl + '/get-image/?url=' + encodeURIComponent(photoUrl);
//             const uploadIcon = elemImg.parentNode.querySelector('.upload-icon');
//             const uploadText = elemImg.parentNode.querySelector('.upload-text');
//             const previewImage = elemImg.parentNode.querySelector('.preview-image');
//             uploadIcon.style.display = 'none';
//             uploadText.style.display = 'none';
//             previewImage.style.display = 'block';
//             elemImg.src = filePhoto;
//         }
//     }

//     renderData() {
//         const elemCreatedBy = document.querySelector(`#${FIELD_MSP.createdBy}`);
//         const elemUpdatedBy = document.querySelector(`#${FIELD_MSP.updatedBy}`);
//         elemCreatedBy.value = `${this.createdUser?.LAST_NAME} ${this.createdUser?.NAME}`;
//         elemUpdatedBy.value = `${this.updatedUser?.LAST_NAME} ${this.updatedUser?.NAME}`;

//         for (const [key, value] of Object.entries(FIELD_MSP)) {
//             const elem = document.querySelector(`#${key}`);

//             if (elem) {
//                 const fieldName = FIELD_MSP[key];
//                 const fieldDataBx24 = this.fields?.[fieldName];
//                 console.log(fieldDataBx24);
//                 this.outputData(elem, fieldName, fieldDataBx24);
//             }
//         }
//     }

//     renderFabrics() {
//         // Установка тканей
//         const contentHTML = this.getFabricsOptionsSelectHTML();
//         const fabricCollectionIds = ['upholsteryFabricCollection', 'upholsteryFabricCollection_1', 'upholsteryFabricCollection_2'];
//         fabricCollectionIds.forEach((fabricId, index) => {
//             const element = document.querySelector(`#${fabricId}`);
//             element.innerHTML = contentHTML;
//             this.checkOption(element, this.data?.[FIELD_MSP[fabricId]]);
//             $(`#${fabricId}`).chosen();
//         });

//         const fabricTypesIds = ['#upholsteryFabricType', '#upholsteryFabricType_1', '#upholsteryFabricType_2'];
//         const fabricColorsIds = ['#upholsteryFabricColor', '#upholsteryFabricColor_1', '#upholsteryFabricColor_2'];
//         [this.data?.[FIELD_MSP.upholsteryFabricCollection], this.data?.[FIELD_MSP.upholsteryFabricCollection_1], this.data?.[FIELD_MSP.upholsteryFabricCollection_2]].forEach((fabricId, index) => {
//             const fabric = this.smartFabricList.find(item => item.id == fabricId);
//             document.querySelector(fabricTypesIds[index]).value = fabric?.[FIELD_FABRIC.type];
//             document.querySelector(fabricColorsIds[index]).value = fabric?.[FIELD_FABRIC.color];
//         });
//     }

//     outputData(elem, fieldName, fieldDataBx24) {
//         if (fieldDataBx24.type ==='enumeration') {
//             elem.innerHTML = this.getOptionsSelectHTML(fieldDataBx24.items);
//             this.checkOption(elem, this.data?.[fieldName]);
//         } else if (fieldDataBx24.type === 'string') {
//             elem.value = this.data?.[fieldName];
//         } else if (fieldDataBx24.type === 'double') {
//             elem.value = this.data?.[fieldName];
//         } else if (fieldDataBx24.type === 'date' || fieldDataBx24.type === 'datetime') {
//             elem.value = this.formatDate(this.data?.[fieldName]);
//         } else if (fieldDataBx24.type === 'boolean') {
//             elem.checked = this.data?.[fieldName] == 'Y' ? true : false;
//         }
//     }

//     getOptionsSelectHTML(items) {
//         let contentHTML = '<option value=""></option>';
//         for (const item of items) {
//             contentHTML += `<option value="${item.ID}">${item.VALUE}</option>`;
//         }

//         return contentHTML;
//     }

//     checkOption(elem, value) {
//         let options = elem.querySelectorAll('option');
//         for (const option of options) {
//             if (option.value == value) {
//                 option.selected = true;
//                 break;
//             }
//         }
//     }

//     getFabricsOptionsSelectHTML() {
//         let contentHTML = '<option value=""></option>';
//         for (const item of this.smartFabricList) {
//             contentHTML += `<option value="${item.id}">${item.ufCrm17_1705390515}</option>`;
//         }

//         return contentHTML;
//     }

//     async getAllFabrics(total) {
//         let cmd = {};
//         let allItems = [];

//         for (let i = 50; i < total; i += 50) {
//             cmd[i] = `crm.item.list?entityTypeId=${this.smartFabricsId}&start=${i}&select[]=id&select[]=title&select[]=${FIELD_FABRIC.name}&select[]=${FIELD_FABRIC.photo}&select[]=${FIELD_FABRIC.type}&select[]=${FIELD_FABRIC.color}&order[id]=ASC`;
//         };

//         const data = await this.bx24.batch.getData(cmd);
//         const items = data?.result;
//         for (const key in items) {
//             if (items.hasOwnProperty(key) && items[key].items) {
//                 allItems = allItems.concat(items[key].items);
//             }
//         }

//         return allItems;
//     }

//     urlToFile(url, filename) {
//         return new Promise(async (resolve, reject) => {
//             try {
//                 const response = await fetch(url);
//                 const buffer = await response.buffer();
//                 const type = await fileType.fromBuffer(buffer);
//                 const mimeType = type ? type.mime : 'application/octet-stream';
//                 resolve(new File([buffer], filename, { type: mimeType }));
//             } catch (error) {
//                 reject(error);
//             }
//         });
//     }

//     formatDate(inputDateString) {
//         const dateObject = new Date(inputDateString);
        
//         const year = dateObject.getFullYear();
//         const month = String(dateObject.getMonth() + 1).padStart(2, '0');
//         const day = String(dateObject.getDate()).padStart(2, '0');
        
//         const outputString = `${year}-${month}-${day}`;
        
//         return outputString;
//     }
// }





















        // const contentHTML = this.getFabricsOptionsSelectHTML();
        // const elemUpholsteryFabricCollection = document.querySelector('#upholsteryFabricCollection');
        // const elemUpholsteryFabricCollection_1 = document.querySelector('#upholsteryFabricCollection_1');
        // const elemUpholsteryFabricCollection_2 = document.querySelector('#upholsteryFabricCollection_2');
        // elemUpholsteryFabricCollection.innerHTML = contentHTML;
        // elemUpholsteryFabricCollection_1.innerHTML = contentHTML;
        // elemUpholsteryFabricCollection_2.innerHTML = contentHTML;
        // this.checkOption(elemUpholsteryFabricCollection, this.data?.[FIELD_MSP.upholsteryFabricCollection]);
        // this.checkOption(elemUpholsteryFabricCollection_1, this.data?.[FIELD_MSP.upholsteryFabricCollection_1]);
        // this.checkOption(elemUpholsteryFabricCollection_2, this.data?.[FIELD_MSP.upholsteryFabricCollection_2]);
        // $("#upholsteryFabricCollection").chosen();
        // $("#upholsteryFabricCollection_1").chosen();
        // $("#upholsteryFabricCollection_2").chosen();
        // const elemUpholsteryFabricType = document.querySelector('#upholsteryFabricType');
        // const elemUpholsteryFabricType_1 = document.querySelector('#upholsteryFabricType_1');
        // const elemUpholsteryFabricType_2 = document.querySelector('#upholsteryFabricType_2');
        // const elemUpholsteryFabricColor = document.querySelector('#upholsteryFabricColor');
        // const elemUpholsteryFabricColor_1 = document.querySelector('#upholsteryFabricColor_1');
        // const elemUpholsteryFabricColor_2 = document.querySelector('#upholsteryFabricColor_2');
        // const fabric = this.smartFabricList.find(item => item.id == this.data?.[FIELD_MSP.upholsteryFabricCollection]);
        // const fabric_1 = this.smartFabricList.find(item => item.id == this.data?.[FIELD_MSP.upholsteryFabricCollection_1]);
        // const fabric_2 = this.smartFabricList.find(item => item.id == this.data?.[FIELD_MSP.upholsteryFabricCollection_2]);
        // console.log(fabric);
        // elemUpholsteryFabricType.value = fabric?.[FIELD_FABRIC.type];
        // elemUpholsteryFabricType_1.value = fabric_1?.[FIELD_FABRIC.type];
        // elemUpholsteryFabricType_2.value = fabric_2?.[FIELD_FABRIC.type];
        // elemUpholsteryFabricColor.value = fabric?.[FIELD_FABRIC.color];
        // elemUpholsteryFabricColor_1.value = fabric_1?.[FIELD_FABRIC.color];
        // elemUpholsteryFabricColor_2.value = fabric_2?.[FIELD_FABRIC.color];
