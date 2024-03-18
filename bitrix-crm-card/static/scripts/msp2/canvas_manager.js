// import { FIELD_MSP_PHOTOS } from './params.js';
import { SMART_FIELD_MSP_PHOTOS } from './params.js';
import { Canvas } from './canvas.js';

const PRODUCT_TYPE = 'МСП';

export class CanvasManager {
    constructor(dataManager, portalUrl) {
        this.dataManager = dataManager;
        this.portalUrl = portalUrl;

        this.canvas = new Canvas();
    }

    async init() {
        this.canvas.initSize();
        const urlCanvasFile = this.dataManager?.product?.[SMART_FIELD_MSP_PHOTOS.photo_1]?.urlMachine;
        const url = this.portalUrl + '/get-image/?url=' + encodeURIComponent(urlCanvasFile);
        console.log('url = ', url);
        // const data = this.loadURLAndData(url);
        // console.log('data = ', data);
        // this.canvas.initFromSavedData(data);
        // this.canvas.loadCanvasFromBase64(url)
    }

    async getFields() {
        let data = {};

        for (const id in this.cropperInstances) {
            const fieldData = this.photoFields.find(field => field.id === id);
            const cropperInstance = this.cropperInstances[id];
            const croppedCanvas = cropperInstance.cropper.getCroppedCanvas();
            const fileName = cropperInstance.fileName;
            const base64Data = croppedCanvas.toDataURL('image/jpeg').split(',')[1];
            data[fieldData?.field] = [fileName, base64Data];
        }

        return data;
    }

    getChangedData() {
        // return [this.canvas.getData()];
        // if (!this.mainPhotoFile) {
        //     return {};
        // }
        // Преобразуем JSON в строку
        const jsonData = this.canvas.getData();
        const jsonString = JSON.stringify(jsonData);
        // Кодируем строку в base64
        const base64Data = btoa(jsonString);
        return {
            [SMART_FIELD_MSP_PHOTOS.photo_1]: [`${PRODUCT_TYPE}_${this.dataManager.productId}`, base64Data]
        };
    }

    async loadFileAsBase64(url) {
        try {
            const response = await fetch(url);
            console.log("response = ", response);
            
            if (!response.ok) {
                throw new Error('Ошибка загрузки файла');
            }
            
            const buffer = await response.arrayBuffer();
            
            const base64String = btoa(new Uint8Array(buffer).reduce((data, byte) => {
                return data + String.fromCharCode(byte);
            }, ''));
            
            return base64String;
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }

    loadURLAndData(url) {
        // Создаем объект XMLHttpRequest для загрузки данных
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'blob'; // Устанавливаем тип ответа как blob
    
        xhr.onload = function(event) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const base64Data = event.target.result.split(',')[1]; // Отрезаем "data:application/octet-stream;base64," из base64 строки
                const jsonString = atob(base64Data); // Декодируем строку base64 в JSON строку
                const jsonData = JSON.parse(jsonString); // Преобразуем JSON строку в объект JSON
    
                // Восстанавливаем полотно из полученных данных
                // restoreCanvasFromJSON(jsonData);
                // console.log("jsonData = ", jsonData);
                this.canvas.initFromSavedData(jsonData);
            };
            reader.readAsDataURL(xhr.response);
        };
    
        xhr.send();
    }
    
}
