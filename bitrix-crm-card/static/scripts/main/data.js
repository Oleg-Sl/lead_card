

import { FIELD_LEAD } from '../parameters/params_lead.js';


export class DataRenderer {
    constructor(bx24, data, fields, responsible) {
        this.bx24 = bx24;
        this.fields = fields;
        this.responsible = responsible;
 
        this.data = {};
        this.changedData = {};

        this.completedUploads = 0;

        this.initData(data);
        this.initHandlers();
    }

    initData(data) {
        this.data = {};
        for (const key in FIELD_LEAD) {
            if (data.hasOwnProperty(FIELD_LEAD[key])) {
                this.data[FIELD_LEAD[key]] = data[FIELD_LEAD[key]];
            }
        }
    }

    initHandlers() {
        // Изменение полей
        document.addEventListener('change', (event) => {
            const target = event.target;
            if (target.dataset.track && target.dataset.field) {
                const fieldName = target.dataset.field;
                const fieldNameBx24 = FIELD_LEAD?.[fieldName];
                this.updateChangedData(fieldNameBx24, target);
            }
        })

        // Открываем профиль пользователя
        document.querySelector(`#${FIELD_LEAD.responsible}`).addEventListener('click', (event) => {
            const target = event.target;
            const link = target.dataset.link;
            if (link) {
                
                this.bx24.openPath(link);
            }
        });

        // Открываем директорию с файлами
        document.querySelector(`#btnOpenDiskFolder`).addEventListener('click', async () => {
            if (!this.data?.[FIELD_LEAD.folderId]) {
                console.error(`Error get folderId from server for smart leadId=${this.data?.ID}, folderId=${this.data?.[FIELD_LEAD.folderId]}`);
                return;
            }
            const data = await this.bx24.callMethod("disk.folder.get", {
                id: this.data?.[FIELD_LEAD.folderId]
            });
            const link = data?.DETAIL_URL;
            if (!link) {
                console.error(`Error get link from server for smart leadId=${this.data?.ID}, folderId=${this.data?.[FIELD_LEAD.folderId]}`);
                return;
            }
            window.open(link, '_blank');
        })

        // Открыть интерфейс для загрузки файлов на диск в Bitrix24
        document.querySelector(`#btnUploadFile`).addEventListener('click', async () => {
            if (!this.data?.[FIELD_LEAD.folderId]) {
                console.error(`Error download file to server for smart leadId=${this.data?.ID}, folderId=${this.data?.[FIELD_LEAD.folderId]}`);
                return;
            }
            document.querySelector('#inputUploadFile').click();
        })

        // Загрузка файлов на диск в Bitrix24
        document.querySelector('#inputUploadFile').addEventListener('change', async (event) => {
            if (!this.data?.[FIELD_LEAD.folderId]) {
                console.error(`Error download file to server for smart processId=${this.smartId}, entityId=${this.entityId}, folderId=${FIELD_LEAD.folderId}`);
                return;
            }
            const target = event.target;
            const spinner = target.parentNode.querySelector('div');
            const files = target.files;
            if (files.length > 0) {
                spinner.style.display = 'inline-block';
                this.completedUploads++;
                for (let i = 0; i < files.length; i++) {
                    await this.bx24.disk.uploadFile(this.data?.[FIELD_LEAD.folderId], files[i]);
                }
                this.completedUploads--;
                if (this.completedUploads === 0) {
                    spinner.style.display = 'none';
                }
            } else {
                console.log('Выберите файлы для загрузки');
            }
        });
    }

    updateChangedData(fieldName, target) {
        let value = '';
        if (target.type === 'checkbox') {
            value = target.checked ? 'Y' : 'N';
        } else {
            value = target.value;
        }
        this.bx24.callMethod('crm.deal.update', {
            id: this.data?.ID,
            fields: { [fieldName]: value }
        });
        this.changedData[fieldName] = value;
    }

    // getFields() {
    //     return this.data;
    // }

    // getChangedData() {
    //     return this.changedData;
    // }

    renderData() {
        this.renderUser();

        for (const [key, value] of Object.entries(FIELD_LEAD)) {
            const elem = document.querySelector(`#${key}`);
            const fieldName = FIELD_LEAD[key];
            const fieldDataBx24 = this.fields?.[fieldName];
            // console.log("key = ", key);
            // console.log("elem = ", elem);
            // console.log("fieldName = ", fieldName);
            // console.log("fieldDataBx24 = ", fieldDataBx24);
            if (elem && fieldName && fieldDataBx24) {
                this.outputData(elem, fieldName, fieldDataBx24);
            }
        }
    }

    renderUser() {
        const elemResponsible = document.querySelector(`#${FIELD_LEAD.responsible}`);
        console.log(elemResponsible);
        elemResponsible.innerHTML = this.getUserName(this.responsible);
        elemResponsible.dataset.link = this.getUserLink(this.responsible);
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

    formatDate(inputDateString) {
        const dateObject = new Date(inputDateString);        
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
        const outputString = `${year}-${month}-${day}`;
        return outputString;
    }
}
