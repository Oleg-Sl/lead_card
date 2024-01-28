import BitrixService from './bx24/api.js';


const USERS_ACCESS = ['11789', ];

class App {
    constructor(leadId, bx24) {
        this.leadId = leadId;
        this.bx24 = bx24;
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

        const data = await this.bx24.batch.getDataForStart(this.leadId);
        console.log("data = ", data);



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