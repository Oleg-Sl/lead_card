import { DataFormatter } from './formatter.js';
import { DataConnector } from './connector.js';
// import { FakeBitrixService } from './bx24.js';
import {
    SMART_ID_PRODUCT,
  
    SMART_ID_MATERIAL,
    SMART_ID_HISTORY,
    SMART_ID_COEFFICIENT,
    SMART_ID_FABRIC,
  
    MATERIAL_FIELDS,
    HISTORY_FIELDS,
    COEFFICIENT_FIELDS,
  
    SMART_FIELDS_MATERIAL,
    SMART_FIELDS_HISTORY,
    SMART_FIELDS_COEFFICIENT,
    SMART_FIELDS_FABRICS,
} from './fields.js';
    

export class ModalMutable {
    constructor(manager, modal) {
        this.manager = manager;

        this.modal = modal;
        this.saveBtn = this.modal.querySelector('#saveCalculation');
        this.copyBtn = this.modal.querySelector('#copyCalculation');
        this.closeBtn = this.modal.querySelector('#closeCalculation');
        this.container = this.modal.querySelector('tbody');

        this.initHandler();
    }

    initHandler() {
        this.saveBtn.addEventListener('click', () => this.saveCalculation());
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.container.addEventListener('change', (event) => {
            const target = event.target;
            const elemTr = target.closest('tr');
            // const field = elemTr.dataset.field;
            // console.log("target = ", target);

            // Изменение значения
            if (target.classList.contains('value')) {
                this.calcMaterialAmount(elemTr);
                this.calcCostPrice(this.container);
            }
            // Изменение цены
            if (target.classList.contains('price')) {
                this.calcMaterialAmount(elemTr);
                this.calcCostPrice(this.container);
            }
            if (target.classList.contains('cost-work')) {
                this.calcCostPrice(this.container);
            }

        })
    }
    calcMaterialAmount(elemTr) {
        const elemAmount = elemTr.querySelector('.amount');
        const elemPrice = elemTr.querySelector('.price');
        const elemValue = elemTr.querySelector('.value');
        const coefficient = elemValue.dataset.coefficient || 1;
        if (elemAmount && elemPrice && elemValue) {
            elemAmount.value = +elemValue.value * +elemPrice.value * + coefficient;
        }
    }

    calcCostPrice(tbody) {
        let costPrice = 0;
        for (const tr of tbody.querySelectorAll('tr')) {
            const elem = tr.querySelector('.amount');
            if (elem) {
                costPrice += +elem.value;
            }
        }
        tbody.querySelector('.summary-cost-price').value = costPrice;

        return costPrice;
    }

    async openModal(calculate) {
        this.saveBtn.classList.remove('d-none');
        this.copyBtn.classList.add('d-none');
        this.render(calculate);
        this.modal.classList.remove('d-none');
    }

    closeModal() {
        this.modal.classList.add('d-none');
    }

    saveCalculation() {
        let data = {
            [SMART_FIELDS_HISTORY.datePriceValidityOfToday]: this.getCurrentDate(),
        };
        for (const field of this.modal.querySelectorAll('.updated-field')) {
            const name = field.dataset.field;
            if (name) {
                data[name] = field.value;
            }
        }
        this.manager.saveCalculation(data);
        this.closeModal();
    }

    render(calculate) {
        console.log(calculate);
        this.modal.querySelector('.date-price-validity').innerHTML = this.getCurrentDate();
        this.container.innerHTML = `
            ${this.getMaterialsHTML(calculate.materials)}
            <tr data-id="${calculate.id}">
                <td placeholder="">Работа</td>
                <td><input type="number" class="price" min="0" value="" disabled></td>
                <td><input type="number" class="value" min="0" value="" disabled></td>
                <td><input type="number" class="amount cost-work updated-field" min="0" value="${calculate.workRating}" data-field="${SMART_FIELDS_HISTORY.workRating}"></td>
                <td><input type="text" class="comment updated-field" min="0" value="${calculate.workComment}" data-field="${SMART_FIELDS_HISTORY.workComment}"></td>
            </tr>
            <tr data-id="${calculate.id}">
                <td style="grid-column: 1 / span 3;"><div>Себестоимость</div></td>
                <td><input type="number" class="updated-field summary-cost-price" value="${calculate.costPrice || 0}" disabled  data-field="${SMART_FIELDS_HISTORY.costPrice}"></td>
                <td></td>
            </tr>
            <tr data-id="${calculate.id}" data-field="comment">
                <td><div>Комментарий</div></td>
                <td class="comment"><textarea class="common-comment updated-field" name="" id="" rows="2"  data-field="${SMART_FIELDS_HISTORY.comment}">${calculate.comment || ''}</textarea></td>
            </tr>
        `;
    }

    getMaterialsHTML(materials) {
        let contentHTML = '';
        for (const material of materials) {
            const disabled = material?.isChangePrice ? '' : 'disabled';

            const fieldPrice = `${material.field}Price`;
            const fieldValue = `${material.field}Value`;
            const fieldAmount = `${material.field}Amount`;
            const fieldComment = `${material.field}Comment`;
            if (material?.isChangePrice) {
                contentHTML += `
                    <tr>
                        <td placeholder="">${material?.title}</td>
                        <td><input type="number" class="price updated-field" min="0" value="${material?.price}" data-field="${SMART_FIELDS_HISTORY[fieldPrice]}"></td>
                        <td><input type="number" class="value updated-field" min="0" value="${material?.value}" data-field="${SMART_FIELDS_HISTORY[fieldValue]}" data-coefficient="${material?.coefficient}"></td>
                        <td><input type="number" class="amount updated-field" min="0" value="${material?.amount}" disabled data-field="${SMART_FIELDS_HISTORY[fieldAmount]}"></td>
                        <td><input type="text" class="comment updated-field" min="0" value="${material?.comment}" data-field="${SMART_FIELDS_HISTORY[fieldComment]}"></td>
                    </tr>
                `;
                continue;
            } else {
                contentHTML += `
                    <tr>
                        <td placeholder="">${material?.title}</td>
                        <td><input type="number" class="price" min="0" value="${material?.price}" disabled></td>
                        <td><input type="number" class="value updated-field" min="0" value="${material?.value}" data-field="${SMART_FIELDS_HISTORY[fieldValue]}" data-coefficient="${material?.coefficient}"></td>
                        <td><input type="number" class="amount updated-field" min="0" value="${material?.amount}" disabled data-field="${SMART_FIELDS_HISTORY[fieldAmount]}"></td>
                        <td><input type="text" class="comment updated-field" min="0" value="${material?.comment}" data-field="${SMART_FIELDS_HISTORY[fieldComment]}"></td>
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


export class ModalUnmutable {
    constructor(manager, modal) {
        this.manager = manager;

        this.modal = modal;
        this.saveBtn = this.modal.querySelector('#saveCalculation');
        this.copyBtn = this.modal.querySelector('#copyCalculation');
        this.closeBtn = this.modal.querySelector('#closeCalculation');
        this.container = this.modal.querySelector('tbody');

        this.initHandler();
    }

    initHandler() {
        this.copyBtn.addEventListener('click', () => this.copyCalculation());
        this.closeBtn.addEventListener('click', () => this.closeModal());
        // window.addEventListener('click', (event) => {
        //   if (event.target === this.modal) {
        //     this.closeModal();
        //   }
        // });
    }

    async openModal(calculate) {
        this.saveBtn.classList.add('d-none');
        this.copyBtn.classList.remove('d-none');
        this.copyBtn.dataset.id = calculate.id;
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
        this.manager.copyCalculation(this.copyBtn.dataset.id, data);
        this.closeModal();
    }

    render(calculate) {
        this.modal.querySelector('.date-price-validity').innerHTML = this.formatDate(calculate.datePriceValidity);
        this.container.innerHTML = `
            ${this.getMaterialsHTML(calculate.materials)}
            <tr data-id="${calculate.id}">
                <td placeholder="">Работа</td>
                <td><input type="number" class="price" min="0" value="" disabled></td>
                <td><input type="number" class="value" min="0" value="" disabled></td>
                <td><input type="number" class="amount created-field" min="0" value="${calculate.workRating}" disabled data-field="${SMART_FIELDS_HISTORY.workRating}"></td>
                <td><input type="text" class="comment created-field" min="0" value="${calculate.workComment}" disabled data-field="${SMART_FIELDS_HISTORY.workComment}"></td>
            </tr>
            <tr data-id="${calculate.id}">
                <td style="grid-column: 1 / span 3;"><div>Себестоимость</div></td>
                <td><input type="number" class="created-field" value="${calculate.costPrice || 0}" disabled data-field="${SMART_FIELDS_HISTORY.costPrice}"></td>
                <td></td>
            </tr>
            <tr data-id="${calculate.id}" data-field="comment">
                <td><div>Комментарий</div></td>
                <td class="comment"><textarea class="common-comment created-field" name="" id="" rows="2" disabled disabled data-field="${SMART_FIELDS_HISTORY.comment}">${calculate.comment || ''}</textarea></td>
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
                        <td><input type="number" class="price created-field" min="0" value="${material?.price}" disabled data-field="${SMART_FIELDS_HISTORY[fieldPrice]}"></td>
                        <td><input type="number" class="value created-field" min="0" value="${material?.value}" disabled data-field="${SMART_FIELDS_HISTORY[fieldValue]}"></td>
                        <td><input type="number" class="amount created-field" min="0" value="${material?.amount}" disabled data-field="${SMART_FIELDS_HISTORY[fieldAmount]}"></td>
                        <td><input type="text" class="comment created-field" min="0" value="${material?.comment}" disabled data-field="${SMART_FIELDS_HISTORY[fieldComment]}"></td>
                    </tr>
                `;
            } else {
                contentHTML += `
                    <tr>
                        <td placeholder="">${material?.title}</td>
                        <td><input type="number" class="price" min="0" value="${material?.price}" disabled></td>
                        <td><input type="number" class="value created-field" min="0" value="${material?.value}" disabled data-field="${SMART_FIELDS_HISTORY[fieldValue]}"></td>
                        <td><input type="number" class="amount created-field" min="0" value="${material?.amount}" disabled data-field="${SMART_FIELDS_HISTORY[fieldAmount]}"></td>
                        <td><input type="text" class="comment created-field" min="0" value="${material?.comment}" disabled data-field="${SMART_FIELDS_HISTORY[fieldComment]}"></td>
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


// document.addEventListener('DOMContentLoaded', function() {
//     const smartId = 172;
//     this.bx24 = new FakeBitrixService();
//     const calculationManager = new CalculationModal(this.bx24, smartId);
//     calculationManager.init();
//     // calculationManager.openModal(smartId);
// })
