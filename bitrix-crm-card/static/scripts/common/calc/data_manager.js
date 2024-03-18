import { SMART_FIELDS_MATERIAL } from './fields.js';
import { DataConnector } from './connector.js';
// import { FabricData } from './fabric.js';
import { DataFormatter } from './formatter.js';


export class DataManager {
    constructor(bx24, smartProductId, entityProductId) {
        this.bx24 = bx24;
        this.smartProductId = smartProductId;
        this.entityProductId = entityProductId;

        this.connector = new DataConnector(this.bx24);
        
        this.currentUser = null;
        this.calculations = [];
    }

    async init() {
        const rawData = await this.connector.getData(this.smartProductId, this.entityProductId);
        const users = await this.connector.getUsersFromBx24(rawData.calculations);
        this.currentUser = rawData?.user;
        console.log("users = ", users);
        console.log("rawData = ", rawData);
        
        this.formatter = new DataFormatter(rawData, users);
        this.calculations = this.formatter.getCalculations(rawData.calculations);
        // console.log(this.calculations);
        this.emptyCalculation = this.formatter.getEmptyCalculation();
        console.log('emptyCalculation = ', this.emptyCalculation);
        // this.emptyCalculation = this.formatter.getCalculation({});
        // console.log(this.emptyCalculation);
    }

    addCalculation(calculation) {
        const calculationData = this.formatter.getCalculation(calculation);
        this.calculations.push(calculationData);
        return calculationData;
    }

    getCalculation(calculationId) {
        const calculation = this.calculations.find(calculation => calculation.id == calculationId);
        return calculation;
    }

    getCopyCalculation(calculationId) {
        const calculation = this.getCalculation(calculationId);
        const newCalculation = this.formatter.getCopyCalculation(calculation);
        return newCalculation;
    }

    getLastDateMaterialCost() {
        const material = this.formatter.findLastDate();
        // console.log("last material = ", material);
        return material?.[SMART_FIELDS_MATERIAL.datePriceValidity];
    }


};
