import { FIELD_MSP, FIELD_FABRIC } from '../parameters/params_msp.js';

export class PhotoRenderer {
    constructor(data, portalUrl) {
        this.data = data;
        this.portalUrl = portalUrl;
    }
    
    // /            { field: FIELD_MSP.mainPhoto, id: 'previewImageFabric' },
    renderPhotos() {
        const photoFields = [
            { field: FIELD_MSP.mainPhoto, id: 'imgMainPhoto' },
            { field: FIELD_MSP.photo_1,   id: 'previewImage1' },
            { field: FIELD_MSP.photo_2,   id: 'previewImage2' },
            { field: FIELD_MSP.photo_3,   id: 'previewImage3' },
            { field: FIELD_MSP.photo_4,   id: 'previewImage4' },
            { field: FIELD_MSP.photo_5,   id: 'previewImage5' },
            { field: FIELD_MSP.photo_6,   id: 'previewImage6' },
            { field: FIELD_MSP.photo_7,   id: 'previewImage7' },
        ];

        // Получаем все места вставки фотографий и устанавливаем ссылки на них
        photoFields.forEach(({ field, id }) => {
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
}
