

class App {
    constructor(leadId) {
        this.leadId = leadId;
    }

    async init() {
        console.log("Lead id = ", this.leadId);
    }

}



async function main() {
    // console.log("Ready!!!");
    // let seretKeyYandex = await BX24.appOption.get(SETTINGS__SECRETS_KEY);
    // let bx24   = new Bitrix24();
    // let yaDisk = new YandexDisk(seretKeyYandex);
    let app = new App(dealId);
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