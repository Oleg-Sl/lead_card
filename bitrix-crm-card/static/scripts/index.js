import InterfaceBlockOne from './interface_block_one.js'
import { InterfaceBlockTwo } from './interface_block_two.js'
import InterfaceBlockThree from './interface_block_three.js'
import InterfaceBlockFour from './interface_block_four.js'
import InterfaceBlockFive from './interface_block_five.js'

import Bitrix24 from './bx24/requests.js'
import YandexDisk from './yandex_disk/requests.js'

// import {update as updateTaskOrder} from "./utils/task_update.js"
import { Task } from "./utils/task.js"
import { CheckData } from "./utils/check_data.js"
import { DealDataComparator, ProductsDataComparator } from "./utils/data_comparator.js"

import {
    bx24TaskAddComment,
    bx24UserGetCurrent,
    bx24DealGetFields,
    bx24DealGetData,
    bx24DealUpdate,
    bx24ContactGetData,
    bx24SmartProcessUpdate,
    bx24SmartProcessGetList,
    bx24ProductGetFields,
    bx24GetStartData,
    bx24GetContactsData,
    bx24BatchGetDealAndProducts,
} from "./bx24/api.js"

import {
    FIELD_ID_TASK_ORDER,
    FIELD_CONTACT_MESURE,
} from "./parameters.js"


const SETTINGS__SECRETS_KEY = "yandex_secret_key";


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


$(document).ready(function() {
    BX24.init(async function(){
        await main();
        BX24.fitWindow();
    })
});