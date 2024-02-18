import { DataRenderer } from './data.js';
import { ProductCard } from './products.js';

const USERS_ACCESS = ['11789', '1'];


export class App {
    constructor(entityId, bx24, portalUrl) {
        this.smartProductsId = 172;
        this.entityId = entityId;
        this.bx24 = bx24;
        this.portalUrl = portalUrl;

        this.elemWaiting = document.querySelector("#elemWaitingLoader");
        this.elemApp = document.querySelector("#elemLeadData");
    }

    async init() {
        // const currentUser = await this.bx24.user.getCurrent();
        const response = await this.bx24.batch.getData({
            // currentUser: 'user.current',
            currentUser: 'user.get?id=11789',
            fieldsLeadData: 'crm.lead.fields',
            leadData: `crm.lead.get?id=${this.entityId}`,
            responsible: `user.get?id=$result[leadData][ASSIGNED_BY_ID]`,
        });

        // const currentUser = response?.result?.currentUser;
        this.currentUser = response?.result?.currentUser?.[0];
        this.fieldsLeadData = response?.result?.fieldsLeadData;
        this.leadData = response?.result?.leadData;
        this.responsible = response?.result?.responsible?.[0];

        console.log("currentUser = ", this.currentUser);
        console.log("fieldsLeadData = ", this.fieldsLeadData);
        console.log("leadData = ", this.leadData);
        console.log("responsible = ", this.responsible);

        const isAccess = this.restrictUserAccess(this.currentUser?.ID);
        if (!isAccess) {
            this.secureData();
            return;
        }

        this.data = new DataRenderer(this.bx24, this.leadData, this.fieldsLeadData, this.responsible);
        this.products = new ProductCard(this.bx24, this.leadData?.ID, this.smartProductsId, this.portalUrl);

        this.data.renderData();
        this.products.renderProducts();

        this.elemWaiting.classList.add("d-none");
        this.elemApp.classList.remove("d-none");
        this.updateParentHeight();
    }

    initHandler() {

    }

    restrictUserAccess(currentUserId) {
        return USERS_ACCESS.includes(currentUserId);
    }

    secureData() {
        let elem = document.querySelector('body');
        elem.innerHTML = '<h1> Доступ запрещен </h1>';
    }

    updateParentHeight() {
        const parent = document.querySelector('.photos-parent');
        console.log("parent = ", parent);
        const parentWidth = parent.clientWidth;
        console.log("parentWidth = ", parentWidth);
        const coefficient = Math.SQRT2;
        parent.style.height = (parentWidth / coefficient) + 'px';
    }
}
