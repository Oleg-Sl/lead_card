

import { SMART_FIELD_MSP_PHOTOS } from './params.js';
// import { Canvas } from './canvas.js';


export class MainPhotoManager {
    constructor(dataManager, portalUrl) {
        this.dataManager = dataManager;
        this.portalUrl = portalUrl;

        this.mainPhotoFile = null;
        this.photoUrl = this.dataManager?.product?.[SMART_FIELD_MSP_PHOTOS.mainPhoto]?.urlMachine;

        this.inputMainPhoto = document.getElementById('mainPhoto');
        this.imgMainPhoto = document.getElementById('imgMainPhoto');

        // this.initData(data);
    }

    init() {
        this.render();
        this.initHandlers();
    }

    initHandlers() {
        // Загружаем главное фото
        this.inputMainPhoto.addEventListener('change', (event) => {
            const parent = event.target.parentNode;
            const fileInput = event.target;
            const file = fileInput.files[0];

            if (file) {
                const uploadIcon = parent.querySelector('.upload-icon');
                const uploadText = parent.querySelector('.upload-text');
                const previewImage = parent.querySelector('.preview-image');

                uploadIcon.style.display = 'none';
                uploadText.style.display = 'none';
                previewImage.style.display = 'block';
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewImage.src = e.target.result;
                    const fileName = file.name; // Получаем название файла
                    const base64Data = e.target.result.split(',')[1]; // Получаем данные файла в формате base64
                    this.mainPhotoFile = [fileName, base64Data];
                };
                
                reader.readAsDataURL(file);
            }
        });
    }

    render() {
        if (this.photoUrl && this.imgMainPhoto) {
            const filePhoto = this.portalUrl + '/get-image/?url=' + encodeURIComponent(this.photoUrl);
            const { parentNode } = this.imgMainPhoto;
            const uploadIcon = parentNode.querySelector('.upload-icon');
            const uploadText = parentNode.querySelector('.upload-text');
            const previewImage = parentNode.querySelector('.preview-image');
            if (uploadIcon && uploadText && previewImage) {
                uploadIcon.style.display = 'none';
                uploadText.style.display = 'none';
                previewImage.style.display = 'block';
            }
            this.imgMainPhoto.src = filePhoto;
        }
    }

    async loadFileAsBase64(url) {
        console.log("url = ", url);
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
 
    getChangedData() {
        if (!this.mainPhotoFile) {
            return {};
        }
        return {
            [SMART_FIELD_MSP_PHOTOS.mainPhoto]: this.mainPhotoFile
        };
    }

    async getFields() {
        let data = {};

        if (this.imgMainPhoto && this.imgMainPhoto.hasAttribute('src') && this.imgMainPhoto.src) {
            const fieldData = await this.loadFileAsBase64(this.imgMainPhoto.src);
            if (fieldData) {
                data[SMART_FIELD_MSP_PHOTOS.mainPhoto] = ["img.jpeg", fieldData];
            }
        }

        return data;
    }
}


//     init() {
//         this.canvas.initSize();
//     }

//     initData(data) {
//         this.data = {};
//         for (const key in FIELD_MSP_PHOTOS) {
//             if (data.hasOwnProperty(FIELD_MSP_PHOTOS[key])) {
//                 this.data[FIELD_MSP_PHOTOS[key]] = data[FIELD_MSP_PHOTOS[key]];
//             }
//         }
//     }

//     async getFields() {
//         let data = {};
//         for (const id in this.cropperInstances) {
//             const fieldData =  this.photoFields.find(field => field.id === id);
//             const cropperInstance = this.cropperInstances[id];
//             const croppedCanvas = cropperInstance.cropper.getCroppedCanvas();
//             const fileName = cropperInstance.fileName;
//             const base64Data = croppedCanvas.toDataURL('image/jpeg').split(',')[1];
//             data[fieldData?.field] = [fileName, base64Data];
//         }

//         for (const photoField of this.photoFields) {
//             if (photoField.field in data) {
//                 continue;
//             }
//             const elemImg = document.querySelector(`#${photoField.id}`);
//             if (elemImg && elemImg.hasAttribute('src') && elemImg.src) {
//                 const fieldData = await this.loadFileAsBase64(elemImg.src);
//                 if (fieldData) {
//                     data[photoField.field] = ["img.jpeg", fieldData];
//                 }
//             }
//         }

//         return data;
//     }

//     getChangedData() {
//         const croppedFiles = {};

//         for (const id in this.cropperInstances) {
//             const fieldData =  this.photoFields.find(field => field.id === id);
//             const cropperInstance = this.cropperInstances[id];
//             const croppedCanvas = cropperInstance.cropper.getCroppedCanvas();
//             const fileName = cropperInstance.fileName;

//             const base64Data = croppedCanvas.toDataURL('image/jpeg').split(',')[1];
//             // const dataURL = croppedCanvas.toDataURL('image/jpeg');
//             // const base64Data = dataURL.split(',')[1];
//             croppedFiles[fieldData?.field] = [fileName, base64Data];
//         }

//         if (this.mainPhotoFile) {
//             croppedFiles[FIELD_MSP_PHOTOS.mainPhoto] = this.mainPhotoFile;
//         }

//         return croppedFiles;
//     }
    
//     renderPhotos() {
//         // Получаем все места вставки фотографий и устанавливаем ссылки на них
//         this.photoFields.forEach(({ field, id }) => {
//             const photoUrl = this.data?.[field]?.urlMachine;
//             const elemImg = document.querySelector(`#${id}`);
//             this.renderPhoto(photoUrl, elemImg);
//         });
//     }

//     renderPhoto(photoUrl, elemImg) {
//         if (photoUrl && elemImg) {
//             const filePhoto = this.portalUrl + '/get-image/?url=' + encodeURIComponent(photoUrl);
//             const { parentNode } = elemImg;
//             const uploadIcon = parentNode.querySelector('.upload-icon');
//             const uploadText = parentNode.querySelector('.upload-text');
//             const previewImage = parentNode.querySelector('.preview-image');
//             if (uploadIcon && uploadText && previewImage) {
//                 uploadIcon.style.display = 'none';
//                 uploadText.style.display = 'none';
//                 previewImage.style.display = 'block';
//             }
//             elemImg.src = filePhoto;
//         }
//     }

//     initHandlers() {
//         const imageInputs = document.querySelectorAll(".preview-image-input");
//         imageInputs.forEach((input) => {
//             if (!input) {
//                 return;
//             }
//             input.addEventListener('change', (event) => {
//                 const imagePreview = input.parentElement.querySelector("img");
//                 const file = event.target.files[0];
//                 const reader = new FileReader();

//                 reader.onload = (e) => {
//                     imagePreview.src = e.target.result;
//                     const existingCropper = this.cropperInstances[imagePreview.id]?.cropper;
//                     if (existingCropper) {
//                         existingCropper.destroy();
//                     }
    
//                     const cropper = new Cropper(imagePreview, {
//                         aspectRatio: NaN,
//                         autoCropArea: 1,
//                         viewMode: 3,
//                         cropBoxResizable: false,
//                         zoomable: true,
//                         minCropBoxWidth: 0,
//                         minCropBoxHeight: 0,
//                     });
    
//                     this.cropperInstances[imagePreview.id] = {
//                         cropper: cropper,
//                         fileName: file.name
//                     };
//                 };
                
//                 if (file) {
//                     reader.readAsDataURL(file);
//                 }
//             });
    
//             const imagePreview = input.parentElement.querySelector("img");
    
//             // imagePreview.addEventListener('click', () => { // Используем стрелочную функцию здесь
//             //     input.value = '';
//             //     imagePreview.src = '';
//             //     input.style.display = 'block';
//             // });
//         });

//         const elemInputMainPhoto = document.querySelector(`.main-photo-upload-input`);
//         elemInputMainPhoto.addEventListener('change', (event) => {
//             if (event.target.classList.contains('file-upload-input')) {
//                 const parent = event.target.parentNode;
//                 const fileInput = event.target;
//                 const file = fileInput.files[0];

//                 if (file) {
//                     const uploadIcon = parent.querySelector('.upload-icon');
//                     const uploadText = parent.querySelector('.upload-text');
//                     const previewImage = parent.querySelector('.preview-image');

//                     uploadIcon.style.display = 'none';
//                     uploadText.style.display = 'none';
//                     previewImage.style.display = 'block';
//                     const reader = new FileReader();
//                     reader.onload = (e) => {
//                         previewImage.src = e.target.result;
//                         const fileName = file.name; // Получаем название файла
//                         const base64Data = e.target.result.split(',')[1]; // Получаем данные файла в формате base64
//                         this.mainPhotoFile = [fileName, base64Data];
//                     };
                    
//                     reader.readAsDataURL(file);
//                 }
//             }
//         });

//         document.querySelector('.file-upload-label').addEventListener('mouseover', function() {
//             this.style.backgroundColor = '#f0f0f0';
//         });

//         document.querySelector('.file-upload-label').addEventListener('mouseout', function() {
//             this.style.backgroundColor = 'transparent';
//         });
//     }

//     async loadFileAsBase64(url) {
//         try {
//             const response = await fetch(url);
//             console.log("response = ", response);
            
//             if (!response.ok) {
//                 throw new Error('Ошибка загрузки файла');
//             }
            
//             const buffer = await response.arrayBuffer();
            
//             const base64String = btoa(new Uint8Array(buffer).reduce((data, byte) => {
//                 return data + String.fromCharCode(byte);
//             }, ''));
            
//             return base64String;
//         } catch (error) {
//             console.error('Произошла ошибка:', error);
//         }
//     }
    
// }
