import { FIELD_MSP_PHOTOS } from '../parameters/params_msp.js';

export class PhotoRenderer {
    constructor(data, portalUrl) {
        this.data = {};
        this.portalUrl = portalUrl;

        this.mainPhotoFile = null;
        this.cropperInstances = {};

        this.photoFields = [
            { field: FIELD_MSP_PHOTOS.mainPhoto, id: 'imgMainPhoto' },
            { field: FIELD_MSP_PHOTOS.photo_1,   id: 'previewImage1' },
            { field: FIELD_MSP_PHOTOS.photo_2,   id: 'previewImage2' },
            { field: FIELD_MSP_PHOTOS.photo_3,   id: 'previewImage3' },
            { field: FIELD_MSP_PHOTOS.photo_4,   id: 'previewImage4' },
            { field: FIELD_MSP_PHOTOS.photo_5,   id: 'previewImage5' },
            { field: FIELD_MSP_PHOTOS.photo_6,   id: 'previewImage6' },
            { field: FIELD_MSP_PHOTOS.photo_7,   id: 'previewImage7' },
        ];

        this.initData(data);
        this.initHandlers();
    }

    initData(data) {
        this.data = {};
        for (const key in FIELD_MSP_PHOTOS) {
            if (data.hasOwnProperty(FIELD_MSP_PHOTOS[key])) {
                this.data[FIELD_MSP_PHOTOS[key]] = data[FIELD_MSP_PHOTOS[key]];
            }
        }
    }

    getFields() {
        let data = {};
        for (const photoField of this.photoFields) {
            const elemImg = document.querySelector(`#${photoField.id}`);
            if (elemImg) {
                const fieldData = this.getImageData(elemImg);
                console.log("fieldData = ", fieldData);
                data[photoField.field] = [fieldData.name, fieldData.data];
            }
        }
        for (const id in this.cropperInstances) {
            const fieldData =  this.photoFields.find(field => field.id === id);
            const cropperInstance = this.cropperInstances[id];
            const croppedCanvas = cropperInstance.cropper.getCroppedCanvas();
            const fileName = cropperInstance.fileName;

            const base64Data = croppedCanvas.toDataURL('image/jpeg').split(',')[1];
            data[fieldData?.field] = [fileName, base64Data];
        }
        console.log(data);
        return data;
    }

    getChangedData() {
        const croppedFiles = {};

        for (const id in this.cropperInstances) {
            const fieldData =  this.photoFields.find(field => field.id === id);
            const cropperInstance = this.cropperInstances[id];
            const croppedCanvas = cropperInstance.cropper.getCroppedCanvas();
            const fileName = cropperInstance.fileName;

            const base64Data = croppedCanvas.toDataURL('image/jpeg').split(',')[1];
            // const dataURL = croppedCanvas.toDataURL('image/jpeg');
            // const base64Data = dataURL.split(',')[1];
            croppedFiles[fieldData?.field] = [fileName, base64Data];
        }

        if (this.mainPhotoFile) {
            croppedFiles[FIELD_MSP_PHOTOS.mainPhoto] = this.mainPhotoFile;
        }

        return croppedFiles;
    }

    // getDataFromCropperInstances(id, cropperInstances, photoFields) {
    //     const croppedFiles = {};
    
    //     if (id in cropperInstances) {
    //         const fieldData = photoFields.find(field => field.id === id);
    //         const cropperInstance = cropperInstances[id];
    //         const croppedCanvas = cropperInstance.cropper.getCroppedCanvas();
    //         const fileName = cropperInstance.fileName;
    
    //         const base64Data = croppedCanvas.toDataURL('image/jpeg').split(',')[1];
    //         croppedFiles[fieldData?.field] = [fileName, base64Data];
    //     }
    
    //     return croppedFiles;
    // }
    
    // getCroppedFiles() {
    //     const croppedFiles = {};
    //     for (const id in this.cropperInstances) {
    //         const cropperInstance = this.cropperInstances[id];
    //         const croppedCanvas = cropperInstance.cropper.getCroppedCanvas();
    //         croppedCanvas.toBlob((blob) => {
    //             croppedFiles[cropperInstance.fileName] = blob;
    //         });
    //     }
    //     return croppedFiles;
    // }
    
    renderPhotos() {
        // Получаем все места вставки фотографий и устанавливаем ссылки на них
        this.photoFields.forEach(({ field, id }) => {
            const photoUrl = this.data?.[field]?.urlMachine;
            const elemImg = document.querySelector(`#${id}`);
            this.renderPhoto(photoUrl, elemImg);
        });
    }

    renderPhoto(photoUrl, elemImg) {
        if (photoUrl && elemImg) {
            const filePhoto = this.portalUrl + '/get-image/?url=' + encodeURIComponent(photoUrl);
            const { parentNode } = elemImg;
            const uploadIcon = parentNode.querySelector('.upload-icon');
            const uploadText = parentNode.querySelector('.upload-text');
            const previewImage = parentNode.querySelector('.preview-image');
            if (uploadIcon && uploadText && previewImage) {
                uploadIcon.style.display = 'none';
                uploadText.style.display = 'none';
                previewImage.style.display = 'block';
            }
            elemImg.src = filePhoto;
        }
    }

    initHandlers() {
        const imageInputs = document.querySelectorAll(".preview-image-input");
        imageInputs.forEach((input) => { // Используем стрелочную функцию здесь
            if (!input) {
                return;
            }
            input.addEventListener('change', (event) => {
                const imagePreview = input.parentElement.querySelector("img");
                const file = event.target.files[0];
                const reader = new FileReader();

                reader.onload = (e) => {
                    imagePreview.src = e.target.result;
                    const existingCropper = this.cropperInstances[imagePreview.id]?.cropper;
                    if (existingCropper) {
                        existingCropper.destroy();
                    }
    
                    const cropper = new Cropper(imagePreview, {
                        aspectRatio: NaN,
                        autoCropArea: 1,
                        viewMode: 3,
                        cropBoxResizable: false,
                        zoomable: true,
                        minCropBoxWidth: 0,
                        minCropBoxHeight: 0,
                    });
    
                    this.cropperInstances[imagePreview.id] = {
                        cropper: cropper,
                        fileName: file.name
                    };
                };
                
                if (file) {
                    reader.readAsDataURL(file);
                }
            });
    
            const imagePreview = input.parentElement.querySelector("img");
    
            // imagePreview.addEventListener('click', () => { // Используем стрелочную функцию здесь
            //     input.value = '';
            //     imagePreview.src = '';
            //     input.style.display = 'block';
            // });
        });

        const elemInputMainPhoto = document.querySelector(`.main-photo-upload-input`);
        elemInputMainPhoto.addEventListener('change', (event) => {
            if (event.target.classList.contains('file-upload-input')) {
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
            }
        });

        document.querySelector('.file-upload-label').addEventListener('mouseover', function() {
            this.style.backgroundColor = '#f0f0f0';
        });

        document.querySelector('.file-upload-label').addEventListener('mouseout', function() {
            this.style.backgroundColor = 'transparent';
        });
    }

    getImageData(imgElement) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
    
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;

        ctx.drawImage(imgElement, 0, 0);
    
        const imageData = canvas.toDataURL('image/jpeg');
    
        const fileName = imgElement.src.split('/').pop();
    
        return {
            data: imageData,
            name: fileName
        };
    }

    
}
