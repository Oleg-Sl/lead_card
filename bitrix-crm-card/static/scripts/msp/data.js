import { FIELD_MSP_DATA } from '../parameters/params_msp.js';


export class DataRenderer {
    constructor(bx24, data, fields, createdUser, updatedUser) {
        this.bx24 = bx24;
        this.data = {};
        this.fields = fields;
        this.createdUser = createdUser;
        this.updatedUser = updatedUser;

        this.changedData = {};

        this.initData(data);
        this.initHandlers();
    }

    initData(data) {
        this.data = {};
        for (const key in FIELD_MSP_DATA) {
            if (data.hasOwnProperty(FIELD_MSP_DATA[key])) {
                this.data[FIELD_MSP_DATA[key]] = data[FIELD_MSP_DATA[key]];
            }
        }
    }

    initHandlers() {
        document.addEventListener('change', (event) => {
            const target = event.target;
            if (target.dataset.track && target.dataset.field) {
                const fieldName = target.dataset.field;
                const fieldNameBx24 = FIELD_MSP_DATA?.[fieldName];
                this.updateChangedData(fieldNameBx24, target);
            }
        })
    }

    updateChangedData(fieldName, target) {
        let value = '';
        if (target.type === 'checkbox') {
            value = target.checked ? 'Y' : 'N';
        } else {
            value = target.value;
        }
        this.changedData[fieldName] = value;
    }

    getFields() {
        return this.data;
    }

    getChangedData() {
        return this.changedData;
    }

    renderData() {
        this.renderUser();

        for (const [key, value] of Object.entries(FIELD_MSP_DATA)) {
            const elem = document.querySelector(`#${key}`);
            const fieldName = FIELD_MSP_DATA[key];
            const fieldDataBx24 = this.fields?.[fieldName];
            this.outputData(elem, fieldName, fieldDataBx24);
        }
    }

    renderUser() {
        const elemCreatedBy = document.querySelector(`#${FIELD_MSP_DATA.createdBy}`);
        const elemUpdatedBy = document.querySelector(`#${FIELD_MSP_DATA.updatedBy}`);
        elemCreatedBy.innerHTML = this.getUserName(this.createdUser);
        elemUpdatedBy.innerHTML = this.getUserName(this.updatedUser);
        elemCreatedBy.dataset.link = this.getUserLink(this.createdUser);
        elemUpdatedBy.dataset.link = this.getUserLink(this.updatedUser);
    }

    getUserName(user) {
        return `${user?.LAST_NAME} ${user?.NAME}`;
    }

    getUserLink(user) {
        return `/company/personal/user/${user?.ID}/`;
    }

    outputData(elem, fieldName, { type, items }) {
        if (!elem) {
            return;
        }
    
        switch (type) {
            case 'enumeration':
                elem.innerHTML = this.getOptionsSelectHTML(items);
                this.checkOption(elem, this.data?.[fieldName]);
                break;
            case 'string':
            case 'double':
            case 'integer':
                elem.value = this.data?.[fieldName];
                break;
            case 'date':
            case 'datetime':
                elem.value = this.formatDate(this.data?.[fieldName]);
                break;
            case 'boolean':
                elem.checked = this.data?.[fieldName] == 'Y';
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
}

