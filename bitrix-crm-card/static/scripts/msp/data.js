import { FIELD_MSP, FIELD_FABRIC } from '../parameters/params_msp.js';


export class DataRenderer {
    constructor(bx24, data, fields, createdUser, updatedUser) {
        this.bx24 = bx24;
        this.data = data;
        this.fields = fields;
        this.createdUser = createdUser;
        this.updatedUser = updatedUser;

        this.changedData = {}; // Свойство для хранения измененных данных
        this.initHandlers();
    }

    initHandlers() {
        document.addEventListener('change', (event) => {
            const target = event.target;
            if (target.dataset.track) {
                const fieldName = target.dataset.track;
                const fieldNameBx24 = FIELD_MSP?.[fieldName]
                this.updateChangedData(fieldNameBx24, target.value);
                console.log(this.changedData);
            }
        })
    }

    updateChangedData(fieldName, value) {
        this.changedData[fieldName] = value;
    }

    renderData() {
        this.renderUser();

        for (const [key, value] of Object.entries(FIELD_MSP)) {
            const elem = document.querySelector(`#${key}`);
            const fieldName = FIELD_MSP[key];
            const fieldDataBx24 = this.fields?.[fieldName];
            this.outputData(elem, fieldName, fieldDataBx24);
        }
    }

    renderUser() {
        const elemCreatedBy = document.querySelector(`#${FIELD_MSP.createdBy}`);
        const elemUpdatedBy = document.querySelector(`#${FIELD_MSP.updatedBy}`);
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

