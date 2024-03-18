import FakeBitrixService from './scripts/bx24/fake_api.js';
import { App } from './scripts/msp2/app.js'


async function main() {
    let bx24 = new FakeBitrixService();
    
    let app = new App(smartProcessId, bx24, portalUrl);
    await app.init();
}


document.addEventListener("DOMContentLoaded", async function() {
    await main();
});




