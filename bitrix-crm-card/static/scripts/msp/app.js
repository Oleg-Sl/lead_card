
import { FIELD_MSP_DATA, FIELD_MSP_FABRICS, FIELD_FABRIC } from '../parameters/params_msp.js';
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
    }

    async init() {
        const data = await this.bx24.batch.getData({
            user: 'user.current',
            smartProcess: `crm.item.get?entityTypeId=${this.smartId}&id=${this.entityId}`,
            smartFabricList: `crm.item.list?entityTypeId=${this.smartFabricsId}&select[]=id&select[]=title&select[]=${FIELD_FABRIC.name}&select[]=${FIELD_FABRIC.image}&select[]=${FIELD_FABRIC.type}&select[]=${FIELD_FABRIC.color}&order[id]=ASC`,
            smartFabric: `crm.item.get?entityTypeId=${this.smartFabricsId}&id=$result[smartProcess][item][${FIELD_MSP_FABRICS.upholsteryFabricCollection}]&select[]=id&select[]=title&select[]=ufCrm17_1705390343&select[]=ufCrm17_1705390515&select[]=ufCrm17_1705828938`,
            smartFabric_1: `crm.item.get?entityTypeId=${this.smartFabricsId}&id=$result[smartProcess][item][${FIELD_MSP_FABRICS.upholsteryFabricCollection_1}]&select[]=id&select[]=title&select[]=ufCrm17_1705390343&select[]=ufCrm17_1705390515&select[]=ufCrm17_1705828938`,
            smartFabric_2: `crm.item.get?entityTypeId=${this.smartFabricsId}&id=$result[smartProcess][item][${FIELD_MSP_FABRICS.upholsteryFabricCollection_2}]&select[]=id&select[]=title&select[]=ufCrm17_1705390343&select[]=ufCrm17_1705390515&select[]=ufCrm17_1705828938`,
            fields: `crm.item.fields?entityTypeId=${this.smartId}`,
            createdBy: `user.get?id=$result[smartProcess][item][${FIELD_MSP_DATA.createdBy}]`,
            updatedBy: `user.get?id=$result[smartProcess][item][${FIELD_MSP_DATA.createdBy}]`,
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

        this.photoRenderer = new PhotoRenderer(this.data, this.portalUrl);
        this.dataRenderer = new DataRenderer(this.bx24, this.data, this.fields, this.createdUser, this.updatedUser);
        this.fabricRenderer = new FabricRenderer(this.bx24, this.data, this.smartFabricList, this.portalUrl);

        this.photoRenderer.renderPhotos();
        this.dataRenderer.renderData();
        this.fabricRenderer.renderFabrics();

        this.initHandlers();
    }

    initHandlers() {
        document.querySelector(`#${FIELD_MSP_DATA.createdBy}`).addEventListener('click', (event) => {
            const target = event.target;
            const link = target.dataset.link;
            if (link) {
                this.bx24.openPath(link);
            }
        });

        document.querySelector(`#${FIELD_MSP_DATA.updatedBy}`).addEventListener('click', (event) => {
            const target = event.target;
            const link = target.dataset.link;
            if (link) {
                this.bx24.openPath(link);
            }
        });

        // Сохраняем изменения товара
        document.querySelector(`.product-btn-save`).addEventListener('click', async () => {
            const changedData = this.dataRenderer.getChangedData();
            const changedFabric = this.fabricRenderer.getChangedData();
            const changedPhoto = this.photoRenderer.getChangedData();
            const resData = {...changedData, ...changedFabric, ...changedPhoto};
            await this.bx24.smartProcess.update(this.smartId, this.entityId, resData);
        })

        // Создаем копию товара
        document.querySelector(`#btnCreateCopyProduct`).addEventListener('click', async () => {
            const changedData = this.dataRenderer.getFields();
            const changedFabric = this.fabricRenderer.getFields();
            const changedPhoto = this.photoRenderer.getFields();
            const resData = {parentId1: this.data?.parentId1, ...changedData, ...changedFabric, ...changedPhoto};
            console.log("resData = ", resData);
            const result = await this.bx24.smartProcess.add(this.smartId, resData);
            console.log(`result: `, result);
        })

        // Открываем директорию с файлами
        document.querySelector(`#btnOpenDiskFolder`).addEventListener('click', async () => {
            console.log("FIELD_MSP_DATA.folderId = ", FIELD_MSP_DATA.folderId);
            console.log("this.data?.[FIELD_MSP_DATA.folderId] = ", this.data?.[FIELD_MSP_DATA.folderId]);
            if (!this.data?.[FIELD_MSP_DATA.folderId]) {
                console.error(`Error get folderId from server for smart processId=${this.smartId}, entityId=${this.entityId}, folderId=${FIELD_MSP_DATA.folderId}`);
                return;
            }
            const data = await this.bx24.callMethod("disk.folder.get", {
                id: this.data?.[FIELD_MSP_DATA.folderId]
            });
            console.log(data);
            const link = data?.answer?.result?.DETAIL_URL;
        })

        // Загружаем файлы в директорию на Bitrix24
        document.querySelector(`#btnDownloadFiles`).addEventListener('click', async () => {
            // const changedData = this.dataRenderer.getChangedData();
            // const changedFabric = this.fabricRenderer.getChangedData();
            // const changedPhoto = this.photoRenderer.getChangedData();
            // const resData = {...changedData, ...changedFabric, ...changedPhoto};
            // await this.bx24.smartProcess.update(this.smartId, this.entityId, resData);
        })
    }

    changeFabric() {
        // getFields
        // const data = this.dataRenderer.getFields();
        // const fabrics = this.fabricRenderer.getFields();
        // const photos = this.photoRenderer.getFields();
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
