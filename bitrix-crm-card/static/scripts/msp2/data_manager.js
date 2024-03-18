import {
    SMART_PRODUCT_ID,
    SMART_FABRIC_ID,
    SMART_FIELDS_FABRICS,
    FIELD_MSP_FABRICS, 
    FIELD_MSP_DATA,
} from './params.js';

export class DataManager {
    constructor(bx24, productId) {
        this.bx24 = bx24;
        this.productId = productId;
        
        this.currentUser = null;
        this.product = null;
        this.productFields = null;
        this.lead = null;
        this.fabrics = null;
        this.fabric_1 = null;
        this.fabric_2 = null;
        this.fabric_3 = null;
        this.createdBy = null;
        this.updatedBy = null;

        this.changedProductData = {}

        this.inputIsActive = document.getElementById('isActive');
        this.inputIsMeasured = document.getElementById('isMeasured');
        this.labelIsActive = this.inputIsActive.parentElement.querySelector('label');
        this.labelIsMeasured = this.inputIsMeasured.parentElement.querySelector('label');
    }

    async init() {
        await this.fetchData();
        this.render();
        this.changeStateIsActive();
        this.changeStateIsMeasured();
        this.initHandlers();
    }

    async fetchData() {
        const cmd = {
            current_user: 'user.current',
            product: `crm.item.get?entityTypeId=${SMART_PRODUCT_ID}&id=${this.productId}`,
            lead: `crm.lead.get?id=$result[product][item][parentId1]`,
            fabrics: `crm.item.list?entityTypeId=${SMART_FABRIC_ID}&select[]=id&&select[]=${SMART_FIELDS_FABRICS.name}&select[]=${SMART_FIELDS_FABRICS.image}&select[]=${SMART_FIELDS_FABRICS.type}&select[]=${SMART_FIELDS_FABRICS.provider}&select[]=${SMART_FIELDS_FABRICS.collection}&select[]=${SMART_FIELDS_FABRICS.color}&select[]=${SMART_FIELDS_FABRICS.price}&select[]=${SMART_FIELDS_FABRICS.link}&order[id]=ASC`,
            fabric_1: `crm.item.get?entityTypeId=${SMART_FABRIC_ID}&id=$result[product][item][${FIELD_MSP_FABRICS.upholsteryFabricCollection}]&select[]=id&&select[]=${SMART_FIELDS_FABRICS.name}&select[]=${SMART_FIELDS_FABRICS.image}&select[]=${SMART_FIELDS_FABRICS.type}&select[]=${SMART_FIELDS_FABRICS.provider}&select[]=${SMART_FIELDS_FABRICS.collection}&select[]=${SMART_FIELDS_FABRICS.color}&select[]=${SMART_FIELDS_FABRICS.price}&select[]=${SMART_FIELDS_FABRICS.link}`,
            fabric_2: `crm.item.get?entityTypeId=${SMART_FABRIC_ID}&id=$result[product][item][${FIELD_MSP_FABRICS.upholsteryFabricCollection_1}]&select[]=id&&select[]=${SMART_FIELDS_FABRICS.name}&select[]=${SMART_FIELDS_FABRICS.image}&select[]=${SMART_FIELDS_FABRICS.type}&select[]=${SMART_FIELDS_FABRICS.provider}&select[]=${SMART_FIELDS_FABRICS.collection}&select[]=${SMART_FIELDS_FABRICS.color}&select[]=${SMART_FIELDS_FABRICS.price}&select[]=${SMART_FIELDS_FABRICS.link}`,
            fabric_3: `crm.item.get?entityTypeId=${SMART_FABRIC_ID}&id=$result[product][item][${FIELD_MSP_FABRICS.upholsteryFabricCollection_2}]&select[]=id&&select[]=${SMART_FIELDS_FABRICS.name}&select[]=${SMART_FIELDS_FABRICS.image}&select[]=${SMART_FIELDS_FABRICS.type}&select[]=${SMART_FIELDS_FABRICS.provider}&select[]=${SMART_FIELDS_FABRICS.collection}&select[]=${SMART_FIELDS_FABRICS.color}&select[]=${SMART_FIELDS_FABRICS.price}&select[]=${SMART_FIELDS_FABRICS.link}`,
            fields_product: `crm.item.fields?entityTypeId=${SMART_PRODUCT_ID}`,
            created_by: `user.get?id=$result[product][item][${FIELD_MSP_DATA.createdBy}]`,
            updated_by: `user.get?id=$result[product][item][${FIELD_MSP_DATA.createdBy}]`,
        };
        
        // `select[]=id&&select[]=${SMART_FIELDS_FABRICS.name}&select[]=${SMART_FIELDS_FABRICS.image}&select[]=${SMART_FIELDS_FABRICS.type}&select[]=${SMART_FIELDS_FABRICS.provider}&select[]=${SMART_FIELDS_FABRICS.collection}&select[]=${SMART_FIELDS_FABRICS.color}&select[]=${SMART_FIELDS_FABRICS.price}&select[]=${SMART_FIELDS_FABRICS.link}`
        // name: "ufCrm17_1705390515",         // Название
        // : "ufCrm17_1705828938",
        // : "ufCrm17_1705391192",
        // : "title",                  // Поставщик
        // : "ufCrm17_1705390343",   // Коллекция
        // color: "ufCrm17_1706161318",        // Цвет 
        // : 'ufCrm17_1705390431',        // Цена
        // : 'ufCrm17_1705503391',         // Ссылка на сайт

        const response = await this.bx24.callMethod('batch', {
            halt: 0,
            cmd: cmd
        });

        // console.log('Initial data = ', response?.result);
        this.currentUser = response?.result?.current_user;
        this.product = response?.result?.product?.item;
        this.productFields = response?.result?.fields_product?.fields;
        this.lead = response?.result?.lead;
        this.fabrics = response?.result?.fabrics?.items;
        this.fabric_1 = response?.result?.fabric_1?.item;
        this.fabric_2 = response?.result?.fabric_2?.item;
        this.fabric_3 = response?.result?.fabric_3?.item;
        this.createdBy = response?.result?.created_by?.[0];
        this.updatedBy = response?.result?.updated_by?.[0];
    }

    initHandlers() {
        document.addEventListener('change', (event) => {
            const target = event.target;
            console.log(target);
            if (target.dataset.track && target.dataset.field) {
                const fieldName = target.dataset.field;
                const fieldNameBx24 = FIELD_MSP_DATA?.[fieldName];
                this.updateData(fieldNameBx24, target);
            }
        })

        // Изменение цыета кнопки - АКТИВЕН
        this.inputIsActive.addEventListener('change', this.changeStateIsActive.bind(this));
        // Изменение цыета кнопки - ЗАМЕР
        this.inputIsMeasured.addEventListener('change', this.changeStateIsMeasured.bind(this));
    }

    updateData(fieldName, target) {
        let value = '';
        if (target.type === 'checkbox') {
            value = target.checked ? 'Y' : 'N';
        } else {
            value = target.value;
        }
        this.changedProductData[fieldName] = value;
        console.log(this.changedProductData);
    }

    render() {
        this.renderUser();
        for (const [key, value] of Object.entries(FIELD_MSP_DATA)) {
            const elem = document.querySelector(`#${key}`);
            const fieldName = FIELD_MSP_DATA[key];
            const fieldDataBx24 = this.productFields?.[fieldName];
            this.outputData(elem, fieldName, fieldDataBx24);
        }
    }

    outputData(elem, fieldName, { type, items }) {
        // console.log('fieldName = ', fieldName);
        // console.log('type = ', type);
        // console.log('items = ', items);

        if (!elem) {
            return;
        }
    
        switch (type) {
            case 'enumeration':
                elem.innerHTML = this.getOptionsSelectHTML(items);
                this.checkOption(elem, this.product?.[fieldName]);
                break;
            case 'string':
            case 'double':
            case 'integer':
                elem.value = this.product?.[fieldName];
                break;
            case 'date':
            case 'datetime':
                elem.value = this.formatDate(this.product?.[fieldName]);
                break;
            case 'boolean':
                elem.checked = this.product?.[fieldName] == 'Y';
                break;
            default:
                console.error(`Unknown field type: ${type}`);
                break;
        }
    }

    getOptionsSelectHTML(items) {
        let contentHTML = '<option value=""></option>';
        for (const item of items) {
            contentHTML += `<option value="${item.ID}">${item.VALUE}</option>`;
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

    formatDate(inputDateString) {
        const dateObject = new Date(inputDateString);
        
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
        
        const outputString = `${year}-${month}-${day}`;
        
        return outputString;
    }

    renderUser() {
        const elemCreatedBy = document.querySelector(`#${FIELD_MSP_DATA.createdBy}`);
        const elemUpdatedBy = document.querySelector(`#${FIELD_MSP_DATA.updatedBy}`);
        elemCreatedBy.value = this.getUserName(this.createdBy);
        elemUpdatedBy.value = this.getUserName(this.updatedBy);
        elemCreatedBy.dataset.link = this.getUserLink(this.createdBy);
        elemUpdatedBy.dataset.link = this.getUserLink(this.updatedBy);
    }

    getUserName(user) {
        return `${user?.LAST_NAME} ${user?.NAME}`;
    }

    getUserLink(user) {
        return `/company/personal/user/${user?.ID}/`;
    }

    changeStateIsMeasured() {
        if (this.inputIsMeasured.checked) {
            this.labelIsMeasured.classList.remove('btn-secondary');
            this.labelIsMeasured.classList.add('btn-outline-success');
        } else {
            this.labelIsMeasured.classList.remove('btn-outline-success');
            this.labelIsMeasured.classList.add('btn-secondary');
        }
    }

    changeStateIsActive() {
        if (this.inputIsActive.checked) {
            this.labelIsActive.classList.remove('btn-danger');
            this.labelIsActive.classList.add('btn-outline-success');
        } else {
            this.labelIsActive.classList.remove('btn-outline-success');
            this.labelIsActive.classList.add('btn-danger');
        }
    }

    getChangedData() {
        return this.changedProductData;
    }

    getFields() {
        let data = {};
        for (const key in FIELD_MSP_DATA) {
            if (this.changedProductData.hasOwnProperty(FIELD_MSP_DATA[key])) {
                data[FIELD_MSP_DATA[key]] = this.changedProductData[FIELD_MSP_DATA[key]];
            } else if (this.product.hasOwnProperty(FIELD_MSP_DATA[key])) {
                data[FIELD_MSP_DATA[key]] = this.product[FIELD_MSP_DATA[key]];
            }
        }
        return data;
    }
    
}
