import {
    SMART_PRODUCT_ID,
    FIELDS_LEAD,

} from './params.js';


export class FileManager {
    constructor(bx24, dataManager) {
        this.bx24 = bx24;
        this.dataManager = dataManager;

        this.btnOpenFolder = document.querySelector(`#btnOpenDiskFolder`);
        this.btnDownloadFiles = document.querySelector(`#btnDownloadFiles`);
        this.inputDownloadFiles = document.querySelector('#inputDownloadFiles');

        this.completedUploads = 0;

        this.initHandlers();
    }

    initHandlers() {
        // Открываем директорию с файлами
        this.btnOpenFolder.addEventListener('click', async () => {
            this.openFolder();
        })

        // Открыть интерфейс для загрузки файлов на диск в Bitrix24
        this.btnDownloadFiles.addEventListener('click', async () => {
            if (!this.dataManager?.lead?.[FIELDS_LEAD.folderId]) {
                console.error(`Error download file to server for smart processId=${SMART_PRODUCT_ID}, entityId=${this.dataManager.productId}, folderId=${FIELDS_LEAD.folderId}`);
                return;
            }
            this.inputDownloadFiles.click();
        })

        // Загрузка файлов на диск в Bitrix24
        this.inputDownloadFiles.addEventListener('change', async (event) => {
            this.downloadFiles(event);
        });        
    }

    async openFolder() {
        if (!this.dataManager?.lead?.[FIELDS_LEAD.folderId]) {
            console.error(`Error get folderId from server for smart processId=${SMART_PRODUCT_ID}, entityId=${this.dataManager.productId}, folderId=${FIELDS_LEAD.folderId}`);
            return;
        }
        const data = await this.bx24.callMethod("disk.folder.get", {
            id: this.dataManager?.lead?.[FIELDS_LEAD.folderId]
        });
        const link = data?.DETAIL_URL;
        if (!link) {
            console.error(`Error get link from server for smart processId=${SMART_PRODUCT_ID}, entityId=${this.dataManager.productId}, folderId=${FIELDS_LEAD.folderId}`);
            return;
        }
        window.open(link, '_blank');
    }

    async downloadFiles(event) {
        if (!this.dataManager?.lead?.[FIELDS_LEAD.folderId]) {
            console.error(`Error download file to server for smart processId=${SMART_PRODUCT_ID}, entityId=${this.dataManager.productId}, folderId=${FIELDS_LEAD.folderId}`);
            return;
        }
        const target = event.target;
        const spinner = target.parentNode.querySelector('div');
        const files = target.files;
        if (files.length > 0) {
            spinner.style.display = 'inline-block';
            this.completedUploads++;
            for (let i = 0; i < files.length; i++) {
                await this.bx24.uploadFile(this.dataManager?.lead?.[FIELDS_LEAD.folderId], files[i]);
            }
            this.completedUploads--;
            if (this.completedUploads === 0) {
                spinner.style.display = 'none';
            }
        } else {
            console.log('Выберите файлы для загрузки');
        }
    }
}