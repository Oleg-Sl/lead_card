import { DataFormatter } from './formatter.js';
import { DataConnector } from './connector.js';
// import { FakeBitrixService } from './bx24.js';
import { ModalUnmutable, ModalMutable } from './modal.js';
import {
    SMART_ID_PRODUCT,
  
    SMART_ID_MATERIAL,
    SMART_ID_HISTORY,
    SMART_ID_COEFFICIENT,

    MATERIAL_FIELDS,
    HISTORY_FIELDS,
    COEFFICIENT_FIELDS,
  
    SMART_FIELDS_MATERIAL,
    SMART_FIELDS_HISTORY,
    HISTORY_FABRICS_FIELDS,
    SMART_FIELDS_COEFFICIENT,
    SMART_FIELDS_FABRICS,

} from './fields.js';


class MainWindow {
    constructor(manager, container) {
        this.manager = manager;
        this.container = container;
        this.containerList = this.container.querySelector('tbody');
        this.initHandler();
    }

    initHandler() {
        this.containerList.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('show-calculation-window')) {
                const smartId = target.closest('tr').dataset.id;
                this.manager.openModal(smartId);
            }
        });

        this.container.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('product-btn-save')) {
                this.manager.openModal();
            }
        });
    }

    createElement(material) {
        const materialHTML = this.getMaterialHTML(material);
        this.containerList.insertAdjacentHTML('beforeend', materialHTML);
    }

    getMaterialHTML(material) {
        console.log(material);
        return `
            <tr data-id="${material.id}">
                <td class="p-0 m-0">
                    <strong class="show-calculation-window"style="text-decoration: underline; color: #0e6efd; cursor: pointer;">Ссылка</strong>
                </td>
                <td class="p-0 m-0">
                    ${this.formatDate(material.datePriceValidityOfToday)}
                </td>
                <td class="p-0 m-0">
                    <a href="#" data-user-link="${this.getUserLink(material.createdBy)}">${this.getUserName(material.createdBy)}</a>
                </td>
                <td class="p-0 m-0">
                    ${material.comment}
                </td>
            </tr>
        `;
    }

    formatDate(inputDate) {
        const dateObj = new Date(inputDate);
        if (isNaN(dateObj.getTime())) {
            return "";
        }

        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObj.getFullYear();
        return `${day}.${month}.${year}`;
    }

    getUserName(user) {
        return `${user?.LAST_NAME} ${user?.NAME}`;
    }

    getUserLink(user) {
        return `/company/personal/user/${user?.ID}/`;
    }
};


export class Calculation {
    constructor(bx24, smartProductId, entityProductId, modal, calculationContainer) {
        this.bx24 = bx24;
        this.smartProductId = smartProductId;
        this.entityProductId = entityProductId;
        this.modal = modal;
        this.calculationContainer = calculationContainer;

        this.modalUnmutable = new ModalUnmutable(this, this.modal);
        this.modalMutable = new ModalMutable(this, this.modal);
        this.connector = new DataConnector(this.bx24);
        this.calculationsRender = new MainWindow(this, this.calculationContainer);

        this.user = null;
        this.calculations = null;

        this.rawData = null;
    }

    async init() {
        this.rawData = await this.connector.getData(this.smartProductId, this.entityProductId);
        this.users = await this.connector.getUsersFromBx24(this.rawData.histories);
        this.calculations = DataFormatter.formatData(
            this.rawData.materials,
            this.rawData.histories,
            this.rawData.coefficients,
            this.rawData.fieldsHystory,
            this.rawData.fabrics,
            this.users
        );
        this.user = this.rawData.user;

        for (const calculation of this.calculations) {
            this.calculationsRender.createElement(calculation);
        }
    }

    async openModal(calculateId=null) {
        if (calculateId) {
            const calculate = this.calculations.find(calculation => calculation.id == calculateId);
            this.modalUnmutable.openModal(calculate);
            return;
        }
        const calculate = DataFormatter.formatEmptyItem(
            this.rawData.materials,
            this.rawData.coefficients,
            this.rawData.fieldsHystory,
            this.rawData.fabrics,
            this.users
        );
        this.modalMutable.openModal(calculate);
    }
  
    saveCalculation(calculateData) {
        // console.log('data = ', data);
        this.createCalculation(calculateData);
        // const calculate = this.calculations.find(calculation => calculation.id == calculateId);
        // console.log('calculate = ', calculate);
    }

    async copyCalculation(calculateId, data) {
        const calculate = this.calculations.find(calculation => calculation.id == calculateId);
        const priceMaterials = DataFormatter.findLastDate(this.rawData.materials, SMART_FIELDS_MATERIAL.datePriceValidity);
        let newData = {
            costPrice: +calculate?.workRating,
            createdBy: this.user.ID,
            datePriceValidity: priceMaterials[SMART_FIELDS_MATERIAL.datePriceValidity],
            datePriceValidityOfToday: new Date().toISOString(),
            workRating: +calculate?.workRating,
            workComment: calculate?.workComment,
            comment: calculate?.comment
        };

        for (const material of calculate.materials) {
            if (material.isChangePrice) {
                newData[`${material.field}Price`] = material.price;
            } else if (HISTORY_FABRICS_FIELDS.includes(material.field)) {
                newData[`${material.field}Price`] = material.price;
            } else {
                newData[`${material.field}Price`] = priceMaterials[SMART_FIELDS_MATERIAL[material.field]];
            }
            newData[`${material.field}Value`] = material.value;
            newData[`${material.field}Amount`] = +newData[`${material.field}Price`] * +newData[`${material.field}Value`] * +material.coefficient;
            newData[`${material.field}Comment`] = material.comment;
            newData.costPrice += +newData[`${material.field}Amount`];
        }

        let calculateData = {
            // [`parentId${SMART_ID_PRODUCT}`]: this.smartProductId
        };
        for (const field in newData) {
            if (SMART_FIELDS_HISTORY[field]) {
                calculateData[SMART_FIELDS_HISTORY[field]] = newData[field];
            }
        }

        this.createCalculation(calculateData);
    }

    async createCalculation(calculateData) {
        calculateData[`parentId${SMART_ID_PRODUCT}`] = this.entityProductId;
        calculateData[SMART_FIELDS_HISTORY.datePriceValidity] = this.getLastDateCreatedMaterials();

        const result = await this.bx24.callMethod('crm.item.add', {
            entityTypeId: SMART_ID_HISTORY,
            fields: calculateData
        });

        const calculate = DataFormatter.formatCalculationData(
            this.rawData.materials,
            result?.result?.item,
            this.rawData.coefficients,
            this.rawData.fieldsHystory,
            this.rawData.fabrics,
            this.users
        );
        this.calculations.push(calculate);
        this.calculationsRender.createElement(calculate);
    }

    getLastDateCreatedMaterials() {
        if (!this.rawData.materials.length) {
            return null;
        }
    
        let maxDate = new Date(this.rawData.materials[0][SMART_FIELDS_MATERIAL.datePriceValidity]);
        for (let i = 1; i < this.rawData.materials.length; i++) {
            const currentDate = new Date(this.rawData.materials[i][SMART_FIELDS_MATERIAL.datePriceValidity]);
            if (currentDate > maxDate) {
                maxDate = currentDate;
            }
        }

        return maxDate.toISOString();
    }
}


// async function main() {
//     const smartProductId = 172;
//     const entityProductId = 41
//     const bx24 = new FakeBitrixService();
//     const modal = document.querySelector('#calculationWindow');
//     const calculationContainer = document.querySelector('#productCalculations');
//     const calculationManager = new Calculation(bx24, smartProductId, entityProductId, modal, calculationContainer);
//     await calculationManager.init();

// }

// document.addEventListener('DOMContentLoaded', function() {
//     main();
// })
