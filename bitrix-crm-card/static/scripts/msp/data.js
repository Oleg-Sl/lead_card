import { FIELD_MSP, FIELD_FABRIC } from '../parameters/params_msp.js';


export class DataRenderer {
    constructor(data, fields, createdUser, updatedUser) {
        this.data = data;
        this.fields = fields;
        this.createdUser = createdUser;
        this.updatedUser = updatedUser;
    }

    renderData() {
        const elemCreatedBy = document.querySelector(`#${FIELD_MSP.createdBy}`);
        const elemUpdatedBy = document.querySelector(`#${FIELD_MSP.updatedBy}`);
        elemCreatedBy.value = this.getUserName(this.createdUser);
        elemUpdatedBy.value = this.getUserName(this.updatedUser);

        for (const [key, value] of Object.entries(FIELD_MSP)) {
            const elem = document.querySelector(`#${key}`);
            const fieldName = FIELD_MSP[key];
            const fieldDataBx24 = this.fields?.[fieldName];
            // console.log(fieldDataBx24);
            this.outputData(elem, fieldName, fieldDataBx24);
        }
    }

    getUserName(user) {
        return `${user?.LAST_NAME} ${user?.NAME}`;
    }

    outputData(elem, fieldName, fieldDataBx24) {
        if (!elem) {
            return;
        }

        if (fieldDataBx24.type ==='enumeration') {
            elem.innerHTML = this.getOptionsSelectHTML(fieldDataBx24.items);
            this.checkOption(elem, this.data?.[fieldName]);
        } else if (fieldDataBx24.type === 'string') {
            elem.value = this.data?.[fieldName];
        } else if (fieldDataBx24.type === 'double') {
            elem.value = this.data?.[fieldName];
        } else if (fieldDataBx24.type === 'date' || fieldDataBx24.type === 'datetime') {
            elem.value = this.formatDate(this.data?.[fieldName]);
        } else if (fieldDataBx24.type === 'boolean') {
            elem.checked = this.data?.[fieldName] == 'Y' ? true : false;
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

