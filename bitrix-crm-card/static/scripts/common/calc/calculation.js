// import { DataFormatter } from './formatter.js';
// import { DataConnector } from './connector.js';
// // import { FakeBitrixService } from './bx24.js';
// import { ModalUnmutable, ModalMutable } from './modal.js';
// import {
//     SMART_ID_PRODUCT,
  
//     SMART_ID_MATERIAL,
//     SMART_ID_HISTORY,
//     SMART_ID_COEFFICIENT,

//     MATERIAL_FIELDS,
//     HISTORY_FIELDS,
//     COEFFICIENT_FIELDS,
  
//     SMART_FIELDS_MATERIAL,
//     SMART_FIELDS_HISTORY,
//     HISTORY_FABRICS_FIELDS,
//     SMART_FIELDS_COEFFICIENT,
//     SMART_FIELDS_FABRICS,

// } from './fields.js';

import {
    SMART_FIELDS_CALCULATION,
    SMART_ID_PRODUCT,
    SMART_ID_CALCULATION,
} from './fields.js';
import { DataManager } from './data_manager.js';
import { CalculationsContainer } from './calculations_container.js';
import { ModalUnmutable } from './modal_unmutable.js';
import { ModalMutable } from './modal_mutable.js';


export class Calculation {
    constructor(bx24, smartProductId, entityProductId, modal, calculationContainer) {
        this.bx24 = bx24;
        this.smartProductId = smartProductId;
        this.entityProductId = entityProductId;
        this.modal = modal;
        this.calculationContainer = calculationContainer;

        this.dataManager = new DataManager(this.bx24, this.smartProductId, this.entityProductId);
        this.calculationContainer = new CalculationsContainer(this, this.calculationContainer);
        this.modalUnmutable = new ModalUnmutable(this, this.modal);
        this.modalMutable = new ModalMutable(this, this.modal);
    }

    async init() {
        await this.dataManager.init();
        this.calculationContainer.renderCalculations(this.dataManager.calculations);

        // for (const calculation of this.calculations) {
        //     this.calculationsRender.createElement(calculation);
        // }
    }

    async openModal(calculateId=null) {
        // console.log("calculateId = ", calculateId);
        if (calculateId) {
            const calculation = this.dataManager.getCalculation(calculateId);
            // console.log("calculation = ", calculation);
            this.modalUnmutable.openModal(calculation);
            return;
        }
        const calculationData = this.dataManager.emptyCalculation;
        console.log("!!!calculationData = ", calculationData);
        // const calculate = DataFormatter.formatEmptyItem(
        //     this.rawData.materials,
        //     this.rawData.coefficients,
        //     this.rawData.fieldsHystory,
        //     this.rawData.fabrics,
        //     this.users
        // );
        this.modalMutable.openModal(calculationData);
    }
  
    // saveCalculation(calculateData) {
    //     // console.log('data = ', data);
    //     this.createCalculation(calculateData);
    //     // const calculate = this.calculations.find(calculation => calculation.id == calculateId);
    //     // console.log('calculate = ', calculate);
    // }

    async copyCalculation(calculateId) {
        // const calculation = this.dataManager.getCalculation(calculateId);
        const calculationData = this.dataManager.getCopyCalculation(calculateId);
        console.log("calculation = ", calculationData);
        this.modalMutable.openModal(calculationData);


        // const calculate = this.calculations.find(calculation => calculation.id == calculateId);
        // const priceMaterials = DataFormatter.findLastDate(this.rawData.materials, SMART_FIELDS_MATERIAL.datePriceValidity);
        // let newData = {
        //     costPrice: +calculate?.workRating,
        //     createdBy: this.user.ID,
        //     datePriceValidity: priceMaterials[SMART_FIELDS_MATERIAL.datePriceValidity],
        //     datePriceValidityOfToday: new Date().toISOString(),
        //     workRating: +calculate?.workRating,
        //     workComment: calculate?.workComment,
        //     comment: calculate?.comment
        // };

        // for (const material of calculate.materials) {
        //     if (material.isChangePrice) {
        //         newData[`${material.field}Price`] = material.price;
        //     } else if (HISTORY_FABRICS_FIELDS.includes(material.field)) {
        //         newData[`${material.field}Price`] = material.price;
        //     } else {
        //         newData[`${material.field}Price`] = priceMaterials[SMART_FIELDS_MATERIAL[material.field]];
        //     }
        //     newData[`${material.field}Value`] = material.value;
        //     newData[`${material.field}Amount`] = +newData[`${material.field}Price`] * +newData[`${material.field}Value`] * +material.coefficient;
        //     newData[`${material.field}Comment`] = material.comment;
        //     newData.costPrice += +newData[`${material.field}Amount`];
        // }

        // let calculateData = {};
        // for (const field in newData) {
        //     if (SMART_FIELDS_HISTORY[field]) {
        //         calculateData[SMART_FIELDS_HISTORY[field]] = newData[field];
        //     }
        // }
        // console.log('calculateData = ', calculateData);
        // const calculateCopy = DataFormatter.formatEmptyItem(
        //     this.rawData.materials,
        //     this.rawData.coefficients,
        //     calculateData,
        //     this.rawData.fabrics,
        //     this.users
        // );

        // console.log('calculateCopy = ', calculateCopy);

        // this.modalMutable.openModal(calculateCopy);
        // this.createCalculation(calculateData);
    }

    async createCalculation(calculateData) {
        calculateData[`parentId${SMART_ID_PRODUCT}`] = this.entityProductId;
        calculateData[SMART_FIELDS_CALCULATION.datePriceValidity] = this.dataManager.getLastDateMaterialCost();
        calculateData[SMART_FIELDS_CALCULATION.createdBy] = this.dataManager.currentUser.ID;

        const result = await this.bx24.callMethod('crm.item.add', {
            entityTypeId: SMART_ID_CALCULATION,
            fields: calculateData
        });

        const calculation = this.dataManager.addCalculation(result?.item);
        this.calculationContainer.createCalculation(calculation);

        // const calculate = DataFormatter.formatCalculationData(
        //     this.rawData.materials,
        //     result?.item,
        //     this.rawData.coefficients,
        //     this.rawData.fieldsHystory,
        //     this.rawData.fabrics,
        //     this.users
        // );
        // this.calculations.push(calculate);
        // this.calculationsRender.createElement(calculate);
    }

    // getLastDateCreatedMaterials() {
    //     if (!this.rawData.materials.length) {
    //         return null;
    //     }

    //     let maxDate = new Date(this.rawData.materials[0][SMART_FIELDS_MATERIAL.datePriceValidity]);
    //     for (let i = 1; i < this.rawData.materials.length; i++) {
    //         const currentDate = new Date(this.rawData.materials[i][SMART_FIELDS_MATERIAL.datePriceValidity]);
    //         if (currentDate > maxDate) {
    //             maxDate = currentDate;
    //         }
    //     }

    //     return maxDate.toISOString();
    // }
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
