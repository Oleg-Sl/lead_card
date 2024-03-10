import { DataFormatter } from './formatter.js';
import {
  SMART_ID_PRODUCT,

  SMART_ID_MATERIAL,
  SMART_ID_HISTORY,
  SMART_ID_COEFFICIENT,
  SMART_ID_FABRIC,

  MATERIAL_FIELDS,
  HISTORY_FIELDS,
  COEFFICIENT_FIELDS,

  SMART_FIELDS_MATERIAL,
  SMART_FIELDS_HISTORY,
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
      history: `crm.item.list?entityTypeId=${SMART_ID_HISTORY}&filter[parentId${SMART_ID_PRODUCT}]=${entityId}`,
      coefficient: `crm.item.list?entityTypeId=${SMART_ID_COEFFICIENT}&select[]=id&select[]=${SMART_FIELDS_COEFFICIENT.MDF6mm}&select[]=${SMART_FIELDS_COEFFICIENT.PPU}`,
      fieldsHystory: `crm.item.fields?entityTypeId=${SMART_ID_HISTORY}`,
    };
    const result = await this.bx24.callMethod('batch', {
      halt: 0,
      cmd: cmd
    });

    const user = Array.isArray(result?.result?.result?.user) ? result?.result?.result?.user?.[0] : result?.result?.result?.user;
    const fabric_1 = result?.result?.result?.smartFabric_1?.item;
    const fabric_2 = result?.result?.result?.smartFabric_2?.item;
    const fabric_3 = result?.result?.result?.smartFabric_3?.item;
    const materials = result?.result?.result?.material?.items || [];
    const histories = result?.result?.result?.history?.items || [];
    const coefficients = result?.result?.result?.coefficient?.items?.[0] || {};
    const fieldsHystory = result?.result?.result?.fieldsHystory?.fields || [];
    
    return {
      user,
      materials,
      histories,
      coefficients,
      fieldsHystory,
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
        const userId = history?.[SMART_FIELDS_HISTORY.createdBy];
        cmd[userId] = `user.get?id=${userId}`;
    }

    const result = await this.bx24.callMethod('batch', {
        halt: 0,
        cmd: cmd
    });
    for (const userId in result?.result?.result) {
        const user = Array.isArray(result?.result?.result[userId]) ? result?.result?.result[userId]?.[0] : result?.result?.result[userId];
        users[user.ID] = user;
    }
    return users;
  }

  // async add(user) {
  //   const result = await this.bx24.callMethod('batch', {
  //     halt: 0,
  //     cmd: cmd
  //   });
  // }
}


// fetchObjectData() {
  //   return fetch(this.apiUrl)
  //     .then(response => response.json())
  //     .catch(error => console.error('Ошибка получения данных объекта:', error));
  // }

  // saveObjectData(data) {
  //   // Логика сохранения данных объекта через API
  //   return fetch(this.apiUrl, {
  //     method: 'PUT', // Используйте нужный HTTP метод для сохранения
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Ошибка сохранения данных объекта');
  //       }
  //       return response.json();
  //     })
  //     .catch(error => console.error('Ошибка сохранения данных объекта:', error));
  // }

  // createObject(data) {
  //   // Логика создания нового объекта через API
  //   return fetch(this.apiUrl, {
  //     method: 'POST', // Используйте нужный HTTP метод для создания
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Ошибка создания нового объекта');
  //       }
  //       return response.json();
  //     })
  //     .catch(error => console.error('Ошибка создания нового объекта:', error));
  // }