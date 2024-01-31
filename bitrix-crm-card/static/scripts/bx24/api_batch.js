// import { SMART_FIELDS, } from '../parameters.js';


export default class BatchMethods {
    constructor(bx24) {
        this.bx24 = bx24;
    }

    async getData(cmd) {
        let data = await this.bx24.callMethod("batch", {
            halt: 0,
            cmd: cmd
        });

        return data;
    }

    async getDataForStart(leadId) {
        const cmd = {
            currentUser: 'user.current',
            fieldsLeadData: 'crm.lead.fields',
            // departments: 'department.get',
            // fieldsProductData: `crm.item.fields?entityTypeId=${smartNumber}`,
            leadData: `crm.lead.get?id=${leadId}`,
            responsible: `user.get?id=$result[leadData][ASSIGNED_BY_ID]`,
        };

        let data = await this.bx24.callMethod("batch", {
            halt: 0,
            cmd: cmd
        });

        return data?.result;
    }

    // async getDealAndProducts(smartNumber, dealId) {
    //     let reqPackage = {
    //         deal: [
    //             "crm.deal.list",
    //             {
    //                 filter: { "ID": dealId }, 
    //                 select: ["*", "UF_*"],
    //                 start: -1,
    //             }
    //         ],
    //         products: [
    //             "crm.item.list",
    //             {
    //                 "entityTypeId": smartNumber,
    //                 "filter": { "parentId2": dealId },
    //                 "select": [
    //                     "id",
    //                     SMART_FIELDS.TITLE,
    //                     SMART_FIELDS.COUNT_PIECES,
    //                     SMART_FIELDS.TECHNOLOGY,
    //                     SMART_FIELDS.FILM,
    //                     SMART_FIELDS.LAMINATION,
    //                     SMART_FIELDS.WIDTH_FILM,
    //                     SMART_FIELDS.LINEAR_METER_PIECES,
    //                     SMART_FIELDS.SQUARE_METER_PIECES,
    //                     SMART_FIELDS.LINEAR_METER_TOTAL,
    //                     SMART_FIELDS.SQUARE_METER_TOTAL,
    //                     SMART_FIELDS.LINK_SRC,
    //                     SMART_FIELDS.CLIENT_FILES,
    //                     SMART_FIELDS.PREPRESS,
    //                     SMART_FIELDS.COMMENT,
    //                 ],
    //                 start: -1,
    //             }
    //         ]
    //     };

    //     let response = await await bx24.batchMethod(reqPackage);
    //     return response;
    // }
}
