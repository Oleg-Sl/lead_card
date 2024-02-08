import { FIELD_MSP, FIELD_FABRIC } from '../parameters/params_msp.js';


// /            { field: FIELD_MSP.mainPhoto, id: 'previewImageFabric' },

export class FabricRenderer {
    constructor(bx24, data, smartFabricList, portalUrl) {
        this.bx24 = bx24;
        this.portalUrl = portalUrl;

        // элементы выбора ткани
        this.elemChoiceFabric_1 = document.querySelector(`#upholsteryFabricCollection`);
        this.elemChoiceFabric_2 = document.querySelector(`#upholsteryFabricCollection_1`);
        this.elemChoiceFabric_3 = document.querySelector(`#upholsteryFabricCollection_2`);

        //  текущие знчения выбранных тканей
        this.fabricId_1 = data?.[FIELD_MSP.upholsteryFabricCollection];
        this.fabricId_2 = data?.[FIELD_MSP.upholsteryFabricCollection_1];
        this.fabricId_3 = data?.[FIELD_MSP.upholsteryFabricCollection_2];

        // список всех тканей
        this.smartFabricList = smartFabricList;

        this.initHandlers();
    }

    initHandlers() {
        this.elemChoiceFabric_1.addEventListener('chosen:change', (event) => {
            this.fabricId_1 = event.target.value;
            console.log(this.fabricId_1);
            this.renderImage();
            this.setFabricsTypesAndColors();
        });
        this.elemChoiceFabric_2.addEventListener('chosen:change', (event) => {
            this.fabricId_2 = event.target.value;
            this.setFabricsTypesAndColors();
        })
        this.elemChoiceFabric_3.addEventListener('chosen:change', (event) => {
            this.fabricId_3 = event.target.value;
            this.setFabricsTypesAndColors();
        })
    }

    renderFabrics() {
        const contentHTML = this.getFabricsOptionsSelectHTML();

        // добавление всех тканей в список select
        this.elemChoiceFabric_1.innerHTML = contentHTML;
        this.elemChoiceFabric_2.innerHTML = contentHTML;
        this.elemChoiceFabric_3.innerHTML = contentHTML;

        // установка текущей ткани
        this.checkOption(this.elemChoiceFabric_1, this.fabricId_1);
        this.checkOption(this.elemChoiceFabric_2, this.fabricId_2);
        this.checkOption(this.elemChoiceFabric_3, this.fabricId_3);

        // инициализация chosen
        $(`#upholsteryFabricCollection`).chosen();
        $(`#upholsteryFabricCollection_1`).chosen();
        $(`#upholsteryFabricCollection_2`).chosen();

        this.setFabricsTypesAndColors();
        this.renderImage();
    }

    setFabricsTypesAndColors() {
        const fabricTypesIds = ['#upholsteryFabricType', '#upholsteryFabricType_1', '#upholsteryFabricType_2'];
        const fabricColorsIds = ['#upholsteryFabricColor', '#upholsteryFabricColor_1', '#upholsteryFabricColor_2'];
        [this.fabricId_1, this.fabricId_2, this.fabricId_3].forEach((fabricId, index) => {
            const fabric = this.smartFabricList.find(item => item.id == fabricId);
            document.querySelector(fabricTypesIds[index]).value = fabric?.[FIELD_FABRIC.type];
            document.querySelector(fabricColorsIds[index]).value = fabric?.[FIELD_FABRIC.color];
        });
    }

    getFabricsOptionsSelectHTML() {
        let contentHTML = '<option value=""></option>';
        for (const item of this.smartFabricList) {
            contentHTML += `<option value="${item.id}">${item.ufCrm17_1705390515}</option>`;
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

    renderImage() {
        const fabric = this.smartFabricList.find(item => item.id == this.fabricId_1);
        if (fabric) {
            const filePhoto = this.portalUrl + '/get-image/?url=' + encodeURIComponent(fabric?.[FIELD_FABRIC.image]?.urlMachine);
            document.querySelector('#previewImageFabric').src = filePhoto;
        }
    }

}

