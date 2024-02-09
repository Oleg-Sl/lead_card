import { FIELD_MSP, FIELD_FABRIC } from '../parameters/params_msp.js';

export class PhotoRenderer {
    constructor(data, portalUrl) {
        this.data = data;
        this.portalUrl = portalUrl;

        this.mainPhotoFile = null;
        this.cropperInstances = {};


        this.photoFields = [
            { field: FIELD_MSP.mainPhoto, id: 'imgMainPhoto' },
            { field: FIELD_MSP.photo_1,   id: 'previewImage1' },
            { field: FIELD_MSP.photo_2,   id: 'previewImage2' },
            { field: FIELD_MSP.photo_3,   id: 'previewImage3' },
            { field: FIELD_MSP.photo_4,   id: 'previewImage4' },
            { field: FIELD_MSP.photo_5,   id: 'previewImage5' },
            { field: FIELD_MSP.photo_6,   id: 'previewImage6' },
            { field: FIELD_MSP.photo_7,   id: 'previewImage7' },
        ];

        this.initHandlers();
    }

    getChangedData() {
        const croppedFiles = [];
        for (const id in this.cropperInstances) {
            const cropperInstance = this.cropperInstances[id];
            const croppedCanvas = cropperInstance.cropper.getCroppedCanvas();
            const fileName = cropperInstance.fileName;

            // Получаем данные изображения в формате base64
            const dataURL = croppedCanvas.toDataURL('image/jpeg'); // Можно выбрать нужный формат изображения

            // Отделяем префикс "data:image/jpeg;base64," от данных
            const base64Data = dataURL.split(',')[1];

            // Добавляем название файла и его данные в массив
            croppedFiles.push([fileName, base64Data]);
        }

        croppedFiles.push(this.mainPhotoFile);

        return croppedFiles;

    }
    
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
    
            imagePreview.addEventListener('click', () => { // Используем стрелочную функцию здесь
                input.value = '';
                imagePreview.src = '';
                input.style.display = 'block';
            });
        });

        const elemInputMainPhoto = document.querySelector(`.main-photo-upload-input`);
        elemInputMainPhoto.addEventListener('change', (event) => {
            if (event.target.classList.contains('file-upload-input')) {
                const parent = event.target.parentNode;
                const fileInput = event.target;
                this.mainPhotoFile = fileInput.files[0];

                if (this.mainPhotoFile) {
                    const uploadIcon = parent.querySelector('.upload-icon');
                    const uploadText = parent.querySelector('.upload-text');
                    const previewImage = parent.querySelector('.preview-image');

                    uploadIcon.style.display = 'none';
                    uploadText.style.display = 'none';
                    previewImage.style.display = 'block';
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        previewImage.src = e.target.result;
                    };
                    reader.readAsDataURL(this.mainPhotoFile);
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

    
}
