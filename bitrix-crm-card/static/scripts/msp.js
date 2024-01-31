import BitrixService from './bx24/api.js';
// import FakeBitrixService from './bx24/fake_api.js';
import { FIELD_MSP, } from './parameters/params_msp.js';


class App {
    constructor(productId, bx24) {
        this.smartId = 172;
        this.smartFabricsId = 149;
        this.productId = productId;
        this.bx24 = bx24;
        this.currentUserId = null;

    }

    async init() {
        const data = await this.bx24.batch.getData({
            user: 'user.current',
            smartProcess: `crm.item.get?entityTypeId=${this.smartId}&id=${this.productId}`,
            smartFabricList: `crm.item.list?entityTypeId=${this.smartFabricsId}&select[]=id&select[]=title&select[]=ufCrm17_1705390343&select[]=ufCrm17_1705390515&select[]=ufCrm17_1705828938&order[id]=ASC`,
            smartFabric: `crm.item.get?entityTypeId=${this.smartFabricsId}&id=$result[smartProcess][item][${FIELD_MSP.upholsteryFabricCollection}]&select[]=id&select[]=title&select[]=ufCrm17_1705390343&select[]=ufCrm17_1705390515&select[]=ufCrm17_1705828938`,
            smartFabric_1: `crm.item.get?entityTypeId=${this.smartFabricsId}&id=$result[smartProcess][item][${FIELD_MSP.upholsteryFabricCollection_1}]&select[]=id&select[]=title&select[]=ufCrm17_1705390343&select[]=ufCrm17_1705390515&select[]=ufCrm17_1705828938`,
            smartFabric_2: `crm.item.get?entityTypeId=${this.smartFabricsId}&id=$result[smartProcess][item][${FIELD_MSP.upholsteryFabricCollection_2}]&select[]=id&select[]=title&select[]=ufCrm17_1705390343&select[]=ufCrm17_1705390515&select[]=ufCrm17_1705828938`,
            fields: `crm.item.fields?entityTypeId=${this.smartId}`,
        });

        this.user = data?.result?.user;
        this.data = data?.result?.smartProcess?.item;
        this.smartFabricList = data?.result?.smartFabricList?.items;
        const total = data?.result_total?.smartFabricList;
        console.log("data = ", data);
        console.log("total = ", total);
        let allFabrics = await this.getAllFabrics(total);
        this.smartFabricList = this.smartFabricList.concat(allFabrics);

        this.smartFabric = data?.result?.smartFabric?.item;
        this.smartFabric_1 = data?.result?.smartFabric_1?.item;
        this.smartFabric_2 = data?.result?.smartFabric_2?.item;
        this.fields = data?.result?.fields?.fields;

        if (!this.data || !this.user) {
            console.error(`Error get data or user from server for smart processId=${this.smartId}, productId=${this.productId}: `, data);
            return;
        }

        console.log("data = ", this.data);
        // console.log("user = ", this.user);
        console.log("fields = ", this.fields);

        this.renderData();
        this.renderFabrics();
        this.renderPhotos();
    }



    async renderPhotos() {
        const mainPhotoUrl = this.data?.[FIELD_MSP.mainPhoto]?.urlMachine;
        const photoUrl_1 = this.data?.[FIELD_MSP.photo_1]?.urlMachine;
        const photoUrl_2 = this.data?.[FIELD_MSP.photo_2]?.urlMachine;
        const photoUrl_3 = this.data?.[FIELD_MSP.photo_3]?.urlMachine;
        
        // const fileMainPhoto = await fetch(mainPhotoUrl);
        // console.log('fileMainPhoto = ', fileMainPhoto);
        // const filePhoto_1 = await fetch(photoUrl_1);
        // const filePhoto_2 = await fetch(photoUrl_2);
        // const filePhoto_3 = await fetch(photoUrl_3);

        const elemMainPhoto = document.querySelector('#mainPhoto');
        const elemInputPhoto_1 = document.querySelector('#photo_1');
        const elemInputPhoto_2 = document.querySelector('#photo_2');
        const elemInputPhoto_3 = document.querySelector('#photo_3');
        const elemImgMainPhoto = document.querySelector('#imgMainPhoto');
        const elemImgPhoto_1 = document.querySelector('#imgPhoto_1');
        const elemImgPhoto_2 = document.querySelector('#imgPhoto_1');
        const elemImgPhoto_3 = document.querySelector('#imgPhoto_1');
        // console.log(elemImgMainPhoto);
        const fileMainPhoto = portalUrl + '/get-image/?url=' + encodeURIComponent(mainPhotoUrl);
        const uploadIcon = elemImgMainPhoto.parentNode.querySelector('.upload-icon');
        const uploadText = elemImgMainPhoto.parentNode.querySelector('.upload-text');
        const previewImage = elemImgMainPhoto.parentNode.querySelector('.preview-image');
        uploadIcon.style.display = 'none';
        uploadText.style.display = 'none';
        previewImage.style.display = 'block';
        elemImgMainPhoto.src = fileMainPhoto;
        elemImgPhoto_1.src = fileMainPhoto;
        elemImgPhoto_2.src = photoUrl_2;
        elemImgPhoto_3.src = photoUrl_3;

    }
//     const imageUrl = 'https://example.com/path/to/image.jpg';
// const serverUrl = '/get-image/?url=' + encodeURIComponent(imageUrl);

// // Создайте img-элемент и установите его src
// const img = document.createElement('img');
// img.src = serverUrl;

    renderData() {
        for (const [key, value] of Object.entries(FIELD_MSP)) {
            const elem = document.querySelector(`#${key}`);

            if (elem) {
                const fieldName = FIELD_MSP[key];
                const fieldDataBx24 = this.fields?.[fieldName];
                this.outputData(elem, fieldName, fieldDataBx24);
            }
        }
    }

    renderFabrics() {
        // Установка тканей
        const contentHTML = this.getFabricsOptionsSelectHTML();
        const elemUpholsteryFabricCollection = document.querySelector('#upholsteryFabricCollection');
        const elemUpholsteryFabricCollection_1 = document.querySelector('#upholsteryFabricCollection_1');
        const elemUpholsteryFabricCollection_2 = document.querySelector('#upholsteryFabricCollection_2');
        elemUpholsteryFabricCollection.innerHTML = contentHTML;
        elemUpholsteryFabricCollection_1.innerHTML = contentHTML;
        elemUpholsteryFabricCollection_2.innerHTML = contentHTML;
        this.checkOption(elemUpholsteryFabricCollection, this.data?.[FIELD_MSP.upholsteryFabricCollection]);
        this.checkOption(elemUpholsteryFabricCollection_1, this.data?.[FIELD_MSP.upholsteryFabricCollection_1]);
        this.checkOption(elemUpholsteryFabricCollection_2, this.data?.[FIELD_MSP.upholsteryFabricCollection_2]);
        $("#upholsteryFabricCollection").chosen();
        $("#upholsteryFabricCollection_1").chosen();
        $("#upholsteryFabricCollection_2").chosen();
    }

    outputData(elem, fieldName, fieldDataBx24) {
        if (fieldDataBx24.type ==='enumeration') {
            elem.innerHTML = this.getOptionsSelectHTML(fieldDataBx24.items);
            this.checkOption(elem, this.data?.[fieldName]);
        } else if (fieldDataBx24.type === 'string') {
            elem.value = this.data?.[fieldName];
        } else if (fieldDataBx24.type === 'double') {
            elem.value = this.data?.[fieldName];
        }
    }

    getOptionsSelectHTML(items) {
        let contentHTML = '<option value=""></option>';
        for (const item of items) {
            contentHTML += `<option value="${item.ID}">${item.VALUE}</option>`;
        }

        return contentHTML;
    }

    checkOption(elem, value) {
        let options = elem.querySelectorAll('option');
        for (const option of options) {
            if (option.value == value) {
                option.selected = true;
                break;
            }
        }
    }

    getFabricsOptionsSelectHTML() {
        let contentHTML = '<option value=""></option>';
        for (const item of this.smartFabricList) {
            contentHTML += `<option value="${item.id}">${item.ufCrm17_1705390515}</option>`;
        }

        return contentHTML;
    }

    async getAllFabrics(total) {
        let cmd = {};
        let allItems = [];

        for (let i = 50; i < total; i += 50) {
            cmd[i] = `crm.item.list?entityTypeId=${this.smartFabricsId}&start=${i}&select[]=id&select[]=title&select[]=ufCrm17_1705390515&select[]=ufCrm17_1705390343&select[]=ufCrm17_1705828938&order[id]=ASC`;
        };

        const data = await this.bx24.batch.getData(cmd);
        const items = data?.result;
        for (const key in items) {
            if (items.hasOwnProperty(key) && items[key].items) {
                allItems = allItems.concat(items[key].items);
            }
        }

        return allItems;
    }

    urlToFile(url, filename) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(url);
                const buffer = await response.buffer();
                const type = await fileType.fromBuffer(buffer);
                const mimeType = type ? type.mime : 'application/octet-stream';
                resolve(new File([buffer], filename, { type: mimeType }));
            } catch (error) {
                reject(error);
            }
        });
    }

    // urlToFile(url, filename, mimeType) {
    //     return new Promise((resolve, reject) => {
    //         var xhr = new XMLHttpRequest();
    //         xhr.responseType = 'blob';
    //         xhr.onload = function() {
    //             resolve(new File([xhr.response], filename, { type: mimeType }));
    //         };
    //         xhr.onerror = function() {
    //             reject(new Error('Failed to fetch the image'));
    //         };
    //         xhr.open('GET', url);
    //         xhr.send();
    //     });
    // }
}



async function main() {
    // console.log("Ready!!!");
    let bx24 = new BitrixService();
    // let bx24 = new FakeBitrixService();
    let app = new App(1, bx24);
    await app.init();
}


// $(document).ready(function() {
//     BX24.init(async function(){
//         await main();
//         BX24.fitWindow();
//     })
// });

document.addEventListener("DOMContentLoaded", async function() {
    BX24.init(async function(){
        await main();
        // BX24.fitWindow();
    });
});