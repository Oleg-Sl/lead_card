

export class CalculationsContainer{
    constructor(manager, container) {
        this.manager = manager;
        this.container = container;
        this.containerList = this.container.querySelector('tbody');

        this.initHandlers();
    }

    initHandlers() {
        this.containerList.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('show-calculation-window')) {
                const smartId = target.closest('tr').dataset.id;
                this.manager.openModal(smartId);
            }
        });

        this.container.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('product-btn-save')) {
                this.manager.openModal();
            }
        });
    }

    renderCalculations(calculations) {    
        for (const calculation of calculations) {
            this.createCalculation(calculation);
        }
    }

    createCalculation(calculation) {
        const calculationHTML = this.getCalculationHTML(calculation);
        this.containerList.insertAdjacentHTML('beforeend', calculationHTML);
    }

    getCalculationHTML(calculation) {
        return `
            <tr data-id="${calculation.id}">
                <td class="p-0 m-0">
                    <strong class="show-calculation-window"style="text-decoration: underline; color: #0e6efd; cursor: pointer;">Ссылка</strong>
                </td>
                <td class="p-0 m-0">
                    ${this.formatDate(calculation.dateCreated)}
                </td>
                <td class="p-0 m-0">
                    <a href="#" data-user-link="${this.getUserLink(calculation.createdBy)}">${this.getUserName(calculation.createdBy)}</a>
                </td>
                <td class="p-0 m-0">
                    ${calculation.comment}
                </td>
            </tr>
        `;
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
