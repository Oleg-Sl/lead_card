import { FIELD_MSP, FIELD_FABRIC } from '../parameters/params_msp.js';

export class PhotoRenderer {
    constructor(data, portalUrl) {
        this.data = data;
        this.portalUrl = portalUrl;

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
        console.log("imageInputs = ", imageInputs);
        
        imageInputs.forEach(function(input) {
            if (!input) {
                return;
            }
            input.addEventListener('change', (event) => {
                const imagePreview = input.parentElement.querySelector("img");
                const file = event.target.files[0];
                const reader = new FileReader();
                console.log("imagePreview = ", imagePreview);
                console.log("file = ", file);
                
                reader.onload = (e) => {
                    imagePreview.src = e.target.result;
                    const existingCropper = this.cropperInstances[imagePreview.id]?.cropper;
                    if (existingCropper) {
                        existingCropper.destroy();
                    }

                    const cropper = new Cropper(imagePreview, {
                        aspectRatio: NaN, // Убрать фиксированное соотношение сторон
                        autoCropArea: 1, // Заполнить область обрезки на всю доступную площадь
                        viewMode: 3, // Показывать только область обрезки
                        cropBoxResizable: false, // Запретить изменение размеров области обрезки
                        zoomable: true, // Разрешить изменение масштаба изображения
                        minCropBoxWidth: 0, // Разрешить уменьшение ширины области обрезки до нуля
                        minCropBoxHeight: 0, // Разрешить уменьшение высоты области обрезки до нуля
                    });

                    this.cropperInstances[imagePreview.id] = {
                        cropper: cropper,
                        fileName: file.name // Сохраняем имя файла
                    };
                };
                
                if (file) {
                    reader.readAsDataURL(file); // Чтение изображения
                }
            });

            const imagePreview = input.parentElement.querySelector("img");

            imagePreview.addEventListener('click', function() {
                input.value = '';
                imagePreview.src = '';
                input.style.display = 'block';
            });
        });
}
}
