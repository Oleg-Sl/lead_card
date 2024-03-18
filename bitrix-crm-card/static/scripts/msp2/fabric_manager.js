import { 
    FIELD_MSP_FABRICS,
    SMART_FIELDS_FABRICS,
} from './params.js';


export class FabricManager {
    constructor(bx24, data) {
        this.bx24 = bx24;
        this.dataManager = data;

        // элементы выбора ткани
        this.elemChoiceFabric_1 = document.querySelector(`#upholsteryFabricCollection`);
        this.elemChoiceFabric_2 = document.querySelector(`#upholsteryFabricCollection_1`);
        this.elemChoiceFabric_3 = document.querySelector(`#upholsteryFabricCollection_2`);

        //  текущие знчения выбранных тканей
        this.fabric_1 = this.dataManager?.product?.[FIELD_MSP_FABRICS.upholsteryFabricCollection];
        this.fabric_2 = this.dataManager?.product?.[FIELD_MSP_FABRICS.upholsteryFabricCollection_1];
        this.fabric_3 = this.dataManager?.product?.[FIELD_MSP_FABRICS.upholsteryFabricCollection_2];

        // список всех тканей
        this.fabricsList = this.dataManager?.fabrics;
    }

    init() {
        this.infoFabric_1 = new FabricInfo(this.bx24, this.elemChoiceFabric_1);
        this.infoFabric_2 = new FabricInfo(this.bx24, this.elemChoiceFabric_2);
        this.infoFabric_3 = new FabricInfo(this.bx24, this.elemChoiceFabric_3);

        this.infoFabric_1.setFabricData(this.fabricsList.find(item => item.id == this.fabric_1) || {});
        this.infoFabric_2.setFabricData(this.fabricsList.find(item => item.id == this.fabric_2) || {});
        this.infoFabric_3.setFabricData(this.fabricsList.find(item => item.id == this.fabric_3) || {});

        this.render();
        this.initHandler();
    }

    initHandler() {
        // инициализация chosen
        $(this.elemChoiceFabric_1).chosen().change((event) => {
            this.fabric_1 = event.target.value;
            const fabric = this.fabricsList.find(item => item.id == this.fabric_1) || {};
            this.infoFabric_1.setFabricData(fabric);
            this.setFabricsTypesAndColors();
        });
        $(this.elemChoiceFabric_2).chosen().change((event) => {
            this.fabric_2 = event.target.value;
            const fabric = this.fabricsList.find(item => item.id == this.fabric_2) || {};
            this.infoFabric_2.setFabricData(fabric);
            this.setFabricsTypesAndColors();
        });
        $(this.elemChoiceFabric_3).chosen().change((event) => {
            this.fabric_3 = event.target.value;
            const fabric = this.fabricsList.find(item => item.id == this.fabric_3) || {};
            this.infoFabric_3.setFabricData(fabric);
            this.setFabricsTypesAndColors();
        });
    }

    // initData(data) {
    //     this.data = {};
    //     for (const key in FIELD_MSP_FABRICS) {
    //         if (data.hasOwnProperty(FIELD_MSP_FABRICS[key])) {
    //             this.data[key] = data[FIELD_MSP_FABRICS[key]];
    //         }
    //     }
    // }

    getFields() {
        return {
            [FIELD_MSP_FABRICS.upholsteryFabricCollection]: this.fabric_1,
            [FIELD_MSP_FABRICS.upholsteryFabricCollection_1]: this.fabric_2,
            [FIELD_MSP_FABRICS.upholsteryFabricCollection_2]: this.fabric_3
        };
    }

    render() {
        const contentHTML = this.getFabricsOptionsSelectHTML();

        // добавление всех тканей в список select
        this.elemChoiceFabric_1.innerHTML = contentHTML;
        this.elemChoiceFabric_2.innerHTML = contentHTML;
        this.elemChoiceFabric_3.innerHTML = contentHTML;

        // установка текущей ткани
        this.checkOption(this.elemChoiceFabric_1, this.fabric_1);
        this.checkOption(this.elemChoiceFabric_2, this.fabric_2);
        this.checkOption(this.elemChoiceFabric_3, this.fabric_3);

        this.setFabricsTypesAndColors();
    }

    setFabricsTypesAndColors() {
        const selectedList = [this.elemChoiceFabric_1, this.elemChoiceFabric_2, this.elemChoiceFabric_3];
        selectedList.forEach((elem, index) => {
            const idElemType = elem.getAttribute('data-fabric-type-id');
            const idElemColor = elem.getAttribute('data-fabric-color-id');
            const elemType = document.getElementById(idElemType);
            const elemColor = document.getElementById(idElemColor);
            const fabric = this.fabricsList.find(item => item.id == elem.value);
            elemType.value = fabric?.[SMART_FIELDS_FABRICS.type] || '';
            elemColor.value = fabric?.[SMART_FIELDS_FABRICS.color] || '';
        })
    }

    getFabricsOptionsSelectHTML() {
        let contentHTML = '<option value=""></option>';
        for (const item of this.fabricsList) {
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

    // renderImage() {
    //     const fabric = this.smartFabricList.find(item => item.id == this.fabricId_1);
    //     if (fabric) {
    //         const filePhoto = this.portalUrl + '/get-image/?url=' + encodeURIComponent(fabric?.[SMART_FIELDS_FABRICS.image]?.urlMachine);
    //         document.querySelector('#previewImageFabric').src = filePhoto;
    //     }
    // }

    getChangedData() {
        this.fabricId_1 = this.elemChoiceFabric_1.value;
        this.fabricId_2 = this.elemChoiceFabric_2.value;
        this.fabricId_3 = this.elemChoiceFabric_3.value;
        return {
            [FIELD_MSP_FABRICS.upholsteryFabricCollection]: this.elemChoiceFabric_1.value,
            [FIELD_MSP_FABRICS.upholsteryFabricCollection_1]: this.elemChoiceFabric_2.value,
            [FIELD_MSP_FABRICS.upholsteryFabricCollection_2]: this.elemChoiceFabric_3.value
        };
    }
    
    getFields() {
        return this.getChangedData();
    }
}


class FabricInfo {
    constructor(bx24, select) {
        this.bx24 = bx24;
        this.select = select;
        this.idWindowInfo = this.select.dataset.target;
        this.elemWindowInfo = document.getElementById(this.idWindowInfo);
        this.container = document;
    }

    setFabricData(fabricData) {
        if (!fabricData) {
            fabricData = {};
        }

        const providerElement = this.elemWindowInfo.querySelector('.fabric-provider');
        const collectionElement = this.elemWindowInfo.querySelector('.fabric-collection');
        const colorElement = this.elemWindowInfo.querySelector('.fabric-color');
        const priceElement = this.elemWindowInfo.querySelector('.fabric-price');
        const linkElement = this.elemWindowInfo.querySelector('.fabric-link');

        providerElement.textContent = fabricData[SMART_FIELDS_FABRICS.provider];
        collectionElement.textContent = fabricData[SMART_FIELDS_FABRICS.collection];
        colorElement.textContent = fabricData[SMART_FIELDS_FABRICS.color];
        priceElement.textContent = fabricData[SMART_FIELDS_FABRICS.price];
        linkElement.textContent = fabricData[SMART_FIELDS_FABRICS.link];
        linkElement.href = fabricData[SMART_FIELDS_FABRICS.link];
    }

    async fetchFabricData(fabricId) {
        try {
          const response = await this.bx24.callMethod('crm.item.get', {
            entityTypeId: SMART_ID_FABRIC,
            id: fabricId,
          });
          return response?.result?.item;
        } catch (error) {
          console.error('Ошибка при получении данных о ткани:', error);
          return null;
        }
    }
}
