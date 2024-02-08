
import { FIELD_MSP, FIELD_FABRIC } from '../parameters/params_msp.js';
import { PhotoRenderer } from './photo.js';
import { DataRenderer } from './data.js';
import { FabricRenderer } from './fabric.js';


export class App {
    constructor(entityId, bx24, portalUrl) {
        this.smartId = 172;
        this.smartFabricsId = 149;
        this.entityId = entityId;
        this.bx24 = bx24;
        this.portalUrl = portalUrl;
        this.currentUserId = null;

        this.initHandlers();
    }

    initHandlers() {
        // product-btn-save
        console.log("button save = ", document.querySelector(`.product-btn-save`));
        document.querySelector(`.product-btn-save`).addEventListener('click', async () => {
            const changedData = this.dataRenderer.getChangedData();
            const changedFabric = this.fabricRenderer.getChangedData();
            console.log("changedData = ", changedData);
            console.log("changedFabric = ", changedFabric);
        })
    }

    async init() {
        const data = await this.bx24.batch.getData({
            user: 'user.current',
            smartProcess: `crm.item.get?entityTypeId=${this.smartId}&id=${this.entityId}`,
            smartFabricList: `crm.item.list?entityTypeId=${this.smartFabricsId}&select[]=id&select[]=title&select[]=${FIELD_FABRIC.name}&select[]=${FIELD_FABRIC.photo}&select[]=${FIELD_FABRIC.type}&select[]=${FIELD_FABRIC.color}&order[id]=ASC`,
            smartFabric: `crm.item.get?entityTypeId=${this.smartFabricsId}&id=$result[smartProcess][item][${FIELD_MSP.upholsteryFabricCollection}]&select[]=id&select[]=title&select[]=ufCrm17_1705390343&select[]=ufCrm17_1705390515&select[]=ufCrm17_1705828938`,
            smartFabric_1: `crm.item.get?entityTypeId=${this.smartFabricsId}&id=$result[smartProcess][item][${FIELD_MSP.upholsteryFabricCollection_1}]&select[]=id&select[]=title&select[]=ufCrm17_1705390343&select[]=ufCrm17_1705390515&select[]=ufCrm17_1705828938`,
            smartFabric_2: `crm.item.get?entityTypeId=${this.smartFabricsId}&id=$result[smartProcess][item][${FIELD_MSP.upholsteryFabricCollection_2}]&select[]=id&select[]=title&select[]=ufCrm17_1705390343&select[]=ufCrm17_1705390515&select[]=ufCrm17_1705828938`,
            fields: `crm.item.fields?entityTypeId=${this.smartId}`,
            createdBy: `user.get?id=$result[smartProcess][item][${FIELD_MSP.createdBy}]`,
            updatedBy: `user.get?id=$result[smartProcess][item][${FIELD_MSP.createdBy}]`,
        });

        this.user = data?.result?.user;
        this.createdUser = data?.result?.createdBy[0];
        this.updatedUser = data?.result?.updatedBy[0];
        this.data = data?.result?.smartProcess?.item;
        this.smartFabricList = data?.result?.smartFabricList?.items;
        const total = data?.result_total?.smartFabricList;
        let allFabrics = await this.getAllFabrics(total);
        this.smartFabricList = this.smartFabricList.concat(allFabrics);
        this.smartFabric = data?.result?.smartFabric?.item;
        this.smartFabric_1 = data?.result?.smartFabric_1?.item;
        this.smartFabric_2 = data?.result?.smartFabric_2?.item;
        this.fields = data?.result?.fields?.fields;

        if (!this.data || !this.user) {
            console.error(`Error get data or user from server for smart processId=${this.smartId}, entityId=${this.entityId}: `, data);
            return;
        }

        const photoRenderer = new PhotoRenderer(this.data, this.portalUrl);
        const dataRenderer = new DataRenderer(this.bx24, this.data, this.fields, this.createdUser, this.updatedUser);
        const fabricRenderer = new FabricRenderer(this.bx24, this.data, this.smartFabricList, this.portalUrl);

        photoRenderer.renderPhotos();
        dataRenderer.renderData();
        fabricRenderer.renderFabrics();

        this.initHandlers();
    }

    initHandlers() {
        document.querySelector(`#${FIELD_MSP.createdBy}`).addEventListener('click', (event) => {
            const target = event.target;
            const link = target.dataset.link;
            if (link) {
                this.bx24.openPath(link);
            }
        });

        document.querySelector(`#${FIELD_MSP.updatedBy}`).addEventListener('click', (event) => {
            const target = event.target;
            const link = target.dataset.link;
            if (link) {
                this.bx24.openPath(link);
            }
        });
    }

    changeFabric() {
        

    }

    async getAllFabrics(total) {
        let cmd = {};
        let allItems = [];

        for (let i = 50; i < total; i += 50) {
            cmd[i] = `crm.item.list?entityTypeId=${this.smartFabricsId}&start=${i}&select[]=id&select[]=title&select[]=${FIELD_FABRIC.name}&select[]=${FIELD_FABRIC.image}&select[]=${FIELD_FABRIC.type}&select[]=${FIELD_FABRIC.color}&order[id]=ASC`;
        };

        const data = await this.bx24.batch.getData(cmd);
        const items = data?.result;
        for (const key in items) {
            if (items.hasOwnProperty(key) && items[key].items) {
                allItems = allItems.concat(items[key].items);
            }
        }

        return allItems;
    }

    
}
