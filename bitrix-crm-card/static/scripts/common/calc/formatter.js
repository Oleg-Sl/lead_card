import {
    SMART_ID_PRODUCT,
  
    SMART_ID_MATERIAL,
    SMART_ID_CALCULATION,
    SMART_ID_COEFFICIENT,

    MATERIAL_FIELDS,
    CALCULATION_FIELDS,
    COEFFICIENT_FIELDS,
  
    SMART_FIELDS_MATERIAL,
    SMART_FIELDS_CALCULATION,
    CALCULATION_FABRICS_FIELDS,
    SMART_FIELDS_COEFFICIENT,
    SMART_FIELDS_FABRICS,

} from './fields.js';


export class DataFormatter {
    constructor(rawData, users) {
        this.materials = rawData.materials;
        this.calculations = rawData.calculations;
        this.coefficients = rawData.coefficients;
        this.calculationFields = rawData.calculationFields;
        this.fabrics = rawData.fabrics;
        this.users = users;
        console.log("this.materials = ", this.materials);
        // this.emptyCalculation = this.getEmptyCalculation();

    }

    getCalculations(calculations) {
        let dataList = [];
        for (const calculation of calculations) {
            const calculationData = this.getCalculation(calculation);
            dataList.push(calculationData);
        }
        return dataList;
    }

    getCalculation(calculation) {
        const userId = calculation?.[SMART_FIELDS_CALCULATION.createdBy];
        const materials = this.getMaterials(calculation);
        // console.log('calculation = ', calculation);
        return {
            id: calculation?.id,
            dateCreated: calculation?.[SMART_FIELDS_CALCULATION.dateCreated],
            datePriceValidity: calculation?.[SMART_FIELDS_CALCULATION.datePriceValidity],
            datePriceValidityOfToday: calculation?.[SMART_FIELDS_CALCULATION.datePriceValidityOfToday],
            workRating: calculation?.[SMART_FIELDS_CALCULATION.workRating] || 0,
            workComment: calculation?.[SMART_FIELDS_CALCULATION.workComment],
            costPrice: calculation?.[SMART_FIELDS_CALCULATION.costPrice] || 0,
            comment: calculation?.[SMART_FIELDS_CALCULATION.comment],
            createdBy: this.users?.[userId],
            materials: materials,
        };
    }

    getMaterials(calculation) {
        const datePriceValidity = calculation?.[SMART_FIELDS_CALCULATION.datePriceValidity];
        const material = this.findClosestDateLessThanOrEqual(datePriceValidity, SMART_FIELDS_MATERIAL.datePriceValidity);
        const materialsFromCalculation = this.getMaterialsFromCalculation(calculation);
        const materialsFromMaterials = this.getMaterialsFromMaterials(calculation, material)
        return materialsFromCalculation.concat(materialsFromMaterials);
    }

    // Перебор полей смарт-процесса "список расчетов - calculation"
    getMaterialsFromCalculation(calculation) {
        let data = [];
        for (const field of CALCULATION_FIELDS) {
            const item = {
                field: field,
                title: this.getTitle(field),
                isChangePrice: !CALCULATION_FABRICS_FIELDS.includes(field),
                price: !CALCULATION_FABRICS_FIELDS.includes(field) ? 0 : this.getFabricPrice(this.fabrics, field),
                coefficient: this.getCoefficient(field),
                value: calculation[SMART_FIELDS_CALCULATION[`${field}Value`]] || 0,
                amount: calculation[SMART_FIELDS_CALCULATION[`${field}Amount`]] || 0,
                comment: calculation[SMART_FIELDS_CALCULATION[`${field}Comment`]] || '',
            };
            data.push(item);
        }
        return data;
    }

    // Перебор полей смарт-процесса "база материалов"
    getMaterialsFromMaterials(calculation, material) {
        let data = [];
        // const datePriceValidity = calculation?.[SMART_FIELDS_CALCULATION.datePriceValidity];
        // const material = this.findClosestDateLessThanOrEqual(datePriceValidity, SMART_FIELDS_MATERIAL.datePriceValidity);
        for (const field of MATERIAL_FIELDS) {
            const item = {
                field: field,
                title: this.getTitle(field),
                isChangePrice: false,
                price: material?.[SMART_FIELDS_MATERIAL[field]] || 0,
                coefficient: this.getCoefficient(field),
                value: calculation[SMART_FIELDS_CALCULATION[`${field}Value`]] || 0,
                amount: calculation[SMART_FIELDS_CALCULATION[`${field}Amount`]] || 0,
                comment: calculation[SMART_FIELDS_CALCULATION[`${field}Comment`]] || '',
            };
            data.push(item);
        };
        return data;
    }

    getCoefficient(field) {
        if (!COEFFICIENT_FIELDS.includes(field)) {
            return 1;
        }
        if (!this.coefficients) {
            return 1;
        }
        return this.coefficients[SMART_FIELDS_COEFFICIENT[field]] || 1;
    }

    findClosestDateLessThanOrEqual(targetDate, fieldDateAcualedMaterial) {
        const targetDateObj = new Date(targetDate);
        let closestItem = null;
        let closestDate = null;
        for (const material of this.materials) {
            const itemDate = new Date(material[fieldDateAcualedMaterial]);
            if (!isNaN(itemDate.getTime()) && (itemDate <= targetDateObj && (closestDate === null || itemDate > closestDate))) {
                closestItem = material;
                closestDate = itemDate;
            }
        }
    
        return closestItem;
    }

    getTitle(field) {
        const fieldBx24 = SMART_FIELDS_CALCULATION?.[`${field}Value`];
        const rawTitle = this.calculationFields?.[fieldBx24]?.title;
        return this.trimFabricName(rawTitle);
    }

    trimFabricName(value) {
        if (!value) {
            return '';
        }
        const parts = value.split('(');
        return parts[0].trim();
    }

    getFabricPrice(fabrics, field) {
        const fabric = fabrics?.[field];
        return fabric?.[SMART_FIELDS_FABRICS.price] || 0;
    }

    getEmptyCalculation(calculation) {
        const material = this.findLastDate();
        const materialsFromCalculation = this.getMaterialsFromCalculation({});
        const materialsFromMaterials = this.getMaterialsFromMaterials({}, material)
        return {
            datePriceValidity: material?.[SMART_FIELDS_MATERIAL.datePriceValidity],
            datePriceValidityOfToday: material?.[SMART_FIELDS_MATERIAL.datePriceValidity],
            workRating: calculation?.[SMART_FIELDS_CALCULATION.workRating] || 0,
            workComment: calculation?.[SMART_FIELDS_CALCULATION.workComment] || '',
            costPrice: calculation?.[SMART_FIELDS_CALCULATION.costPrice] || 0,
            comment: calculation?.[SMART_FIELDS_CALCULATION.comment] || '',
            materials: materialsFromCalculation.concat(materialsFromMaterials)
        };
    }

    getCopyCalculation(calculation) {
        const costMaterials = this.findLastDate();
        for (let material of calculation.materials) {
            if (MATERIAL_FIELDS.includes(material.field)) {
                material.price = +costMaterials?.[SMART_FIELDS_MATERIAL[material.field]] || 0;
            }
        }

        return {
            datePriceValidity: costMaterials?.[SMART_FIELDS_MATERIAL.datePriceValidity],
            datePriceValidityOfToday: costMaterials?.[SMART_FIELDS_MATERIAL.datePriceValidity],
            workRating: calculation?.workRating || 0,
            workComment: calculation?.workComment,
            costPrice: calculation?.costPrice || 0,
            comment: calculation?.comment,
            materials: calculation.materials,
        };
    }

    // formatEmptyItem(materials, coefficients, fieldsHystory, fabrics) {
    //     let data = [];

    //     // Перебор полей смарт-процесса "история history расчетов"
    //     for (const field of CALCULATION_FIELDS) {
    //         const item = {
    //             field: field,
    //             title: this.getTitle(field, fieldsHystory),
    //             isChangePrice: !CALCULATION_FABRICS_FIELDS.includes(field),
    //             price: !CALCULATION_FABRICS_FIELDS.includes(field) ? 0 : this.getFabricPrice(fabrics, field),
    //             coefficient: this.getCoefficient(field, coefficients),
    //             value: 0,
    //             amount: 0,
    //             comment: '',
    //         };
    //         data.push(item);
    //     }

    //     // Перебор полей смарт-процесса "база материалов"
    //     const material = this.findLastDate(materials, SMART_FIELDS_MATERIAL.datePriceValidity);
    //     for (const field of MATERIAL_FIELDS) {
    //         const item = {
    //             field: field,
    //             title: this.getTitle(field,fieldsHystory),
    //             isChangePrice: false,
    //             price: material?.[SMART_FIELDS_MATERIAL[field]] || 0,
    //             coefficient: this.getCoefficient(field, coefficients),
    //             value: 0,
    //             amount: 0,
    //             comment: '',
    //         };
    //         data.push(item);
    //     };

    //     return {
    //         id: history?.id,
    //         datePriceValidity: material?.[SMART_FIELDS_MATERIAL.datePriceValidity],
    //         datePriceValidityOfToday: new Date().toISOString(),
    //         workRating: 0,
    //         workComment: '',
    //         costPrice: 0,
    //         comment: '',
    //         createdBy: 0,
    //         materials: data
    //     };
    // }

    findLastDate() {
        const field = SMART_FIELDS_MATERIAL.datePriceValidity;
        const targetDateObj = new Date();
        let closestItem = null;
        let closestDate = null;
    
        for (const item of this.materials) {
            const itemDate = new Date(item[field]);
            if (!isNaN(itemDate.getTime()) && (itemDate <= targetDateObj && (closestDate === null || itemDate > closestDate))) {
                closestItem = item;
                closestDate = itemDate;
            }
        }

        return closestItem;
    }
}
