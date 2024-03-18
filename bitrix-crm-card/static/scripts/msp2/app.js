
// import { FIELD_MSP_DATA, FIELD_MSP_FABRICS, FIELD_FABRIC } from '../parameters/params_msp.js';
// import { PhotoRenderer } from './photo.js';
// import { DataRenderer } from './data.js';
// import { FabricRenderer } from './fabric.js';
// // import { CalculationManager } from '../common/calculation/calculation.js'
// import { Calculation } from '../common/calculations/calculation.js'

// import { FIELD_LEAD } from '../parameters/params_lead.js';
import {
    SMART_PRODUCT_ID,
    SMART_FABRIC_ID,
    SMART_FIELDS_FABRICS,
    FIELD_MSP_FABRICS, 
    FIELD_MSP_DATA,
} from './params.js';

import { DataManager } from "./data_manager.js";
import { FabricManager } from "./fabric_manager.js";
import { FileManager } from "./file_manager.js";
import { MainPhotoManager } from "./photo_manager.js";
import { CanvasManager } from "./canvas_manager.js";
import { Calculation } from "../common/calc/calculation.js";
// import { Calculation } from "../common/calculations/calculation.js";


export class App {
    constructor(entityId, bx24, portalUrl) {
        this.entityId = entityId;
        this.bx24 = bx24;
        this.portalUrl = portalUrl;

        // this.currentUserId = null;
        // this.completedUploads = 0;
        
        this.elemWaitingLoader = document.querySelector("#elemWaitingLoader");
        this.containerProduct = document.querySelector("#containerProduct");

        this.createdUser = document.querySelector(`#${FIELD_MSP_DATA.createdBy}`);
        this.updatedUser = document.querySelector(`#${FIELD_MSP_DATA.updatedBy}`);

        this.btnSave = document.querySelector(`.product-btn-save`);
        this.btnCopy = document.querySelector(`#btnCreateCopyProduct`);
        this.btnRemove = document.querySelector(`#btnDeleteProduct`);
        
        this.modalCalcualtion = document.querySelector('#calculationWindow');
        this.containerCalculation = document.querySelector('#productCalculations');
    }

    async init() {
        this.dataManager = new DataManager(this.bx24, this.entityId);
        await this.dataManager.init();

        this.fabricManager = new FabricManager(this.bx24, this.dataManager);
        this.fileManager = new FileManager(this.bx24, this.dataManager);
        this.mainPhotoManager = new MainPhotoManager(this.dataManager, this.portalUrl);
        this.canvasManager = new CanvasManager(this.dataManager, this.portalUrl);
        this.calculationManager = new Calculation(this.bx24, SMART_PRODUCT_ID, this.entityId, this.modalCalcualtion, this.containerCalculation);

        // Убрать спиннер
        this.elemWaitingLoader.classList.add("d-none");
        this.containerProduct.classList.remove("d-none");

        this.fabricManager.init();
        this.mainPhotoManager.init();
        this.canvasManager.init();
        this.calculationManager.init();

        this.initHandlers();
    }

    initHandlers() {
        // Открываем профиль пользователя
        this.createdUser.addEventListener('click', (event) => {
            console.log(event.target);
            const target = event.target;
            const link = target.dataset.link;
            if (link) {
                this.bx24.openPath(link);
            }
        });

        // Открываем профиль пользователя
        this.updatedUser.addEventListener('click', (event) => {
            const target = event.target;
            const link = target.dataset.link;
            if (link) {
                this.bx24.openPath(link);
            }
        });
  
        // Сохраняем изменения товара
        this.btnSave.addEventListener('click', async (event) => {
            const spinner = event.target.querySelector('div');
            const changedData = this.dataManager.getChangedData();
            const changedFabric = this.fabricManager.getChangedData();
            const changedPhoto = this.mainPhotoManager.getChangedData();
            const changedCanvas = this.canvasManager.getChangedData();
            // console.log('changedCanvas: ', changedCanvas);
            // return;
            const newData = {...changedData, ...changedFabric, ...changedPhoto, ...changedCanvas};
            console.log('newData = ', newData);
            // return;
            spinner.style.display = 'inline-block';
            const resutlt = await this.bx24.callMethod('crm.item.update', {
                entityTypeId: SMART_PRODUCT_ID,
                id: this.entityId,
                fields: newData               
            });
            spinner.style.display = 'none';
            this.showRequestResult("Изменения сохранены");
        })

        // Создаем копию товара
        this.btnCopy.addEventListener('click', async (event) => {
            const spinner = event.target.querySelector('div');
            const changedData = this.dataManager.getFields();
            const changedFabric = this.fabricManager.getFields();
            const changedPhoto = await this.mainPhotoManager.getFields();
            const newData = {parentId1: this.data?.parentId1, ...changedData, ...changedFabric, ...changedPhoto};
            spinner.style.display = 'inline-block';
            let result = await this.bx24.callMethod("crm.item.add", {
                entityTypeId: SMART_PRODUCT_ID,
                fields: newData
            });
            console.log(`result: `, result);
            spinner.style.display = 'none';
            this.showRequestResult("Копия товара создана");
        })

        // Удаляем товар
        this.btnRemove.addEventListener('click', async (event) => {
            const spinner = event.target.querySelector('div');
            spinner.style.display = 'inline-block';
            let data = await this.bx24.callMethod("crm.item.delete", {
                entityTypeId: SMART_PRODUCT_ID,
                id: this.entityId
            });
            console.log(`result: `, result);
            spinner.style.display = 'none';
            BX24.closeApplication();
        })
        
    }

    // changeFabric() {
    //     // getFields
    //     // const data = this.dataRenderer.getFields();
    //     // const fabrics = this.fabricRenderer.getFields();
    //     // const photos = this.photoRenderer.getFields();
    // }

    // async getAllFabrics(total) {
    //     let cmd = {};
    //     let allItems = [];

    //     for (let i = 50; i < total; i += 50) {
    //         cmd[i] = `crm.item.list?entityTypeId=${this.smartFabricsId}&start=${i}&select[]=id&select[]=title&select[]=${FIELD_FABRIC.name}&select[]=${FIELD_FABRIC.image}&select[]=${FIELD_FABRIC.type}&select[]=${FIELD_FABRIC.color}&order[id]=ASC`;
    //     };

    //     const data = await this.bx24.batch.getData(cmd);
    //     const items = data?.result;
    //     for (const key in items) {
    //         if (items.hasOwnProperty(key) && items[key].items) {
    //             allItems = allItems.concat(items[key].items);
    //         }
    //     }

    //     return allItems;
    // }

    // updateParentHeight() {
    //     const parent = document.querySelector('.photos-parent');
    //     const parentWidth = parent.clientWidth;
    //     const coefficient = Math.SQRT2;
    //     parent.style.height = (parentWidth / coefficient) + 'px';
    //     // const canvas = document.querySelector('#canvasContainer');
    //     // canvas.style.width = parentWidth + 'px';
    //     // canvas.style.height = (parentWidth / coefficient) + 'px';
    // }

    showRequestResult(message) {
        const elemModal = document.querySelector(`#requestResult`);
        elemModal.querySelector('.modal-body').innerHTML = message;
        const myModal = new bootstrap.Modal(elemModal, {})
        myModal.show();
    }

    // async addItemProductRow() {
    //     const changedPhoto = await this.photoRenderer.getFields();
    //     console.log("changedPhoto = ", changedPhoto);

    //     // const result = await this.bx24.callMethod('crm.item.productrow.add', {
    //     //     fields: {
    //     //         ownerType: 'L',
    //     //         ownerId: this.leadData?.ID,
    //     //     }
    //     // });
    // }
}
