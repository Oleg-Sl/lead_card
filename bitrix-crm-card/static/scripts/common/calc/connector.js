// import { DataFormatter } from './formatter.js';
import {
  SMART_ID_PRODUCT,

  SMART_ID_MATERIAL,
  SMART_ID_CALCULATION,
  SMART_ID_COEFFICIENT,
  SMART_ID_FABRIC,

  // MATERIAL_FIELDS,
  // HISTORY_FIELDS,
  // COEFFICIENT_FIELDS,

  // SMART_FIELDS_MATERIAL,
  SMART_FIELDS_CALCULATION,
  SMART_FIELDS_COEFFICIENT,
  SMART_FIELDS_FABRICS,
} from './fields.js';


export class DataConnector {
  constructor(bx24) {
    this.bx24 = bx24;
  }

  async getData(smartId, entityId) {
    const cmd = {
      user : `user.current`,
      smartProcess: `crm.item.get?entityTypeId=${smartId}&id=${entityId}`,
      smartFabric_1: `crm.item.get?entityTypeId=${SMART_ID_FABRIC}&id=$result[smartProcess][item][${SMART_FIELDS_FABRICS.upholsteryFabricCollection}]`,
      smartFabric_2: `crm.item.get?entityTypeId=${SMART_ID_FABRIC}&id=$result[smartProcess][item][${SMART_FIELDS_FABRICS.upholsteryFabricCollection_1}]`,
      smartFabric_3: `crm.item.get?entityTypeId=${SMART_ID_FABRIC}&id=$result[smartProcess][item][${SMART_FIELDS_FABRICS.upholsteryFabricCollection_2}]`,
      material: `crm.item.list?entityTypeId=${SMART_ID_MATERIAL}`,
      history: `crm.item.list?entityTypeId=${SMART_ID_CALCULATION}&filter[parentId${SMART_ID_PRODUCT}]=${entityId}`,
      coefficient: `crm.item.list?entityTypeId=${SMART_ID_COEFFICIENT}&select[]=id&select[]=${SMART_FIELDS_COEFFICIENT.MDF6mm}&select[]=${SMART_FIELDS_COEFFICIENT.PPU}`,
      fieldsHystory: `crm.item.fields?entityTypeId=${SMART_ID_CALCULATION}`,
    };
    const result = await this.bx24.callMethod('batch', {
      halt: 0,
      cmd: cmd
    });

    console.log("result get data = ", result);

    const user = Array.isArray(result?.result?.user) ? result?.result?.user?.[0] : result?.result?.user;
    const fabric_1 = result?.result?.smartFabric_1?.item;
    const fabric_2 = result?.result?.smartFabric_2?.item;
    const fabric_3 = result?.result?.smartFabric_3?.item;
    const materials = result?.result?.material?.items || [];
    const calculations = result?.result?.history?.items || [];
    const coefficients = result?.result?.coefficient?.items?.[0] || {};
    const calculationFields = result?.result?.fieldsHystory?.fields || [];
    
    return {
      user,
      materials,
      calculations,
      coefficients,
      calculationFields,
      fabrics: {
        fabricNumber1: fabric_1,
        fabricNumber2: fabric_2,
        fabricNumber3: fabric_3,
      }
    };
  }

  async getFabrics(fabrics_ids) {
    const cmd = {};
    for (const fabric_id of fabrics_ids) {
      cmd[fabric_id] = `crm.item.get?entityTypeId=${SMART_ID_FABRIC}&id=${fabric_id}&select[]=id&select[]=title&select[]=ufCrm17_1705390343&select[]=ufCrm17_1705390515&select[]=ufCrm17_1705828938`;
    }
    const result = await this.bx24.callBatch({
      smartFabric: `crm.item.get?entityTypeId=${SMART_ID_FABRIC}&id=$result[smartProcess][item][${FIELD_MSP_FABRICS.upholsteryFabricCollection}]&select[]=id&select[]=title&select[]=ufCrm17_1705390343&select[]=ufCrm17_1705390515&select[]=ufCrm17_1705828938`,
      smartFabric_1: `crm.item.get?entityTypeId=${SMART_ID_FABRIC}&id=$result[smartProcess][item][${FIELD_MSP_FABRICS.upholsteryFabricCollection_1}]&select[]=id&select[]=title&select[]=ufCrm17_1705390343&select[]=ufCrm17_1705390515&select[]=ufCrm17_1705828938`,
      smartFabric_2: `crm.item.get?entityTypeId=${SMART_ID_FABRIC}&id=$result[smartProcess][item][${FIELD_MSP_FABRICS.upholsteryFabricCollection_2}]&select[]=id&select[]=title&select[]=ufCrm17_1705390343&select[]=ufCrm17_1705390515&select[]=ufCrm17_1705828938`,
    });

    console.log("result get fabrics = ", result);

    const user = Array.isArray(result?.user) ? result?.user?.[0] : result?.user;
    const materials = result?.material?.items || [];
    const histories = result?.history?.items || [];
    const coefficients = result?.coefficient?.items?.[0] || {};
    const fieldsHystory = result?.fieldsHystory?.fields || [];

    return [];
  }

  async getUsersFromBx24(histories) {
    if (!histories.length) {
        return;
    }
    let users = {};
    let cmd = {
        "current" : `user.current`,
    };
    for (const history of histories) {
        const userId = history?.[SMART_FIELDS_CALCULATION.createdBy];
        cmd[userId] = `user.get?id=${userId}`;
    }

    const result = await this.bx24.callMethod('batch', {
        halt: 0,
        cmd: cmd
    });

    console.log("result get users = ", result);
    for (const userId in result?.result) {
        const user = Array.isArray(result?.result[userId]) ? result?.result[userId]?.[0] : result?.result[userId];
        users[user.ID] = user;
    }
    return users;
  }

}
