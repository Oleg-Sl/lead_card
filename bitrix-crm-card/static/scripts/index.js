import BitrixService from './bx24/api.js';


const USERS_ACCESS = ['11789', '1'];


class App {
    constructor(leadId, bx24, portalUrl) {
        this.smartNumber = 172;

        this.leadId = leadId;
        this.bx24 = bx24;
        this.portalUrl = portalUrl;

        this.currentUserId = null;

    }

    async init() {
        const currentUser = await this.bx24.user.getCurrent();
        this.currentUserId = currentUser?.ID;
        const isAccess = this.restrictUserAccess();
        if (!isAccess) {
            this.secureData();
            return;
        }
        await this.getDataFromBx24();

        this.renderProducts();

        this.initHandler();
    }

    async getDataFromBx24() {
        const data = await this.bx24.batch.getData({
            // currentUser: 'user.current',
            // departments: 'department.get',
            fieldsLeadData: 'crm.lead.fields',
            leadData: `crm.lead.get?id=${this.leadId}`,
            fieldsProductData: `crm.item.fields?entityTypeId=${this.smartNumber}`,
            productsData: `crm.item.list?entityTypeId=${this.smartNumber}&filter[parentId1]=${this.leadId}`,
            responsible: `user.get?id=$result[leadData][ASSIGNED_BY_ID]`,
        });

        this.fieldsLeadData = data?.result?.fieldsLeadData;
        this.leadData = data?.result?.leadData;
        this.fieldsProductData = data?.result?.fieldsProductData?.fields;
        this.productsData = data?.result?.productsData?.items;
        this.responsible = data?.result?.responsible?.[0];
        console.log("this.fieldsLeadData = ", this.fieldsLeadData);
        console.log("this.leadData = ", this.leadData);
        console.log("this.fieldsProductData = ", this.fieldsProductData);
        console.log("this.productsData = ", this.productsData);
        console.log("this.responsible = ", this.responsible);
    }

    initHandler() {
        document.querySelector('#openMspWindow').addEventListener('click', (event) => {
            BX24.openApplication(
                {
                    'opened': true,
                    'bx24_leftBoundary': 100,
                    'bx24_label': {
                        'bgColor':'pink',
                        'text': 'my task',
                        'color': '#07ff0e',
                    },
                    'bx24_title': 'МСП',
                    'parameters': {
                        'productType': 'msp',
                        'productId': 1  // this.leadId,
                    }
                },
                function()
                {
                    console.log('Application closed!')
                }
            );
        });

        document.querySelector('.lead-products-cards').addEventListener('click', (event) => {
            const target = event.target;
            if (target.closest('[data-id]')) {
                const productId = target.closest('[data-id]').dataset.id;
                console.log("productId = ", productId);
                BX24.openApplication(
                    {
                        'opened': true,
                        'bx24_leftBoundary': 100,
                        'bx24_label': {
                            'bgColor':'pink',
                            'text': 'my task',
                            'color': '#07ff0e',
                        },
                        'bx24_title': 'МСП',
                        'parameters': {
                            'productType': 'msp',
                            'productId': productId  // this.leadId,
                        }
                    },
                    function()
                    {
                        console.log('Application closed!')
                    }
                );
            }
        })
 
    }

    renderProducts() {
        let contentHTML = '';
        for (const product of this.productsData) {
            const urlPhoto = this.portalUrl + '/get-image/?url=' + encodeURIComponent(product?.ufCrm23_1706606863?.urlMachine);
            contentHTML += `
                <div class="lead-products-card-container" data-id="${product.id}">
                    <div class="col lead-product-card">
                        <div class="product-card-header">
                            <div class="product-card-header-title text-truncate d-flex align-items-center">
                                <div class="text-truncate align-middle">${product.title}</div>
                            </div>
                            <div class="product-card-header-measure">📐</div>
                            <div class="product-card-header-active">❌</div>
                        </div>
                        <div class="product-card-body-img">
                            <img src="${urlPhoto}" class="card-img-top" alt="...">
                        </div>
                        <div class="product-card-body-freetitle">
                            <p class="card-text">${product?.ufCrm23_1707374226}</p>
                        </div>
                        <div class="product-card-body-footer">
                            <small class="text-body-secondary">Размеры: ${product?.ufCrm23_1706603192}</small>
                        </div>
                    </div>
                </div>
            `;
        }
        document.querySelector('.lead-products-cards').innerHTML = contentHTML;
    }

    restrictUserAccess() {
        if (!USERS_ACCESS.includes(this.currentUserId)) {
            return false;
        }
        return true;
    }

    secureData() {
        let elem = document.querySelector('body');
        elem.innerHTML = '<h1> Доступ запрещен </h1>';
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



async function main() {
    // console.log("Ready!!!");
    // let seretKeyYandex = await BX24.appOption.get(SETTINGS__SECRETS_KEY);
    let bx24   = new BitrixService();
    // let yaDisk = new YandexDisk(seretKeyYandex);
    let app = new App(dealId, bx24, portalUrl);
    await app.init();
}


// $(document).ready(function() {
//     BX24.init(async function(){
//         await main();
//         BX24.fitWindow();
//     })
// });

document.addEventListener("DOMContentLoaded", async function() {
    BX24.init(async function(){
        await main();
        BX24.fitWindow();
    });
});