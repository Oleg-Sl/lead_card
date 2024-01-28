

// export default class ContactMethods {
//     constructor(bx24) {
//         this.bx24 = bx24;
//     }

//     async get(contactId) {
//         if (!contactId) {
//             return null;
//         }
//         try {
//             let data = await this.bx24.callMethod("crm.contact.list", {
//                 "filter": { "ID": contactId },
//                 "select": ["NAME", "LAST_NAME","SECOND_NAME", "PHONE"],
//                 start: -1,
//             });
//             return data[0];
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     async getList(contactIds) {
//         if (!contactIds || (Array.isArray(contactIds) && contactIds.length === 0)) {
//             return null;
//         }
        
//         let reqPackage = {};
//         for (const contactId of contactIds) {
//             reqPackage[contactId] = ["crm.contact.list", {
//                 filter: { ID: contactId },
//                 select: ["NAME", "LAST_NAME","SECOND_NAME", "PHONE", "POST"],
//                 start: -1,
//             }];
//         }
        
//         const response = await this.bx24.batchMethod(reqPackage);
//         return response;
//     }
// }
