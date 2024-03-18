import { SMART_FIELDS_CALCULATION } from './fields.js';


export class ModalMutable {
    constructor(manager, modal) {
        this.manager = manager;
        this.modal = modal;

        this.btnSave = this.modal.querySelector('#saveCalculation');
        this.btnCopy = this.modal.querySelector('#copyCalculation');
        this.btnClose = this.modal.querySelector('#closeCalculation');
        this.containerMaterials = this.modal.querySelector('tbody');

        this.initHandler();
    }

    initHandler() {
        // Сохранение калькуляции
        this.btnSave.addEventListener('click', this.saveCalculation.bind(this));
        // Закрытие окна калькуляции
        this.btnClose.addEventListener('click', this.closeModal.bind(this));
        // Изменение значения полей
        this.containerMaterials.addEventListener('change', (event) => {
            const target = event.target;
            const elemTr = target.closest('tr');
            // Изменение значения
            if (target.classList.contains('value')) {
                this.calcMaterialAmount(elemTr);
                this.calcCostPrice();
            }
            // Изменение цены
            if (target.classList.contains('price')) {
                this.calcMaterialAmount(elemTr);
                this.calcCostPrice();
            }
            if (target.classList.contains('cost-work')) {
                this.calcCostPrice();
            }
        })
    }

    calcMaterialAmount(elemTr) {
        const elemAmount = elemTr.querySelector('.amount');
        const elemPrice = elemTr.querySelector('.price');
        const elemValue = elemTr.querySelector('.value');
        if (elemAmount && elemPrice && elemValue) {
            const coefficient = elemValue.dataset.coefficient || 1;
            elemAmount.value = +elemValue.value * +elemPrice.value * + coefficient;
        }
    }

    calcCostPrice() {
        let costPrice = 0;
        for (const tr of this.containerMaterials.querySelectorAll('tr')) {
            const elem = tr.querySelector('.amount');
            if (elem) {
                costPrice += +elem.value;
            }
        }
        this.containerMaterials.querySelector('.summary-cost-price').value = costPrice;

        return costPrice;
    }

    async openModal(calculate) {
        this.btnSave.classList.remove('d-none');
        this.btnCopy.classList.add('d-none');
        this.render(calculate);
        // this.containerMaterials.querySelectorAll('tr').forEach(elemTr => this.calcMaterialAmount(elemTr));
        this.calcCostPrice();
        this.modal.classList.remove('d-none');
    }

    closeModal() {
        this.modal.classList.add('d-none');
    }

    saveCalculation() {
        let data = {
            [SMART_FIELDS_CALCULATION.datePriceValidityOfToday]: this.getCurrentDate(),
        };
        for (const field of this.modal.querySelectorAll('.updated-field')) {
            const name = field.dataset.field;
            if (name) {
                data[name] = field.value;
            }
        }
        this.manager.createCalculation(data);
        this.closeModal();
    }

    render(calculate) {
        console.log(calculate);
        this.modal.querySelector('.date-price-validity').innerHTML = this.formatDate(calculate.datePriceValidity);
        this.containerMaterials.innerHTML = `
            ${this.getMaterialsHTML(calculate.materials)}
            <tr data-id="${calculate.id}">
                <td placeholder="">Работа</td>
                <td><input type="number" class="" min="0" value="" disabled></td>
                <td><input type="number" class="" min="0" value="" disabled></td>
                <td><input type="number" class="amount cost-work updated-field" min="0" value="${calculate.workRating}" data-field="${SMART_FIELDS_CALCULATION.workRating}"></td>
                <td><input type="text" class="comment updated-field" min="0" value="${calculate.workComment}" data-field="${SMART_FIELDS_CALCULATION.workComment}"></td>
            </tr>
            <tr data-id="${calculate.id}">
                <td style="grid-column: 1 / span 3;"><div>Себестоимость</div></td>
                <td><input type="number" class="updated-field summary-cost-price" value="${calculate.costPrice || 0}" disabled  data-field="${SMART_FIELDS_CALCULATION.costPrice}"></td>
                <td></td>
            </tr>
            <tr data-id="${calculate.id}" data-field="comment">
                <td><div>Комментарий</div></td>
                <td class="comment"><textarea class="common-comment updated-field" name="" id="" rows="2"  data-field="${SMART_FIELDS_CALCULATION.comment}">${calculate.comment || ''}</textarea></td>
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
                        <td><input type="number" class="price updated-field" min="0" value="${material?.price}" data-field="${SMART_FIELDS_CALCULATION[fieldPrice]}"></td>
                        <td><input type="number" class="value updated-field" min="0" value="${material?.value}" data-field="${SMART_FIELDS_CALCULATION[fieldValue]}" data-coefficient="${material?.coefficient}"></td>
                        <td><input type="number" class="amount updated-field" min="0" value="${material?.amount}" disabled data-field="${SMART_FIELDS_CALCULATION[fieldAmount]}"></td>
                        <td><input type="text" class="comment updated-field" min="0" value="${material?.comment}" data-field="${SMART_FIELDS_CALCULATION[fieldComment]}"></td>
                    </tr>
                `;
                continue;
            } else {
                contentHTML += `
                    <tr>
                        <td placeholder="">${material?.title}</td>
                        <td><input type="number" class="price" min="0" value="${material?.price}" disabled></td>
                        <td><input type="number" class="value updated-field" min="0" value="${material?.value}" data-field="${SMART_FIELDS_CALCULATION[fieldValue]}" data-coefficient="${material?.coefficient}"></td>
                        <td><input type="number" class="amount updated-field" min="0" value="${material?.amount}" disabled data-field="${SMART_FIELDS_CALCULATION[fieldAmount]}"></td>
                        <td><input type="text" class="comment updated-field" min="0" value="${material?.comment}" data-field="${SMART_FIELDS_CALCULATION[fieldComment]}"></td>
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