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


export class DataFormatter {

    static formatData(materials, calculations, coefficients, calculationFields, fabrics, users) {
        let dataList = [];
        for (const calculation of calculations) {
            dataList.push(this.formatCalculationData(materials, calculation, coefficients, calculationFields, fabrics, users));
        }

        return dataList;
    }

    static formatCalculationData(materials, calculation, coefficients, calculationFields, fabrics, users) {
        const userId = calculation?.[SMART_FIELDS_HISTORY.createdBy];
        const materialsList = this.formatItem(materials, calculation, coefficients, calculationFields, fabrics);
        return {
            id: calculation?.id,
            datePriceValidity: calculation?.[SMART_FIELDS_HISTORY.datePriceValidity],
            datePriceValidityOfToday: calculation?.[SMART_FIELDS_HISTORY.datePriceValidityOfToday],
            workRating: calculation?.[SMART_FIELDS_HISTORY.workRating] || 0,
            workComment: calculation?.[SMART_FIELDS_HISTORY.workComment],
            costPrice: calculation?.[SMART_FIELDS_HISTORY.costPrice] || 0,
            comment: calculation?.[SMART_FIELDS_HISTORY.comment],
            createdBy: users?.[userId],
            materials: materialsList
        };
    }

    static formatItem(materials, calculation, coefficients, calculationFields, fabrics) {
        let data = [];

        // Перебор полей смарт-процесса "история calculation расчетов"
        for (const field of HISTORY_FIELDS) {
            const item = {
                field: field,
                title: this.getTitle(field, calculationFields),
                isChangePrice: !HISTORY_FABRICS_FIELDS.includes(field),
                price: !HISTORY_FABRICS_FIELDS.includes(field) ? 0 : this.getFabricPrice(fabrics, field),
                coefficient: this.getCoefficient(field, coefficients),
                value: calculation[SMART_FIELDS_HISTORY[`${field}Value`]] || 0,
                amount: calculation[SMART_FIELDS_HISTORY[`${field}Amount`]] || 0,
                comment: calculation[SMART_FIELDS_HISTORY[`${field}Comment`]] || '',
            };
            data.push(item);
        }

        // Перебор полей смарт-процесса "база материалов"
        const material = this.findClosestDateLessThanOrEqual(materials, calculation?.[SMART_FIELDS_HISTORY.datePriceValidity], SMART_FIELDS_MATERIAL.datePriceValidity);
        console.log("history = ", calculation);
        console.log(material);
        for (const field of MATERIAL_FIELDS) {
            const item = {
                field: field,
                title: this.getTitle(field,calculationFields),
                isChangePrice: false,
                price: material?.[SMART_FIELDS_MATERIAL[field]] || 0,
                coefficient: this.getCoefficient(field, coefficients),
                value: calculation[SMART_FIELDS_HISTORY[`${field}Value`]] || 0,
                amount: calculation[SMART_FIELDS_HISTORY[`${field}Amount`]] || 0,
                comment: calculation[SMART_FIELDS_HISTORY[`${field}Comment`]] || '',
            };
            data.push(item);
        };

        return data;
    }

    static getCoefficient(field, coefficients) {
        if (!COEFFICIENT_FIELDS.includes(field)) {
            return 1;
        }
        if (!coefficients) {
            return 1;
        }
        return coefficients[SMART_FIELDS_COEFFICIENT[field]] || 1;
    }

    static findClosestDateLessThanOrEqual(prices, targetDate, field) {
        const targetDateObj = new Date(targetDate);
        let closestItem = null;
        let closestDate = null;
    
        for (const item of prices) {
            const itemDate = new Date(item[field]);
            if (!isNaN(itemDate.getTime()) && (itemDate <= targetDateObj && (closestDate === null || itemDate > closestDate))) {
                closestItem = item;
                closestDate = itemDate;
            }
        }
    
        return closestItem;
    }

    static getTitle(field, fieldsHystory) {
        const fieldBx24 = SMART_FIELDS_HISTORY?.[`${field}Value`];
        const rawTitle = fieldsHystory?.[fieldBx24]?.title;
        return this.trimFabricName(rawTitle);
    }

    static trimFabricName(value) {
        if (!value) {
            return '';
        }
        const parts = value.split('(');
        return parts[0].trim();
    }

    static getFabricPrice(fabrics, field) {
        const fabric = fabrics?.[field];
        return fabric?.[SMART_FIELDS_FABRICS.price] || 0;
    }

    static formatEmptyItem(materials, coefficients, fieldsHystory, fabrics) {
        let data = [];

        // Перебор полей смарт-процесса "история history расчетов"
        for (const field of HISTORY_FIELDS) {
            const item = {
                field: field,
                title: this.getTitle(field, fieldsHystory),
                isChangePrice: !HISTORY_FABRICS_FIELDS.includes(field),
                price: !HISTORY_FABRICS_FIELDS.includes(field) ? 0 : this.getFabricPrice(fabrics, field),
                coefficient: this.getCoefficient(field, coefficients),
                value: 0,
                amount: 0,
                comment: '',
            };
            data.push(item);
        }

        // Перебор полей смарт-процесса "база материалов"
        const material = this.findLastDate(materials, SMART_FIELDS_MATERIAL.datePriceValidity);
        for (const field of MATERIAL_FIELDS) {
            const item = {
                field: field,
                title: this.getTitle(field,fieldsHystory),
                isChangePrice: false,
                price: material?.[SMART_FIELDS_MATERIAL[field]] || 0,
                coefficient: this.getCoefficient(field, coefficients),
                value: 0,
                amount: 0,
                comment: '',
            };
            data.push(item);
        };

        return {
            id: history?.id,
            datePriceValidity: material?.[SMART_FIELDS_MATERIAL.datePriceValidity],
            datePriceValidityOfToday: new Date().toISOString(),
            workRating: 0,
            workComment: '',
            costPrice: 0,
            comment: '',
            createdBy: 0,
            materials: data
        };
    }

    static findLastDate(prices, field) {
        const targetDateObj = new Date();
        let closestItem = null;
        let closestDate = null;
    
        for (const item of prices) {
            const itemDate = new Date(item[field]);
            if (!isNaN(itemDate.getTime()) && (itemDate <= targetDateObj && (closestDate === null || itemDate > closestDate))) {
                closestItem = item;
                closestDate = itemDate;
            }
        }

        return closestItem;
    }
}
