import BitrixService from './bx24/api.js';


const USERS_ACCESS = ['11789', '1'];

class App {
    constructor(leadId, bx24) {
        this.smartNumber = 172;
        this.leadId = leadId;
        this.bx24 = bx24;
        this.currentUserId = null;

    }

    async init() {
        const currentUser = await this.bx24.user.getCurrent();
        // console.log("currentUser = ", currentUser);
        this.currentUserId = currentUser?.ID;
        const isAccess = this.restrictUserAccess();
        if (!isAccess) {
            this.secureData();
            return;
        }
        const data = await this.getDataFromBx24();
        // const data = await this.bx24.batch.getDataForStart(this.leadId);
        // console.log("data = ", data);

        this.initHandler();
    }

    async getDataFromBx24() {
        const data = await this.bx24.batch.getData({
            // currentUser: 'user.current',
            // departments: 'department.get',
            fieldsLeadData: 'crm.lead.fields',
            leadData: `crm.lead.get?id=${leadId}`,
            fieldsProductData: `crm.item.fields?entityTypeId=${this.smartNumber}`,
            productsData: `crm.item.list?entityTypeId=${this.smartNumber}`,
            responsible: `user.get?id=$result[leadData][ASSIGNED_BY_ID]`,

            // user: 'user.current',
            // smartProcess: `crm.item.get?entityTypeId=${this.smartId}&id=${this.entityId}`,
            // smartFabricList: `crm.item.list?entityTypeId=${this.smartFabricsId}&select[]=id&select[]=title&select[]=${FIELD_FABRIC.name}&select[]=${FIELD_FABRIC.image}&select[]=${FIELD_FABRIC.type}&select[]=${FIELD_FABRIC.color}&order[id]=ASC`,
            // smartFabric: `crm.item.get?entityTypeId=${this.smartFabricsId}&id=$result[smartProcess][item][${FIELD_MSP.upholsteryFabricCollection}]&select[]=id&select[]=title&select[]=ufCrm17_1705390343&select[]=ufCrm17_1705390515&select[]=ufCrm17_1705828938`,
            // smartFabric_1: `crm.item.get?entityTypeId=${this.smartFabricsId}&id=$result[smartProcess][item][${FIELD_MSP.upholsteryFabricCollection_1}]&select[]=id&select[]=title&select[]=ufCrm17_1705390343&select[]=ufCrm17_1705390515&select[]=ufCrm17_1705828938`,
            // smartFabric_2: `crm.item.get?entityTypeId=${this.smartFabricsId}&id=$result[smartProcess][item][${FIELD_MSP.upholsteryFabricCollection_2}]&select[]=id&select[]=title&select[]=ufCrm17_1705390343&select[]=ufCrm17_1705390515&select[]=ufCrm17_1705828938`,
            // fields: `crm.item.fields?entityTypeId=${this.smartId}`,
            // createdBy: `user.get?id=$result[smartProcess][item][${FIELD_MSP.createdBy}]`,
            // updatedBy: `user.get?id=$result[smartProcess][item][${FIELD_MSP.createdBy}]`,
        });

        console.log("data = ", data);

        // this.user = data?.result?.user;
        // this.createdUser = data?.result?.createdBy[0];
        // this.updatedUser = data?.result?.updatedBy[0];
        // this.data = data?.result?.smartProcess?.item;
        // this.smartFabricList = data?.result?.smartFabricList?.items;
        // const total = data?.result_total?.smartFabricList;
        // let allFabrics = await this.getAllFabrics(total);
        // this.smartFabricList = this.smartFabricList.concat(allFabrics);
        // this.smartFabric = data?.result?.smartFabric?.item;
        // this.smartFabric_1 = data?.result?.smartFabric_1?.item;
        // this.smartFabric_2 = data?.result?.smartFabric_2?.item;
        // this.fields = data?.result?.fields?.fields;

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
    let app = new App(dealId, bx24);
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