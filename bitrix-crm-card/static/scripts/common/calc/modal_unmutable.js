import { SMART_FIELDS_CALCULATION } from './fields.js';


export class ModalUnmutable {
    constructor(manager, modal) {
        this.manager = manager;

        this.modal = modal;
        this.btnSave = this.modal.querySelector('#saveCalculation');
        this.btnCopy = this.modal.querySelector('#copyCalculation');
        this.bntClose = this.modal.querySelector('#closeCalculation');
        this.container = this.modal.querySelector('tbody');

        this.initHandler();
    }

    initHandler() {
        // Копирование расчёта
        this.btnCopy.addEventListener('click', this.copyCalculation.bind(this));
        // Закрытие модального окна
        this.bntClose.addEventListener('click', this.closeModal.bind(this));
    }

    async openModal(calculate) {
        this.btnSave.classList.add('d-none');
        this.btnCopy.classList.remove('d-none');
        this.btnCopy.dataset.id = calculate.id;
        this.render(calculate);
        this.modal.classList.remove('d-none');
    }

    closeModal() {
        this.modal.classList.add('d-none');
    }

    copyCalculation() {
        let data = {
            datePriceValidityOfToday: this.getCurrentDate(),
        };
        for (const field of this.modal.querySelectorAll('.created-field')) {
            const name = field.dataset.field;
            if (name) {
                data[name] = field.value;
            }
        }
        // console.log(data);
        this.manager.copyCalculation(this.btnCopy.dataset.id);
        // this.closeModal();
    }

    render(calculate) {
        this.modal.querySelector('.date-price-validity').innerHTML = this.formatDate(calculate.datePriceValidity);
        this.container.innerHTML = `
            ${this.getMaterialsHTML(calculate.materials)}
            <tr data-id="${calculate.id}">
                <td placeholder="">Работа</td>
                <td><input type="number" class="price" min="0" value="" disabled></td>
                <td><input type="number" class="value" min="0" value="" disabled></td>
                <td><input type="number" class="amount created-field" min="0" value="${calculate.workRating}" disabled data-field="${SMART_FIELDS_CALCULATION.workRating}"></td>
                <td><input type="text" class="comment created-field" min="0" value="${calculate.workComment}" disabled data-field="${SMART_FIELDS_CALCULATION.workComment}"></td>
            </tr>
            <tr data-id="${calculate.id}">
                <td style="grid-column: 1 / span 3;"><div>Себестоимость</div></td>
                <td><input type="number" class="created-field" value="${calculate.costPrice || 0}" disabled data-field="${SMART_FIELDS_CALCULATION.costPrice}"></td>
                <td></td>
            </tr>
            <tr data-id="${calculate.id}" data-field="comment">
                <td><div>Комментарий</div></td>
                <td class="comment"><textarea class="common-comment created-field" name="" id="" rows="2" disabled disabled data-field="${SMART_FIELDS_CALCULATION.comment}">${calculate.comment || ''}</textarea></td>
            </tr>
        `;
    }

    getMaterialsHTML(materials) {
        let contentHTML = '';
        for (const material of materials) {
            const fieldPrice = `${material.field}Price`;
            const fieldValue = `${material.field}Value`;
            const fieldAmount = `${material.field}Amount`;
            const fieldComment = `${material.field}Comment`;
            if (material?.isChangePrice) {
                const fieldPrice = `${material.field}Price`;
                const fieldValue = `${material.field}Value`;
                const fieldAmount = `${material.field}Amount`;
                const fieldComment = `${material.field}Comment`;
                contentHTML += `
                    <tr>
                        <td placeholder="">${material?.title}</td>
                        <td><input type="number" class="price created-field" min="0" value="${material?.price}" disabled data-field="${SMART_FIELDS_CALCULATION[fieldPrice]}"></td>
                        <td><input type="number" class="value created-field" min="0" value="${material?.value}" disabled data-field="${SMART_FIELDS_CALCULATION[fieldValue]}"></td>
                        <td><input type="number" class="amount created-field" min="0" value="${material?.amount}" disabled data-field="${SMART_FIELDS_CALCULATION[fieldAmount]}"></td>
                        <td><input type="text" class="comment created-field" min="0" value="${material?.comment}" disabled data-field="${SMART_FIELDS_CALCULATION[fieldComment]}"></td>
                    </tr>
                `;
            } else {
                contentHTML += `
                    <tr>
                        <td placeholder="">${material?.title}</td>
                        <td><input type="number" class="price" min="0" value="${material?.price}" disabled></td>
                        <td><input type="number" class="value created-field" min="0" value="${material?.value}" disabled data-field="${SMART_FIELDS_CALCULATION[fieldValue]}"></td>
                        <td><input type="number" class="amount created-field" min="0" value="${material?.amount}" disabled data-field="${SMART_FIELDS_CALCULATION[fieldAmount]}"></td>
                        <td><input type="text" class="comment created-field" min="0" value="${material?.comment}" disabled data-field="${SMART_FIELDS_CALCULATION[fieldComment]}"></td>
                    </tr>
                `;
            }
        }

        return contentHTML;
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

    getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}
