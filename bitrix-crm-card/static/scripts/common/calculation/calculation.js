import BitrixService from "../../bx24/api.js";

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
    SMART_FIELDS_COEFFICIENT,
} from './fields.js';


class Record {
    constructor(mainWindow, record) {
        this.mainWindow = mainWindow;
        this.record = record;
        this.changedFields = {};
    }

    showWindow() {
        this.render();
        this.mainWindow.classList.remove('d-none');
    }

    hideWindow() {
        this.mainWindow.classList.add('d-none');
    }

    setField(fieldOut, fieldIn, value) {
        this.record.fields[fieldOut][fieldIn] = value;
        this.record.fields[fieldOut].amount = +this.record.fields[fieldOut].value * +this.record.fields[fieldOut].price * +this.record.fields[fieldOut].coefficient;
        this.record.costPrice = this.getCostPrice();
        const fieldValue = `${fieldOut}Value`;
        const fieldAmount = `${fieldOut}Amount`;
        const fieldComment = `${fieldOut}Comment`;
        const fieldPrice = `${fieldOut}Price`;
        this.changedFields[SMART_FIELDS_HISTORY.costPrice] = +this.record.costPrice;
        this.changedFields[SMART_FIELDS_HISTORY[fieldValue]] = +this.record.fields[fieldOut].value;
        this.changedFields[SMART_FIELDS_HISTORY[fieldAmount]] = +this.record.fields[fieldOut].amount;
        this.changedFields[SMART_FIELDS_HISTORY[fieldComment]] = this.record.fields[fieldOut].comment;
        if (SMART_FIELDS_HISTORY[fieldPrice]) {
            this.changedFields[SMART_FIELDS_HISTORY[fieldPrice]] = +this.record.fields[fieldOut].price;
        }

        this.render();
    }

    setValue(field, comment) {
        this.record[field] = comment;
        this.changedFields[SMART_FIELDS_HISTORY[field]] = comment;
        this.render();
    }

    getChangedFields() {
        return this.changedFields;
    }

    render() {
        this.mainWindow.dataset.id = this.record.id;
        this.mainWindow.querySelector('.date-price-validity').innerHTML = this.formatDate(this.record.datePriceValidity);
        this.mainWindow.querySelector('tbody').innerHTML = `
            <tbody>
                ${this.getMaterialsHTML(this.record.fields)}
                <tr data-id="${this.record.id}">
                    <td style="grid-column: 1 / span 3;"><div>Себестоимость</div></td>
                    <td><input type="number" value="${this.record.costPrice || 0}" disabled></td>
                    <td></td>
                </tr>
                <tr data-id="${this.record.id}" data-field="comment">
                    <td><div>Комментарий</div></td>
                    <td class="comment"><textarea class="common-comment" name="" id="" rows="2">${this.record.comment || ''}</textarea></td>
                </tr>
            </tbody>
        `;
    }

    getMaterialsHTML(fields) {
        let contentHTML = '';

        for (const field in fields) {
            const priceAttribute = fields[field]?.changedPrice ? '' : 'disabled';
            contentHTML += `
                <tr data-id="${this.record.id}" data-field="${field}">
                    <td placeholder="">${fields[field]?.title}</td>
                    <td><input type="number" class="price" min="0" value="${fields[field]?.price}" ${priceAttribute}></td>
                    <td><input type="number" class="value" min="0" value="${fields[field]?.value}"></td>
                    <td><input type="number" class="amount" min="0" value="${fields[field]?.amount}" disabled></td>
                    <td><input type="text" class="comment" min="0" value="${fields[field]?.comment}"></td>
                </tr>
            `;
        }

        return contentHTML;
    }

    getRecorHTML() {
        return `
            <tr data-id="${this.record.id}">
                <td class="p-0 m-0">
                    <a href="#" class="show-calculation-window">Ссылка</a>
                </td>
                <td class="p-0 m-0">
                    ${this.formatDate(this.record.datePriceValidity)}
                </td>
                <td class="p-0 m-0">
                    <a href="#" data-user-link="${this.getUserLink(this.record.createdBy)}">${this.getUserName(this.record.createdBy)}</a>
                </td>
                <td class="p-0 m-0">
                    ${this.record.comment}
                </td>
            </tr>
        `;
    }

    getCostPrice() {
        let totalAmount = 0;
        for (const key in this.record.fields) {
            if (Object.hasOwnProperty.call(this.record.fields, key)) {
                totalAmount += +this.record.fields[key].amount || 0;
            }
        }
        return totalAmount;
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
}


class Records {
    constructor(container) {
        this.container = container;
        this.calculationList = [];
    }

    clear() {
        this.calculationList = [];
    }

    get(id) {
        return this.calculationList.find((calculation) => calculation.record.id == id);
    }

    add(calculation) {
        this.calculationList.push(calculation);
        // const calculationHTML = calculation.getRecorHTML();
        // this.container.querySelector('tbody').insertAdjacentHTML('beforeend', calculationHTML);
    }

    remove(calculation) {
        this.calculationList.splice(this.calculationList.indexOf(calculation), 1);
    }
}


export class CalculationManager {
    constructor(smartId) {
        this.smartId = smartId;
        this.mainWindow = document.querySelector('#calculationWindow');
        this.containerCalculationsList = document.querySelector('#productCalculations');

        this.bx24 = new BitrixService();
        this.calculationList = new Records(this.containerCalculationsList);

        this.materials = [];
        this.history = [];
        this.coefficients = [];
        this.users = {};

        this.initHandlerMainWindow();
    }

    async init() {
        await this.getDataFromBx24();
        await this.getUsersFromBx24();
        this.fillCalculationList();
        this.renderProducts();
    }

    initHandlerMainWindow() {
        this.mainWindow.addEventListener('change', (event) => {
            const target = event.target;
            const elemTr = target.closest('tr');
            const field = elemTr.dataset.field;
            // Изменение значения
            if (field && target.classList.contains('value')) {
                const record = this.calculationList.get(elemTr.dataset.id);
                record.setField(field, 'value', target.value);
            }
            // Изменение цены
            if (field && target.classList.contains('price')) {
                const record = this.calculationList.get(elemTr.dataset.id);
                record.setField(field, 'price', target.value);
            }
            // Изменение комментария
            if (field && target.classList.contains('comment')) {
                const record = this.calculationList.get(elemTr.dataset.id);
                record.setField(field, 'comment', target.value);
                record.record.fields[field].comment = target.value;
            }
            // Изменение общего комментария
            if (field && target.classList.contains('common-comment')) {
                const record = this.calculationList.get(elemTr.dataset.id);
                record.setValue(field, target.value);
            }
        })

        // Открытие расчета
        this.containerCalculationsList.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('show-calculation-window')) {
                const record = this.calculationList.get(target.closest('tr').dataset.id);
                record.showWindow();
                console.log('record = ', record);
            }
        })

        // Сохранение
        this.mainWindow.querySelector('#saveCalculation').addEventListener('click', async (event) => {
            const target = event.target;
            const calculationId = this.mainWindow.dataset.id;
            const record = this.calculationList.get(calculationId);
            const changedData = record.getChangedFields();
            console.log('changedData = ', changedData);

            const result = await this.bx24.callMethod('crm.item.update', {
                entityTypeId: SMART_ID_HISTORY,
                id: calculationId,
                fields: changedData
            });

            this.renderProducts();
            console.log('result = ', result);
        });

        // Закрытие
        this.mainWindow.querySelector('#closeCalculation').addEventListener('click', (event) => {
            const target = event.target;
            this.mainWindow.classList.add('d-none');
            this.renderProducts(); 
        });

        // Добавление расчета
        this.containerCalculationsList.querySelector('.product-btn-save').addEventListener('click', async (event) => {
            const target = event.target;
            const currentDate = new Date();
            const result = await this.bx24.callMethod('crm.item.add', {
                entityTypeId: SMART_ID_HISTORY,
                fields: {
                    [SMART_FIELDS_HISTORY.datePriceValidity]: currentDate.toISOString(),
                    [`parentId${SMART_ID_PRODUCT}`]: this.smartId
                }
            });

            console.log('Добавление расчета = ', result);
            const data = this.getCalculationData(result?.result?.item);
            this.calculationList.add(new Record(this.mainWindow, data));
            const record = this.calculationList.get(data.id);
            record.showWindow();
        });
    }

    renderProducts() {
        let contentHTML = '';

        for (const calculation of this.calculationList.calculationList) {
            contentHTML += calculation.getRecorHTML();
        }

        this.containerCalculationsList.querySelector('tbody').innerHTML = contentHTML;
    }

    render(id) {
        const record = this.calculationList.get(id);
        record.render();
    }

    fillCalculationList() {
        this.calculationList.clear();

        for (const history of this.history) {
            // const userId = history?.[SMART_FIELDS_HISTORY.createdBy];
            // let data = {
            //     id: history?.id,
            //     datePriceValidity: history?.[SMART_FIELDS_HISTORY.datePriceValidity],
            //     datePriceValidityOfToday: history?.[SMART_FIELDS_HISTORY.datePriceValidityOfToday],
            //     workRating: history?.[SMART_FIELDS_HISTORY.workRating],
            //     workComment: history?.[SMART_FIELDS_HISTORY.workComment],
            //     costPrice: history?.[SMART_FIELDS_HISTORY.costPrice],
            //     comment: history?.[SMART_FIELDS_HISTORY.comment],
            //     createdBy: this.users[userId],
            //     fields: {},
            // };
            // // Перебор полей смарт-процесса "история historyрасчетов"
            // for (const field of HISTORY_FIELDS) {
            //     data.fields[field] = {
            //         title: this.getTitle(field),
            //         changedPrice: true,
            //         price: history[SMART_FIELDS_HISTORY[`${field}Price`]] || 0,
            //         value: history[SMART_FIELDS_HISTORY[`${field}Value`]] || 0,
            //         amount: history[SMART_FIELDS_HISTORY[`${field}Amount`]] || 0,
            //         comment: history[SMART_FIELDS_HISTORY[`${field}Comment`]] || '',
            //         coefficient: this.getCoefficient(field),
            //     };
            // }
            // // Перебор полей смарт-процесса "база материалов"
            // const material = this.findClosestDateLessThanOrEqual(this.materials, history?.[SMART_FIELDS_HISTORY.datePriceValidity], SMART_FIELDS_MATERIAL.datePriceValidity);
            // for (const field of MATERIAL_FIELDS) {
            //     data.fields[field] = {
            //         title: this.getTitle(field),
            //         changedPrice: false,
            //         price: material?.[SMART_FIELDS_MATERIAL[field]] || 0,
            //         value: history[SMART_FIELDS_HISTORY[`${field}Value`]] || 0,
            //         amount: history[SMART_FIELDS_HISTORY[`${field}Amount`]] || 0,
            //         comment: history[SMART_FIELDS_HISTORY[`${field}Comment`]] || '',
            //         coefficient: this.getCoefficient(field),
            //     };
            // };

            const data = this.getCalculationData(history);
            this.calculationList.add(new Record(this.mainWindow, data));
        }
    }

    getCalculationData(history) {
        const userId = history?.[SMART_FIELDS_HISTORY.createdBy];
        let data = {
            id: history?.id,
            datePriceValidity: history?.[SMART_FIELDS_HISTORY.datePriceValidity],
            datePriceValidityOfToday: history?.[SMART_FIELDS_HISTORY.datePriceValidityOfToday],
            workRating: history?.[SMART_FIELDS_HISTORY.workRating],
            workComment: history?.[SMART_FIELDS_HISTORY.workComment],
            costPrice: history?.[SMART_FIELDS_HISTORY.costPrice],
            comment: history?.[SMART_FIELDS_HISTORY.comment],
            createdBy: this.users[userId],
            fields: {},
        };
        // Перебор полей смарт-процесса "история historyрасчетов"
        for (const field of HISTORY_FIELDS) {
            data.fields[field] = {
                title: this.getTitle(field),
                changedPrice: true,
                price: history[SMART_FIELDS_HISTORY[`${field}Price`]] || 0,
                value: history[SMART_FIELDS_HISTORY[`${field}Value`]] || 0,
                amount: history[SMART_FIELDS_HISTORY[`${field}Amount`]] || 0,
                comment: history[SMART_FIELDS_HISTORY[`${field}Comment`]] || '',
                coefficient: this.getCoefficient(field),
            };
        }
        // Перебор полей смарт-процесса "база материалов"
        const material = this.findClosestDateLessThanOrEqual(this.materials, history?.[SMART_FIELDS_HISTORY.datePriceValidity], SMART_FIELDS_MATERIAL.datePriceValidity);
        for (const field of MATERIAL_FIELDS) {
            data.fields[field] = {
                title: this.getTitle(field),
                changedPrice: false,
                price: material?.[SMART_FIELDS_MATERIAL[field]] || 0,
                value: history[SMART_FIELDS_HISTORY[`${field}Value`]] || 0,
                amount: history[SMART_FIELDS_HISTORY[`${field}Amount`]] || 0,
                comment: history[SMART_FIELDS_HISTORY[`${field}Comment`]] || '',
                coefficient: this.getCoefficient(field),
            };
        };
        return data;
    }

    getTitle(field) {
        const fieldBx24 = SMART_FIELDS_HISTORY?.[`${field}Value`];
        const rawTitle = this.fields[fieldBx24]?.title;
        return this.trimFabricName(rawTitle);
    }

    getCoefficient(field) {
        if (!COEFFICIENT_FIELDS.includes(field)) {
            return 1;
        }

        const coefficientObj = this.coefficients?.[0];
        if (!coefficientObj) {
            return 1;
        }

        return coefficientObj[SMART_FIELDS_COEFFICIENT[field]] || 1;
    }

    async getDataFromBx24() {
        const result = await this.bx24.callMethod('batch', {
            halt: 0,
            cmd: {
                "material": `crm.item.list?entityTypeId=${SMART_ID_MATERIAL}`,
                "history": `crm.item.list?entityTypeId=${SMART_ID_HISTORY}&filter[parentId${SMART_ID_PRODUCT}]=${this.smartId}`,
                "coefficient": `crm.item.list?entityTypeId=${SMART_ID_COEFFICIENT}`,
                "fields": `crm.item.fields?entityTypeId=${SMART_ID_HISTORY}`,
            }
        });

        this.materials = result?.result?.material?.items || [];
        this.history = result?.result?.history?.items || [];
        this.coefficients = result?.result?.coefficient?.items || [];
        this.fields = result?.result?.fields?.fields || [];
        console.log("this.materials = ", this.materials);
        console.log("this.history = ", this.history);
        console.log("this.coefficients = ", this.coefficients);
        console.log("this.fields = ", this.fields);
    }

    async getUsersFromBx24() {
        let cmd = {
            "current" : `user.current`,
        };
        for (const history of this.history) {
            const userId = history?.[SMART_FIELDS_HISTORY.createdBy];
            cmd[userId] = `user.get?id=${userId}`;
        }

        const result = await this.bx24.callMethod('batch', {
            halt: 0,
            cmd: cmd
        });
        console.log("user result = ", result);
        for (const userId in result?.result) {
            const user = Array.isArray(result[userId]) ? result[userId]?.[0] : result[userId];
            this.users[user.ID] = user;
        }
    }

    findClosestDateLessThanOrEqual(items, targetDate, field) {
        const targetDateObj = new Date(targetDate);
        let closestItem = null;
        let closestDate = null;
    
        for (const item of items) {
            const itemDate = new Date(item[field]);
            if (!isNaN(itemDate.getTime()) && (itemDate <= targetDateObj && (closestDate === null || itemDate > closestDate))) {
                closestItem = item;
                closestDate = itemDate;
            }
        }
    
        return closestItem;
    }

    trimFabricName(value) {
        const parts = value.split('(');
        return parts[0].trim();
    }
}


// document.addEventListener('DOMContentLoaded', function() {
//     const smartId = 172;
//     const calculationManager = new CalculationManager(smartId);
//     calculationManager.init();
// })
