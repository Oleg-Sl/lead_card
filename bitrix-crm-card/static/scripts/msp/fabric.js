import { FIELD_MSP, FIELD_FABRIC } from '../parameters/params_msp.js';


export class FabricRenderer {
    constructor(bx24, data, smartFabricList) {
        this.bx24 = bx24;
        this.data = data;
        this.smartFabricList = smartFabricList;
    }

    renderFabrics() {
        const contentHTML = this.getFabricsOptionsSelectHTML();
        const fabricCollectionIds = ['upholsteryFabricCollection', 'upholsteryFabricCollection_1', 'upholsteryFabricCollection_2'];
        fabricCollectionIds.forEach((fabricId, index) => {
            const element = document.querySelector(`#${fabricId}`);
            element.innerHTML = contentHTML;
            this.checkOption(element, this.data?.[FIELD_MSP[fabricId]]);
            $(`#${fabricId}`).chosen();
        });

        const fabricTypesIds = ['#upholsteryFabricType', '#upholsteryFabricType_1', '#upholsteryFabricType_2'];
        const fabricColorsIds = ['#upholsteryFabricColor', '#upholsteryFabricColor_1', '#upholsteryFabricColor_2'];
        [this.data?.[FIELD_MSP.upholsteryFabricCollection], this.data?.[FIELD_MSP.upholsteryFabricCollection_1], this.data?.[FIELD_MSP.upholsteryFabricCollection_2]].forEach((fabricId, index) => {
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

}

