import { FIELD_MSP, FIELD_FABRIC } from '../parameters/params_msp.js';

export class PhotoRenderer {
    constructor(data, portalUrl) {
        this.data = data;
        this.portalUrl = portalUrl;
    }

    renderPhotos() {
        const photoFields = [
            { field: FIELD_MSP.mainPhoto, id: 'imgMainPhoto' },
            { field: FIELD_MSP.photo_1,   id: 'imgPhoto_1' },
            { field: FIELD_MSP.photo_2,   id: 'imgPhoto_2' },
            { field: FIELD_MSP.photo_3,   id: 'imgPhoto_3' },
        ];

        photoFields.forEach(({ field, id }) => {
            const photoUrl = this.data?.[field]?.urlMachine;
            const elemImg = document.querySelector(`#${id}`);
            this.renderPhoto(photoUrl, elemImg);
        });
    }

    renderPhoto(photoUrl, elemImg) {
        if (photoUrl) {
            const filePhoto = this.portalUrl + '/get-image/?url=' + encodeURIComponent(photoUrl);
            const { parentNode } = elemImg;
            const uploadIcon = parentNode.querySelector('.upload-icon');
            const uploadText = parentNode.querySelector('.upload-text');
            const previewImage = parentNode.querySelector('.preview-image');
            uploadIcon.style.display = 'none';
            uploadText.style.display = 'none';
            previewImage.style.display = 'block';
            elemImg.src = filePhoto;
        }
    }
}
