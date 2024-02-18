
import { FIELD_PRODUCT } from '../parameters/params_lead.js';


export class ProductCard {
    constructor(bx24, leadId, smartNumber, portalUrl) {
        this.bx24 = bx24;
        this.leadId = leadId;
        this.smartNumber = smartNumber;
        this.portalUrl = portalUrl;

        this.initHandler();
    }

    async init() {

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
                this.handleProductCardClose.bind(this)
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
                    this.handleProductCardClose.bind(this)
                );
            }
        })
    }
    async getDataFromBx24() {
        const response = await this.bx24.batch.getData({
            productsData: `crm.item.list?entityTypeId=${this.smartNumber}&filter[parentId1]=${this.leadId}&order[${FIELD_PRODUCT.isActive}]=DESC`,
        })
        return response?.result?.productsData?.items;
    }

    async renderProducts() {
        let contentHTML = '';
        this.products = await this.getDataFromBx24();

        for (const product of this.products) {
            contentHTML += this.getProductHTML(product);
        }

        document.querySelector('.lead-products-cards').innerHTML = contentHTML;
    }

    handleProductCardClose() {
        this.renderProducts();
    }

    getProductHTML(product) {
        let urlPhoto = '' 
        if (product?.ufCrm23_1706606863?.urlMachine) {
            urlPhoto = this.portalUrl + '/get-image/?url=' + encodeURIComponent(product?.ufCrm23_1706606863?.urlMachine);
        }
        return `
            <div class="lead-products-card-container" data-id="${product.id}">
                <div class="col lead-product-card">
                    <div class="product-card-header">
                        <div class="product-card-header-title text-truncate d-flex align-items-center">
                            <div class="text-truncate align-middle">${product.title}</div>
                        </div>
                        <div class="product-card-header-measure">${this.getMarkerIsMeasured(product[FIELD_PRODUCT.isMeasured])}</div>
                        <div class="product-card-header-active">${this.getMarkerIsActive(product[FIELD_PRODUCT.isActive])}</div>
                    </div>
                    <div class="product-card-body-img">
                        <img src="${urlPhoto}" class="card-img-top" alt="...">
                    </div>
                    <div class="product-card-body-freetitle">
                        <p class="card-text">${product?.ufCrm23_1707374226 || "-"}</p>
                    </div>
                    <div class="product-card-body-footer">
                        <small class="text-body-secondary">Размеры: ${product?.ufCrm23_1706603192}</small>
                    </div>
                </div>
            </div>
        `;
    }

    getMarkerIsActive(isActive) {
        if (isActive == 'Y') {
            return '✅';
        }
        return '❌';        
    }

    getMarkerIsMeasured(isMeasured) {
        if (isMeasured == 'Y') {
            return '📐';
        }
        return '🚫';
        
    }
}
