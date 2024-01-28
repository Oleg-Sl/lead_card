
// const API = "https://bits24.bitrix24.ru/rest/9/vhduvllk2mxru5lx/";


// export default class FakeBitrixService {
//     constructor() {
//         this.api = API;

//         this.batch = new BatchMethods();
//         // this.bz = new BzProcessMethods(this.bx24);
//         // this.contact = new ContactMethods(this.bx24);
//         // this.deal = new DealMethods(this.bx24);
//         // this.smartProcess = new SmartProcessMethods(this.bx24);
//         // this.task = new TaskMethods(this.bx24);
//         this.user = new UserMethods(this.bx24);
//         this.files = new FilesMethods();

//         this.domain = 'bits24.bitrix.ru';
//     }

//     async init() {
//         // this.domain = await this.bx24.getDomain();
//     }

//     makeCall(phoneNumber) {
//         console.log('Делаем звонок на номер: ', phoneNumber);
//     }

//     openLine(openLineId) {
//         console.log('Открытя линию: ', openLineId);
//     }

//     async openPath(path) {
//         console.log('Открытие пути: ', path);
//     }

//     getUrlSendMessageFromDealId(dealId) {
//         return `https://${this.domain}/bitrix/components/bitrix/crm.activity.planner/slider.php?context=deal-${dealId}&ajax_action=ACTIVITY_EDIT&activity_id=0&TYPE_ID=4&OWNER_ID=${dealId}&OWNER_TYPE=DEAL&OWNER_PSID=0&FROM_ACTIVITY_ID=0&MESSAGE_TYPE=&SUBJECT=&BODY=&=undefined&__post_data_hash=-1046067848&IFRAME=Y&IFRAME_TYPE=SIDE_SLIDER`;
//     }

//     getActsFolderId() {
//         return 6141;
//     }

//     getInvoicesFolderId() {
//         return 6137;
//     }
// }


// class FilesMethods {
//     constructor() {
//         this.api = API;
//     }

//     async addFolder(parentId, name) {
//         const response = await fetch(`${this.api}disk.folder.addsubfolder`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 "id": parentId,
//                 "data": {
//                     "NAME": name
//                 }
//             })
//         });

//         const result = await response.json();
//         return result;
//     }

//     async uploadFile(folderId, file) {
//         try {
//             const base64Data = await this.readFileAsBase64(file);
//             const response = await fetch(`${this.api}disk.folder.uploadfile`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     id: folderId,
//                     data: {
//                         NAME: file.name
//                     },
//                     fileContent: base64Data,
//                     generateUniqueName: true
//                 })
//             });

//             const result = await response.json();
//             return result;
//         } catch (error) {
//             console.error('Error uploading file:', error);
//         }
//     }

//     async removeFile(fileId) {
//         try {
//             const response = await fetch(`${this.api}disk.file.markdeleted`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     id: fileId,
//                 })
//             });

//             const result = await response.json();
//             return result;
//         } catch (error) {
//             console.error('Error deleting file:', error);
//         }
//     }

//     async getFilesFromFolder(folderId) {
//         try {
//             const response = await fetch(`${this.api}disk.folder.getchildren`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     id: folderId
//                 })
//             });

//             const result = await response.json();
//             // console.log("uploadFile = ", result);
//             return result;
//         } catch (error) {
//             console.error('Error uploading file:', error);
//         }
//     }

//     async readFileAsBase64(file) {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
    
//             reader.onload = () => {
//                 const base64Data = reader.result.split(',')[1];
//                 resolve(base64Data);
//             };
    
//             reader.onerror = (error) => {
//                 reject(error);
//             };
    
//             reader.readAsDataURL(file);
//         });
//     }

// }


// class UserMethods {
//     async search(cmd) {
//         return USES_ALL;
//     }

//     async get(cmd) {
//         return USES_ALL;
//     }

//     async getDepartments() {
//         return DEPARTMENTS;
//     }
// };


// class BatchMethods {
//     async getDataForStart(cmd) {
//         return {
//             deal: DEAL,
//             company: COMPANY,
//             company_contacts: COMPANY_CONTACTS,
//             contacts: CONTACT_DATA,
//             sources: SOURCE,
//             stage_history: STAGE_HISTORY,
//             users: USERS,
//             departments: DEPARTMENTS,
//             fields: FIELDS_DEAL,
//         };
//     }

// }


// const DEAL = {

//     "UF_FOLDER_ACTS": 6147,
//     "UF_FOLDER_INVOICES": 6139,
//     "UF_ACTS": [],
//     "UF_DOCS": [
//         "file;https://yadi.sk/d/lIjE3soll7ZK6A;file.jpg;19.58KB;Краткое описание;https://yadi.sk/d/lIjE3soll7ZK6A;",
//         "link;https://google.com;;;Краткое описание;;",
//         "file;https://yadi.sk/d/lIjE3soll7ZK6A;picture.jpg;191.58KB;Краткое описание;https://yadi.sk/d/lIjE3soll7ZK6A;",
//         "link;https://ya.ru;;;Краткое описание;;",
//     ],


//     "UF_LINKS": [
//         "https://google.com;ГУГл!!!",
//         "https://ya.ru;Яндекс!!!",
//         "https://ngs.ru;Новости!!!",
//     ],
//     "UF_FILES": [
//         // title;size;url;url-prev;desc;
//         "сцепка свеж.jpg;19.58KB;https://yadi.sk/d/lIjE3soll7ZK6A;https://yadi.sk/d/lIjE3soll7ZK6A;Краткое описание",
//         "второе фото.jpg;119.58KB;https://yadi.sk/d/lIjE3soll7ZK6A;https://yadi.sk/d/lIjE3soll7ZK6A;Краткое описание",
//     ],

//     "UF_CRM_1": ["+как вас зовут", "!Иван Иваныч +79307130937"],
//     "UF_CRM_2": ["+какой и сколько", ""],
//     "UF_CRM_3": ["", "!узнает у начальства"],
//     "UF_CRM_4": [],
//     "UF_CRM_5": ["+есть ли демонтаж"],
//     "UF_CRM_6": ["+с ндс", "!да"],
//     "UF_CRM_7": ["+какие сроки", "!договорные"],
//     "UF_CRM_8": ["+компания", "!ООО “Солюшн СТ”"],
//     "UF_CRM_9": ["+способ связи", "!ватсап и почта"],

//     "ID": "14219",
//     "TITLE": "Заряд, Давно 12.23",
//     "TYPE_ID": "SALE",
//     "STAGE_ID": "C9:UC_8HZNDK",
//     "PROBABILITY": null,
//     "CURRENCY_ID": "RUB",
//     "OPPORTUNITY": "90000.00",
//     "IS_MANUAL_OPPORTUNITY": "N",
//     "TAX_VALUE": "0.00",
//     "LEAD_ID": null,
//     "COMPANY_ID": "947",
//     "CONTACT_ID": "2851",
//     "QUOTE_ID": null,
//     "BEGINDATE": "2023-12-22T03:00:00+03:00",
//     "CLOSEDATE": "2023-12-29T03:00:00+03:00",
//     "ASSIGNED_BY_ID": "513",
//     "CREATED_BY_ID": "369",
//     "MODIFY_BY_ID": "200",
//     "DATE_CREATE": "2023-12-22T15:15:12+03:00",
//     "DATE_MODIFY": "2023-12-22T18:47:48+03:00",
//     "OPENED": "Y",
//     "CLOSED": "N",
//     "COMMENTS": "",
//     "ADDITIONAL_INFO": null,
//     "LOCATION_ID": null,
//     "CATEGORY_ID": "9",
//     "STAGE_SEMANTIC_ID": "P",
//     "IS_NEW": "N",
//     "IS_RECURRING": "N",
//     "IS_RETURN_CUSTOMER": "Y",
//     "IS_REPEATED_APPROACH": "N",
//     "SOURCE_ID": "RC_GENERATOR",
//     "SOURCE_DESCRIPTION": null,
//     "ORIGINATOR_ID": null,
//     "ORIGIN_ID": null,
//     "MOVED_BY_ID": "200",
//     "MOVED_TIME": "2023-12-22T18:46:11+03:00",
//     "LAST_ACTIVITY_TIME": "2023-12-22T18:47:47+03:00",
//     "UTM_SOURCE": null,
//     "UTM_MEDIUM": null,
//     "UTM_CAMPAIGN": null,
//     "UTM_CONTENT": null,
//     "UTM_TERM": null,
//     "PARENT_ID_144": null,
//     "PARENT_ID_159": null,
//     "LAST_ACTIVITY_BY": "200",
//     "UF_CRM_1618420018484": "",
//     "UF_CRM_1618420085594": "",
//     "UF_CRM_1618420333": [],
//     "UF_CRM_1618420539591": [],
//     "UF_CRM_1619102989472": [
//         "https://disk.yandex.ru/d/HoEPZgqhZT4emg"
//     ],
//     "UF_CRM_1619103085": "",
//     "UF_CRM_1619119800079": "",
//     "UF_CRM_1619190696514": "2023-12-25T16:00:00+03:00",
//     "UF_CRM_1619201495": [
//         188
//     ],
//     "UF_CRM_1619430052812": "",
//     "UF_CRM_1619430831": "",
//     "UF_CRM_1619441621": "89",
//     "UF_CRM_1619441905773": "",
//     "UF_CRM_1619548732": "Дата монтажа по согласованию. ",
//     "UF_CRM_1619555073745": "прошу подготовить ПП \r\n\r\nпечать + резка \r\n\r\nNAS 16 black Давно — 2\r\nТираж – 1 комплект\r\n\r\n1,2,3,4 – стикер, глянец с ламинацией\r\n\r\n5,6 – печатать не надо\r\n\r\n7 - backlight",
//     "UF_CRM_1619700503": "35",
//     "UF_CRM_1619731331": [],
//     "UF_CRM_1619731365": "",
//     "UF_CRM_1619732625": "",
//     "UF_CRM_1620918041": "-",
//     "UF_CRM_1620982092433": [
//         {
//             "id": 1501927,
//             "showUrl": "/bitrix/components/bitrix/crm.deal.show/show_file.php?ownerId=14219&fieldName=UF_CRM_1620982092433&dynamic=Y&fileId=1501927",
//             "downloadUrl": "/bitrix/components/bitrix/crm.deal.show/show_file.php?auth=&ownerId=14219&fieldName=UF_CRM_1620982092433&dynamic=Y&fileId=1501927"
//         }
//     ],
//     "UF_CRM_1621607276561": [
//         {
//             "id": 1502013,
//             "showUrl": "/bitrix/components/bitrix/crm.deal.show/show_file.php?ownerId=14219&fieldName=UF_CRM_1621607276561&dynamic=Y&fileId=1502013",
//             "downloadUrl": "/bitrix/components/bitrix/crm.deal.show/show_file.php?auth=&ownerId=14219&fieldName=UF_CRM_1621607276561&dynamic=Y&fileId=1502013"
//         }
//     ],
//     "UF_CRM_1621943311": "",
//     "UF_CRM_1621956854": [],
//     "UF_CRM_1625591127": "",
//     "UF_CRM_1625591420": [],
//     "UF_CRM_1625666854": [
//         209,
//         1487
//     ],
//     "UF_CRM_1625667202": "прошу изготовить \r\n\r\nNAS 16 black Давно — 2\r\nТираж – 1 комплект\r\n\r\n1,2,3,4 – стикер, глянец с ламинацией\r\n\r\n5,6 – печатать не надо\r\n\r\n7 - backlight\r\nпечать + глян лам + резка ",
//     "UF_CRM_1627632581634": "0|RUB",
//     "UF_CRM_1627635410": "0",
//     "UF_CRM_1627919233": "",
//     "UF_CRM_1628507821282": "",
//     "UF_CRM_1633523035": "14219СЮ",
//     "UF_CRM_1635324485": [],
//     "UF_CRM_A_W_GROUP_ID": "",
//     "UF_CRM_A_T_GROUP_ID": "",
//     "UF_CRM_1637326777": "529",
//     "UF_CRM_1637533967": [],
//     "UF_CRM_1637743561": "",
//     "UF_CRM_1637745620": "",
//     "UF_CRM_1637861029": "",
//     "UF_CRM_1637861351": "",
//     "UF_CRM_1638357118015": [],
//     "UF_CRM_1638799025": [],
//     "UF_CRM_1638861343858": "0",
//     "UF_CRM_1638883663896": [],
//     "UF_CRM_1640031623": "",
//     "UF_CRM_1640031676": "",
//     "UF_CRM_1640168565": "",
//     "UF_CRM_1640199620": "717",
//     "UF_CRM_1641921940": [],
//     "UF_CRM_1641922664": "Необходимо подобрать цвет по вееру. В коментах приложить фото или файл с настройками цвета в текстовом виде !",
//     "UF_CRM_1648214421632": [
//         {
//             "id": 1501933,
//             "showUrl": "/bitrix/components/bitrix/crm.deal.show/show_file.php?auth=51d898650063e9aa0053a77a000000ff403807977a6b721d4630cdd7222d0a4e9163b6&ownerId=14219&fieldName=UF_CRM_1648214421632&dynamic=Y&fileId=1501933",
//             "downloadUrl": "https://007.bitrix24.ru/bitrix/components/bitrix/crm.deal.show/show_file.php?auth=51d898650063e9aa0053a77a000000ff403807977a6b721d4630cdd7222d0a4e9163b6&ownerId=14219&fieldName=UF_CRM_1648214421632&dynamic=Y&fileId=1501933"
//         }
//     ],
//     "UF_CRM_1648214438867": [
//         {
//             "id": 1501933,
//             "showUrl": "/bitrix/components/bitrix/crm.deal.show/show_file.php?auth=51d898650063e9aa0053a77a000000ff403807977a6b721d4630cdd7222d0a4e9163b6&ownerId=14219&fieldName=UF_CRM_1648214421632&dynamic=Y&fileId=1501933",
//             "downloadUrl": "https://007.bitrix24.ru/bitrix/components/bitrix/crm.deal.show/show_file.php?auth=51d898650063e9aa0053a77a000000ff403807977a6b721d4630cdd7222d0a4e9163b6&ownerId=14219&fieldName=UF_CRM_1648214421632&dynamic=Y&fileId=1501933"
//         },
//         {
//             "id": 1501933,
//             "showUrl":     "/bitrix/components/bitrix/crm.deal.show/show_file.php?auth=51d898650063e9aa0053a77a000000ff403807977a6b721d4630cdd7222d0a4e9163b6&ownerId=14219&fieldName=UF_CRM_1648214421632&dynamic=Y&fileId=1501933",
//             "downloadUrl": "https://007.bitrix24.ru/bitrix/components/bitrix/crm.deal.show/show_file.php?auth=51d898650063e9aa0053a77a000000ff403807977a6b721d4630cdd7222d0a4e9163b6&ownerId=14219&fieldName=UF_CRM_1648214421632&dynamic=Y&fileId=1501933"
//         }
//     ],
//     "UF_CRM_1648543375": "0",
//     "UF_CRM_1648543694": "",
//     "UF_CRM_1648890534": "0",
//     "UF_CRM_1648896346": "14219",
//     "UF_CRM_1649178642": "2023-12-25T10:00:00+03:00",
//     "UF_CRM_1652452994190": [
//         1
//     ],
//     "UF_CRM_1652453123751": [],
//     "UF_CRM_1652776209": "",
//     "UF_CRM_1654540555": [
//         "нет"
//     ],
//     "UF_CRM_1654542137357": "",
//     "UF_CRM_1655918107": "NAS 16 black Давно — 2\r\nТираж – 1 комплект\r\n\r\n1,2,3,4 – стикер, глянец с ламинацией\r\n\r\n5,6 – печатать не надо\r\n\r\n7 - backlight",
//     "UF_CRM_1657651541": "",
//     "UF_CRM_1658420239": [
//         "2023-12-27T00:00:00+03:00"
//     ],
//     "UF_CRM_1665924957280": "0",
//     "UF_CRM_1668129559": "",
//     "UF_CRM_1669716775": "",
//     "UF_CRM_1672744985962": [],
//     "UF_CRM_1672839295": "519",
//     "UF_CRM_1674480485": "",
//     "UF_CRM_1680939096355": [],
//     "UF_CRM_1680941225": "",
//     "UF_CRM_1684305731": [503, 505],
//     "UF_CRM_1694710116": "",
//     "UF_CRM_1694710433": "68477",
//     "UF_CRM_1694710578": "",
//     "UF_CRM_1695664525": "",
//     "UF_CRM_1695665700": [],
//     "UF_CRM_1695666248": "",
//     "UF_CRM_1695666343": "",
//     "UF_CRM_1695666652": "",
//     "UF_CRM_1695667069": "",
//     "UF_CRM_1695667144": "",
//     "UF_CRM_1699249912042": "",
//     "UF_CRM_YOOOGI_WIDGET_MINI": "14219",
//     "UF_CRM_1635272559": "419",
//     "UF_CRM_1637231117": "",
//     "UF_CRM_1637286517": "",
//     "UF_CRM_1687857777": "",
//     "UF_CRM_DATE": "",
//     "UF_CRM_VAR": "",
//     "UF_CRM_1661089690": "",
//     "UF_CRM_1661089717": "",
//     "UF_CRM_1661089736": "",
//     "UF_CRM_1661089762": "",
//     "UF_CRM_1661089782": "",
//     "UF_CRM_1661089811": "",
//     "UF_CRM_1661089895": "68479",
//     "UF_CRM_1661253202": "",
//     "UF_CRM_URL": "",
//     "UF_CRM_URL_BB": "",
//     "UF_CRM_1657845024603": "",
//     "UF_CRM_CITY": "",
//     "UF_CRM_1656421812": "",
//     "UF_CRM_1656421972": "32132",
//     "UF_CRM_1661089657": "",
//     "UF_CRM_1670213131": "",
//     "UF_CRM_1638967445": ""
// };


// export const COMPANY = {
//     "ID": "947",
//     "COMPANY_TYPE": "CUSTOMER",
//     "TITLE": "ЗАРЯД",
//     "LOGO": null,
//     "LEAD_ID": null,
//     "HAS_PHONE": "N",
//     "HAS_EMAIL": "N",
//     "HAS_IMOL": "N",
//     "ASSIGNED_BY_ID": "369",
//     "CREATED_BY_ID": "196",
//     "MODIFY_BY_ID": "200",
//     "BANKING_DETAILS": "банк",
//     "INDUSTRY": null,
//     "REVENUE": null,
//     "CURRENCY_ID": "RUB",
//     "EMPLOYEES": null,
//     "COMMENTS": "",
//     "DATE_CREATE": "2021-12-09T11:25:03+03:00",
//     "DATE_MODIFY": "2023-12-22T18:47:48+03:00",
//     "OPENED": "Y",
//     "IS_MY_COMPANY": "N",
//     "ORIGINATOR_ID": null,
//     "ORIGIN_ID": null,
//     "ORIGIN_VERSION": null,
//     "LAST_ACTIVITY_TIME": "2023-12-22T18:47:48+03:00",
//     "ADDRESS": null,
//     "ADDRESS_2": null,
//     "ADDRESS_CITY": null,
//     "ADDRESS_POSTAL_CODE": null,
//     "ADDRESS_REGION": null,
//     "ADDRESS_PROVINCE": null,
//     "ADDRESS_COUNTRY": null,
//     "ADDRESS_COUNTRY_CODE": null,
//     "ADDRESS_LOC_ADDR_ID": null,
//     "ADDRESS_LEGAL": null,
//     "REG_ADDRESS": null,
//     "REG_ADDRESS_2": null,
//     "REG_ADDRESS_CITY": null,
//     "REG_ADDRESS_POSTAL_CODE": null,
//     "REG_ADDRESS_REGION": null,
//     "REG_ADDRESS_PROVINCE": null,
//     "REG_ADDRESS_COUNTRY": null,
//     "REG_ADDRESS_COUNTRY_CODE": null,
//     "REG_ADDRESS_LOC_ADDR_ID": null,
//     "UTM_SOURCE": null,
//     "UTM_MEDIUM": null,
//     "UTM_CAMPAIGN": null,
//     "UTM_CONTENT": null,
//     "UTM_TERM": null,
//     "LAST_ACTIVITY_BY": "200",
//     "UF_CRM_1622477830476": "",
//     "UF_CRM_61979A6F3AF5E": "",
//     "UF_CRM_61979A6F49783": "",
//     "UF_CRM_1640168474099": "",
//     "UF_CRM_1654705722": "1061",
//     "UF_CRM_1642577206": "kirsanova@super-vinyl.ru",
//     "UF_CRM_1699247552": "",
//     "UF_CRM_1699247579": ""
// };


// export const COMPANY_CONTACTS = [
//     {
//         "CONTACT_ID": 2851,
//         "SORT": 10,
//         "ROLE_ID": 0,
//         "IS_PRIMARY": "Y"
//     },
//     {
//         "CONTACT_ID": 3675,
//         "SORT": 10,
//         "ROLE_ID": 0,
//         "IS_PRIMARY": "Y"
//     }
// ];

// export const CONTACT_DATA = {
//     "2851": {
//         "ID": "2851",
//         "POST": null,
//         "COMMENTS": "",
//         "HONORIFIC": null,
//         "NAME": "Александр",
//         "SECOND_NAME": "",
//         "LAST_NAME": "Никулачкин",
//         "PHOTO": null,
//         "LEAD_ID": null,
//         "TYPE_ID": null,
//         "SOURCE_ID": "EMAIL",
//         "SOURCE_DESCRIPTION": null,
//         "COMPANY_ID": "947",
//         "BIRTHDATE": "",
//         "EXPORT": "N",
//         "HAS_PHONE": "Y",
//         "HAS_EMAIL": "Y",
//         "HAS_IMOL": "Y",
//         "DATE_CREATE": "2021-12-09T11:25:03+03:00",
//         "DATE_MODIFY": "2023-03-22T17:41:13+03:00",
//         "ASSIGNED_BY_ID": "47",
//         "CREATED_BY_ID": "196",
//         "MODIFY_BY_ID": "47",
//         "OPENED": "Y",
//         "ORIGINATOR_ID": null,
//         "ORIGIN_ID": null,
//         "ORIGIN_VERSION": null,
//         "FACE_ID": null,
//         "LAST_ACTIVITY_TIME": "2023-03-22T17:41:06+03:00",
//         "ADDRESS": null,
//         "ADDRESS_2": null,
//         "ADDRESS_CITY": null,
//         "ADDRESS_POSTAL_CODE": null,
//         "ADDRESS_REGION": null,
//         "ADDRESS_PROVINCE": null,
//         "ADDRESS_COUNTRY": null,
//         "ADDRESS_LOC_ADDR_ID": null,
//         "UTM_SOURCE": null,
//         "UTM_MEDIUM": null,
//         "UTM_CAMPAIGN": null,
//         "UTM_CONTENT": null,
//         "UTM_TERM": null,
//         "LAST_ACTIVITY_BY": "47",
//         "UF_CRM_61979A6F08D8E": "",
//         "UF_CRM_61979A6F27442": "",
//         "UF_CRM_1654543142436": "",
//         "EMAIL": [
//             {
//                 "ID": "7815",
//                 "VALUE_TYPE": "WORK",
//                 "VALUE": "a.nikulachkin@berizaryad.ru",
//                 "TYPE_ID": "EMAIL"
//             },
//             {
//                 "ID": "16155",
//                 "VALUE_TYPE": "WORK",
//                 "VALUE": "120363027325603863@g.us",
//                 "TYPE_ID": "EMAIL"
//             },
//             {
//                 "ID": "16221",
//                 "VALUE_TYPE": "WORK",
//                 "VALUE": "120363026507331929@g.us",
//                 "TYPE_ID": "EMAIL"
//             }
//         ],
//         "PHONE": [
//             {
//                 "ID": "11933",
//                 "VALUE_TYPE": "WORK",
//                 "VALUE": "+79163498737",
//                 "TYPE_ID": "PHONE"
//             },
//             {
//                 "ID": "11933",
//                 "VALUE_TYPE": "WORK",
//                 "VALUE": "+79999999999",
//                 "TYPE_ID": "PHONE"
//             }
//         ],
//         "IM": [
//             {
//                 "ID": "16157",
//                 "VALUE_TYPE": "IMOL",
//                 "VALUE": "imol|ank_chats_app24_whatsapp|7|120363027325603863@g.us|389",
//                 "TYPE_ID": "IM"
//             },
//             {
//                 "ID": "16223",
//                 "VALUE_TYPE": "IMOL",
//                 "VALUE": "imol|ank_chats_app24_whatsapp|7|120363026507331929@g.us|407",
//                 "TYPE_ID": "IM"
//             }
//         ],
//         "LINK": [
//             {
//                 "ID": "16159",
//                 "VALUE_TYPE": "USER",
//                 "VALUE": "389",
//                 "TYPE_ID": "LINK"
//             },
//             {
//                 "ID": "16225",
//                 "VALUE_TYPE": "USER",
//                 "VALUE": "407",
//                 "TYPE_ID": "LINK"
//             }
//         ]
//     },
//     "3675": {
//         "ID": "3675",
//         "POST": null,
//         "COMMENTS": null,
//         "HONORIFIC": null,
//         "NAME": "Всеволод",
//         "SECOND_NAME": null,
//         "LAST_NAME": "",
//         "PHOTO": null,
//         "LEAD_ID": null,
//         "TYPE_ID": null,
//         "SOURCE_ID": null,
//         "SOURCE_DESCRIPTION": null,
//         "COMPANY_ID": "947",
//         "BIRTHDATE": "",
//         "EXPORT": "N",
//         "HAS_PHONE": "N",
//         "HAS_EMAIL": "N",
//         "HAS_IMOL": "N",
//         "DATE_CREATE": "2022-05-12T16:27:12+03:00",
//         "DATE_MODIFY": "2022-05-12T16:27:12+03:00",
//         "ASSIGNED_BY_ID": "251",
//         "CREATED_BY_ID": "251",
//         "MODIFY_BY_ID": "251",
//         "OPENED": "Y",
//         "ORIGINATOR_ID": null,
//         "ORIGIN_ID": null,
//         "ORIGIN_VERSION": null,
//         "FACE_ID": null,
//         "LAST_ACTIVITY_TIME": "2022-05-12T16:27:12+03:00",
//         "ADDRESS": null,
//         "ADDRESS_2": null,
//         "ADDRESS_CITY": null,
//         "ADDRESS_POSTAL_CODE": null,
//         "ADDRESS_REGION": null,
//         "ADDRESS_PROVINCE": null,
//         "ADDRESS_COUNTRY": null,
//         "ADDRESS_LOC_ADDR_ID": null,
//         "UTM_SOURCE": null,
//         "UTM_MEDIUM": null,
//         "UTM_CAMPAIGN": null,
//         "UTM_CONTENT": null,
//         "UTM_TERM": null,
//         "LAST_ACTIVITY_BY": "251",
//         "UF_CRM_61979A6F08D8E": "",
//         "UF_CRM_61979A6F27442": "",
//         "UF_CRM_1654543142436": ""
//     }
// }

// export const SOURCE = [
//     {
//         "ID": "11",
//         "ENTITY_ID": "SOURCE",
//         "STATUS_ID": "CALL",
//         "NAME": "Звонок",
//         "NAME_INIT": "Звонок",
//         "SORT": "10",
//         "SYSTEM": "Y",
//         "CATEGORY_ID": null,
//         "COLOR": null,
//         "SEMANTICS": null
//     },
//     {
//         "ID": "13",
//         "ENTITY_ID": "SOURCE",
//         "STATUS_ID": "EMAIL",
//         "NAME": "EMAIL",
//         "NAME_INIT": "",
//         "SORT": "20",
//         "SYSTEM": "N",
//         "CATEGORY_ID": null,
//         "COLOR": null,
//         "SEMANTICS": null
//     },
//     {
//         "ID": "29",
//         "ENTITY_ID": "SOURCE",
//         "STATUS_ID": "RC_GENERATOR",
//         "NAME": "существующий клиент",
//         "NAME_INIT": "Генератор продаж",
//         "SORT": "30",
//         "SYSTEM": "Y",
//         "CATEGORY_ID": null,
//         "COLOR": null,
//         "SEMANTICS": null
//     },
//     {
//         "ID": "17",
//         "ENTITY_ID": "SOURCE",
//         "STATUS_ID": "ADVERTISING",
//         "NAME": "Тендер",
//         "NAME_INIT": "",
//         "SORT": "40",
//         "SYSTEM": "N",
//         "CATEGORY_ID": null,
//         "COLOR": null,
//         "SEMANTICS": null
//     },
//     {
//         "ID": "291",
//         "ENTITY_ID": "SOURCE",
//         "STATUS_ID": "5|OPENLINE",
//         "NAME": "Онлайн-чат",
//         "NAME_INIT": "",
//         "SORT": "50",
//         "SYSTEM": "N",
//         "CATEGORY_ID": "0",
//         "COLOR": null,
//         "SEMANTICS": null
//     },
//     {
//         "ID": "31",
//         "ENTITY_ID": "SOURCE",
//         "STATUS_ID": "STORE",
//         "NAME": "Интернет-магазин",
//         "NAME_INIT": "Интернет-магазин",
//         "SORT": "60",
//         "SYSTEM": "Y",
//         "CATEGORY_ID": null,
//         "COLOR": null,
//         "SEMANTICS": null
//     },
//     {
//         "ID": "27",
//         "ENTITY_ID": "SOURCE",
//         "STATUS_ID": "CALLBACK",
//         "NAME": "Обратный звонок",
//         "NAME_INIT": "Обратный звонок",
//         "SORT": "70",
//         "SYSTEM": "Y",
//         "CATEGORY_ID": null,
//         "COLOR": null,
//         "SEMANTICS": null
//     },
//     {
//         "ID": "25",
//         "ENTITY_ID": "SOURCE",
//         "STATUS_ID": "WEBFORM",
//         "NAME": "По рекомендации",
//         "NAME_INIT": "CRM-форма",
//         "SORT": "80",
//         "SYSTEM": "Y",
//         "CATEGORY_ID": null,
//         "COLOR": null,
//         "SEMANTICS": null
//     },
//     {
//         "ID": "491",
//         "ENTITY_ID": "SOURCE",
//         "STATUS_ID": "4957753787",
//         "NAME": "Билайн АТС 4957753787",
//         "NAME_INIT": "",
//         "SORT": "90",
//         "SYSTEM": "N",
//         "CATEGORY_ID": "0",
//         "COLOR": "",
//         "SEMANTICS": null
//     },
//     {
//         "ID": "537",
//         "ENTITY_ID": "SOURCE",
//         "STATUS_ID": "7|ANK_CHATS_APP24_WHATSAPP",
//         "NAME": "ChatApp - WhatsApp (chat-api) - WhatsApp",
//         "NAME_INIT": "",
//         "SORT": "100",
//         "SYSTEM": "N",
//         "CATEGORY_ID": "0",
//         "COLOR": null,
//         "SEMANTICS": null
//     },
//     {
//         "ID": "539",
//         "ENTITY_ID": "SOURCE",
//         "STATUS_ID": "5|TELEGRAM",
//         "NAME": "Telegram - on-line чат",
//         "NAME_INIT": "",
//         "SORT": "110",
//         "SYSTEM": "N",
//         "CATEGORY_ID": "0",
//         "COLOR": null,
//         "SEMANTICS": null
//     },
//     {
//         "ID": "609",
//         "ENTITY_ID": "SOURCE",
//         "STATUS_ID": "5|VIBER",
//         "NAME": "Viber - on-line чат",
//         "NAME_INIT": "",
//         "SORT": "115",
//         "SYSTEM": "N",
//         "CATEGORY_ID": "0",
//         "COLOR": null,
//         "SEMANTICS": null
//     },
//     {
//         "ID": "817",
//         "ENTITY_ID": "SOURCE",
//         "STATUS_ID": "9|TELEGRAM",
//         "NAME": "Telegram - Открытая линия 5",
//         "NAME_INIT": "",
//         "SORT": "115",
//         "SYSTEM": "N",
//         "CATEGORY_ID": "0",
//         "COLOR": null,
//         "SEMANTICS": null
//     }
// ];


// export const STAGE_HISTORY = {
//     "items": [
//         {
//             "ID": "59319",
//             "TYPE_ID": "2",
//             "OWNER_ID": "14219",
//             "CREATED_TIME": "2023-12-22T18:46:11+03:00",
//             "CATEGORY_ID": "9",
//             "STAGE_SEMANTIC_ID": "P",
//             "STAGE_ID": "C9:UC_8HZNDK"
//         },
//         {
//             "ID": "59313",
//             "TYPE_ID": "2",
//             "OWNER_ID": "14219",
//             "CREATED_TIME": "2023-12-22T16:08:19+03:00",
//             "CATEGORY_ID": "9",
//             "STAGE_SEMANTIC_ID": "P",
//             "STAGE_ID": "C9:EXECUTING"
//         },
//         {
//             "ID": "59307",
//             "TYPE_ID": "2",
//             "OWNER_ID": "14219",
//             "CREATED_TIME": "2023-12-22T15:19:07+03:00",
//             "CATEGORY_ID": "9",
//             "STAGE_SEMANTIC_ID": "P",
//             "STAGE_ID": "C9:UC_1UGN7I"
//         },
//         {
//             "ID": "59305",
//             "TYPE_ID": "1",
//             "OWNER_ID": "14219",
//             "CREATED_TIME": "2023-12-22T15:15:12+03:00",
//             "CATEGORY_ID": "9",
//             "STAGE_SEMANTIC_ID": "P",
//             "STAGE_ID": "C9:NEW"
//         }
//     ]
// };


// export const USERS = {
//     "519": {
//         "ID": "519",
//         "XML_ID": "52672310",
//         "ACTIVE": true,
//         "NAME": "Александр",
//         "LAST_NAME": "Челмакин",
//         "EMAIL": "chelmakin@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-23T11:06:35+03:00",
//         "DATE_REGISTER": "2023-11-29T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "1994-03-16T03:00:00+03:00",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/bbb/bbb2f1c350e67ca095f0b9cdb0e7e98e/i.png",
//         "PERSONAL_MOBILE": "+7968-577-09-69",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "Стажёр",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4427
//         ],
//         "UF_USR_1619430582293": [
//             83
//         ],
//         "UF_USR_1700238879550": "205",
//         "UF_USR_1702028610403": "Во время звонка наберите ## и дождитесь тонового сигнала. Затем наберите добавочный номер и дождитесь ответа сотрудника. Положите трубку",
//         "USER_TYPE": "employee"
//     },
//     "513": {
//         "ID": "513",
//         "XML_ID": "52390490",
//         "ACTIVE": false,
//         "NAME": "Дмитрий",
//         "LAST_NAME": "Агаев",
//         "EMAIL": "agaev@super-vinyl.ru",
//         "LAST_LOGIN": "2023-11-14T00:12:06+03:00",
//         "DATE_REGISTER": "2023-11-14T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4427
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     "505": {
//         "ID": "505",
//         "XML_ID": "51756344",
//         "ACTIVE": true,
//         "NAME": "Илья",
//         "LAST_NAME": "Казаков",
//         "SECOND_NAME": "",
//         "EMAIL": "kazakov@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-08T00:08:19+03:00",
//         "DATE_REGISTER": "2023-10-09T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "1980-08-05T03:00:00+03:00",
//         "PERSONAL_MOBILE": "+7 906 361-61-10",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4445
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     "503": {
//         "ID": "503",
//         "XML_ID": "51756342",
//         "ACTIVE": true,
//         "NAME": "Артем",
//         "LAST_NAME": "Гусев",
//         "SECOND_NAME": "",
//         "EMAIL": "gusev@super-vinyl.ru",
//         "LAST_LOGIN": "2023-11-29T16:56:04+03:00",
//         "DATE_REGISTER": "2023-10-09T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "1999-10-19T03:00:00+04:00",
//         "PERSONAL_MOBILE": "+7 930 688-99-66",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4445
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     }
// };

// export const USES_ALL = [
//     {
//         "ID": "1",
//         "XML_ID": "35406690",
//         "ACTIVE": true,
//         "NAME": "Максим",
//         "LAST_NAME": "Куранов",
//         "SECOND_NAME": "",
//         "EMAIL": "kuranov@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-31T17:37:02+03:00",
//         "DATE_REGISTER": "2021-04-06T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "Y",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "M",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "1991-01-07T03:00:00+03:00",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/fd8/fd8d787312bf11be378b560ede988f72/11-card.png",
//         "PERSONAL_MOBILE": "+7968-577-07-01",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_TIMEMAN": "1",
//         "UF_DEPARTMENT": [
//             4437,
//             4407,
//             4423,
//             7,
//             4415,
//             4425,
//             4421,
//             4449
//         ],
//         "UF_USR_1619430582293": [
//             79
//         ],
//         "UF_USR_1700238879550": "201",
//         "UF_USR_1702028610403": "Во время звонка наберите ## и дождитесь тонового сигнала. Затем наберите добавочный номер и дождитесь ответа сотрудника. Положите трубку",
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "9",
//         "XML_ID": "35407374",
//         "ACTIVE": false,
//         "NAME": "Николай (НН)",
//         "LAST_NAME": "Касатов",
//         "SECOND_NAME": "",
//         "EMAIL": "kasat_off@mail.ru",
//         "LAST_LOGIN": "2021-04-24T22:54:03+03:00",
//         "DATE_REGISTER": "2021-04-08T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/858/858f1e0bcb3db44108b3146b9a2e5ada/avatar.png",
//         "PERSONAL_MOBILE": "+79108886663",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "11",
//         "XML_ID": "35408016",
//         "ACTIVE": false,
//         "NAME": "Тестеровщик",
//         "LAST_NAME": "1",
//         "EMAIL": "ra-iceberg@mail.ru",
//         "LAST_LOGIN": "2021-04-29T12:24:23+03:00",
//         "DATE_REGISTER": "2021-04-08T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "13",
//         "XML_ID": "27796442",
//         "ACTIVE": false,
//         "NAME": "Интегратор",
//         "LAST_NAME": "Битрикс24",
//         "EMAIL": "info@subbota.online",
//         "LAST_LOGIN": "2022-03-09T16:44:28+03:00",
//         "DATE_REGISTER": "2021-04-12T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/0a8/0a8fae9c8e4375bf98234ea0430e8493/5d13483ccf68c4f6bc3df3e211ec3bdf.png",
//         "PERSONAL_MOBILE": "+79825199699",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "15",
//         "XML_ID": "34089700",
//         "ACTIVE": false,
//         "NAME": "Вячеслав",
//         "LAST_NAME": "Руденко",
//         "EMAIL": "rudenko2705@gmail.com",
//         "LAST_LOGIN": "2021-04-20T11:23:42+03:00",
//         "DATE_REGISTER": "2021-04-20T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/1ea/1ea4919a8cd342a96252198f8e43ae35/e407b0ed83c68c6c559caa3c5ff50a7d.JPG",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "17",
//         "XML_ID": "35661562",
//         "ACTIVE": false,
//         "NAME": "Юрий ",
//         "LAST_NAME": "Чирков",
//         "EMAIL": "chirkov@super-vinyl.ru",
//         "LAST_LOGIN": "2021-09-28T15:06:22+03:00",
//         "DATE_REGISTER": "2021-04-21T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/a9c/a9c4d721f9452a87005414a9dab7dbd3/Screenshot_1.png",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "19",
//         "XML_ID": "35661564",
//         "ACTIVE": true,
//         "NAME": "Евгений",
//         "LAST_NAME": "Ремезов",
//         "SECOND_NAME": "Александрович",
//         "EMAIL": "remezov@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-31T01:10:22+03:00",
//         "DATE_REGISTER": "2021-04-21T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "M",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "1990-11-23T03:00:00+03:00",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/38b/38bf8bedb413134d4a799763585a1f27/image-31-12-23-03-23.png",
//         "PERSONAL_MOBILE": "+7968-577-07-48",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "Менеджер отдела сопровождения",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4449
//         ],
//         "UF_USR_1619430582293": [
//             79
//         ],
//         "UF_USR_1700238879550": "204",
//         "UF_USR_1702028610403": "Во время звонка наберите ## и дождитесь тонового сигнала. Затем наберите добавочный номер и дождитесь ответа сотрудника. Положите трубку",
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "21",
//         "XML_ID": "35661566",
//         "ACTIVE": true,
//         "NAME": "Сергей",
//         "LAST_NAME": "Никонов",
//         "EMAIL": "nikonov@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-19T00:34:11+03:00",
//         "DATE_REGISTER": "2021-04-21T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/41a/41ae1d3b0c56cdc270a03d5d9e55c4ed/PSAh3zW-PAQ.jpg.png",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4445
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "23",
//         "XML_ID": "35661568",
//         "ACTIVE": false,
//         "NAME": "Дмитрий",
//         "LAST_NAME": "Чумаков",
//         "EMAIL": "chumakov@super-vinyl.ru",
//         "LAST_LOGIN": "2021-04-21T19:33:48+03:00",
//         "DATE_REGISTER": "2021-04-21T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/8fa/8fafaac7d45a9d7d876997f283a709b1/Screenshot_5.png",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "25",
//         "XML_ID": "35661570",
//         "ACTIVE": false,
//         "NAME": "Игорь ",
//         "LAST_NAME": "Сиднев",
//         "EMAIL": "sidnev@super-vinyl.ru",
//         "LAST_LOGIN": "2021-04-21T19:37:35+03:00",
//         "DATE_REGISTER": "2021-04-21T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "27",
//         "XML_ID": "35661572",
//         "ACTIVE": false,
//         "NAME": "Игорь",
//         "LAST_NAME": "Потехин",
//         "EMAIL": "potexin@super-vinyl.ru",
//         "LAST_LOGIN": "2021-04-21T19:35:30+03:00",
//         "DATE_REGISTER": "2021-04-21T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "29",
//         "XML_ID": "35661926",
//         "ACTIVE": false,
//         "NAME": "Татьяна (Манго НН)",
//         "LAST_NAME": "Панкратова",
//         "EMAIL": "print_mango@super-vinyl.ru",
//         "LAST_LOGIN": "2021-05-11T22:22:10+03:00",
//         "DATE_REGISTER": "2021-04-21T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": [
//             79
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "31",
//         "XML_ID": "35661928",
//         "ACTIVE": true,
//         "NAME": "Павел",
//         "LAST_NAME": "Локтев",
//         "EMAIL": "loktev@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-28T08:52:34+03:00",
//         "DATE_REGISTER": "2021-04-21T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/ca7/ca74c5536214dc64e36270ddbb9cef5d/photo_2022-02-22_18-27-08.png",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             171
//         ],
//         "UF_USR_1619430582293": [
//             79
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "35",
//         "XML_ID": "35797852",
//         "ACTIVE": true,
//         "NAME": "Вячеслав",
//         "LAST_NAME": "Руденко",
//         "SECOND_NAME": "",
//         "EMAIL": "design_1@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-31T17:36:08+03:00",
//         "DATE_REGISTER": "2021-04-29T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "Y",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "M",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/515/515d2030eb7e0b0f8e074c7f9a1dffd0/328917524764690609.png",
//         "PERSONAL_MOBILE": "",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "Дизайнер",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4447
//         ],
//         "UF_USR_1619430582293": [
//             79
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "37",
//         "XML_ID": "35798032",
//         "ACTIVE": true,
//         "NAME": "Николай",
//         "LAST_NAME": "Касатов",
//         "SECOND_NAME": "",
//         "EMAIL": "kasatov@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-30T22:17:33+03:00",
//         "DATE_REGISTER": "2021-04-29T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "M",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/26d/26de1d1ed7d276d24e652e30de777a50/08-card.png",
//         "PERSONAL_MOBILE": "+7 910 888-66-63",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4445
//         ],
//         "UF_USR_1619430582293": [
//             79
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "41",
//         "XML_ID": "36024746",
//         "ACTIVE": true,
//         "NAME": "Юлия (Мега Арт НН)",
//         "LAST_NAME": "Балалаева",
//         "SECOND_NAME": "",
//         "EMAIL": "mega_art@super-vinyl.ru",
//         "LAST_LOGIN": "2021-12-15T21:13:07+03:00",
//         "DATE_REGISTER": "2021-05-13T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/979/979a30258092d0b3e9c8cf33828e219d/photo_2018-12-20_14-28-00.png",
//         "PERSONAL_MOBILE": "",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             171
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "43",
//         "XML_ID": "36033232",
//         "ACTIVE": false,
//         "NAME": "Елена (Арт Пром НН)",
//         "LAST_NAME": "Крашенинникова",
//         "EMAIL": "art_prom_nn@super-vinyl.ru",
//         "LAST_LOGIN": "2021-10-14T17:10:25+03:00",
//         "DATE_REGISTER": "2021-05-13T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "45",
//         "XML_ID": "36033290",
//         "ACTIVE": false,
//         "NAME": "Андрей",
//         "LAST_NAME": "Сухоплюев",
//         "EMAIL": "suhoplyuev@super-vinyl.ru",
//         "LAST_LOGIN": "2021-05-13T17:45:40+03:00",
//         "DATE_REGISTER": "2021-05-13T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "47",
//         "XML_ID": "36034386",
//         "ACTIVE": true,
//         "NAME": "Олеся",
//         "LAST_NAME": "Кирсанова",
//         "SECOND_NAME": "",
//         "EMAIL": "kirsanova@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-29T20:26:05+03:00",
//         "DATE_REGISTER": "2021-05-13T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/4ed/4ed8e7e9157da007822ddf7f0e234d27/img-2022-08-06-12-32-57.png",
//         "PERSONAL_MOBILE": "+7968-577-07-09",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_TIMEMAN": "1",
//         "UF_DEPARTMENT": [
//             4435,
//             4431,
//             4433,
//             4407,
//             4403,
//             4409,
//             4405,
//             4427
//         ],
//         "UF_USR_1619430582293": [
//             83
//         ],
//         "UF_USR_1700238879550": "203",
//         "UF_USR_1702028610403": "Во время звонка наберите ## и дождитесь тонового сигнала. Затем наберите добавочный номер и дождитесь ответа сотрудника. Положите трубку",
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "49",
//         "ACTIVE": false,
//         "NAME": "",
//         "LAST_NAME": "",
//         "SECOND_NAME": "",
//         "EMAIL": "",
//         "LAST_LOGIN": "",
//         "DATE_REGISTER": "2021-05-19T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIMESTAMP_X": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_MOBILE": "",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "51",
//         "XML_ID": "36141964",
//         "ACTIVE": false,
//         "NAME": "",
//         "LAST_NAME": "",
//         "EMAIL": "",
//         "LAST_LOGIN": "2021-05-20T10:12:56+03:00",
//         "DATE_REGISTER": "2021-05-19T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "163",
//         "XML_ID": "37080786",
//         "ACTIVE": false,
//         "NAME": "Иван",
//         "LAST_NAME": "Зорин",
//         "EMAIL": "zorin@super-vinyl.ru",
//         "LAST_LOGIN": "2021-07-12T20:02:25+03:00",
//         "DATE_REGISTER": "2021-07-12T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "165",
//         "XML_ID": "37082018",
//         "ACTIVE": false,
//         "NAME": "Дмитрий",
//         "LAST_NAME": "Мышкин",
//         "EMAIL": "myshkin@super-vinyl.ru",
//         "LAST_LOGIN": "2021-11-26T09:39:35+03:00",
//         "DATE_REGISTER": "2021-07-12T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "3600",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/5ab/5ab960e598fe9cc335fd71308d16b89f/Screenshot_6.png",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "177",
//         "XML_ID": "37413814",
//         "ACTIVE": false,
//         "NAME": "Ульяна",
//         "LAST_NAME": "Ульянец",
//         "EMAIL": "ulyanec@super-vinyl.ru",
//         "LAST_LOGIN": "2021-11-15T19:50:07+03:00",
//         "DATE_REGISTER": "2021-08-02T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/6bf/6bfeb2ccd3eb1145d7fbed1eeeb5b529/Screenshot_2.png",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": [
//             83
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "188",
//         "XML_ID": "37793948",
//         "ACTIVE": true,
//         "NAME": "Алексей",
//         "LAST_NAME": "Полубояринов",
//         "SECOND_NAME": "Юрьевич",
//         "EMAIL": "poluboyarinov@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-29T17:35:35+03:00",
//         "DATE_REGISTER": "2021-08-25T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "M",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/989/9893456bd501132b4ad37a0a959dc979/03-card.png",
//         "PERSONAL_MOBILE": "+7 962 908-40-95",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "Руководитель производства",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4441,
//             4443,
//             4439
//         ],
//         "UF_USR_1619430582293": [
//             83
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "190",
//         "XML_ID": "37793968",
//         "ACTIVE": false,
//         "NAME": "Чубака",
//         "LAST_NAME": "А",
//         "EMAIL": "chubaka@super-vinyl.ru",
//         "LAST_LOGIN": "2021-08-25T20:06:31+03:00",
//         "DATE_REGISTER": "2021-08-25T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "192",
//         "XML_ID": "37793982",
//         "ACTIVE": false,
//         "NAME": "Александр",
//         "LAST_NAME": "Евдокимов",
//         "EMAIL": "evdokimov@super-vinyl.ru",
//         "LAST_LOGIN": "2021-12-29T13:01:32+03:00",
//         "DATE_REGISTER": "2021-08-25T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/477/4774a9f612cb7477c2f3559117c03ae6/avatar.png",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "194",
//         "XML_ID": "37793990",
//         "ACTIVE": false,
//         "NAME": "Екатерина",
//         "LAST_NAME": "Свирская",
//         "SECOND_NAME": "Владимировна",
//         "EMAIL": "svirskaya@super-vinyl.ru",
//         "LAST_LOGIN": "2022-03-02T14:47:20+03:00",
//         "DATE_REGISTER": "2021-08-25T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/2b5/2b531da082577baae5b8d6ae2e237edb/Screenshot_1.png",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": [
//             83
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "196",
//         "XML_ID": "37793992",
//         "ACTIVE": false,
//         "NAME": "Олеся",
//         "LAST_NAME": "Евстигнеева",
//         "EMAIL": "evstigneeva@super-vinyl.ru",
//         "LAST_LOGIN": "2022-05-30T12:57:55+03:00",
//         "DATE_REGISTER": "2021-08-25T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/7bb/7bb41607a52fe49c146766a2e8517a64/Screenshot_2.png",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": [
//             83
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "198",
//         "XML_ID": "37793998",
//         "ACTIVE": true,
//         "NAME": "Алексей",
//         "LAST_NAME": "Тарасов",
//         "EMAIL": "tarasov@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-29T12:16:34+03:00",
//         "DATE_REGISTER": "2021-08-25T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/671/67109f2a759df3d709194b35a5b51844/avatar.png",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4445
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "200",
//         "XML_ID": "37794018",
//         "ACTIVE": true,
//         "NAME": "Анатолий",
//         "LAST_NAME": "Рожков",
//         "SECOND_NAME": "",
//         "EMAIL": "rozhkov@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-28T11:00:18+03:00",
//         "DATE_REGISTER": "2021-08-25T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "M",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/04c/04c5341f5c904d8eae7510785579dccb/Rozhkov.png",
//         "PERSONAL_MOBILE": "+7968-577-12-20",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "Менеджер отдела сопровождения",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4449
//         ],
//         "UF_USR_1619430582293": false,
//         "UF_USR_1700238879550": "207",
//         "UF_USR_1702028610403": "Во время звонка наберите ## и дождитесь тонового сигнала. Затем наберите добавочный номер и дождитесь ответа сотрудника. Положите трубку",
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "202",
//         "XML_ID": "37794030",
//         "ACTIVE": true,
//         "NAME": "Сашка",
//         "LAST_NAME": "Шошин",
//         "SECOND_NAME": "",
//         "EMAIL": "shoshin@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-22T23:16:53+03:00",
//         "DATE_REGISTER": "2021-08-25T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "M",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/883/8834c682de5bfde722f1f3f597e1e4d4/CI209m7RGR4.png",
//         "PERSONAL_MOBILE": "+7 906 675-40-96",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "Печатник",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4441
//         ],
//         "UF_USR_1619430582293": [
//             83
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "204",
//         "XML_ID": "37794034",
//         "ACTIVE": false,
//         "NAME": "Андрей",
//         "LAST_NAME": "Тихонов",
//         "EMAIL": "tihonov@super-vinyl.ru",
//         "LAST_LOGIN": "2021-08-25T20:04:29+03:00",
//         "DATE_REGISTER": "2021-08-25T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/4e7/4e79b45ce0628ee2b75bf971388548e7/tikh.png",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "207",
//         "XML_ID": "38072318",
//         "ACTIVE": false,
//         "NAME": "Эльнур ",
//         "LAST_NAME": "Гырхиев",
//         "EMAIL": "kirhiev228@gmail.com",
//         "LAST_LOGIN": "2021-09-10T12:58:56+03:00",
//         "DATE_REGISTER": "2021-09-10T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "215",
//         "XML_ID": "38202430",
//         "ACTIVE": false,
//         "NAME": "Евгений",
//         "LAST_NAME": "Шакиров",
//         "SECOND_NAME": "",
//         "EMAIL": "shakirov@super-vinyl.ru",
//         "LAST_LOGIN": "2023-05-05T17:13:55+03:00",
//         "DATE_REGISTER": "2021-09-17T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/0db/0db7ed9524e3deea92c6bedfe88759b5/shakriov.png",
//         "PERSONAL_MOBILE": "",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             171
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "217",
//         "XML_ID": "38202432",
//         "ACTIVE": true,
//         "NAME": "Пирожок",
//         "LAST_NAME": "Снежок",
//         "SECOND_NAME": "",
//         "EMAIL": "god.trust@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-01T17:37:53+03:00",
//         "DATE_REGISTER": "2021-09-17T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/900/900bff24632c3ac642f33baaf66e43ff/06-card.png",
//         "PERSONAL_MOBILE": "+7495 775-37-87",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "artificial intelligence",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_TIMEMAN": "1",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": [],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "221",
//         "XML_ID": "38397546",
//         "ACTIVE": true,
//         "NAME": "Руслан",
//         "LAST_NAME": "Архипов",
//         "EMAIL": "arhipov@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-01T04:42:10+03:00",
//         "DATE_REGISTER": "2021-09-28T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "28800",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/96c/96ca729a409da17a3129e4c6bbc66757/avatar.png",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4445
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "227",
//         "XML_ID": "38726780",
//         "ACTIVE": false,
//         "NAME": "Юрий",
//         "LAST_NAME": "Березовский",
//         "EMAIL": "berezovskiy@super-vinyl.ru",
//         "LAST_LOGIN": "2022-04-04T14:34:19+03:00",
//         "DATE_REGISTER": "2021-10-14T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/522/522d13c3f9d4c1050802b34ba7f28713/Screenshot_2.png",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": [
//             83
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "231",
//         "XML_ID": "38832528",
//         "ACTIVE": false,
//         "NAME": "Адилет",
//         "LAST_NAME": "Уком",
//         "EMAIL": "a.ukom@super-vinyl.ru",
//         "LAST_LOGIN": "2022-08-19T10:58:42+03:00",
//         "DATE_REGISTER": "2021-10-19T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "233",
//         "XML_ID": "39166854",
//         "ACTIVE": false,
//         "NAME": "Тест",
//         "LAST_NAME": "Тест",
//         "SECOND_NAME": "",
//         "EMAIL": "",
//         "LAST_LOGIN": "",
//         "DATE_REGISTER": "2021-11-05T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIMESTAMP_X": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_MOBILE": "",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "235",
//         "XML_ID": "39166864",
//         "ACTIVE": false,
//         "NAME": "Юлия",
//         "LAST_NAME": "Кусайко",
//         "EMAIL": "test1@su.ru",
//         "LAST_LOGIN": "",
//         "DATE_REGISTER": "2021-11-05T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIMESTAMP_X": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "239",
//         "XML_ID": "39210408",
//         "ACTIVE": false,
//         "NAME": "Анна",
//         "LAST_NAME": "Кан",
//         "EMAIL": "kan@super-vinyl.ru",
//         "LAST_LOGIN": "2021-12-10T09:18:33+03:00",
//         "DATE_REGISTER": "2021-11-08T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "241",
//         "XML_ID": "20856626",
//         "ACTIVE": true,
//         "NAME": "Виктор",
//         "LAST_NAME": "Молоков",
//         "SECOND_NAME": "",
//         "EMAIL": "djmovi@mail.ru",
//         "LAST_LOGIN": "2023-12-21T17:48:14+03:00",
//         "DATE_REGISTER": "2021-11-17T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "10800",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "M",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/bd8/bd818d7f74eef4d6bea66aa9f65bc774/Screenshot_1.png",
//         "PERSONAL_MOBILE": "+79953905038",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "Интегратор",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4455
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "251",
//         "XML_ID": "39480516",
//         "ACTIVE": false,
//         "NAME": "Кирилл",
//         "LAST_NAME": "Сердюк",
//         "EMAIL": "serdyuk@super-vinyl.ru",
//         "LAST_LOGIN": "2023-01-23T11:05:13+03:00",
//         "DATE_REGISTER": "2021-11-22T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "255",
//         "XML_ID": "34972422",
//         "ACTIVE": true,
//         "NAME": "Олег",
//         "LAST_NAME": "Слепцов",
//         "EMAIL": "slepcov_oleg@mail.ru",
//         "LAST_LOGIN": "2023-12-28T18:19:59+03:00",
//         "DATE_REGISTER": "2021-11-24T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "14400",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/7a6/7a6b608398a186d91a7ab0c66f86fa41/1024px-Unofficial_JavaScript_logo_2.svg.png",
//         "PERSONAL_MOBILE": "+79952725468",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4455
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "257",
//         "XML_ID": "39656950",
//         "ACTIVE": true,
//         "NAME": "Сергей",
//         "LAST_NAME": "Новиков",
//         "EMAIL": "novikov@super-vinyl.ru",
//         "LAST_LOGIN": "2023-10-12T01:20:29+03:00",
//         "DATE_REGISTER": "2021-11-30T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/817/81799f15315fe37d63e2bef3ae971f4f/avatar.png",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4445
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "271",
//         "XML_ID": "39740094",
//         "ACTIVE": true,
//         "NAME": "Алексей",
//         "LAST_NAME": "Галанин",
//         "SECOND_NAME": "",
//         "EMAIL": "architect@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-29T17:59:26+03:00",
//         "DATE_REGISTER": "2021-12-05T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "M",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "1991-03-11T03:00:00+03:00",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/ed3/ed36ca7d8ae1184a46b110abec05fe60/09-card.png",
//         "PERSONAL_MOBILE": "+7 968 577-07-04",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "Диспетчер. Помощник бригадира",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_TIMEMAN": "1",
//         "UF_DEPARTMENT": [
//             4449
//         ],
//         "UF_USR_1619430582293": [
//             79
//         ],
//         "UF_USR_1700238879550": "206",
//         "UF_USR_1702028610403": "Во время звонка наберите ## и дождитесь тонового сигнала. Затем наберите добавочный номер и дождитесь ответа сотрудника. Положите трубку",
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "287",
//         "XML_ID": "39957044",
//         "ACTIVE": false,
//         "NAME": "Александр",
//         "LAST_NAME": "Волков",
//         "SECOND_NAME": "",
//         "EMAIL": "volkov@super-vinyl.ru",
//         "LAST_LOGIN": "2022-08-08T16:49:38+03:00",
//         "DATE_REGISTER": "2021-12-16T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/d49/d49ccfd24f6cd4ac0999473407eabefa/Screenshot_1.png",
//         "PERSONAL_MOBILE": "",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_TIMEMAN": "1",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": [
//             79,
//             83
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "291",
//         "XML_ID": "40109902",
//         "ACTIVE": false,
//         "NAME": "Сергей",
//         "LAST_NAME": "Булычев",
//         "EMAIL": "z@blsx.ru",
//         "LAST_LOGIN": "2022-10-21T08:44:51+03:00",
//         "DATE_REGISTER": "2022-01-07T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "7200",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/6be/6be9d9fc68d974eb4930e04b0021db68/d7f8c31f4ca30fe9b6738e7c64d323e3.png",
//         "PERSONAL_MOBILE": "+79125847759",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4455
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "295",
//         "XML_ID": "10644485",
//         "ACTIVE": true,
//         "NAME": "Алексей",
//         "LAST_NAME": "Клепов",
//         "EMAIL": "mr.klepoff@gmail.com",
//         "LAST_LOGIN": "2023-11-07T15:32:47+03:00",
//         "DATE_REGISTER": "2022-02-10T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/4c7/4c74e0bf2888f65a64e6368bb1934035/64609775_1027409617458407_7433827810797420544_n.png",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4455
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "303",
//         "XML_ID": "11560367",
//         "ACTIVE": true,
//         "NAME": "Константин ",
//         "LAST_NAME": "Огренич ",
//         "EMAIL": "k.ogrenich@gmail.com",
//         "LAST_LOGIN": "2023-12-31T14:55:16+03:00",
//         "DATE_REGISTER": "2022-02-21T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/0b5/0b5a6ff5c0c0de31d64f49f4123cab08/bf19efa3e1f11787dda458b778a8d2dd.jpg",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4455
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "331",
//         "XML_ID": "41514902",
//         "ACTIVE": true,
//         "NAME": "Евгений",
//         "LAST_NAME": "Бойчук",
//         "EMAIL": "e.boychuk@bot24.su",
//         "LAST_LOGIN": "2023-01-17T15:41:45+03:00",
//         "DATE_REGISTER": "2022-03-27T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4455
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "333",
//         "XML_ID": "34269448",
//         "ACTIVE": false,
//         "NAME": "Edem",
//         "LAST_NAME": "Technology",
//         "EMAIL": "info@edemtech.ru",
//         "LAST_LOGIN": "2022-10-10T18:34:03+03:00",
//         "DATE_REGISTER": "2022-04-21T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/fd3/fd38e60fff5fd33569e8c02eab95526a/86db3f833ca2867a1f3b9f9b69071ed6.png",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "339",
//         "XML_ID": "42943906",
//         "ACTIVE": true,
//         "NAME": "Бухгалтер",
//         "LAST_NAME": "",
//         "EMAIL": "buh@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-29T09:23:37+03:00",
//         "DATE_REGISTER": "2022-05-27T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/1ad/1ad9387c54ddb6e0ce83981924496e94/kisspng-chartered-accountant-accounting-clip-art-certified-6-plr-sales-funnels-5c7fc78b701eb2.6380292615518780274593.png",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4435
//         ],
//         "UF_USR_1619430582293": [
//             83
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "349",
//         "XML_ID": "43720100",
//         "ACTIVE": false,
//         "NAME": "Инга",
//         "LAST_NAME": "Алаева",
//         "SECOND_NAME": "",
//         "EMAIL": "ialaeva@ozon.ru",
//         "LAST_LOGIN": "2022-07-13T14:39:05+03:00",
//         "DATE_REGISTER": "2022-07-08T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "F",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/eef/eefe601fd784ad089d67d18cbc8ccfa4/gCryn2VKB3FIVVAV_XGKxuCpeo_rkgEWTz9Ga5bHTGsa22NdK2CejrVSuKG6em_XVSiIpkUH.jpg.png",
//         "PERSONAL_MOBILE": "",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             171
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "357",
//         "XML_ID": "26171486",
//         "ACTIVE": false,
//         "NAME": "Денис",
//         "LAST_NAME": "Щербатов",
//         "EMAIL": "d89273940320@gmail.com",
//         "LAST_LOGIN": "2022-08-12T09:44:32+03:00",
//         "DATE_REGISTER": "2022-07-21T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "359",
//         "XML_ID": "90599",
//         "ACTIVE": false,
//         "NAME": "Серге",
//         "LAST_NAME": "В",
//         "EMAIL": "xxkeshaxx@yandex.ru",
//         "LAST_LOGIN": "2022-07-21T13:02:47+03:00",
//         "DATE_REGISTER": "2022-07-21T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "363",
//         "XML_ID": "37285310",
//         "ACTIVE": false,
//         "NAME": "Олег ",
//         "LAST_NAME": "Шабанов ",
//         "EMAIL": "olegshabalov@gmail.com",
//         "LAST_LOGIN": "2022-07-27T21:03:40+03:00",
//         "DATE_REGISTER": "2022-07-22T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             171
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "367",
//         "XML_ID": "44065940",
//         "ACTIVE": true,
//         "NAME": "Евгения",
//         "LAST_NAME": "Бузмакова",
//         "SECOND_NAME": "",
//         "EMAIL": "buzmakova@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-29T16:07:03+03:00",
//         "DATE_REGISTER": "2022-08-03T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "F",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/24c/24c6ea38c1d6ce015cb24a122df5385c/img-2022-08-30-15-39-11.png",
//         "PERSONAL_MOBILE": "+7968-577-10-70",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "Менеджер отдела продаж",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4427
//         ],
//         "UF_USR_1619430582293": [
//             83
//         ],
//         "UF_USR_1700238879550": "208",
//         "UF_USR_1702028610403": "Во время звонка наберите ## и дождитесь тонового сигнала. Затем наберите добавочный номер и дождитесь ответа сотрудника. Положите трубку",
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "369",
//         "XML_ID": "44949156",
//         "ACTIVE": true,
//         "NAME": "Юлия",
//         "LAST_NAME": "Смолякова",
//         "SECOND_NAME": "",
//         "EMAIL": "smolyakova@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-30T23:27:32+03:00",
//         "DATE_REGISTER": "2022-09-19T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "F",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "1997-09-07T03:00:00+04:00",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/b5f/b5fecdf3615b856211e56fc4cddd302f/1664297456_11-damion-club-p-lenivets-iz-zveropolisa-art-vkontakte-11.jpg.png",
//         "PERSONAL_MOBILE": "+7968-577-07-03",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "Менеджер отдела продаж",
//         "UF_EMPLOYMENT_DATE": "2022-09-19T03:00:00+03:00",
//         "UF_DEPARTMENT": [
//             4427
//         ],
//         "UF_USR_1619430582293": [
//             83
//         ],
//         "UF_USR_1700238879550": "202",
//         "UF_USR_1702028610403": "Во время звонка наберите ## и дождитесь тонового сигнала. Затем наберите добавочный номер и дождитесь ответа сотрудника. Положите трубку",
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "373",
//         "XML_ID": "41344541",
//         "ACTIVE": false,
//         "NAME": "Александр",
//         "LAST_NAME": "Егоров",
//         "EMAIL": "a.egorov@bot24.su",
//         "LAST_LOGIN": "2022-10-14T12:39:11+03:00",
//         "DATE_REGISTER": "2022-10-10T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/828/828818266c258d42888d0bb9db3c5ca9/9f1dc184055b23202884a99d34f66be9.jpg",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             171
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "405",
//         "XML_ID": "45521218",
//         "ACTIVE": false,
//         "NAME": "Вячеслав",
//         "LAST_NAME": "Кутузов",
//         "EMAIL": "kutuzov@super-vinyl.ru",
//         "LAST_LOGIN": "2023-03-26T22:57:31+03:00",
//         "DATE_REGISTER": "2022-10-19T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "417",
//         "XML_ID": "45756994",
//         "ACTIVE": true,
//         "NAME": "Антон",
//         "LAST_NAME": "Ванечкин",
//         "EMAIL": "vanechkin@super-vinyl.ru",
//         "LAST_LOGIN": "2023-11-10T14:41:28+03:00",
//         "DATE_REGISTER": "2022-11-02T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/aeb/aeb8bf4b97b31c5acc01b87b130adcb7/Mg6iV6_K_9g.jpg.png",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4445
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "421",
//         "XML_ID": "46980874",
//         "ACTIVE": true,
//         "NAME": "Ибрагим",
//         "LAST_NAME": "Халилов",
//         "EMAIL": "halilov@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-27T11:31:04+03:00",
//         "DATE_REGISTER": "2023-01-13T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "2023-03-31T03:00:00+03:00",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/a70/a7076f5456a81593a45219e3308e62db/avatar.png",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4445
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "423",
//         "XML_ID": "46980890",
//         "ACTIVE": false,
//         "NAME": "Мансур",
//         "LAST_NAME": "Баргишев",
//         "EMAIL": "bargishev@super-vinyl.ru",
//         "LAST_LOGIN": "2023-04-13T07:17:44+03:00",
//         "DATE_REGISTER": "2023-01-13T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/767/767cb322423c89552e5e7592968b3d30/Mansur.png",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             1
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "427",
//         "XML_ID": "47339410",
//         "ACTIVE": true,
//         "NAME": "Сергей",
//         "LAST_NAME": "Воробьев",
//         "SECOND_NAME": "",
//         "EMAIL": "vorobev@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-29T15:19:54+03:00",
//         "DATE_REGISTER": "2023-02-01T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/66f/66f2fe6cc5ee29f8bfc12fbd2a3c72a3/img-2023-02-01-11-43-10.png",
//         "PERSONAL_MOBILE": "+7 920 026-73-88",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4445
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "429",
//         "XML_ID": "47449384",
//         "ACTIVE": true,
//         "NAME": "Руслан",
//         "LAST_NAME": "Картошкин",
//         "SECOND_NAME": "",
//         "EMAIL": "kartonshkin@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-23T10:01:11+03:00",
//         "DATE_REGISTER": "2023-02-06T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/5e0/5e0f3fff29c5b870e8e978933bcd3c57/avatar.png",
//         "PERSONAL_MOBILE": "+79290534307",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4445
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "439",
//         "XML_ID": "48406210",
//         "ACTIVE": true,
//         "NAME": "Авасбек",
//         "LAST_NAME": "Рыскулбеков",
//         "SECOND_NAME": "Орунбаевч",
//         "EMAIL": "a.ryskulbekov@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-22T15:23:31+03:00",
//         "DATE_REGISTER": "2023-03-28T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "M",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/98b/98b10e1a3f01223ac4d96ef737e47808/avatar.png",
//         "PERSONAL_MOBILE": "+7 996 361-81-88",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "Старший поспечатник ",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4443
//         ],
//         "UF_USR_1619430582293": [
//             83
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "451",
//         "XML_ID": "49850632",
//         "ACTIVE": true,
//         "NAME": "Уик",
//         "LAST_NAME": "Джон",
//         "EMAIL": "s.p@super-vinyl.ru",
//         "LAST_LOGIN": "2023-06-16T12:18:32+03:00",
//         "DATE_REGISTER": "2023-06-16T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/3a8/3a89c3c95aebae0355f1da9fe9b5ebb2/093e52d236_John_Wick_.jpg.png",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4441
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "453",
//         "XML_ID": "49850634",
//         "ACTIVE": false,
//         "NAME": "Френсис",
//         "LAST_NAME": "Етта",
//         "SECOND_NAME": "",
//         "EMAIL": "f.etta@super-vinyl.ru",
//         "LAST_LOGIN": "2023-10-03T19:04:29+03:00",
//         "DATE_REGISTER": "2023-06-16T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "M",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/edc/edc54e51dacc77043d02d7e4e5385229/img-2023-06-16-12-15-27.png",
//         "PERSONAL_MOBILE": "+7 991 562-58-02",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "Поспечатник ",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4443
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "455",
//         "XML_ID": "49850636",
//         "ACTIVE": true,
//         "NAME": "Максим",
//         "LAST_NAME": "Тарасов",
//         "SECOND_NAME": "",
//         "EMAIL": "m.tarasov@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-28T21:33:37+03:00",
//         "DATE_REGISTER": "2023-06-16T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "M",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/2eb/2eb4d45c451095fdbac226557f54e42c/img-2023-06-16-12-13-05.png",
//         "PERSONAL_MOBILE": "+7 968 702-41-15",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "Печатник",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4441
//         ],
//         "UF_USR_1619430582293": [
//             83
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "461",
//         "XML_ID": "50311702",
//         "ACTIVE": false,
//         "NAME": "Ульяна",
//         "LAST_NAME": "Галяева",
//         "SECOND_NAME": "",
//         "EMAIL": "galyaeva@super-vinyl.ru",
//         "LAST_LOGIN": "2023-08-10T16:29:20+03:00",
//         "DATE_REGISTER": "2023-07-14T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "F",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "2001-09-24T03:00:00+04:00",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/e39/e398837603d2cc792c437086c0cb26a5/avatar.png",
//         "PERSONAL_MOBILE": "+7 909 946-85-62",
//         "PERSONAL_CITY": "Москва",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "2023-07-07T03:00:00+03:00",
//         "UF_DEPARTMENT": [
//             4445
//         ],
//         "UF_USR_1619430582293": [
//             83
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "463",
//         "XML_ID": "50364510",
//         "ACTIVE": false,
//         "NAME": "Кирилл",
//         "LAST_NAME": "Токарев",
//         "SECOND_NAME": "",
//         "EMAIL": "tokarev@super-vinyl.ru",
//         "LAST_LOGIN": "2023-10-31T13:00:18+03:00",
//         "DATE_REGISTER": "2023-07-18T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "M",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "1996-09-23T03:00:00+04:00",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/881/88155a296dafb2492033b4e5d28004e4/avatar.png",
//         "PERSONAL_MOBILE": "+7 (916) 779-17-35",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4445
//         ],
//         "UF_USR_1619430582293": [
//             83
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "465",
//         "XML_ID": "50364514",
//         "ACTIVE": false,
//         "NAME": "Дмитрий",
//         "LAST_NAME": "Грибов",
//         "SECOND_NAME": "",
//         "EMAIL": "gribov@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-11T01:49:14+03:00",
//         "DATE_REGISTER": "2023-07-18T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "M",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "1990-08-11T03:00:00+04:00",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/549/5493795544449f2c7faab6b2e1d8e22d/Gribov.png",
//         "PERSONAL_MOBILE": "+7 (925) 192-95-33",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4445
//         ],
//         "UF_USR_1619430582293": [
//             83
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "469",
//         "XML_ID": "50461088",
//         "ACTIVE": true,
//         "NAME": "Сергей",
//         "LAST_NAME": "Исупов",
//         "SECOND_NAME": "",
//         "EMAIL": "isupov@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-31T15:27:59+03:00",
//         "DATE_REGISTER": "2023-07-24T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "14400",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "M",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/353/3536414df08d3720eec0116d62c585ed/img-2023-07-24-14-16-13.png",
//         "PERSONAL_MOBILE": "+79130624973",
//         "PERSONAL_CITY": "Новосибирск",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4445
//         ],
//         "UF_USR_1619430582293": [
//             83
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "471",
//         "XML_ID": "50545520",
//         "ACTIVE": true,
//         "NAME": "Улан",
//         "LAST_NAME": "Узакбаев",
//         "SECOND_NAME": "",
//         "EMAIL": "uzakbaev@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-29T08:12:37+03:00",
//         "DATE_REGISTER": "2023-07-28T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "M",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "1998-10-08T03:00:00+04:00",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/8fe/8fe2db371780bd7a84daf25fc7598d0f/img-2023-07-28-17-32-25.png",
//         "PERSONAL_MOBILE": "+7 999 856-01-88",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "Поспечатник ",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4443
//         ],
//         "UF_USR_1619430582293": [
//             83
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "473",
//         "XML_ID": "50585370",
//         "ACTIVE": true,
//         "NAME": "Дмитрий",
//         "LAST_NAME": "Баранов",
//         "SECOND_NAME": "",
//         "EMAIL": "baranov@super-vinyl.ru",
//         "LAST_LOGIN": "2023-09-13T21:57:10+03:00",
//         "DATE_REGISTER": "2023-07-31T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "M",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/017/01733bc6554be13815803e4f004d0ae4/1671845789_drikus-club-p-estetika-mashini-krasivo-48.jpg.png",
//         "PERSONAL_MOBILE": "+7 920 078-66-66",
//         "PERSONAL_CITY": "Нижний Новгород",
//         "WORK_PHONE": "+79877473500",
//         "WORK_POSITION": "Дизайнер",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4447
//         ],
//         "UF_USR_1619430582293": [
//             79
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "481",
//         "XML_ID": "50785400",
//         "ACTIVE": true,
//         "NAME": "Александр",
//         "LAST_NAME": "Цветков",
//         "SECOND_NAME": "",
//         "EMAIL": "cvetkov@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-29T15:35:33+03:00",
//         "DATE_REGISTER": "2023-08-11T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "M",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "1995-04-22T03:00:00+04:00",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/adf/adff927e68f20b9e80a3eed12ab580e4/tsvet.png",
//         "PERSONAL_MOBILE": "+7 908 721-39-44",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4445
//         ],
//         "UF_USR_1619430582293": [
//             79
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "483",
//         "XML_ID": "50785508",
//         "ACTIVE": false,
//         "NAME": "Алёна",
//         "LAST_NAME": "Валиева",
//         "SECOND_NAME": "",
//         "EMAIL": "valieva@super-vinyl.ru",
//         "LAST_LOGIN": "2023-11-13T10:02:12+03:00",
//         "DATE_REGISTER": "2023-08-11T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "F",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "1993-09-05T03:00:00+04:00",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/130/1304662f03ea2bfd317789bb7b928992/img-2023-08-11-19-10-49.png",
//         "PERSONAL_MOBILE": "+7 (967) 015-69-65",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "Помощник Руководителя",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4427
//         ],
//         "UF_USR_1619430582293": [
//             83
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "489",
//         "XML_ID": "51011744",
//         "ACTIVE": true,
//         "NAME": "Алан",
//         "LAST_NAME": "Кусаев",
//         "SECOND_NAME": "",
//         "EMAIL": "kusaev@super-vinyl.ru",
//         "LAST_LOGIN": "2023-11-23T12:19:47+03:00",
//         "DATE_REGISTER": "2023-08-25T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "M",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "1994-02-21T03:00:00+03:00",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/fa9/fa91a96680ebfc9e6ea17010770af76d/avatar.png",
//         "PERSONAL_MOBILE": "89888338557",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4445
//         ],
//         "UF_USR_1619430582293": [
//             83
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "493",
//         "XML_ID": "51301956",
//         "ACTIVE": false,
//         "NAME": "Павел",
//         "LAST_NAME": "Кирилов",
//         "SECOND_NAME": "",
//         "EMAIL": "kirilov@super-vinyl.ru",
//         "LAST_LOGIN": "2023-09-13T11:46:59+03:00",
//         "DATE_REGISTER": "2023-09-12T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/984/984990502de2a4423c2c28db20a47c78/img-2023-09-12-14-08-48.png",
//         "PERSONAL_MOBILE": "+7 920 295-59-98",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4427
//         ],
//         "UF_USR_1619430582293": [
//             79
//         ],
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "495",
//         "XML_ID": "51547606",
//         "ACTIVE": true,
//         "NAME": "Батыр",
//         "LAST_NAME": "Акбалаев",
//         "SECOND_NAME": "",
//         "EMAIL": "akbalaev@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-28T14:27:40+03:00",
//         "DATE_REGISTER": "2023-09-26T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "1986-04-27T03:00:00+04:00",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/92a/92adb670c57c69cb81883204e054c790/img-2023-09-26-18-36-50.png",
//         "PERSONAL_MOBILE": "+7 910 410-65-00",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4445
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "497",
//         "XML_ID": "51547730",
//         "ACTIVE": false,
//         "NAME": "Андрей",
//         "LAST_NAME": "Дрыгин",
//         "SECOND_NAME": "",
//         "EMAIL": "drygin@super-vinyl.ru",
//         "LAST_LOGIN": "2023-10-31T19:23:58+03:00",
//         "DATE_REGISTER": "2023-09-26T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "M",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "1999-01-24T03:00:00+03:00",
//         "PERSONAL_MOBILE": "",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4445
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "501",
//         "XML_ID": "51756340",
//         "ACTIVE": true,
//         "NAME": "Игорь",
//         "LAST_NAME": "Потехин",
//         "SECOND_NAME": "",
//         "EMAIL": "potehin@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-28T19:24:53+03:00",
//         "DATE_REGISTER": "2023-10-09T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "1988-07-21T03:00:00+04:00",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/513/513ea267b755a05db13254b94028d3d1/avatar.png",
//         "PERSONAL_MOBILE": "+7 987 551-35-95",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4445
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "503",
//         "XML_ID": "51756342",
//         "ACTIVE": true,
//         "NAME": "Артем",
//         "LAST_NAME": "Гусев",
//         "SECOND_NAME": "",
//         "EMAIL": "gusev@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-29T15:29:53+03:00",
//         "DATE_REGISTER": "2023-10-09T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "1999-10-19T03:00:00+04:00",
//         "PERSONAL_MOBILE": "+7 930 688-99-66",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4445
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "505",
//         "XML_ID": "51756344",
//         "ACTIVE": true,
//         "NAME": "Илья",
//         "LAST_NAME": "Казаков",
//         "SECOND_NAME": "",
//         "EMAIL": "kazakov@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-08T00:08:19+03:00",
//         "DATE_REGISTER": "2023-10-09T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_WWW": "",
//         "PERSONAL_BIRTHDAY": "1980-08-05T03:00:00+03:00",
//         "PERSONAL_MOBILE": "+7 906 361-61-10",
//         "PERSONAL_CITY": "",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4445
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "513",
//         "XML_ID": "52390490",
//         "ACTIVE": false,
//         "NAME": "Дмитрий",
//         "LAST_NAME": "Агаев",
//         "EMAIL": "agaev@super-vinyl.ru",
//         "LAST_LOGIN": "2023-11-14T00:12:06+03:00",
//         "DATE_REGISTER": "2023-11-14T03:00:00+03:00",
//         "IS_ONLINE": "N",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "",
//         "WORK_POSITION": "",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4427
//         ],
//         "UF_USR_1619430582293": false,
//         "USER_TYPE": "employee"
//     },
//     {
//         "ID": "519",
//         "XML_ID": "52672310",
//         "ACTIVE": true,
//         "NAME": "Александр",
//         "LAST_NAME": "Челмакин",
//         "EMAIL": "chelmakin@super-vinyl.ru",
//         "LAST_LOGIN": "2023-12-29T15:21:59+03:00",
//         "DATE_REGISTER": "2023-11-29T03:00:00+03:00",
//         "TIME_ZONE": "",
//         "IS_ONLINE": "N",
//         "TIME_ZONE_OFFSET": "0",
//         "TIMESTAMP_X": {},
//         "LAST_ACTIVITY_DATE": {},
//         "PERSONAL_GENDER": "",
//         "PERSONAL_BIRTHDAY": "1994-03-16T03:00:00+03:00",
//         "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b17270748/main/bbb/bbb2f1c350e67ca095f0b9cdb0e7e98e/i.png",
//         "PERSONAL_MOBILE": "+7968-577-09-69",
//         "WORK_PHONE": "",
//         "WORK_POSITION": "Стажёр",
//         "UF_EMPLOYMENT_DATE": "",
//         "UF_DEPARTMENT": [
//             4427
//         ],
//         "UF_USR_1619430582293": [
//             83
//         ],
//         "UF_USR_1700238879550": "205",
//         "UF_USR_1702028610403": "Во время звонка наберите ## и дождитесь тонового сигнала. Затем наберите добавочный номер и дождитесь ответа сотрудника. Положите трубку",
//         "USER_TYPE": "employee"
//     }
// ];


// export const DEPARTMENTS = [
//     {
//         "ID": "1",
//         "NAME": "Оклейка Транспорта",
//         "SORT": 500,
//         "UF_HEAD": "217"
//     },
//     {
//         "ID": "7",
//         "NAME": "Админ. департамент",
//         "SORT": 100,
//         "PARENT": "1",
//         "UF_HEAD": "1"
//     },
//     {
//         "ID": "4411",
//         "NAME": "Отдел управления",
//         "SORT": 500,
//         "PARENT": "7"
//     },
//     {
//         "ID": "4407",
//         "NAME": "Офис учредителей",
//         "SORT": 500,
//         "PARENT": "7"
//     },
//     {
//         "ID": "4409",
//         "NAME": "Юридический отдел",
//         "SORT": 500,
//         "PARENT": "7",
//         "UF_HEAD": "47"
//     },
//     {
//         "ID": "4401",
//         "NAME": "HR департамент",
//         "SORT": 200,
//         "PARENT": "1"
//     },
//     {
//         "ID": "4417",
//         "NAME": "Отдел KPI",
//         "SORT": 500,
//         "PARENT": "4401"
//     },
//     {
//         "ID": "4415",
//         "NAME": "Отдел внедрения (коммуникаций)",
//         "SORT": 500,
//         "PARENT": "4401",
//         "UF_HEAD": "1"
//     },
//     {
//         "ID": "4419",
//         "NAME": "Отдел найма",
//         "SORT": 500,
//         "PARENT": "4401"
//     },
//     {
//         "ID": "4421",
//         "NAME": "Отдел обучения ",
//         "SORT": 500,
//         "PARENT": "4401",
//         "UF_HEAD": "0"
//     },
//     {
//         "ID": "4403",
//         "NAME": "Департамент продаж",
//         "SORT": 300,
//         "PARENT": "1",
//         "UF_HEAD": "47"
//     },
//     {
//         "ID": "4423",
//         "NAME": "Отдел маркетинга",
//         "SORT": 500,
//         "PARENT": "4403"
//     },
//     {
//         "ID": "4427",
//         "NAME": "Отдел продаж",
//         "SORT": 500,
//         "PARENT": "4403",
//         "UF_HEAD": "47"
//     },
//     {
//         "ID": "4425",
//         "NAME": "Отдел рекламы",
//         "SORT": 500,
//         "PARENT": "4403"
//     },
//     {
//         "ID": "4405",
//         "NAME": "Финансовый департамент",
//         "SORT": 400,
//         "PARENT": "1",
//         "UF_HEAD": "47"
//     },
//     {
//         "ID": "4431",
//         "NAME": "Отдел доходов",
//         "SORT": 500,
//         "PARENT": "4405",
//         "UF_HEAD": "0"
//     },
//     {
//         "ID": "4433",
//         "NAME": "Отдел расходов",
//         "SORT": 500,
//         "PARENT": "4405",
//         "UF_HEAD": "0"
//     },
//     {
//         "ID": "4435",
//         "NAME": "Отдел учета и отчетности",
//         "SORT": 500,
//         "PARENT": "4405",
//         "UF_HEAD": "47"
//     },
//     {
//         "ID": "4437",
//         "NAME": "Производ. департамент",
//         "SORT": 500,
//         "PARENT": "1",
//         "UF_HEAD": "1"
//     },
//     {
//         "ID": "4449",
//         "NAME": "Отдел сопровождения",
//         "SORT": 50,
//         "PARENT": "4437",
//         "UF_HEAD": "271"
//     },
//     {
//         "ID": "4439",
//         "NAME": "Отдел снабжения",
//         "SORT": 100,
//         "PARENT": "4437"
//     },
//     {
//         "ID": "4447",
//         "NAME": "Отдел дизайна",
//         "SORT": 200,
//         "PARENT": "4437",
//         "UF_HEAD": "35"
//     },
//     {
//         "ID": "4441",
//         "NAME": "Отдел печати",
//         "SORT": 300,
//         "PARENT": "4437",
//         "UF_HEAD": "188"
//     },
//     {
//         "ID": "4443",
//         "NAME": "Отдел поспечати",
//         "SORT": 350,
//         "PARENT": "4437",
//         "UF_HEAD": "188"
//     },
//     {
//         "ID": "4445",
//         "NAME": "Отдел монтажей",
//         "SORT": 400,
//         "PARENT": "4437",
//         "UF_HEAD": "37"
//     },
//     {
//         "ID": "4451",
//         "NAME": "Департамент качества",
//         "SORT": 600,
//         "PARENT": "1"
//     },
//     {
//         "ID": "4453",
//         "NAME": "Отдел контроля качества",
//         "SORT": 500,
//         "PARENT": "4451"
//     },
//     {
//         "ID": "4455",
//         "NAME": "Отдел коррекции",
//         "SORT": 500,
//         "PARENT": "4451"
//     },
//     {
//         "ID": "4459",
//         "NAME": "6. PR-департамент",
//         "SORT": 650,
//         "PARENT": "1"
//     },
//     {
//         "ID": "4461",
//         "NAME": "13. Отдел по СО (PR)",
//         "SORT": 500,
//         "PARENT": "4459"
//     },
//     {
//         "ID": "15131",
//         "NAME": "Секция внешнего вида",
//         "SORT": 500,
//         "PARENT": "4461"
//     },
//     {
//         "ID": "4465",
//         "NAME": "Отдел вводных услуг",
//         "SORT": 500,
//         "PARENT": "4459"
//     },
//     {
//         "ID": "171",
//         "NAME": "Внешние пользователи",
//         "SORT": 1000,
//         "PARENT": "1"
//     }
// ];

// export const FIELDS_DEAL = {
//     "ID": {
//         "type": "integer",
//         "isRequired": false,
//         "isReadOnly": true,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "ID"
//     },
//     "TITLE": {
//         "type": "string",
//         "isRequired": true,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Название"
//     },
//     "TYPE_ID": {
//         "type": "crm_status",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "statusType": "DEAL_TYPE",
//         "title": "Тип"
//     },
//     "CATEGORY_ID": {
//         "type": "crm_category",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": true,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Воронка"
//     },
//     "STAGE_ID": {
//         "type": "crm_status",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "statusType": "DEAL_STAGE",
//         "title": "Стадия сделки"
//     },
//     "STAGE_SEMANTIC_ID": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": true,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Группа стадии"
//     },
//     "IS_NEW": {
//         "type": "char",
//         "isRequired": false,
//         "isReadOnly": true,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Новая сделка"
//     },
//     "IS_RECURRING": {
//         "type": "char",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Регулярная сделка"
//     },
//     "IS_RETURN_CUSTOMER": {
//         "type": "char",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Повторная сделка"
//     },
//     "IS_REPEATED_APPROACH": {
//         "type": "char",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Повторное обращение"
//     },
//     "PROBABILITY": {
//         "type": "integer",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Вероятность"
//     },
//     "CURRENCY_ID": {
//         "type": "crm_currency",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Валюта"
//     },
//     "OPPORTUNITY": {
//         "type": "double",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Сумма"
//     },
//     "IS_MANUAL_OPPORTUNITY": {
//         "type": "char",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "IS_MANUAL_OPPORTUNITY"
//     },
//     "TAX_VALUE": {
//         "type": "double",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Ставка налога"
//     },
//     "COMPANY_ID": {
//         "type": "crm_company",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Компания",
//         "settings": {
//             "parentEntityTypeId": 4
//         }
//     },
//     "CONTACT_ID": {
//         "type": "crm_contact",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "isDeprecated": true,
//         "title": "Контакт"
//     },
//     "CONTACT_IDS": {
//         "type": "crm_contact",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": false,
//         "title": "Контакты"
//     },
//     "QUOTE_ID": {
//         "type": "crm_quote",
//         "isRequired": false,
//         "isReadOnly": true,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Предложение",
//         "settings": {
//             "parentEntityTypeId": 7
//         }
//     },
//     "BEGINDATE": {
//         "type": "date",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Дата начала"
//     },
//     "CLOSEDATE": {
//         "type": "date",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Дата завершения"
//     },
//     "OPENED": {
//         "type": "char",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Доступна для всех"
//     },
//     "CLOSED": {
//         "type": "char",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Закрыта"
//     },
//     "COMMENTS": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Комментарий"
//     },
//     "ASSIGNED_BY_ID": {
//         "type": "user",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Ответственный"
//     },
//     "CREATED_BY_ID": {
//         "type": "user",
//         "isRequired": false,
//         "isReadOnly": true,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Кем создана"
//     },
//     "MODIFY_BY_ID": {
//         "type": "user",
//         "isRequired": false,
//         "isReadOnly": true,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Кем изменена"
//     },
//     "MOVED_BY_ID": {
//         "type": "user",
//         "isRequired": false,
//         "isReadOnly": true,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "MOVED_BY_ID"
//     },
//     "DATE_CREATE": {
//         "type": "datetime",
//         "isRequired": false,
//         "isReadOnly": true,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Дата создания"
//     },
//     "DATE_MODIFY": {
//         "type": "datetime",
//         "isRequired": false,
//         "isReadOnly": true,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Дата изменения"
//     },
//     "MOVED_TIME": {
//         "type": "datetime",
//         "isRequired": false,
//         "isReadOnly": true,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "MOVED_TIME"
//     },
//     "SOURCE_ID": {
//         "type": "crm_status",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "statusType": "SOURCE",
//         "title": "Источник"
//     },
//     "SOURCE_DESCRIPTION": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Дополнительно об источнике"
//     },
//     "LEAD_ID": {
//         "type": "crm_lead",
//         "isRequired": false,
//         "isReadOnly": true,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Лид",
//         "settings": {
//             "parentEntityTypeId": 1
//         }
//     },
//     "ADDITIONAL_INFO": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Дополнительная информация"
//     },
//     "LOCATION_ID": {
//         "type": "location",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Местоположение"
//     },
//     "ORIGINATOR_ID": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Внешний источник"
//     },
//     "ORIGIN_ID": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Идентификатор элемента во внешнем источнике"
//     },
//     "UTM_SOURCE": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Рекламная система"
//     },
//     "UTM_MEDIUM": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Тип трафика"
//     },
//     "UTM_CAMPAIGN": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Обозначение рекламной кампании"
//     },
//     "UTM_CONTENT": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Содержание кампании"
//     },
//     "UTM_TERM": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Условие поиска кампании"
//     },
//     "PARENT_ID_144": {
//         "type": "crm_entity",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "Список продуктов для приложения \"Заказ\"",
//         "settings": {
//             "parentEntityTypeId": 144
//         }
//     },
//     "PARENT_ID_159": {
//         "type": "crm_entity",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "ТЗ на дизайн",
//         "settings": {
//             "parentEntityTypeId": 159
//         }
//     },
//     "LAST_ACTIVITY_TIME": {
//         "type": "datetime",
//         "isRequired": false,
//         "isReadOnly": true,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "LAST_ACTIVITY_TIME"
//     },
//     "LAST_ACTIVITY_BY": {
//         "type": "user",
//         "isRequired": false,
//         "isReadOnly": true,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": false,
//         "title": "LAST_ACTIVITY_BY"
//     },
//     "UF_CRM_1618420018484": {
//         "type": "address",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1618420018484",
//         "listLabel": "Адрес монтажа",
//         "formLabel": "Адрес монтажа",
//         "filterLabel": "Адрес монтажа",
//         "settings": {
//             "SHOW_MAP": "Y"
//         }
//     },
//     "UF_CRM_1618420085594": {
//         "type": "datetime",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1618420085594",
//         "listLabel": "Крайний срок монтажа",
//         "formLabel": "Крайний срок монтажа",
//         "filterLabel": "Крайний срок монтажа",
//         "settings": {
//             "DEFAULT_VALUE": {
//                 "TYPE": "NONE",
//                 "VALUE": ""
//             },
//             "USE_SECOND": "Y",
//             "USE_TIMEZONE": "N"
//         }
//     },
//     "UF_CRM_1618420333": {
//         "type": "employee",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1618420333",
//         "listLabel": "Монтажники (заполняется после монтажа)",
//         "formLabel": "Монтажники (заполняется после монтажа)",
//         "filterLabel": "Монтажники (заполняется после монтажа)",
//         "settings": []
//     },
//     "UF_CRM_1618420539591": {
//         "type": "file",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1618420539591",
//         "listLabel": "Фотопривязка",
//         "formLabel": "Фотопривязка",
//         "filterLabel": "Фотопривязка",
//         "settings": {
//             "SIZE": 20,
//             "LIST_WIDTH": 0,
//             "LIST_HEIGHT": 0,
//             "MAX_SHOW_SIZE": 0,
//             "MAX_ALLOWED_SIZE": 0,
//             "EXTENSIONS": [],
//             "TARGET_BLANK": "Y"
//         }
//     },
//     "UF_CRM_1619102989472": {
//         "type": "url",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1619102989472",
//         "listLabel": "Ссылка на ПП",
//         "formLabel": "Ссылка на ПП",
//         "filterLabel": "Ссылка на ПП",
//         "settings": {
//             "POPUP": "Y",
//             "SIZE": 20,
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1619103085": {
//         "type": "crm",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1619103085",
//         "listLabel": "Контакт для Монтажа",
//         "formLabel": "Контакт для Монтажа",
//         "filterLabel": "Контакт для Монтажа",
//         "settings": {
//             "CONTACT": "Y",
//             "LEAD": null
//         }
//     },
//     "UF_CRM_1619119800079": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "489",
//                 "VALUE": "Устное ТЗ"
//             },
//             {
//                 "ID": "47",
//                 "VALUE": "Фото"
//             },
//             {
//                 "ID": "503",
//                 "VALUE": "ДМ"
//             },
//             {
//                 "ID": "205",
//                 "VALUE": "Фото + ДМ"
//             },
//             {
//                 "ID": "51",
//                 "VALUE": "Фото + Размеры"
//             },
//             {
//                 "ID": "463",
//                 "VALUE": "Фото + Размеры + ДМ"
//             },
//             {
//                 "ID": "465",
//                 "VALUE": "Фото + Размеры + ДМ + ПП"
//             }
//         ],
//         "title": "UF_CRM_1619119800079",
//         "listLabel": "Что предоставил Клиент",
//         "formLabel": "Что предоставил Клиент",
//         "filterLabel": "Что предоставил Клиент",
//         "settings": {
//             "DISPLAY": "DIALOG",
//             "LIST_HEIGHT": 1,
//             "CAPTION_NO_VALUE": "",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1619190696514": {
//         "type": "datetime",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1619190696514",
//         "listLabel": "Крайний срок сдачи готовых материалов",
//         "formLabel": "Крайний срок сдачи готовых материалов",
//         "filterLabel": "Крайний срок сдачи готовых материалов",
//         "settings": {
//             "DEFAULT_VALUE": {
//                 "TYPE": "NONE",
//                 "VALUE": ""
//             },
//             "USE_SECOND": "Y",
//             "USE_TIMEZONE": "N"
//         }
//     },
//     "UF_CRM_1619201495": {
//         "type": "employee",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1619201495",
//         "listLabel": "Кто изготавливает материалы",
//         "formLabel": "Кто изготавливает материалы",
//         "filterLabel": "Кто изготавливает материалы",
//         "settings": []
//     },
//     "UF_CRM_1619430052812": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "61",
//                 "VALUE": "Москва"
//             },
//             {
//                 "ID": "63",
//                 "VALUE": "Нижний Новгород"
//             },
//             {
//                 "ID": "1543",
//                 "VALUE": "Абакан"
//             },
//             {
//                 "ID": "1545",
//                 "VALUE": "Абинск"
//             },
//             {
//                 "ID": "1547",
//                 "VALUE": "Авдеевка"
//             },
//             {
//                 "ID": "1549",
//                 "VALUE": "Адлер"
//             },
//             {
//                 "ID": "1551",
//                 "VALUE": "Азов"
//             },
//             {
//                 "ID": "1553",
//                 "VALUE": "Аксай"
//             },
//             {
//                 "ID": "1555",
//                 "VALUE": "Алапаевск"
//             },
//             {
//                 "ID": "1557",
//                 "VALUE": "Алатырь"
//             },
//             {
//                 "ID": "1559",
//                 "VALUE": "Алдан"
//             },
//             {
//                 "ID": "1561",
//                 "VALUE": "Алейск"
//             },
//             {
//                 "ID": "1563",
//                 "VALUE": "Александрия"
//             },
//             {
//                 "ID": "1565",
//                 "VALUE": "Александров"
//             },
//             {
//                 "ID": "1567",
//                 "VALUE": "Александровка"
//             },
//             {
//                 "ID": "1569",
//                 "VALUE": "Александровск"
//             },
//             {
//                 "ID": "1571",
//                 "VALUE": "Александровск-Сахалинский"
//             },
//             {
//                 "ID": "1573",
//                 "VALUE": "Александровское"
//             },
//             {
//                 "ID": "1575",
//                 "VALUE": "Алексеевка"
//             },
//             {
//                 "ID": "1577",
//                 "VALUE": "Алексин"
//             },
//             {
//                 "ID": "1579",
//                 "VALUE": "Алупка"
//             },
//             {
//                 "ID": "1581",
//                 "VALUE": "Алушта"
//             },
//             {
//                 "ID": "1583",
//                 "VALUE": "Алчевск"
//             },
//             {
//                 "ID": "1585",
//                 "VALUE": "Альметьевск"
//             },
//             {
//                 "ID": "1587",
//                 "VALUE": "Амвросиевка"
//             },
//             {
//                 "ID": "1589",
//                 "VALUE": "Амурск"
//             },
//             {
//                 "ID": "1591",
//                 "VALUE": "Анадырь"
//             },
//             {
//                 "ID": "1593",
//                 "VALUE": "Анапа"
//             },
//             {
//                 "ID": "1595",
//                 "VALUE": "Ангарск"
//             },
//             {
//                 "ID": "1597",
//                 "VALUE": "Анжеро-Судженск"
//             },
//             {
//                 "ID": "1599",
//                 "VALUE": "Анива"
//             },
//             {
//                 "ID": "1601",
//                 "VALUE": "Анна"
//             },
//             {
//                 "ID": "1603",
//                 "VALUE": "Антрацит"
//             },
//             {
//                 "ID": "1605",
//                 "VALUE": "Апатиты"
//             },
//             {
//                 "ID": "1607",
//                 "VALUE": "Апрелевка"
//             },
//             {
//                 "ID": "1609",
//                 "VALUE": "Арбузинка"
//             },
//             {
//                 "ID": "1611",
//                 "VALUE": "Арзамас"
//             },
//             {
//                 "ID": "1613",
//                 "VALUE": "Арзгир"
//             },
//             {
//                 "ID": "1615",
//                 "VALUE": "Армавир"
//             },
//             {
//                 "ID": "1617",
//                 "VALUE": "Армянск"
//             },
//             {
//                 "ID": "1619",
//                 "VALUE": "Арсеньев"
//             },
//             {
//                 "ID": "1621",
//                 "VALUE": "Артем"
//             },
//             {
//                 "ID": "1623",
//                 "VALUE": "Артёмовск"
//             },
//             {
//                 "ID": "1625",
//                 "VALUE": "Артемовский"
//             },
//             {
//                 "ID": "1627",
//                 "VALUE": "Архангельск"
//             },
//             {
//                 "ID": "1629",
//                 "VALUE": "Асбест"
//             },
//             {
//                 "ID": "1631",
//                 "VALUE": "Астрахань"
//             },
//             {
//                 "ID": "1633",
//                 "VALUE": "Аткарск"
//             },
//             {
//                 "ID": "1635",
//                 "VALUE": "Ахтырка"
//             },
//             {
//                 "ID": "1637",
//                 "VALUE": "Ачинск"
//             },
//             {
//                 "ID": "1639",
//                 "VALUE": "Аша"
//             },
//             {
//                 "ID": "1641",
//                 "VALUE": "Аэропорт \"Домодедово\""
//             },
//             {
//                 "ID": "1643",
//                 "VALUE": "Бабаево"
//             },
//             {
//                 "ID": "1645",
//                 "VALUE": "Багаевский"
//             },
//             {
//                 "ID": "1647",
//                 "VALUE": "Байконур"
//             },
//             {
//                 "ID": "1649",
//                 "VALUE": "Балабаново"
//             },
//             {
//                 "ID": "1651",
//                 "VALUE": "Балаклея"
//             },
//             {
//                 "ID": "1653",
//                 "VALUE": "Балаково"
//             },
//             {
//                 "ID": "1655",
//                 "VALUE": "Балахна"
//             },
//             {
//                 "ID": "1657",
//                 "VALUE": "Балашиха"
//             },
//             {
//                 "ID": "1659",
//                 "VALUE": "Балашов"
//             },
//             {
//                 "ID": "1661",
//                 "VALUE": "Баргузин"
//             },
//             {
//                 "ID": "1663",
//                 "VALUE": "Барнаул"
//             },
//             {
//                 "ID": "1665",
//                 "VALUE": "Барышевка"
//             },
//             {
//                 "ID": "1667",
//                 "VALUE": "Батайск"
//             },
//             {
//                 "ID": "1669",
//                 "VALUE": "Бахмач"
//             },
//             {
//                 "ID": "1671",
//                 "VALUE": "Бахчисарай"
//             },
//             {
//                 "ID": "1673",
//                 "VALUE": "Баштанка"
//             },
//             {
//                 "ID": "1675",
//                 "VALUE": "Белая Калитва"
//             },
//             {
//                 "ID": "1677",
//                 "VALUE": "Белая Церковь"
//             },
//             {
//                 "ID": "1679",
//                 "VALUE": "Белгород"
//             },
//             {
//                 "ID": "1681",
//                 "VALUE": "Белгород-Днестровский"
//             },
//             {
//                 "ID": "1683",
//                 "VALUE": "Белово"
//             },
//             {
//                 "ID": "1685",
//                 "VALUE": "Белогорск"
//             },
//             {
//                 "ID": "1687",
//                 "VALUE": "Белозёрка"
//             },
//             {
//                 "ID": "1689",
//                 "VALUE": "Белокуракино"
//             },
//             {
//                 "ID": "1691",
//                 "VALUE": "Белорецк"
//             },
//             {
//                 "ID": "1693",
//                 "VALUE": "Белореченск"
//             },
//             {
//                 "ID": "1695",
//                 "VALUE": "Беляевка"
//             },
//             {
//                 "ID": "1697",
//                 "VALUE": "Бердичев"
//             },
//             {
//                 "ID": "1699",
//                 "VALUE": "Бердск"
//             },
//             {
//                 "ID": "1701",
//                 "VALUE": "Бердянск"
//             },
//             {
//                 "ID": "1703",
//                 "VALUE": "Берегово"
//             },
//             {
//                 "ID": "1705",
//                 "VALUE": "Бережаны"
//             },
//             {
//                 "ID": "1707",
//                 "VALUE": "Березники"
//             },
//             {
//                 "ID": "1709",
//                 "VALUE": "Березовка"
//             },
//             {
//                 "ID": "1711",
//                 "VALUE": "Березовский"
//             },
//             {
//                 "ID": "1713",
//                 "VALUE": "Беслан"
//             },
//             {
//                 "ID": "1715",
//                 "VALUE": "Беспятное"
//             },
//             {
//                 "ID": "1717",
//                 "VALUE": "Бийск"
//             },
//             {
//                 "ID": "1719",
//                 "VALUE": "Биробиджан"
//             },
//             {
//                 "ID": "1721",
//                 "VALUE": "Бирск"
//             },
//             {
//                 "ID": "1723",
//                 "VALUE": "Благовещенск"
//             },
//             {
//                 "ID": "1725",
//                 "VALUE": "Благодарный"
//             },
//             {
//                 "ID": "1727",
//                 "VALUE": "Близнюки"
//             },
//             {
//                 "ID": "1729",
//                 "VALUE": "Бобров"
//             },
//             {
//                 "ID": "1731",
//                 "VALUE": "Богданович"
//             },
//             {
//                 "ID": "1733",
//                 "VALUE": "Богодухов"
//             },
//             {
//                 "ID": "1735",
//                 "VALUE": "Богородск"
//             },
//             {
//                 "ID": "1737",
//                 "VALUE": "Богородчаны"
//             },
//             {
//                 "ID": "1739",
//                 "VALUE": "Богуслав"
//             },
//             {
//                 "ID": "1741",
//                 "VALUE": "Богучар"
//             },
//             {
//                 "ID": "1743",
//                 "VALUE": "Бодайбо"
//             },
//             {
//                 "ID": "1745",
//                 "VALUE": "Болград"
//             },
//             {
//                 "ID": "1747",
//                 "VALUE": "Болехов"
//             },
//             {
//                 "ID": "1749",
//                 "VALUE": "Бологое"
//             },
//             {
//                 "ID": "1751",
//                 "VALUE": "Большой Камень"
//             },
//             {
//                 "ID": "1753",
//                 "VALUE": "Бор"
//             },
//             {
//                 "ID": "1755",
//                 "VALUE": "Борислав"
//             },
//             {
//                 "ID": "1757",
//                 "VALUE": "Борисоглебск"
//             },
//             {
//                 "ID": "1759",
//                 "VALUE": "Борисполь"
//             },
//             {
//                 "ID": "1761",
//                 "VALUE": "Боровичи"
//             },
//             {
//                 "ID": "1763",
//                 "VALUE": "Боровск"
//             },
//             {
//                 "ID": "1765",
//                 "VALUE": "Бородянка"
//             },
//             {
//                 "ID": "1767",
//                 "VALUE": "Боярка"
//             },
//             {
//                 "ID": "1769",
//                 "VALUE": "Братск"
//             },
//             {
//                 "ID": "1771",
//                 "VALUE": "Бровары"
//             },
//             {
//                 "ID": "1773",
//                 "VALUE": "Броды"
//             },
//             {
//                 "ID": "1775",
//                 "VALUE": "Бронницы"
//             },
//             {
//                 "ID": "1777",
//                 "VALUE": "Брянка"
//             },
//             {
//                 "ID": "1779",
//                 "VALUE": "Брянск"
//             },
//             {
//                 "ID": "1781",
//                 "VALUE": "Буденновск"
//             },
//             {
//                 "ID": "1783",
//                 "VALUE": "Бузулук"
//             },
//             {
//                 "ID": "1785",
//                 "VALUE": "Буйнакск"
//             },
//             {
//                 "ID": "1787",
//                 "VALUE": "Бурштын"
//             },
//             {
//                 "ID": "1789",
//                 "VALUE": "Бурынь"
//             },
//             {
//                 "ID": "1791",
//                 "VALUE": "Бутурлиновка"
//             },
//             {
//                 "ID": "1793",
//                 "VALUE": "Буча"
//             },
//             {
//                 "ID": "1795",
//                 "VALUE": "Бучач"
//             },
//             {
//                 "ID": "1797",
//                 "VALUE": "Валки"
//             },
//             {
//                 "ID": "1799",
//                 "VALUE": "Валуйки"
//             },
//             {
//                 "ID": "1801",
//                 "VALUE": "Ванино"
//             },
//             {
//                 "ID": "1803",
//                 "VALUE": "Варва"
//             },
//             {
//                 "ID": "1805",
//                 "VALUE": "Васильков"
//             },
//             {
//                 "ID": "1807",
//                 "VALUE": "Великая Лепетиха"
//             },
//             {
//                 "ID": "1809",
//                 "VALUE": "Великие Луки"
//             },
//             {
//                 "ID": "1811",
//                 "VALUE": "Великий Берёзный"
//             },
//             {
//                 "ID": "1813",
//                 "VALUE": "Великий Новгород"
//             },
//             {
//                 "ID": "1815",
//                 "VALUE": "Великий Устюг"
//             },
//             {
//                 "ID": "1817",
//                 "VALUE": "Вельск"
//             },
//             {
//                 "ID": "1819",
//                 "VALUE": "Верхнеднепровск"
//             },
//             {
//                 "ID": "1821",
//                 "VALUE": "Верхний Уфалей"
//             },
//             {
//                 "ID": "1823",
//                 "VALUE": "Верхняя Пышма"
//             },
//             {
//                 "ID": "1825",
//                 "VALUE": "Верхняя Салда"
//             },
//             {
//                 "ID": "1827",
//                 "VALUE": "Веселый"
//             },
//             {
//                 "ID": "1829",
//                 "VALUE": "Вешенская"
//             },
//             {
//                 "ID": "1831",
//                 "VALUE": "Взморье"
//             },
//             {
//                 "ID": "1833",
//                 "VALUE": "Видное"
//             },
//             {
//                 "ID": "1835",
//                 "VALUE": "Вилково"
//             },
//             {
//                 "ID": "1837",
//                 "VALUE": "Вилючинск"
//             },
//             {
//                 "ID": "1839",
//                 "VALUE": "Винница"
//             },
//             {
//                 "ID": "1841",
//                 "VALUE": "Виноградов"
//             },
//             {
//                 "ID": "1843",
//                 "VALUE": "Вихоревка"
//             },
//             {
//                 "ID": "1845",
//                 "VALUE": "Вишнёвое"
//             },
//             {
//                 "ID": "1847",
//                 "VALUE": "Владивосток"
//             },
//             {
//                 "ID": "1849",
//                 "VALUE": "Владикавказ"
//             },
//             {
//                 "ID": "1851",
//                 "VALUE": "Владимир"
//             },
//             {
//                 "ID": "1853",
//                 "VALUE": "Владимир-Волынский"
//             },
//             {
//                 "ID": "1855",
//                 "VALUE": "Внуково"
//             },
//             {
//                 "ID": "1857",
//                 "VALUE": "Вознесенск"
//             },
//             {
//                 "ID": "1859",
//                 "VALUE": "Волгоград"
//             },
//             {
//                 "ID": "1861",
//                 "VALUE": "Волгодонск"
//             },
//             {
//                 "ID": "1863",
//                 "VALUE": "Волжск"
//             },
//             {
//                 "ID": "1865",
//                 "VALUE": "Волжский"
//             },
//             {
//                 "ID": "1867",
//                 "VALUE": "Вологда"
//             },
//             {
//                 "ID": "1869",
//                 "VALUE": "Волоколамск"
//             },
//             {
//                 "ID": "1871",
//                 "VALUE": "Волоконовка"
//             },
//             {
//                 "ID": "1873",
//                 "VALUE": "Волосово"
//             },
//             {
//                 "ID": "1875",
//                 "VALUE": "Волочиск"
//             },
//             {
//                 "ID": "1877",
//                 "VALUE": "Волхов"
//             },
//             {
//                 "ID": "1879",
//                 "VALUE": "Волчанск"
//             },
//             {
//                 "ID": "1881",
//                 "VALUE": "Вольно-Надеждинское"
//             },
//             {
//                 "ID": "1883",
//                 "VALUE": "Вольногорск"
//             },
//             {
//                 "ID": "1885",
//                 "VALUE": "Вольск"
//             },
//             {
//                 "ID": "1887",
//                 "VALUE": "Воркута"
//             },
//             {
//                 "ID": "1889",
//                 "VALUE": "Воробьевка"
//             },
//             {
//                 "ID": "1891",
//                 "VALUE": "Воронеж"
//             },
//             {
//                 "ID": "1893",
//                 "VALUE": "Воскресенск"
//             },
//             {
//                 "ID": "1895",
//                 "VALUE": "Воскресенское"
//             },
//             {
//                 "ID": "1897",
//                 "VALUE": "Воткинск"
//             },
//             {
//                 "ID": "1899",
//                 "VALUE": "Всеволожск"
//             },
//             {
//                 "ID": "1901",
//                 "VALUE": "Вурнары"
//             },
//             {
//                 "ID": "1903",
//                 "VALUE": "Выборг"
//             },
//             {
//                 "ID": "1905",
//                 "VALUE": "Выкса"
//             },
//             {
//                 "ID": "1907",
//                 "VALUE": "Вырица"
//             },
//             {
//                 "ID": "1909",
//                 "VALUE": "Выселки"
//             },
//             {
//                 "ID": "1911",
//                 "VALUE": "Высокий"
//             },
//             {
//                 "ID": "1913",
//                 "VALUE": "Вышгород"
//             },
//             {
//                 "ID": "1915",
//                 "VALUE": "Вышний Волочек"
//             },
//             {
//                 "ID": "1917",
//                 "VALUE": "Вязовая"
//             },
//             {
//                 "ID": "1919",
//                 "VALUE": "Вязьма"
//             },
//             {
//                 "ID": "1921",
//                 "VALUE": "Вятские Поляны"
//             },
//             {
//                 "ID": "1923",
//                 "VALUE": "Гаврилов-ям"
//             },
//             {
//                 "ID": "1925",
//                 "VALUE": "Гагарин"
//             },
//             {
//                 "ID": "1927",
//                 "VALUE": "Гадяч"
//             },
//             {
//                 "ID": "1929",
//                 "VALUE": "Гай"
//             },
//             {
//                 "ID": "1931",
//                 "VALUE": "Галенки"
//             },
//             {
//                 "ID": "1933",
//                 "VALUE": "Галич"
//             },
//             {
//                 "ID": "1935",
//                 "VALUE": "Гатчина"
//             },
//             {
//                 "ID": "1937",
//                 "VALUE": "Геленджик"
//             },
//             {
//                 "ID": "1939",
//                 "VALUE": "Геническ"
//             },
//             {
//                 "ID": "1941",
//                 "VALUE": "Георгиевск"
//             },
//             {
//                 "ID": "1943",
//                 "VALUE": "Глазов"
//             },
//             {
//                 "ID": "1945",
//                 "VALUE": "Глухов"
//             },
//             {
//                 "ID": "1947",
//                 "VALUE": "Глыбокая"
//             },
//             {
//                 "ID": "1949",
//                 "VALUE": "Голая Пристань"
//             },
//             {
//                 "ID": "1951",
//                 "VALUE": "Голицыно"
//             },
//             {
//                 "ID": "1953",
//                 "VALUE": "Горловка"
//             },
//             {
//                 "ID": "1955",
//                 "VALUE": "Горно-Алтайск"
//             },
//             {
//                 "ID": "1957",
//                 "VALUE": "Горнозаводск"
//             },
//             {
//                 "ID": "1959",
//                 "VALUE": "Городенка"
//             },
//             {
//                 "ID": "1961",
//                 "VALUE": "Городец"
//             },
//             {
//                 "ID": "1963",
//                 "VALUE": "Городище"
//             },
//             {
//                 "ID": "1965",
//                 "VALUE": "Городня"
//             },
//             {
//                 "ID": "1967",
//                 "VALUE": "Городок"
//             },
//             {
//                 "ID": "1969",
//                 "VALUE": "Гостомель"
//             },
//             {
//                 "ID": "1971",
//                 "VALUE": "Гребёнка"
//             },
//             {
//                 "ID": "1973",
//                 "VALUE": "Гремячинск"
//             },
//             {
//                 "ID": "1975",
//                 "VALUE": "Грозный"
//             },
//             {
//                 "ID": "1977",
//                 "VALUE": "Грязовец"
//             },
//             {
//                 "ID": "1979",
//                 "VALUE": "Губаха"
//             },
//             {
//                 "ID": "1981",
//                 "VALUE": "Губкин"
//             },
//             {
//                 "ID": "1983",
//                 "VALUE": "Гудермес"
//             },
//             {
//                 "ID": "1985",
//                 "VALUE": "Гуково"
//             },
//             {
//                 "ID": "1987",
//                 "VALUE": "Гулькевичи"
//             },
//             {
//                 "ID": "1989",
//                 "VALUE": "Гуляйполе"
//             },
//             {
//                 "ID": "1991",
//                 "VALUE": "Гусиноозерск"
//             },
//             {
//                 "ID": "1993",
//                 "VALUE": "Гусь Хрустальный"
//             },
//             {
//                 "ID": "1995",
//                 "VALUE": "Далматово"
//             },
//             {
//                 "ID": "1997",
//                 "VALUE": "Дальнегорск"
//             },
//             {
//                 "ID": "1999",
//                 "VALUE": "Дальнереченск"
//             },
//             {
//                 "ID": "2001",
//                 "VALUE": "Дебальцево"
//             },
//             {
//                 "ID": "2003",
//                 "VALUE": "Дедовск"
//             },
//             {
//                 "ID": "2005",
//                 "VALUE": "Демидово"
//             },
//             {
//                 "ID": "2007",
//                 "VALUE": "Деражня"
//             },
//             {
//                 "ID": "2009",
//                 "VALUE": "Дербент"
//             },
//             {
//                 "ID": "2011",
//                 "VALUE": "Дергачи"
//             },
//             {
//                 "ID": "2013",
//                 "VALUE": "Десна"
//             },
//             {
//                 "ID": "2015",
//                 "VALUE": "Десногорск"
//             },
//             {
//                 "ID": "2017",
//                 "VALUE": "Джанкой"
//             },
//             {
//                 "ID": "2019",
//                 "VALUE": "Дзержинск"
//             },
//             {
//                 "ID": "2021",
//                 "VALUE": "Дзержинский"
//             },
//             {
//                 "ID": "2023",
//                 "VALUE": "Дивногорск"
//             },
//             {
//                 "ID": "2025",
//                 "VALUE": "Дивное"
//             },
//             {
//                 "ID": "2027",
//                 "VALUE": "Димитров"
//             },
//             {
//                 "ID": "2029",
//                 "VALUE": "Димитровград"
//             },
//             {
//                 "ID": "2031",
//                 "VALUE": "Дмитров"
//             },
//             {
//                 "ID": "2033",
//                 "VALUE": "Днепродзержинск"
//             },
//             {
//                 "ID": "2035",
//                 "VALUE": "Днепропетровск"
//             },
//             {
//                 "ID": "2037",
//                 "VALUE": "Днепрорудное"
//             },
//             {
//                 "ID": "2039",
//                 "VALUE": "Добромиль"
//             },
//             {
//                 "ID": "2041",
//                 "VALUE": "Доброполье"
//             },
//             {
//                 "ID": "2043",
//                 "VALUE": "Добрянка"
//             },
//             {
//                 "ID": "2045",
//                 "VALUE": "Докучаевск"
//             },
//             {
//                 "ID": "2047",
//                 "VALUE": "Долгопрудный"
//             },
//             {
//                 "ID": "2049",
//                 "VALUE": "Долинская"
//             },
//             {
//                 "ID": "2051",
//                 "VALUE": "Доманёвка"
//             },
//             {
//                 "ID": "2053",
//                 "VALUE": "Домодедово"
//             },
//             {
//                 "ID": "2055",
//                 "VALUE": "Донецк"
//             },
//             {
//                 "ID": "2057",
//                 "VALUE": "Дрогобыч"
//             },
//             {
//                 "ID": "2059",
//                 "VALUE": "Дружковка"
//             },
//             {
//                 "ID": "2061",
//                 "VALUE": "Дубна"
//             },
//             {
//                 "ID": "2063",
//                 "VALUE": "Дубовка"
//             },
//             {
//                 "ID": "2065",
//                 "VALUE": "Дубровица"
//             },
//             {
//                 "ID": "2067",
//                 "VALUE": "Дудинка"
//             },
//             {
//                 "ID": "2069",
//                 "VALUE": "Дунаевцы"
//             },
//             {
//                 "ID": "2071",
//                 "VALUE": "Евпатория"
//             },
//             {
//                 "ID": "2073",
//                 "VALUE": "Егорлык"
//             },
//             {
//                 "ID": "2075",
//                 "VALUE": "Егорлыкская"
//             },
//             {
//                 "ID": "2077",
//                 "VALUE": "Егорьевск"
//             },
//             {
//                 "ID": "2079",
//                 "VALUE": "Ейск"
//             },
//             {
//                 "ID": "2081",
//                 "VALUE": "Екатеринбург"
//             },
//             {
//                 "ID": "2083",
//                 "VALUE": "Елабуга"
//             },
//             {
//                 "ID": "2085",
//                 "VALUE": "Елань"
//             },
//             {
//                 "ID": "2087",
//                 "VALUE": "Елец"
//             },
//             {
//                 "ID": "2089",
//                 "VALUE": "Елизово"
//             },
//             {
//                 "ID": "2091",
//                 "VALUE": "Еманжелинск"
//             },
//             {
//                 "ID": "2093",
//                 "VALUE": "Емильчино"
//             },
//             {
//                 "ID": "2095",
//                 "VALUE": "Енакиево"
//             },
//             {
//                 "ID": "2097",
//                 "VALUE": "Ерофей-Павлович"
//             },
//             {
//                 "ID": "2099",
//                 "VALUE": "Ессентуки"
//             },
//             {
//                 "ID": "2101",
//                 "VALUE": "Ефремов"
//             },
//             {
//                 "ID": "2103",
//                 "VALUE": "Железноводск"
//             },
//             {
//                 "ID": "2105",
//                 "VALUE": "Железногорск"
//             },
//             {
//                 "ID": "2107",
//                 "VALUE": "Железногорск-Илимский"
//             },
//             {
//                 "ID": "2109",
//                 "VALUE": "Железнодорожный"
//             },
//             {
//                 "ID": "2111",
//                 "VALUE": "Жёлтые Воды"
//             },
//             {
//                 "ID": "2113",
//                 "VALUE": "Жигулевск"
//             },
//             {
//                 "ID": "2115",
//                 "VALUE": "Жидачов"
//             },
//             {
//                 "ID": "2117",
//                 "VALUE": "Жирновск"
//             },
//             {
//                 "ID": "2119",
//                 "VALUE": "Житомир"
//             },
//             {
//                 "ID": "2121",
//                 "VALUE": "Жолква"
//             },
//             {
//                 "ID": "2123",
//                 "VALUE": "Жуковка"
//             },
//             {
//                 "ID": "2125",
//                 "VALUE": "Жуковский"
//             },
//             {
//                 "ID": "2127",
//                 "VALUE": "Забайкальск"
//             },
//             {
//                 "ID": "2129",
//                 "VALUE": "Заволжье"
//             },
//             {
//                 "ID": "2131",
//                 "VALUE": "Зазимье"
//             },
//             {
//                 "ID": "2133",
//                 "VALUE": "Заполярный"
//             },
//             {
//                 "ID": "2135",
//                 "VALUE": "Запорожье"
//             },
//             {
//                 "ID": "2137",
//                 "VALUE": "Зарайск"
//             },
//             {
//                 "ID": "2139",
//                 "VALUE": "Заречное"
//             },
//             {
//                 "ID": "2141",
//                 "VALUE": "Заречный"
//             },
//             {
//                 "ID": "2143",
//                 "VALUE": "Заринск"
//             },
//             {
//                 "ID": "2145",
//                 "VALUE": "Збараж"
//             },
//             {
//                 "ID": "2147",
//                 "VALUE": "Звенигород"
//             },
//             {
//                 "ID": "2149",
//                 "VALUE": "Здолбунов"
//             },
//             {
//                 "ID": "2151",
//                 "VALUE": "Зеленогорск"
//             },
//             {
//                 "ID": "2153",
//                 "VALUE": "Зеленоград"
//             },
//             {
//                 "ID": "2155",
//                 "VALUE": "Зеленокумск"
//             },
//             {
//                 "ID": "2157",
//                 "VALUE": "Зерноград"
//             },
//             {
//                 "ID": "2159",
//                 "VALUE": "Зима"
//             },
//             {
//                 "ID": "2161",
//                 "VALUE": "Зимовники"
//             },
//             {
//                 "ID": "2163",
//                 "VALUE": "Златоуст"
//             },
//             {
//                 "ID": "2165",
//                 "VALUE": "Змиёв"
//             },
//             {
//                 "ID": "2167",
//                 "VALUE": "Знаменка"
//             },
//             {
//                 "ID": "2169",
//                 "VALUE": "Золотоноша"
//             },
//             {
//                 "ID": "2171",
//                 "VALUE": "Золочев"
//             },
//             {
//                 "ID": "2173",
//                 "VALUE": "Ивано-Франковск"
//             },
//             {
//                 "ID": "2175",
//                 "VALUE": "Иваново"
//             },
//             {
//                 "ID": "2177",
//                 "VALUE": "Ивантеевка"
//             },
//             {
//                 "ID": "2179",
//                 "VALUE": "Ижевск"
//             },
//             {
//                 "ID": "2181",
//                 "VALUE": "Измаил"
//             },
//             {
//                 "ID": "2183",
//                 "VALUE": "Изобильный"
//             },
//             {
//                 "ID": "2185",
//                 "VALUE": "Изюм"
//             },
//             {
//                 "ID": "2187",
//                 "VALUE": "Изяслав"
//             },
//             {
//                 "ID": "2189",
//                 "VALUE": "Иланский"
//             },
//             {
//                 "ID": "2191",
//                 "VALUE": "Иловля"
//             },
//             {
//                 "ID": "2193",
//                 "VALUE": "Ильичёвск"
//             },
//             {
//                 "ID": "2195",
//                 "VALUE": "Инжавино"
//             },
//             {
//                 "ID": "2197",
//                 "VALUE": "Инта"
//             },
//             {
//                 "ID": "2199",
//                 "VALUE": "Ипатово"
//             },
//             {
//                 "ID": "2201",
//                 "VALUE": "Иркутск"
//             },
//             {
//                 "ID": "2203",
//                 "VALUE": "Ирпень"
//             },
//             {
//                 "ID": "2205",
//                 "VALUE": "Иршава"
//             },
//             {
//                 "ID": "2207",
//                 "VALUE": "Искитим"
//             },
//             {
//                 "ID": "2209",
//                 "VALUE": "Истра"
//             },
//             {
//                 "ID": "2211",
//                 "VALUE": "Ичня"
//             },
//             {
//                 "ID": "2213",
//                 "VALUE": "Ишимбай"
//             },
//             {
//                 "ID": "2215",
//                 "VALUE": "Йошкар-Ола"
//             },
//             {
//                 "ID": "2217",
//                 "VALUE": "Кабанск"
//             },
//             {
//                 "ID": "2219",
//                 "VALUE": "Кавалерово"
//             },
//             {
//                 "ID": "2221",
//                 "VALUE": "Кагальницкая"
//             },
//             {
//                 "ID": "2223",
//                 "VALUE": "Кагарлык"
//             },
//             {
//                 "ID": "2225",
//                 "VALUE": "Казанская"
//             },
//             {
//                 "ID": "2227",
//                 "VALUE": "Казань"
//             },
//             {
//                 "ID": "2229",
//                 "VALUE": "Казатин"
//             },
//             {
//                 "ID": "2231",
//                 "VALUE": "Казлук"
//             },
//             {
//                 "ID": "2233",
//                 "VALUE": "Калач"
//             },
//             {
//                 "ID": "2235",
//                 "VALUE": "Калач-на-дону"
//             },
//             {
//                 "ID": "2237",
//                 "VALUE": "Калининград"
//             },
//             {
//                 "ID": "2239",
//                 "VALUE": "Калиновка"
//             },
//             {
//                 "ID": "2241",
//                 "VALUE": "Калтан"
//             },
//             {
//                 "ID": "2243",
//                 "VALUE": "Калуга"
//             },
//             {
//                 "ID": "2245",
//                 "VALUE": "Калуш"
//             },
//             {
//                 "ID": "2247",
//                 "VALUE": "Калязин"
//             },
//             {
//                 "ID": "2249",
//                 "VALUE": "Каменец-Подольский"
//             },
//             {
//                 "ID": "2251",
//                 "VALUE": "Каменка"
//             },
//             {
//                 "ID": "2253",
//                 "VALUE": "Каменка Бугская"
//             },
//             {
//                 "ID": "2255",
//                 "VALUE": "Каменка-Днепровская"
//             },
//             {
//                 "ID": "2257",
//                 "VALUE": "Каменоломни"
//             },
//             {
//                 "ID": "2259",
//                 "VALUE": "Каменск-Уральский"
//             },
//             {
//                 "ID": "2261",
//                 "VALUE": "Каменск-Шахтинский"
//             },
//             {
//                 "ID": "2263",
//                 "VALUE": "Камень-Рыболов"
//             },
//             {
//                 "ID": "2265",
//                 "VALUE": "Камышин"
//             },
//             {
//                 "ID": "2267",
//                 "VALUE": "Канаш"
//             },
//             {
//                 "ID": "2269",
//                 "VALUE": "Кандалакша"
//             },
//             {
//                 "ID": "2271",
//                 "VALUE": "Канев"
//             },
//             {
//                 "ID": "2273",
//                 "VALUE": "Каневская"
//             },
//             {
//                 "ID": "2275",
//                 "VALUE": "Канск"
//             },
//             {
//                 "ID": "2277",
//                 "VALUE": "Кантемировка"
//             },
//             {
//                 "ID": "2279",
//                 "VALUE": "Карабаш"
//             },
//             {
//                 "ID": "2281",
//                 "VALUE": "Карагай"
//             },
//             {
//                 "ID": "2283",
//                 "VALUE": "Карловка"
//             },
//             {
//                 "ID": "2285",
//                 "VALUE": "Касимов"
//             },
//             {
//                 "ID": "2287",
//                 "VALUE": "Каспийск"
//             },
//             {
//                 "ID": "2289",
//                 "VALUE": "Катеринополь"
//             },
//             {
//                 "ID": "2291",
//                 "VALUE": "Каховка"
//             },
//             {
//                 "ID": "2293",
//                 "VALUE": "Качканар"
//             },
//             {
//                 "ID": "2295",
//                 "VALUE": "Кашары"
//             },
//             {
//                 "ID": "2297",
//                 "VALUE": "Кашира"
//             },
//             {
//                 "ID": "2299",
//                 "VALUE": "Кегичёвка"
//             },
//             {
//                 "ID": "2301",
//                 "VALUE": "Кельменцы"
//             },
//             {
//                 "ID": "2303",
//                 "VALUE": "Кемерово"
//             },
//             {
//                 "ID": "2305",
//                 "VALUE": "Керчь"
//             },
//             {
//                 "ID": "2307",
//                 "VALUE": "Киев"
//             },
//             {
//                 "ID": "2309",
//                 "VALUE": "Кизел"
//             },
//             {
//                 "ID": "2311",
//                 "VALUE": "Кизляр"
//             },
//             {
//                 "ID": "2313",
//                 "VALUE": "Килия"
//             },
//             {
//                 "ID": "2315",
//                 "VALUE": "Кимры"
//             },
//             {
//                 "ID": "2317",
//                 "VALUE": "Кинель"
//             },
//             {
//                 "ID": "2319",
//                 "VALUE": "Кинешма"
//             },
//             {
//                 "ID": "2321",
//                 "VALUE": "Киржач"
//             },
//             {
//                 "ID": "2323",
//                 "VALUE": "Кириллов"
//             },
//             {
//                 "ID": "2325",
//                 "VALUE": "Кириши"
//             },
//             {
//                 "ID": "2327",
//                 "VALUE": "Киров"
//             },
//             {
//                 "ID": "2329",
//                 "VALUE": "Кировград"
//             },
//             {
//                 "ID": "2331",
//                 "VALUE": "Кирово-Чепецк"
//             },
//             {
//                 "ID": "2333",
//                 "VALUE": "Кировоград"
//             },
//             {
//                 "ID": "2335",
//                 "VALUE": "Кировск"
//             },
//             {
//                 "ID": "2337",
//                 "VALUE": "Кировский"
//             },
//             {
//                 "ID": "2339",
//                 "VALUE": "Кировское"
//             },
//             {
//                 "ID": "2341",
//                 "VALUE": "Киселевск"
//             },
//             {
//                 "ID": "2343",
//                 "VALUE": "Кисловодск"
//             },
//             {
//                 "ID": "2345",
//                 "VALUE": "Кицмань"
//             },
//             {
//                 "ID": "2347",
//                 "VALUE": "Клевань"
//             },
//             {
//                 "ID": "2349",
//                 "VALUE": "Климовск"
//             },
//             {
//                 "ID": "2351",
//                 "VALUE": "Клин"
//             },
//             {
//                 "ID": "2353",
//                 "VALUE": "Ковель"
//             },
//             {
//                 "ID": "2355",
//                 "VALUE": "Ковров"
//             },
//             {
//                 "ID": "2357",
//                 "VALUE": "Когалым"
//             },
//             {
//                 "ID": "2359",
//                 "VALUE": "Кодинск"
//             },
//             {
//                 "ID": "2361",
//                 "VALUE": "Козелец"
//             },
//             {
//                 "ID": "2363",
//                 "VALUE": "Козова"
//             },
//             {
//                 "ID": "2365",
//                 "VALUE": "Кола"
//             },
//             {
//                 "ID": "2367",
//                 "VALUE": "Коломна"
//             },
//             {
//                 "ID": "2369",
//                 "VALUE": "Коломыя"
//             },
//             {
//                 "ID": "2371",
//                 "VALUE": "Кольчугино"
//             },
//             {
//                 "ID": "2373",
//                 "VALUE": "Комсомольск"
//             },
//             {
//                 "ID": "2375",
//                 "VALUE": "Комсомольск-на-Амуре"
//             },
//             {
//                 "ID": "2377",
//                 "VALUE": "Комсомольское"
//             },
//             {
//                 "ID": "2379",
//                 "VALUE": "Конаково"
//             },
//             {
//                 "ID": "2381",
//                 "VALUE": "Кондопога"
//             },
//             {
//                 "ID": "2383",
//                 "VALUE": "Конотоп"
//             },
//             {
//                 "ID": "2385",
//                 "VALUE": "Константиновка"
//             },
//             {
//                 "ID": "2387",
//                 "VALUE": "Константиновск"
//             },
//             {
//                 "ID": "2389",
//                 "VALUE": "Копейск"
//             },
//             {
//                 "ID": "2391",
//                 "VALUE": "Коркино"
//             },
//             {
//                 "ID": "2393",
//                 "VALUE": "Королев"
//             },
//             {
//                 "ID": "2395",
//                 "VALUE": "Королёво"
//             },
//             {
//                 "ID": "2397",
//                 "VALUE": "Коростень"
//             },
//             {
//                 "ID": "2399",
//                 "VALUE": "Корсаков"
//             },
//             {
//                 "ID": "2401",
//                 "VALUE": "Корсунь-Шевченковский"
//             },
//             {
//                 "ID": "2403",
//                 "VALUE": "Коряжма"
//             },
//             {
//                 "ID": "2405",
//                 "VALUE": "Косов"
//             },
//             {
//                 "ID": "2407",
//                 "VALUE": "Костополь"
//             },
//             {
//                 "ID": "2409",
//                 "VALUE": "Кострома"
//             },
//             {
//                 "ID": "2411",
//                 "VALUE": "Котельники"
//             },
//             {
//                 "ID": "2413",
//                 "VALUE": "Котельниково"
//             },
//             {
//                 "ID": "2415",
//                 "VALUE": "Котово"
//             },
//             {
//                 "ID": "2417",
//                 "VALUE": "Котовск"
//             },
//             {
//                 "ID": "2419",
//                 "VALUE": "Коцюбинское"
//             },
//             {
//                 "ID": "2421",
//                 "VALUE": "Краматорск"
//             },
//             {
//                 "ID": "2423",
//                 "VALUE": "Красилов"
//             },
//             {
//                 "ID": "2425",
//                 "VALUE": "Красноармейск"
//             },
//             {
//                 "ID": "2427",
//                 "VALUE": "Красновишерск"
//             },
//             {
//                 "ID": "2429",
//                 "VALUE": "Красногорск"
//             },
//             {
//                 "ID": "2431",
//                 "VALUE": "Красноград"
//             },
//             {
//                 "ID": "2433",
//                 "VALUE": "Краснодар"
//             },
//             {
//                 "ID": "2435",
//                 "VALUE": "Краснодон"
//             },
//             {
//                 "ID": "2437",
//                 "VALUE": "Краснознаменск"
//             },
//             {
//                 "ID": "2439",
//                 "VALUE": "Краснокаменск"
//             },
//             {
//                 "ID": "2441",
//                 "VALUE": "Краснокамск"
//             },
//             {
//                 "ID": "2443",
//                 "VALUE": "Краснокутск"
//             },
//             {
//                 "ID": "2445",
//                 "VALUE": "Красноперекопск"
//             },
//             {
//                 "ID": "2447",
//                 "VALUE": "Краснотурьинск"
//             },
//             {
//                 "ID": "2449",
//                 "VALUE": "Красноуральск"
//             },
//             {
//                 "ID": "2451",
//                 "VALUE": "Красноуфимск"
//             },
//             {
//                 "ID": "2453",
//                 "VALUE": "Красноярск"
//             },
//             {
//                 "ID": "2455",
//                 "VALUE": "Красный Лиман"
//             },
//             {
//                 "ID": "2457",
//                 "VALUE": "Красный Луч"
//             },
//             {
//                 "ID": "2459",
//                 "VALUE": "Красный Сулин"
//             },
//             {
//                 "ID": "2461",
//                 "VALUE": "Красный Яр"
//             },
//             {
//                 "ID": "2463",
//                 "VALUE": "Кременец"
//             },
//             {
//                 "ID": "2465",
//                 "VALUE": "Кременная"
//             },
//             {
//                 "ID": "2467",
//                 "VALUE": "Кременчуг"
//             },
//             {
//                 "ID": "2469",
//                 "VALUE": "Кривой Рог"
//             },
//             {
//                 "ID": "2471",
//                 "VALUE": "Кролевец"
//             },
//             {
//                 "ID": "2473",
//                 "VALUE": "Крымск"
//             },
//             {
//                 "ID": "2475",
//                 "VALUE": "Кстово"
//             },
//             {
//                 "ID": "2477",
//                 "VALUE": "Куанда"
//             },
//             {
//                 "ID": "2479",
//                 "VALUE": "Кудымкар"
//             },
//             {
//                 "ID": "2481",
//                 "VALUE": "Кузнецк"
//             },
//             {
//                 "ID": "2483",
//                 "VALUE": "Кузнецовск"
//             },
//             {
//                 "ID": "2485",
//                 "VALUE": "Куйбышев"
//             },
//             {
//                 "ID": "2487",
//                 "VALUE": "Кулебаки"
//             },
//             {
//                 "ID": "2489",
//                 "VALUE": "Куликовка"
//             },
//             {
//                 "ID": "2491",
//                 "VALUE": "Кумертау"
//             },
//             {
//                 "ID": "2493",
//                 "VALUE": "Кунгур"
//             },
//             {
//                 "ID": "2495",
//                 "VALUE": "Купавна"
//             },
//             {
//                 "ID": "2497",
//                 "VALUE": "Купянск"
//             },
//             {
//                 "ID": "2499",
//                 "VALUE": "Курагино"
//             },
//             {
//                 "ID": "2501",
//                 "VALUE": "Курахово"
//             },
//             {
//                 "ID": "2503",
//                 "VALUE": "Курган"
//             },
//             {
//                 "ID": "2505",
//                 "VALUE": "Курганинск"
//             },
//             {
//                 "ID": "2507",
//                 "VALUE": "Курсавка"
//             },
//             {
//                 "ID": "2509",
//                 "VALUE": "Курск"
//             },
//             {
//                 "ID": "2511",
//                 "VALUE": "Курчатов"
//             },
//             {
//                 "ID": "2513",
//                 "VALUE": "Кушва"
//             },
//             {
//                 "ID": "2515",
//                 "VALUE": "Кызыл"
//             },
//             {
//                 "ID": "2517",
//                 "VALUE": "Кыштым"
//             },
//             {
//                 "ID": "2519",
//                 "VALUE": "Лабытнанги"
//             },
//             {
//                 "ID": "2521",
//                 "VALUE": "Ладыжин"
//             },
//             {
//                 "ID": "2523",
//                 "VALUE": "Лангепас"
//             },
//             {
//                 "ID": "2525",
//                 "VALUE": "Лебедин"
//             },
//             {
//                 "ID": "2527",
//                 "VALUE": "Лебедянь"
//             },
//             {
//                 "ID": "2529",
//                 "VALUE": "Левокумское"
//             },
//             {
//                 "ID": "2531",
//                 "VALUE": "Лениногорск"
//             },
//             {
//                 "ID": "2533",
//                 "VALUE": "Ленинск"
//             },
//             {
//                 "ID": "2535",
//                 "VALUE": "Ленинск-Кузнецкий"
//             },
//             {
//                 "ID": "2537",
//                 "VALUE": "Ленск"
//             },
//             {
//                 "ID": "2539",
//                 "VALUE": "Лермонтов"
//             },
//             {
//                 "ID": "2541",
//                 "VALUE": "Лесной"
//             },
//             {
//                 "ID": "2543",
//                 "VALUE": "Лесозаводск"
//             },
//             {
//                 "ID": "2545",
//                 "VALUE": "Лесосибирск"
//             },
//             {
//                 "ID": "2547",
//                 "VALUE": "Летичев"
//             },
//             {
//                 "ID": "2549",
//                 "VALUE": "Летняя Ставка"
//             },
//             {
//                 "ID": "2551",
//                 "VALUE": "Лиманское"
//             },
//             {
//                 "ID": "2553",
//                 "VALUE": "Линево"
//             },
//             {
//                 "ID": "2555",
//                 "VALUE": "Липецк"
//             },
//             {
//                 "ID": "2557",
//                 "VALUE": "Лисичанск"
//             },
//             {
//                 "ID": "2559",
//                 "VALUE": "Лиски"
//             },
//             {
//                 "ID": "2561",
//                 "VALUE": "Лобня"
//             },
//             {
//                 "ID": "2563",
//                 "VALUE": "Лозовая"
//             },
//             {
//                 "ID": "2565",
//                 "VALUE": "Лосино-Петровский"
//             },
//             {
//                 "ID": "2567",
//                 "VALUE": "Лубны"
//             },
//             {
//                 "ID": "2569",
//                 "VALUE": "Луга"
//             },
//             {
//                 "ID": "2571",
//                 "VALUE": "Луганск"
//             },
//             {
//                 "ID": "2573",
//                 "VALUE": "Лугины"
//             },
//             {
//                 "ID": "2575",
//                 "VALUE": "Лутугино"
//             },
//             {
//                 "ID": "2577",
//                 "VALUE": "Луховицы"
//             },
//             {
//                 "ID": "2579",
//                 "VALUE": "Луцк"
//             },
//             {
//                 "ID": "2581",
//                 "VALUE": "Лучегорск"
//             },
//             {
//                 "ID": "2583",
//                 "VALUE": "Лысково"
//             },
//             {
//                 "ID": "2585",
//                 "VALUE": "Лысьва"
//             },
//             {
//                 "ID": "2587",
//                 "VALUE": "Лыткарино"
//             },
//             {
//                 "ID": "2589",
//                 "VALUE": "Львов"
//             },
//             {
//                 "ID": "2591",
//                 "VALUE": "Люберцы"
//             },
//             {
//                 "ID": "2593",
//                 "VALUE": "Магадан"
//             },
//             {
//                 "ID": "2595",
//                 "VALUE": "Магнитогорск"
//             },
//             {
//                 "ID": "2597",
//                 "VALUE": "Майкоп"
//             },
//             {
//                 "ID": "2599",
//                 "VALUE": "Макаров"
//             },
//             {
//                 "ID": "2601",
//                 "VALUE": "Макеевка"
//             },
//             {
//                 "ID": "2603",
//                 "VALUE": "Малаховка"
//             },
//             {
//                 "ID": "2605",
//                 "VALUE": "Малин"
//             },
//             {
//                 "ID": "2607",
//                 "VALUE": "Малоярославец"
//             },
//             {
//                 "ID": "2609",
//                 "VALUE": "Мамаевцы"
//             },
//             {
//                 "ID": "2611",
//                 "VALUE": "Марганец"
//             },
//             {
//                 "ID": "2613",
//                 "VALUE": "Мариинск"
//             },
//             {
//                 "ID": "2615",
//                 "VALUE": "Мариуполь"
//             },
//             {
//                 "ID": "2617",
//                 "VALUE": "Марковка"
//             },
//             {
//                 "ID": "2619",
//                 "VALUE": "Маркс"
//             },
//             {
//                 "ID": "2621",
//                 "VALUE": "Матвеев Курган"
//             },
//             {
//                 "ID": "2623",
//                 "VALUE": "Махачкала"
//             },
//             {
//                 "ID": "2625",
//                 "VALUE": "Мегион"
//             },
//             {
//                 "ID": "2627",
//                 "VALUE": "Медвежьегорск"
//             },
//             {
//                 "ID": "2629",
//                 "VALUE": "Медногорск"
//             },
//             {
//                 "ID": "2631",
//                 "VALUE": "Междуреченск"
//             },
//             {
//                 "ID": "2633",
//                 "VALUE": "Мелитополь"
//             },
//             {
//                 "ID": "2635",
//                 "VALUE": "Менделеево"
//             },
//             {
//                 "ID": "2637",
//                 "VALUE": "Менделеевск"
//             },
//             {
//                 "ID": "2639",
//                 "VALUE": "Мерефа"
//             },
//             {
//                 "ID": "2641",
//                 "VALUE": "Миасс"
//             },
//             {
//                 "ID": "2643",
//                 "VALUE": "Микунь"
//             },
//             {
//                 "ID": "2645",
//                 "VALUE": "Миллерово"
//             },
//             {
//                 "ID": "2647",
//                 "VALUE": "Минеральные Воды"
//             },
//             {
//                 "ID": "2649",
//                 "VALUE": "Минусинск"
//             },
//             {
//                 "ID": "2651",
//                 "VALUE": "Миргород"
//             },
//             {
//                 "ID": "2653",
//                 "VALUE": "Мирный"
//             },
//             {
//                 "ID": "2655",
//                 "VALUE": "Михайловка"
//             },
//             {
//                 "ID": "2657",
//                 "VALUE": "Михнево"
//             },
//             {
//                 "ID": "2659",
//                 "VALUE": "Мичуринск"
//             },
//             {
//                 "ID": "2661",
//                 "VALUE": "Могилёв-Подольский"
//             },
//             {
//                 "ID": "2663",
//                 "VALUE": "Могоча"
//             },
//             {
//                 "ID": "2665",
//                 "VALUE": "Можайск"
//             },
//             {
//                 "ID": "2667",
//                 "VALUE": "Можга"
//             },
//             {
//                 "ID": "2669",
//                 "VALUE": "Молодогвардейск"
//             },
//             {
//                 "ID": "2671",
//                 "VALUE": "Монастыриска"
//             },
//             {
//                 "ID": "2673",
//                 "VALUE": "Мончегорск"
//             },
//             {
//                 "ID": "2675",
//                 "VALUE": "Морозовск"
//             },
//             {
//                 "ID": "2677",
//                 "VALUE": "Мостиска"
//             },
//             {
//                 "ID": "2679",
//                 "VALUE": "Мукачево"
//             },
//             {
//                 "ID": "2681",
//                 "VALUE": "Муравленко"
//             },
//             {
//                 "ID": "2683",
//                 "VALUE": "Мурманск"
//             },
//             {
//                 "ID": "2685",
//                 "VALUE": "Муром"
//             },
//             {
//                 "ID": "2687",
//                 "VALUE": "Мытищи"
//             },
//             {
//                 "ID": "2689",
//                 "VALUE": "Мышкин"
//             },
//             {
//                 "ID": "2691",
//                 "VALUE": "Набережные Челны"
//             },
//             {
//                 "ID": "2693",
//                 "VALUE": "Навашино"
//             },
//             {
//                 "ID": "2695",
//                 "VALUE": "Навля"
//             },
//             {
//                 "ID": "2697",
//                 "VALUE": "Надым"
//             },
//             {
//                 "ID": "2699",
//                 "VALUE": "Назарово"
//             },
//             {
//                 "ID": "2701",
//                 "VALUE": "Назрань"
//             },
//             {
//                 "ID": "2703",
//                 "VALUE": "Нальчик"
//             },
//             {
//                 "ID": "2705",
//                 "VALUE": "Наро-Фоминск"
//             },
//             {
//                 "ID": "2707",
//                 "VALUE": "Нарьян-Мар"
//             },
//             {
//                 "ID": "2709",
//                 "VALUE": "Научный"
//             },
//             {
//                 "ID": "2711",
//                 "VALUE": "Нахабино"
//             },
//             {
//                 "ID": "2713",
//                 "VALUE": "Находка"
//             },
//             {
//                 "ID": "2715",
//                 "VALUE": "Невинномысск"
//             },
//             {
//                 "ID": "2717",
//                 "VALUE": "Невьянск"
//             },
//             {
//                 "ID": "2719",
//                 "VALUE": "Недригайлов"
//             },
//             {
//                 "ID": "2721",
//                 "VALUE": "Нежин"
//             },
//             {
//                 "ID": "2723",
//                 "VALUE": "Нерехта"
//             },
//             {
//                 "ID": "2725",
//                 "VALUE": "Нерюнгри"
//             },
//             {
//                 "ID": "2727",
//                 "VALUE": "Нетишин"
//             },
//             {
//                 "ID": "2729",
//                 "VALUE": "Нефтегорск"
//             },
//             {
//                 "ID": "2731",
//                 "VALUE": "Нефтекамск"
//             },
//             {
//                 "ID": "2733",
//                 "VALUE": "Нефтекумск"
//             },
//             {
//                 "ID": "2735",
//                 "VALUE": "Нефтеюганск"
//             },
//             {
//                 "ID": "2737",
//                 "VALUE": "Нехаевский"
//             },
//             {
//                 "ID": "2739",
//                 "VALUE": "Нижневартовск"
//             },
//             {
//                 "ID": "2741",
//                 "VALUE": "Нижнегорский"
//             },
//             {
//                 "ID": "2743",
//                 "VALUE": "Нижнекамск"
//             },
//             {
//                 "ID": "2745",
//                 "VALUE": "Нижнеудинск"
//             },
//             {
//                 "ID": "2747",
//                 "VALUE": "Нижние Серги"
//             },
//             {
//                 "ID": "2749",
//                 "VALUE": "Нижний Архыз"
//             },
//             {
//                 "ID": "2751",
//                 "VALUE": "Нижний Тагил"
//             },
//             {
//                 "ID": "2753",
//                 "VALUE": "Нижняя Салда"
//             },
//             {
//                 "ID": "2755",
//                 "VALUE": "Нижняя Тура"
//             },
//             {
//                 "ID": "2757",
//                 "VALUE": "Николаев"
//             },
//             {
//                 "ID": "2759",
//                 "VALUE": "Николаевск"
//             },
//             {
//                 "ID": "2761",
//                 "VALUE": "Николаевск-на-Амуре"
//             },
//             {
//                 "ID": "2763",
//                 "VALUE": "Никополь"
//             },
//             {
//                 "ID": "2765",
//                 "VALUE": "Новая Каховка"
//             },
//             {
//                 "ID": "2767",
//                 "VALUE": "Новая Усмань"
//             },
//             {
//                 "ID": "2769",
//                 "VALUE": "Новоалександровск"
//             },
//             {
//                 "ID": "2771",
//                 "VALUE": "Новоаннинский"
//             },
//             {
//                 "ID": "2773",
//                 "VALUE": "Новоархангельск"
//             },
//             {
//                 "ID": "2775",
//                 "VALUE": "Нововолынск"
//             },
//             {
//                 "ID": "2777",
//                 "VALUE": "Нововоронеж"
//             },
//             {
//                 "ID": "2779",
//                 "VALUE": "Новоград-Волынский"
//             },
//             {
//                 "ID": "2781",
//                 "VALUE": "Новогродовка"
//             },
//             {
//                 "ID": "2783",
//                 "VALUE": "Новодвинск"
//             },
//             {
//                 "ID": "2785",
//                 "VALUE": "Новоднестровск"
//             },
//             {
//                 "ID": "2787",
//                 "VALUE": "Новодружеск"
//             },
//             {
//                 "ID": "2789",
//                 "VALUE": "Новокубанск"
//             },
//             {
//                 "ID": "2791",
//                 "VALUE": "Новокузнецк"
//             },
//             {
//                 "ID": "2793",
//                 "VALUE": "Новокуйбышевск"
//             },
//             {
//                 "ID": "2795",
//                 "VALUE": "Новомичуринск"
//             },
//             {
//                 "ID": "2797",
//                 "VALUE": "Новомосковск"
//             },
//             {
//                 "ID": "2799",
//                 "VALUE": "Новониколаевский"
//             },
//             {
//                 "ID": "2801",
//                 "VALUE": "Новопавловск"
//             },
//             {
//                 "ID": "2803",
//                 "VALUE": "Новороссийск"
//             },
//             {
//                 "ID": "2805",
//                 "VALUE": "Новосибирск"
//             },
//             {
//                 "ID": "2807",
//                 "VALUE": "Новотроицк"
//             },
//             {
//                 "ID": "2809",
//                 "VALUE": "Новотроицкое"
//             },
//             {
//                 "ID": "2811",
//                 "VALUE": "Новоуральск"
//             },
//             {
//                 "ID": "2813",
//                 "VALUE": "Новочебоксарск"
//             },
//             {
//                 "ID": "2815",
//                 "VALUE": "Новочеркасск"
//             },
//             {
//                 "ID": "2817",
//                 "VALUE": "Новошахтинск"
//             },
//             {
//                 "ID": "2819",
//                 "VALUE": "Новошахтинский"
//             },
//             {
//                 "ID": "2821",
//                 "VALUE": "Новый Буг"
//             },
//             {
//                 "ID": "2823",
//                 "VALUE": "Новый Оскол"
//             },
//             {
//                 "ID": "2825",
//                 "VALUE": "Новый Раздол"
//             },
//             {
//                 "ID": "2827",
//                 "VALUE": "Новый Рогачик"
//             },
//             {
//                 "ID": "2829",
//                 "VALUE": "Новый Ургал"
//             },
//             {
//                 "ID": "2831",
//                 "VALUE": "Новый Уренгой"
//             },
//             {
//                 "ID": "2833",
//                 "VALUE": "Ногинск"
//             },
//             {
//                 "ID": "2835",
//                 "VALUE": "Норильск"
//             },
//             {
//                 "ID": "2837",
//                 "VALUE": "Носовка"
//             },
//             {
//                 "ID": "2839",
//                 "VALUE": "Ноябрьск"
//             },
//             {
//                 "ID": "2841",
//                 "VALUE": "Нытва"
//             },
//             {
//                 "ID": "2843",
//                 "VALUE": "Обнинск"
//             },
//             {
//                 "ID": "2845",
//                 "VALUE": "Обухов"
//             },
//             {
//                 "ID": "2847",
//                 "VALUE": "Обь"
//             },
//             {
//                 "ID": "2849",
//                 "VALUE": "Овидиополь"
//             },
//             {
//                 "ID": "2851",
//                 "VALUE": "Овлаши"
//             },
//             {
//                 "ID": "2853",
//                 "VALUE": "Овруч"
//             },
//             {
//                 "ID": "2855",
//                 "VALUE": "Одесса"
//             },
//             {
//                 "ID": "2857",
//                 "VALUE": "Одинцово"
//             },
//             {
//                 "ID": "2859",
//                 "VALUE": "Озерск"
//             },
//             {
//                 "ID": "2861",
//                 "VALUE": "Октябрьский"
//             },
//             {
//                 "ID": "2863",
//                 "VALUE": "Олевск"
//             },
//             {
//                 "ID": "2865",
//                 "VALUE": "Оленегорск"
//             },
//             {
//                 "ID": "2867",
//                 "VALUE": "Ольга"
//             },
//             {
//                 "ID": "2869",
//                 "VALUE": "Ольховатка"
//             },
//             {
//                 "ID": "2871",
//                 "VALUE": "Омск"
//             },
//             {
//                 "ID": "2873",
//                 "VALUE": "Оноковцы"
//             },
//             {
//                 "ID": "2875",
//                 "VALUE": "Орда"
//             },
//             {
//                 "ID": "2877",
//                 "VALUE": "Орджоникидзе"
//             },
//             {
//                 "ID": "2879",
//                 "VALUE": "Орел"
//             },
//             {
//                 "ID": "2881",
//                 "VALUE": "Оренбург"
//             },
//             {
//                 "ID": "2883",
//                 "VALUE": "Орехово-Зуево"
//             },
//             {
//                 "ID": "2885",
//                 "VALUE": "Орлов"
//             },
//             {
//                 "ID": "2887",
//                 "VALUE": "Орловский"
//             },
//             {
//                 "ID": "2889",
//                 "VALUE": "Орск"
//             },
//             {
//                 "ID": "2891",
//                 "VALUE": "Оса"
//             },
//             {
//                 "ID": "2893",
//                 "VALUE": "Отрадное"
//             },
//             {
//                 "ID": "2895",
//                 "VALUE": "Очер"
//             },
//             {
//                 "ID": "2897",
//                 "VALUE": "п. Лесной Городок"
//             },
//             {
//                 "ID": "2899",
//                 "VALUE": "Павлово"
//             },
//             {
//                 "ID": "2901",
//                 "VALUE": "Павловский Посад"
//             },
//             {
//                 "ID": "2903",
//                 "VALUE": "Павлоград"
//             },
//             {
//                 "ID": "2905",
//                 "VALUE": "Палласовка"
//             },
//             {
//                 "ID": "2907",
//                 "VALUE": "Панино"
//             },
//             {
//                 "ID": "2909",
//                 "VALUE": "Пенза"
//             },
//             {
//                 "ID": "2911",
//                 "VALUE": "Первомайск"
//             },
//             {
//                 "ID": "2913",
//                 "VALUE": "Первомайский"
//             },
//             {
//                 "ID": "2915",
//                 "VALUE": "Первоуральск"
//             },
//             {
//                 "ID": "2917",
//                 "VALUE": "Переславль-Залесский"
//             },
//             {
//                 "ID": "2919",
//                 "VALUE": "Перечин"
//             },
//             {
//                 "ID": "2921",
//                 "VALUE": "Переяслав-Хмельницкий"
//             },
//             {
//                 "ID": "2923",
//                 "VALUE": "Пермь"
//             },
//             {
//                 "ID": "2925",
//                 "VALUE": "Песочин"
//             },
//             {
//                 "ID": "2927",
//                 "VALUE": "Песьянка"
//             },
//             {
//                 "ID": "2929",
//                 "VALUE": "Петровское"
//             },
//             {
//                 "ID": "2931",
//                 "VALUE": "Петрозаводск"
//             },
//             {
//                 "ID": "2933",
//                 "VALUE": "Петропавловск-Камчатский"
//             },
//             {
//                 "ID": "2935",
//                 "VALUE": "Печора"
//             },
//             {
//                 "ID": "2937",
//                 "VALUE": "Пикалево"
//             },
//             {
//                 "ID": "2939",
//                 "VALUE": "Пирятин"
//             },
//             {
//                 "ID": "2941",
//                 "VALUE": "Питкяранта"
//             },
//             {
//                 "ID": "2943",
//                 "VALUE": "Погребище"
//             },
//             {
//                 "ID": "2945",
//                 "VALUE": "Подольск"
//             },
//             {
//                 "ID": "2947",
//                 "VALUE": "Покров"
//             },
//             {
//                 "ID": "2949",
//                 "VALUE": "Покровка"
//             },
//             {
//                 "ID": "2951",
//                 "VALUE": "Покровское"
//             },
//             {
//                 "ID": "2953",
//                 "VALUE": "Полевской"
//             },
//             {
//                 "ID": "2955",
//                 "VALUE": "Полонное"
//             },
//             {
//                 "ID": "2957",
//                 "VALUE": "Полтава"
//             },
//             {
//                 "ID": "2959",
//                 "VALUE": "Помошная"
//             },
//             {
//                 "ID": "2961",
//                 "VALUE": "Попельня"
//             },
//             {
//                 "ID": "2963",
//                 "VALUE": "Поронайск"
//             },
//             {
//                 "ID": "2965",
//                 "VALUE": "пос. Вешки"
//             },
//             {
//                 "ID": "2967",
//                 "VALUE": "пос. Лесной"
//             },
//             {
//                 "ID": "2969",
//                 "VALUE": "Похвистнево"
//             },
//             {
//                 "ID": "2971",
//                 "VALUE": "Прилуки"
//             },
//             {
//                 "ID": "2973",
//                 "VALUE": "Приморск"
//             },
//             {
//                 "ID": "2975",
//                 "VALUE": "Приморско-Ахтарск"
//             },
//             {
//                 "ID": "2977",
//                 "VALUE": "Прокопьевск"
//             },
//             {
//                 "ID": "2979",
//                 "VALUE": "Протвино"
//             },
//             {
//                 "ID": "2981",
//                 "VALUE": "Прохоровка"
//             },
//             {
//                 "ID": "2983",
//                 "VALUE": "Псков"
//             },
//             {
//                 "ID": "2985",
//                 "VALUE": "Пулково"
//             },
//             {
//                 "ID": "2987",
//                 "VALUE": "Пустомыты"
//             },
//             {
//                 "ID": "2989",
//                 "VALUE": "Путилково"
//             },
//             {
//                 "ID": "2991",
//                 "VALUE": "Пушкино"
//             },
//             {
//                 "ID": "2993",
//                 "VALUE": "Пущино"
//             },
//             {
//                 "ID": "2995",
//                 "VALUE": "Пыть-ях"
//             },
//             {
//                 "ID": "2997",
//                 "VALUE": "Пятигорск"
//             },
//             {
//                 "ID": "2999",
//                 "VALUE": "Радомышль"
//             },
//             {
//                 "ID": "3001",
//                 "VALUE": "Радужный"
//             },
//             {
//                 "ID": "3003",
//                 "VALUE": "Раздельная"
//             },
//             {
//                 "ID": "3005",
//                 "VALUE": "Раменское"
//             },
//             {
//                 "ID": "3007",
//                 "VALUE": "Рахов"
//             },
//             {
//                 "ID": "3009",
//                 "VALUE": "Ревда"
//             },
//             {
//                 "ID": "3011",
//                 "VALUE": "Ремонтное"
//             },
//             {
//                 "ID": "3013",
//                 "VALUE": "Репки"
//             },
//             {
//                 "ID": "3015",
//                 "VALUE": "Репьевка"
//             },
//             {
//                 "ID": "3017",
//                 "VALUE": "Реутов"
//             },
//             {
//                 "ID": "3019",
//                 "VALUE": "Ржакса"
//             },
//             {
//                 "ID": "3021",
//                 "VALUE": "Ровеньки"
//             },
//             {
//                 "ID": "3023",
//                 "VALUE": "Ровно"
//             },
//             {
//                 "ID": "3025",
//                 "VALUE": "Рогатин"
//             },
//             {
//                 "ID": "3027",
//                 "VALUE": "Родионово-Несветайская"
//             },
//             {
//                 "ID": "3029",
//                 "VALUE": "Рожище"
//             },
//             {
//                 "ID": "3031",
//                 "VALUE": "Рокитное"
//             },
//             {
//                 "ID": "3033",
//                 "VALUE": "Романовская"
//             },
//             {
//                 "ID": "3035",
//                 "VALUE": "Ромны"
//             },
//             {
//                 "ID": "3037",
//                 "VALUE": "Рославль"
//             },
//             {
//                 "ID": "3039",
//                 "VALUE": "Россошь"
//             },
//             {
//                 "ID": "3041",
//                 "VALUE": "Ростов"
//             },
//             {
//                 "ID": "3043",
//                 "VALUE": "Ростов-на-Дону"
//             },
//             {
//                 "ID": "3045",
//                 "VALUE": "Рубежное"
//             },
//             {
//                 "ID": "3047",
//                 "VALUE": "Рубцовск"
//             },
//             {
//                 "ID": "3049",
//                 "VALUE": "Рудня"
//             },
//             {
//                 "ID": "3051",
//                 "VALUE": "Руза"
//             },
//             {
//                 "ID": "3053",
//                 "VALUE": "Рузаевка"
//             },
//             {
//                 "ID": "3055",
//                 "VALUE": "Румянцево"
//             },
//             {
//                 "ID": "3057",
//                 "VALUE": "Рыбинск"
//             },
//             {
//                 "ID": "3059",
//                 "VALUE": "Ряжск"
//             },
//             {
//                 "ID": "3061",
//                 "VALUE": "Рязань"
//             },
//             {
//                 "ID": "3063",
//                 "VALUE": "Саки"
//             },
//             {
//                 "ID": "3065",
//                 "VALUE": "Салават"
//             },
//             {
//                 "ID": "3067",
//                 "VALUE": "Салехард"
//             },
//             {
//                 "ID": "3069",
//                 "VALUE": "Салым"
//             },
//             {
//                 "ID": "3071",
//                 "VALUE": "Сальск"
//             },
//             {
//                 "ID": "3073",
//                 "VALUE": "Самара"
//             },
//             {
//                 "ID": "3075",
//                 "VALUE": "Саракташ"
//             },
//             {
//                 "ID": "3077",
//                 "VALUE": "Саранск"
//             },
//             {
//                 "ID": "3079",
//                 "VALUE": "Сарапул"
//             },
//             {
//                 "ID": "3081",
//                 "VALUE": "Саратов"
//             },
//             {
//                 "ID": "3083",
//                 "VALUE": "Сарны"
//             },
//             {
//                 "ID": "3085",
//                 "VALUE": "Саров"
//             },
//             {
//                 "ID": "3087",
//                 "VALUE": "Сатка"
//             },
//             {
//                 "ID": "3089",
//                 "VALUE": "Сафоново"
//             },
//             {
//                 "ID": "3091",
//                 "VALUE": "Саяногорск"
//             },
//             {
//                 "ID": "3093",
//                 "VALUE": "Свалява"
//             },
//             {
//                 "ID": "3095",
//                 "VALUE": "Сватово"
//             },
//             {
//                 "ID": "3097",
//                 "VALUE": "Свердловск"
//             },
//             {
//                 "ID": "3099",
//                 "VALUE": "Свесса"
//             },
//             {
//                 "ID": "3101",
//                 "VALUE": "Светловодск"
//             },
//             {
//                 "ID": "3103",
//                 "VALUE": "Светлогорск"
//             },
//             {
//                 "ID": "3105",
//                 "VALUE": "Светлоград"
//             },
//             {
//                 "ID": "3107",
//                 "VALUE": "Светлый"
//             },
//             {
//                 "ID": "3109",
//                 "VALUE": "Светлый Яр"
//             },
//             {
//                 "ID": "3111",
//                 "VALUE": "Свободный"
//             },
//             {
//                 "ID": "3113",
//                 "VALUE": "Севастополь"
//             },
//             {
//                 "ID": "3115",
//                 "VALUE": "Северобайкальск"
//             },
//             {
//                 "ID": "3117",
//                 "VALUE": "Северодвинск"
//             },
//             {
//                 "ID": "3119",
//                 "VALUE": "Северодонецк"
//             },
//             {
//                 "ID": "3121",
//                 "VALUE": "Северск"
//             },
//             {
//                 "ID": "3123",
//                 "VALUE": "Сегежа"
//             },
//             {
//                 "ID": "3125",
//                 "VALUE": "Селидово"
//             },
//             {
//                 "ID": "3127",
//                 "VALUE": "Селятино"
//             },
//             {
//                 "ID": "3129",
//                 "VALUE": "Семенов"
//             },
//             {
//                 "ID": "3131",
//                 "VALUE": "Семикаракорск"
//             },
//             {
//                 "ID": "3133",
//                 "VALUE": "Сергач"
//             },
//             {
//                 "ID": "3135",
//                 "VALUE": "Сергиев Посад"
//             },
//             {
//                 "ID": "3137",
//                 "VALUE": "Серебряные Пруды"
//             },
//             {
//                 "ID": "3139",
//                 "VALUE": "Серов"
//             },
//             {
//                 "ID": "3141",
//                 "VALUE": "Серпухов"
//             },
//             {
//                 "ID": "3143",
//                 "VALUE": "Сертолово"
//             },
//             {
//                 "ID": "3145",
//                 "VALUE": "Сестрорецк"
//             },
//             {
//                 "ID": "3147",
//                 "VALUE": "Сибай"
//             },
//             {
//                 "ID": "3149",
//                 "VALUE": "Симферополь"
//             },
//             {
//                 "ID": "3151",
//                 "VALUE": "Синельниково"
//             },
//             {
//                 "ID": "3153",
//                 "VALUE": "Скадовск"
//             },
//             {
//                 "ID": "3155",
//                 "VALUE": "Сковородино"
//             },
//             {
//                 "ID": "3157",
//                 "VALUE": "Славута"
//             },
//             {
//                 "ID": "3159",
//                 "VALUE": "Славутич"
//             },
//             {
//                 "ID": "3161",
//                 "VALUE": "Славянка"
//             },
//             {
//                 "ID": "3163",
//                 "VALUE": "Славянск"
//             },
//             {
//                 "ID": "3165",
//                 "VALUE": "Славянск-на-Кубани"
//             },
//             {
//                 "ID": "3167",
//                 "VALUE": "Смела"
//             },
//             {
//                 "ID": "3169",
//                 "VALUE": "Смоленск"
//             },
//             {
//                 "ID": "3171",
//                 "VALUE": "Снежинск"
//             },
//             {
//                 "ID": "3173",
//                 "VALUE": "Снежное"
//             },
//             {
//                 "ID": "3175",
//                 "VALUE": "Снятын"
//             },
//             {
//                 "ID": "3177",
//                 "VALUE": "Собинка"
//             },
//             {
//                 "ID": "3179",
//                 "VALUE": "Советск"
//             },
//             {
//                 "ID": "3181",
//                 "VALUE": "Советская Гавань"
//             },
//             {
//                 "ID": "3183",
//                 "VALUE": "Советский"
//             },
//             {
//                 "ID": "3185",
//                 "VALUE": "Совхоз имени Ленина"
//             },
//             {
//                 "ID": "3187",
//                 "VALUE": "Сокаль"
//             },
//             {
//                 "ID": "3189",
//                 "VALUE": "Сокиряны"
//             },
//             {
//                 "ID": "3191",
//                 "VALUE": "Соликамск"
//             },
//             {
//                 "ID": "3193",
//                 "VALUE": "Солнечная Долина"
//             },
//             {
//                 "ID": "3195",
//                 "VALUE": "Солнечногорск"
//             },
//             {
//                 "ID": "3197",
//                 "VALUE": "Солоницевка"
//             },
//             {
//                 "ID": "3199",
//                 "VALUE": "Сортавала"
//             },
//             {
//                 "ID": "3201",
//                 "VALUE": "Сосновоборск"
//             },
//             {
//                 "ID": "3203",
//                 "VALUE": "Сосновый Бор"
//             },
//             {
//                 "ID": "3205",
//                 "VALUE": "Сочи"
//             },
//             {
//                 "ID": "3207",
//                 "VALUE": "Спасск-Дальний"
//             },
//             {
//                 "ID": "3209",
//                 "VALUE": "Средняя Ахтуба"
//             },
//             {
//                 "ID": "3211",
//                 "VALUE": "Ставрополь"
//             },
//             {
//                 "ID": "3213",
//                 "VALUE": "Старая Выжевка"
//             },
//             {
//                 "ID": "3215",
//                 "VALUE": "Старая Купавна"
//             },
//             {
//                 "ID": "3217",
//                 "VALUE": "Старая Полтавка"
//             },
//             {
//                 "ID": "3219",
//                 "VALUE": "Старая Русса"
//             },
//             {
//                 "ID": "3221",
//                 "VALUE": "Старая Чара"
//             },
//             {
//                 "ID": "3223",
//                 "VALUE": "Старобельск"
//             },
//             {
//                 "ID": "3225",
//                 "VALUE": "Староконстантинов"
//             },
//             {
//                 "ID": "3227",
//                 "VALUE": "Старый Оскол"
//             },
//             {
//                 "ID": "3229",
//                 "VALUE": "Стаханов"
//             },
//             {
//                 "ID": "3231",
//                 "VALUE": "Степное"
//             },
//             {
//                 "ID": "3233",
//                 "VALUE": "Стерлитамак"
//             },
//             {
//                 "ID": "3235",
//                 "VALUE": "Сторожинец"
//             },
//             {
//                 "ID": "3237",
//                 "VALUE": "Стрежевой"
//             },
//             {
//                 "ID": "3239",
//                 "VALUE": "Стрый"
//             },
//             {
//                 "ID": "3241",
//                 "VALUE": "Ступино"
//             },
//             {
//                 "ID": "3243",
//                 "VALUE": "Суворов"
//             },
//             {
//                 "ID": "3245",
//                 "VALUE": "Судак"
//             },
//             {
//                 "ID": "3247",
//                 "VALUE": "Сумы"
//             },
//             {
//                 "ID": "3249",
//                 "VALUE": "Сургут"
//             },
//             {
//                 "ID": "3251",
//                 "VALUE": "Сухой Лог"
//             },
//             {
//                 "ID": "3253",
//                 "VALUE": "Сходня"
//             },
//             {
//                 "ID": "3255",
//                 "VALUE": "Сызрань"
//             },
//             {
//                 "ID": "3257",
//                 "VALUE": "Сыктывкар"
//             },
//             {
//                 "ID": "3259",
//                 "VALUE": "Сысерть"
//             },
//             {
//                 "ID": "3261",
//                 "VALUE": "Таврийск"
//             },
//             {
//                 "ID": "3263",
//                 "VALUE": "Таганрог"
//             },
//             {
//                 "ID": "3265",
//                 "VALUE": "Тайга"
//             },
//             {
//                 "ID": "3267",
//                 "VALUE": "Тайшет"
//             },
//             {
//                 "ID": "3269",
//                 "VALUE": "Таксимо"
//             },
//             {
//                 "ID": "3271",
//                 "VALUE": "Тамбов"
//             },
//             {
//                 "ID": "3273",
//                 "VALUE": "Тарасовский"
//             },
//             {
//                 "ID": "3275",
//                 "VALUE": "Тарко-сале"
//             },
//             {
//                 "ID": "3277",
//                 "VALUE": "Татищево"
//             },
//             {
//                 "ID": "3279",
//                 "VALUE": "Таштагол"
//             },
//             {
//                 "ID": "3281",
//                 "VALUE": "Тверь"
//             },
//             {
//                 "ID": "3283",
//                 "VALUE": "Тейково"
//             },
//             {
//                 "ID": "3285",
//                 "VALUE": "Темрюк"
//             },
//             {
//                 "ID": "3287",
//                 "VALUE": "Теофиполь"
//             },
//             {
//                 "ID": "3289",
//                 "VALUE": "Теплодар"
//             },
//             {
//                 "ID": "3291",
//                 "VALUE": "Терней"
//             },
//             {
//                 "ID": "3293",
//                 "VALUE": "Терновка"
//             },
//             {
//                 "ID": "3295",
//                 "VALUE": "Тернополь"
//             },
//             {
//                 "ID": "3297",
//                 "VALUE": "Тимашевск"
//             },
//             {
//                 "ID": "3299",
//                 "VALUE": "Тихвин"
//             },
//             {
//                 "ID": "3301",
//                 "VALUE": "Тихорецк"
//             },
//             {
//                 "ID": "3303",
//                 "VALUE": "Тлумач"
//             },
//             {
//                 "ID": "3305",
//                 "VALUE": "Тобольск"
//             },
//             {
//                 "ID": "3307",
//                 "VALUE": "Токмак"
//             },
//             {
//                 "ID": "3309",
//                 "VALUE": "Тольятти"
//             },
//             {
//                 "ID": "3311",
//                 "VALUE": "Томилино"
//             },
//             {
//                 "ID": "3313",
//                 "VALUE": "Томск"
//             },
//             {
//                 "ID": "3315",
//                 "VALUE": "Топки"
//             },
//             {
//                 "ID": "3317",
//                 "VALUE": "Торез"
//             },
//             {
//                 "ID": "3319",
//                 "VALUE": "Тосно"
//             },
//             {
//                 "ID": "3321",
//                 "VALUE": "Трехгорный"
//             },
//             {
//                 "ID": "3323",
//                 "VALUE": "Троицк"
//             },
//             {
//                 "ID": "3325",
//                 "VALUE": "Трудовое"
//             },
//             {
//                 "ID": "3327",
//                 "VALUE": "Трускавец"
//             },
//             {
//                 "ID": "3329",
//                 "VALUE": "Туапсе"
//             },
//             {
//                 "ID": "3331",
//                 "VALUE": "Туймазы"
//             },
//             {
//                 "ID": "3333",
//                 "VALUE": "Тула"
//             },
//             {
//                 "ID": "3335",
//                 "VALUE": "Тутаев"
//             },
//             {
//                 "ID": "3337",
//                 "VALUE": "Тымовское"
//             },
//             {
//                 "ID": "3339",
//                 "VALUE": "Тында"
//             },
//             {
//                 "ID": "3341",
//                 "VALUE": "Тюмень"
//             },
//             {
//                 "ID": "3343",
//                 "VALUE": "Тячев"
//             },
//             {
//                 "ID": "3345",
//                 "VALUE": "Увельский"
//             },
//             {
//                 "ID": "3347",
//                 "VALUE": "Угледар"
//             },
//             {
//                 "ID": "3349",
//                 "VALUE": "Углич"
//             },
//             {
//                 "ID": "3351",
//                 "VALUE": "Удомля"
//             },
//             {
//                 "ID": "3353",
//                 "VALUE": "Ужгород"
//             },
//             {
//                 "ID": "3355",
//                 "VALUE": "Узин"
//             },
//             {
//                 "ID": "3357",
//                 "VALUE": "Украинка"
//             },
//             {
//                 "ID": "3359",
//                 "VALUE": "Укромное"
//             },
//             {
//                 "ID": "3361",
//                 "VALUE": "Улан-Удэ"
//             },
//             {
//                 "ID": "3363",
//                 "VALUE": "Ульяновск"
//             },
//             {
//                 "ID": "3365",
//                 "VALUE": "Умань"
//             },
//             {
//                 "ID": "3367",
//                 "VALUE": "Унеча"
//             },
//             {
//                 "ID": "3369",
//                 "VALUE": "Урай"
//             },
//             {
//                 "ID": "3371",
//                 "VALUE": "Урень"
//             },
//             {
//                 "ID": "3373",
//                 "VALUE": "Урюпинск"
//             },
//             {
//                 "ID": "3375",
//                 "VALUE": "Усинск"
//             },
//             {
//                 "ID": "3377",
//                 "VALUE": "Уссурийск"
//             },
//             {
//                 "ID": "3379",
//                 "VALUE": "Усть-Илимск"
//             },
//             {
//                 "ID": "3381",
//                 "VALUE": "Усть-Катав"
//             },
//             {
//                 "ID": "3383",
//                 "VALUE": "Усть-Кинельский"
//             },
//             {
//                 "ID": "3385",
//                 "VALUE": "Усть-Кут"
//             },
//             {
//                 "ID": "3387",
//                 "VALUE": "Уфа"
//             },
//             {
//                 "ID": "3389",
//                 "VALUE": "Ухта"
//             },
//             {
//                 "ID": "3391",
//                 "VALUE": "Учалы"
//             },
//             {
//                 "ID": "3393",
//                 "VALUE": "Фастов"
//             },
//             {
//                 "ID": "3395",
//                 "VALUE": "Феодосия"
//             },
//             {
//                 "ID": "3397",
//                 "VALUE": "Фокино"
//             },
//             {
//                 "ID": "3399",
//                 "VALUE": "Фролово"
//             },
//             {
//                 "ID": "3401",
//                 "VALUE": "Фрязево"
//             },
//             {
//                 "ID": "3403",
//                 "VALUE": "Фрязино"
//             },
//             {
//                 "ID": "3405",
//                 "VALUE": "Хабаровск"
//             },
//             {
//                 "ID": "3407",
//                 "VALUE": "Ханты-Мансийск"
//             },
//             {
//                 "ID": "3409",
//                 "VALUE": "Харцызск"
//             },
//             {
//                 "ID": "3411",
//                 "VALUE": "Харьков"
//             },
//             {
//                 "ID": "3413",
//                 "VALUE": "Хасавюрт"
//             },
//             {
//                 "ID": "3415",
//                 "VALUE": "Херсон"
//             },
//             {
//                 "ID": "3417",
//                 "VALUE": "Хилок"
//             },
//             {
//                 "ID": "3419",
//                 "VALUE": "Химки"
//             },
//             {
//                 "ID": "3421",
//                 "VALUE": "Хмельник"
//             },
//             {
//                 "ID": "3423",
//                 "VALUE": "Хмельницкий"
//             },
//             {
//                 "ID": "3425",
//                 "VALUE": "Холмск"
//             },
//             {
//                 "ID": "3427",
//                 "VALUE": "Хороль"
//             },
//             {
//                 "ID": "3429",
//                 "VALUE": "Хуст"
//             },
//             {
//                 "ID": "3431",
//                 "VALUE": "Целина"
//             },
//             {
//                 "ID": "3433",
//                 "VALUE": "Цимлянск"
//             },
//             {
//                 "ID": "3435",
//                 "VALUE": "Цюрупинск"
//             },
//             {
//                 "ID": "3437",
//                 "VALUE": "Чайковский"
//             },
//             {
//                 "ID": "3439",
//                 "VALUE": "Чалтырь"
//             },
//             {
//                 "ID": "3441",
//                 "VALUE": "Чамзинка"
//             },
//             {
//                 "ID": "3443",
//                 "VALUE": "Чапаевск"
//             },
//             {
//                 "ID": "3445",
//                 "VALUE": "Чебаркуль"
//             },
//             {
//                 "ID": "3447",
//                 "VALUE": "Чебоксары"
//             },
//             {
//                 "ID": "3449",
//                 "VALUE": "Чегдомын"
//             },
//             {
//                 "ID": "3451",
//                 "VALUE": "Челябинск"
//             },
//             {
//                 "ID": "3453",
//                 "VALUE": "Червоноград"
//             },
//             {
//                 "ID": "3455",
//                 "VALUE": "Череповец"
//             },
//             {
//                 "ID": "3457",
//                 "VALUE": "Черкассы"
//             },
//             {
//                 "ID": "3459",
//                 "VALUE": "Черкесск"
//             },
//             {
//                 "ID": "3461",
//                 "VALUE": "Черневцы"
//             },
//             {
//                 "ID": "3463",
//                 "VALUE": "Чернигов"
//             },
//             {
//                 "ID": "3465",
//                 "VALUE": "Черниговка"
//             },
//             {
//                 "ID": "3467",
//                 "VALUE": "Чернобай"
//             },
//             {
//                 "ID": "3469",
//                 "VALUE": "Чернобыль"
//             },
//             {
//                 "ID": "3471",
//                 "VALUE": "Черновцы"
//             },
//             {
//                 "ID": "3473",
//                 "VALUE": "Черноголовка"
//             },
//             {
//                 "ID": "3475",
//                 "VALUE": "Черногорск"
//             },
//             {
//                 "ID": "3477",
//                 "VALUE": "Чернушка"
//             },
//             {
//                 "ID": "3479",
//                 "VALUE": "Чернышевск"
//             },
//             {
//                 "ID": "3481",
//                 "VALUE": "Черняховск"
//             },
//             {
//                 "ID": "3483",
//                 "VALUE": "Чертково"
//             },
//             {
//                 "ID": "3485",
//                 "VALUE": "Чехов"
//             },
//             {
//                 "ID": "3487",
//                 "VALUE": "Чита"
//             },
//             {
//                 "ID": "3489",
//                 "VALUE": "Чортков"
//             },
//             {
//                 "ID": "3491",
//                 "VALUE": "Чугуев"
//             },
//             {
//                 "ID": "3493",
//                 "VALUE": "Чудово"
//             },
//             {
//                 "ID": "3495",
//                 "VALUE": "Чусовой"
//             },
//             {
//                 "ID": "3497",
//                 "VALUE": "Шадринск"
//             },
//             {
//                 "ID": "3499",
//                 "VALUE": "Шаргород"
//             },
//             {
//                 "ID": "3501",
//                 "VALUE": "Шарыпово"
//             },
//             {
//                 "ID": "3503",
//                 "VALUE": "Шарья"
//             },
//             {
//                 "ID": "3505",
//                 "VALUE": "Шатура"
//             },
//             {
//                 "ID": "3507",
//                 "VALUE": "Шахтёрск"
//             },
//             {
//                 "ID": "3509",
//                 "VALUE": "Шахты"
//             },
//             {
//                 "ID": "3511",
//                 "VALUE": "Шахунья"
//             },
//             {
//                 "ID": "3513",
//                 "VALUE": "Шацк"
//             },
//             {
//                 "ID": "3515",
//                 "VALUE": "Шебекино"
//             },
//             {
//                 "ID": "3517",
//                 "VALUE": "Шелехов"
//             },
//             {
//                 "ID": "3519",
//                 "VALUE": "Шепетовка"
//             },
//             {
//                 "ID": "3521",
//                 "VALUE": "Шерегеш"
//             },
//             {
//                 "ID": "3523",
//                 "VALUE": "Шилка"
//             },
//             {
//                 "ID": "3525",
//                 "VALUE": "Шимановск"
//             },
//             {
//                 "ID": "3527",
//                 "VALUE": "Шостка"
//             },
//             {
//                 "ID": "3529",
//                 "VALUE": "Шумерля"
//             },
//             {
//                 "ID": "3531",
//                 "VALUE": "Шумиха"
//             },
//             {
//                 "ID": "3533",
//                 "VALUE": "Щёлкино"
//             },
//             {
//                 "ID": "3535",
//                 "VALUE": "Щелково"
//             },
//             {
//                 "ID": "3537",
//                 "VALUE": "Щербинка"
//             },
//             {
//                 "ID": "3539",
//                 "VALUE": "Щорс"
//             },
//             {
//                 "ID": "3541",
//                 "VALUE": "Электрогорск"
//             },
//             {
//                 "ID": "3543",
//                 "VALUE": "Электросталь"
//             },
//             {
//                 "ID": "3545",
//                 "VALUE": "Электроугли"
//             },
//             {
//                 "ID": "3547",
//                 "VALUE": "Элиста"
//             },
//             {
//                 "ID": "3549",
//                 "VALUE": "Энгельс"
//             },
//             {
//                 "ID": "3551",
//                 "VALUE": "Энергодар"
//             },
//             {
//                 "ID": "3553",
//                 "VALUE": "Юбилейный"
//             },
//             {
//                 "ID": "3555",
//                 "VALUE": "Югорск"
//             },
//             {
//                 "ID": "3557",
//                 "VALUE": "Южно-Сахалинск"
//             },
//             {
//                 "ID": "3559",
//                 "VALUE": "Южное"
//             },
//             {
//                 "ID": "3561",
//                 "VALUE": "Южноукраинск"
//             },
//             {
//                 "ID": "3563",
//                 "VALUE": "Южноуральск"
//             },
//             {
//                 "ID": "3565",
//                 "VALUE": "Юрга"
//             },
//             {
//                 "ID": "3567",
//                 "VALUE": "Юрюзань"
//             },
//             {
//                 "ID": "3569",
//                 "VALUE": "Яворов"
//             },
//             {
//                 "ID": "3571",
//                 "VALUE": "Яготин"
//             },
//             {
//                 "ID": "3573",
//                 "VALUE": "Ядрин"
//             },
//             {
//                 "ID": "3575",
//                 "VALUE": "Яковлевка"
//             },
//             {
//                 "ID": "3577",
//                 "VALUE": "Якутск"
//             },
//             {
//                 "ID": "3579",
//                 "VALUE": "Ялта"
//             },
//             {
//                 "ID": "3581",
//                 "VALUE": "Янаул"
//             },
//             {
//                 "ID": "3583",
//                 "VALUE": "Яранск"
//             },
//             {
//                 "ID": "3585",
//                 "VALUE": "Яремче"
//             },
//             {
//                 "ID": "3587",
//                 "VALUE": "Ярославль"
//             },
//             {
//                 "ID": "3589",
//                 "VALUE": "Ярцево"
//             },
//             {
//                 "ID": "3591",
//                 "VALUE": "Ясиноватая"
//             },
//             {
//                 "ID": "3593",
//                 "VALUE": "Ясный"
//             },
//             {
//                 "ID": "3595",
//                 "VALUE": "Яхрома"
//             },
//             {
//                 "ID": "3597",
//                 "VALUE": "Шушары"
//             },
//             {
//                 "ID": "3599",
//                 "VALUE": "Всходы"
//             },
//             {
//                 "ID": "3601",
//                 "VALUE": "Кропоткин"
//             },
//             {
//                 "ID": "3603",
//                 "VALUE": "Северный (Глазово)"
//             },
//             {
//                 "ID": "3605",
//                 "VALUE": "Зеленодольск"
//             },
//             {
//                 "ID": "3607",
//                 "VALUE": "Колпино"
//             },
//             {
//                 "ID": "5675",
//                 "VALUE": "Санкт-Петербург"
//             },
//             {
//                 "ID": "7807",
//                 "VALUE": "Московская  область (МО)"
//             },
//             {
//                 "ID": "7809",
//                 "VALUE": "Другое"
//             }
//         ],
//         "title": "UF_CRM_1619430052812",
//         "listLabel": "В каком городе монтаж",
//         "formLabel": "В каком городе монтаж",
//         "filterLabel": "В каком городе монтаж",
//         "settings": {
//             "DISPLAY": "UI",
//             "LIST_HEIGHT": 1,
//             "CAPTION_NO_VALUE": "",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1619430831": {
//         "type": "employee",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1619430831",
//         "listLabel": "Ответственный за монтаж",
//         "formLabel": "Ответственный за монтаж",
//         "filterLabel": "Ответственный за монтаж",
//         "settings": []
//     },
//     "UF_CRM_1619441621": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "87",
//                 "VALUE": "Предоплата"
//             },
//             {
//                 "ID": "89",
//                 "VALUE": "Постоплата (по факту)"
//             },
//             {
//                 "ID": "91",
//                 "VALUE": "Постоплата (до 30 дней)"
//             },
//             {
//                 "ID": "93",
//                 "VALUE": "Постоплата (до 60 дней)"
//             }
//         ],
//         "title": "UF_CRM_1619441621",
//         "listLabel": "Способ оплаты",
//         "formLabel": "Способ оплаты",
//         "filterLabel": "Способ оплаты",
//         "settings": {
//             "DISPLAY": "UI",
//             "LIST_HEIGHT": 4,
//             "CAPTION_NO_VALUE": "",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1619441905773": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "99",
//                 "VALUE": "Да"
//             },
//             {
//                 "ID": "101",
//                 "VALUE": "Нет"
//             }
//         ],
//         "title": "UF_CRM_1619441905773",
//         "listLabel": "Требуется Замер",
//         "formLabel": "Требуется Замер",
//         "filterLabel": "Требуется Замер",
//         "settings": {
//             "DISPLAY": "UI",
//             "LIST_HEIGHT": 3,
//             "CAPTION_NO_VALUE": "",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1619548732": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1619548732",
//         "listLabel": "Примечания к монтажу",
//         "formLabel": "Примечания к монтажу",
//         "filterLabel": "Примечания к монтажу",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 10,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": "Дата монтажа по согласованию. "
//         }
//     },
//     "UF_CRM_1619555073745": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1619555073745",
//         "listLabel": "ТЗ Дизайнеру",
//         "formLabel": "ТЗ Дизайнеру",
//         "filterLabel": "ТЗ Дизайнеру",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 10,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1619700503": {
//         "type": "employee",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1619700503",
//         "listLabel": "Ответственный за Дизайн",
//         "formLabel": "Ответственный за Дизайн",
//         "filterLabel": "Ответственный за Дизайн",
//         "settings": []
//     },
//     "UF_CRM_1619731331": {
//         "type": "money",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1619731331",
//         "listLabel": "Стоимость производства",
//         "formLabel": "Стоимость производства",
//         "filterLabel": "Стоимость производства",
//         "settings": {
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1619731365": {
//         "type": "money",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1619731365",
//         "listLabel": "Стоимость монтажа",
//         "formLabel": "Стоимость монтажа",
//         "filterLabel": "Стоимость монтажа",
//         "settings": {
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1619732625": {
//         "type": "date",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1619732625",
//         "listLabel": "Крайний срок Замера",
//         "formLabel": "Крайний срок Замера",
//         "filterLabel": "Крайний срок Замера",
//         "settings": {
//             "DEFAULT_VALUE": {
//                 "TYPE": "NONE",
//                 "VALUE": ""
//             }
//         }
//     },
//     "UF_CRM_1620918041": {
//         "type": "url",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1620918041",
//         "listLabel": "Ссылка  рабочую таблицу / тендер / CRM Клиента",
//         "formLabel": "Ссылка  рабочую таблицу / тендер / CRM Клиента",
//         "filterLabel": "Ссылка  рабочую таблицу / тендер / CRM Клиента",
//         "settings": {
//             "POPUP": "Y",
//             "SIZE": 20,
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1620982092433": {
//         "type": "file",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1620982092433",
//         "listLabel": "Файлы Клиента и ФП",
//         "formLabel": "Файлы Клиента и ФП",
//         "filterLabel": "Файлы Клиента и ФП",
//         "settings": {
//             "SIZE": 20,
//             "LIST_WIDTH": 0,
//             "LIST_HEIGHT": 0,
//             "MAX_SHOW_SIZE": 0,
//             "MAX_ALLOWED_SIZE": 0,
//             "EXTENSIONS": [],
//             "TARGET_BLANK": "Y"
//         }
//     },
//     "UF_CRM_1621607276561": {
//         "type": "file",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1621607276561",
//         "listLabel": "Файлы для изготовления",
//         "formLabel": "Файлы для изготовления",
//         "filterLabel": "Файлы для изготовления",
//         "settings": {
//             "SIZE": 20,
//             "LIST_WIDTH": 0,
//             "LIST_HEIGHT": 0,
//             "MAX_SHOW_SIZE": 0,
//             "MAX_ALLOWED_SIZE": 0,
//             "EXTENSIONS": [],
//             "TARGET_BLANK": "Y"
//         }
//     },
//     "UF_CRM_1621943311": {
//         "type": "crm",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1621943311",
//         "listLabel": "Контакт для Замера",
//         "formLabel": "Контакт для Замера",
//         "filterLabel": "Контакт для Замера",
//         "settings": {
//             "CONTACT": "Y"
//         }
//     },
//     "UF_CRM_1621956854": {
//         "type": "file",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1621956854",
//         "listLabel": "Файлы для Замера",
//         "formLabel": "Файлы для Замера",
//         "filterLabel": "Файлы для Замера",
//         "settings": {
//             "SIZE": 20,
//             "LIST_WIDTH": 0,
//             "LIST_HEIGHT": 0,
//             "MAX_SHOW_SIZE": 0,
//             "MAX_ALLOWED_SIZE": 0,
//             "EXTENSIONS": [],
//             "TARGET_BLANK": "Y"
//         }
//     },
//     "UF_CRM_1625591127": {
//         "type": "money",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1625591127",
//         "listLabel": "Стоимость работ Дизайнера:",
//         "formLabel": "Стоимость работ Дизайнера:",
//         "filterLabel": "Стоимость работ Дизайнера:",
//         "settings": {
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1625591420": {
//         "type": "url",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1625591420",
//         "listLabel": "Ссылка на исходники Клиента",
//         "formLabel": "Ссылка на исходники Клиента",
//         "filterLabel": "Ссылка на исходники Клиента",
//         "settings": {
//             "POPUP": "Y",
//             "SIZE": 20,
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1625666854": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "221",
//                 "VALUE": "Производство не требуется!"
//             },
//             {
//                 "ID": "395",
//                 "VALUE": "orajet 3620"
//             },
//             {
//                 "ID": "209",
//                 "VALUE": "orajet 3640"
//             },
//             {
//                 "ID": "211",
//                 "VALUE": "orajet 3551"
//             },
//             {
//                 "ID": "213",
//                 "VALUE": "oracal 641M"
//             },
//             {
//                 "ID": "241",
//                 "VALUE": "oracal 641G"
//             },
//             {
//                 "ID": "1453",
//                 "VALUE": "oracal 551G"
//             },
//             {
//                 "ID": "1455",
//                 "VALUE": "oracal 551M"
//             },
//             {
//                 "ID": "1471",
//                 "VALUE": "oracal 751"
//             },
//             {
//                 "ID": "1461",
//                 "VALUE": "oralite 5200 - 010 (светоотражающая)"
//             },
//             {
//                 "ID": "1475",
//                 "VALUE": "Резка"
//             },
//             {
//                 "ID": "1477",
//                 "VALUE": "Резка + Выборка"
//             },
//             {
//                 "ID": "243",
//                 "VALUE": "Резка,+ Выборка + Монтажка"
//             },
//             {
//                 "ID": "219",
//                 "VALUE": "Контурная резка"
//             },
//             {
//                 "ID": "1177",
//                 "VALUE": "Монтажка"
//             },
//             {
//                 "ID": "215",
//                 "VALUE": "Перф. пленка"
//             },
//             {
//                 "ID": "391",
//                 "VALUE": "УФ Печать"
//             },
//             {
//                 "ID": "217",
//                 "VALUE": "Перф. пленка + ламинация"
//             },
//             {
//                 "ID": "239",
//                 "VALUE": "Баннер 440"
//             },
//             {
//                 "ID": "483",
//                 "VALUE": "Баннер 510"
//             },
//             {
//                 "ID": "249",
//                 "VALUE": "ПВХ с печатью"
//             },
//             {
//                 "ID": "285",
//                 "VALUE": "ПВХ + плоттерка"
//             },
//             {
//                 "ID": "251",
//                 "VALUE": "ПВХ + пленка без ламинации"
//             },
//             {
//                 "ID": "253",
//                 "VALUE": "ПВХ + пленка с ламинацией"
//             },
//             {
//                 "ID": "281",
//                 "VALUE": "Печать на прозрачке"
//             },
//             {
//                 "ID": "283",
//                 "VALUE": "Фрост"
//             },
//             {
//                 "ID": "247",
//                 "VALUE": "Бумага"
//             },
//             {
//                 "ID": "1161",
//                 "VALUE": "Стикеры C лам"
//             },
//             {
//                 "ID": "1163",
//                 "VALUE": "Стикеры БЕЗ лам"
//             },
//             {
//                 "ID": "1165",
//                 "VALUE": "Таблички ПВХ"
//             },
//             {
//                 "ID": "1167",
//                 "VALUE": "Печать на Бэклите"
//             },
//             {
//                 "ID": "1487",
//                 "VALUE": "ламинация 3640 G-000"
//             },
//             {
//                 "ID": "1489",
//                 "VALUE": "ламинация 3640 M-000"
//             },
//             {
//                 "ID": "1491",
//                 "VALUE": "ламинация 215 M-000"
//             },
//             {
//                 "ID": "1493",
//                 "VALUE": "ламинация 215 G-000"
//             },
//             {
//                 "ID": "1495",
//                 "VALUE": "ламинация 215 SG-000 (сатин, полуглянец)"
//             },
//             {
//                 "ID": "509",
//                 "VALUE": "Другое (указать в комментариях)"
//             },
//             {
//                 "ID": "1507",
//                 "VALUE": "КИТАЙ белая M"
//             },
//             {
//                 "ID": "1509",
//                 "VALUE": "КИТАЙ белая G"
//             },
//             {
//                 "ID": "1511",
//                 "VALUE": "Ламинация КИТАЙ M"
//             },
//             {
//                 "ID": "1513",
//                 "VALUE": "Ламинация КИТАЙ G"
//             }
//         ],
//         "title": "UF_CRM_1625666854",
//         "listLabel": "Технология изготовления",
//         "formLabel": "Технология изготовления",
//         "filterLabel": "Технология изготовления",
//         "settings": {
//             "DISPLAY": "UI",
//             "LIST_HEIGHT": 10,
//             "CAPTION_NO_VALUE": "нет",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1625667202": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1625667202",
//         "listLabel": "Описание Заказа:",
//         "formLabel": "Описание Заказа:",
//         "filterLabel": "Описание Заказа:",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 15,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1627632581634": {
//         "type": "money",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1627632581634",
//         "listLabel": "Доход",
//         "formLabel": "Доход",
//         "filterLabel": "Доход",
//         "settings": {
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1627635410": {
//         "type": "double",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1627635410",
//         "listLabel": "Прибыль число",
//         "formLabel": "Прибыль число",
//         "filterLabel": "Прибыль число",
//         "settings": {
//             "PRECISION": 2,
//             "SIZE": 20,
//             "MIN_VALUE": 0,
//             "MAX_VALUE": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1627919233": {
//         "type": "money",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1627919233",
//         "listLabel": "Плановые / Доп. Расходы",
//         "formLabel": "Плановые / Доп. Расходы",
//         "filterLabel": "Плановые / Доп. Расходы",
//         "settings": {
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1628507821282": {
//         "type": "double",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1628507821282",
//         "listLabel": "Плановые / Доп. Расходы число",
//         "formLabel": "Плановые / Доп. Расходы число",
//         "filterLabel": "Плановые / Доп. Расходы число",
//         "settings": {
//             "PRECISION": 2,
//             "SIZE": 20,
//             "MIN_VALUE": 0,
//             "MAX_VALUE": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1633523035": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1633523035",
//         "listLabel": "№ Заказа",
//         "formLabel": "№ Заказа",
//         "filterLabel": "№ Заказа",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 1,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1635324485": {
//         "type": "address",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1635324485",
//         "listLabel": "Адрес Замера",
//         "formLabel": "Адрес Замера",
//         "filterLabel": "Адрес Замера",
//         "settings": {
//             "SHOW_MAP": "Y"
//         }
//     },
//     "UF_CRM_A_W_GROUP_ID": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_A_W_GROUP_ID",
//         "listLabel": "WhatsApp Group Id",
//         "formLabel": "WhatsApp Group Id",
//         "filterLabel": "UF_CRM_A_W_GROUP_ID",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 1,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_A_T_GROUP_ID": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_A_T_GROUP_ID",
//         "listLabel": "Telegram Group Id",
//         "formLabel": "Telegram Group Id",
//         "filterLabel": "UF_CRM_A_T_GROUP_ID",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 1,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1637326777": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "527",
//                 "VALUE": "ИП Куранов М.И."
//             },
//             {
//                 "ID": "529",
//                 "VALUE": "ООО \"Би Эм Джи\" (Москва)"
//             },
//             {
//                 "ID": "531",
//                 "VALUE": "ООО \"Марк Групп\""
//             },
//             {
//                 "ID": "539",
//                 "VALUE": "ООО \"Би Эм Джи\" (Нижний Новгород)"
//             },
//             {
//                 "ID": "699",
//                 "VALUE": "Robokassa"
//             },
//             {
//                 "ID": "701",
//                 "VALUE": "Касса Олеся Евстигнеева"
//             },
//             {
//                 "ID": "703",
//                 "VALUE": "Касса Олеся Кирсанова"
//             }
//         ],
//         "title": "UF_CRM_1637326777",
//         "listLabel": "Наши реквизиты",
//         "formLabel": "Наши реквизиты",
//         "filterLabel": "Наши реквизиты",
//         "settings": {
//             "DISPLAY": "UI",
//             "LIST_HEIGHT": 6,
//             "CAPTION_NO_VALUE": "",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1637533967": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1637533967",
//         "listLabel": "Чек-лист (гос.номер и кв.м.)",
//         "formLabel": "Чек-лист (гос.номер и кв.м.)",
//         "filterLabel": "Чек-лист (гос.номер и кв.м.)",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 1,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1637743561": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "543",
//                 "VALUE": "Договор не нужен"
//             },
//             {
//                 "ID": "545",
//                 "VALUE": "Договор с гарантийным сроком 1 год"
//             },
//             {
//                 "ID": "547",
//                 "VALUE": "Договор с гарантийным сроком 2 года"
//             }
//         ],
//         "title": "UF_CRM_1637743561",
//         "listLabel": "Договор и гарантийный срок",
//         "formLabel": "Договор и гарантийный срок",
//         "filterLabel": "Договор и гарантийный срок",
//         "settings": {
//             "DISPLAY": "UI",
//             "LIST_HEIGHT": 5,
//             "CAPTION_NO_VALUE": "",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1637745620": {
//         "type": "employee",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1637745620",
//         "listLabel": "Ответственный за Замер",
//         "formLabel": "Ответственный за Замер",
//         "filterLabel": "Ответственный за Замер",
//         "settings": []
//     },
//     "UF_CRM_1637861029": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "555",
//                 "VALUE": "Да"
//             },
//             {
//                 "ID": "557",
//                 "VALUE": "Нет"
//             }
//         ],
//         "title": "UF_CRM_1637861029",
//         "listLabel": "Монтаж в нерабочие часы и выходные дни утвержден и оплачен?",
//         "formLabel": "Монтаж в нерабочие часы и выходные дни утвержден и оплачен?",
//         "filterLabel": "Монтаж в нерабочие часы и выходные дни утвержден и оплачен?",
//         "settings": {
//             "DISPLAY": "UI",
//             "LIST_HEIGHT": 2,
//             "CAPTION_NO_VALUE": "",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1637861351": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "559",
//                 "VALUE": "Да"
//             },
//             {
//                 "ID": "561",
//                 "VALUE": "Нет"
//             }
//         ],
//         "title": "UF_CRM_1637861351",
//         "listLabel": "Парковка утверждена и оплачена?",
//         "formLabel": "Парковка утверждена и оплачена?",
//         "filterLabel": "Парковка утверждена и оплачена?",
//         "settings": {
//             "DISPLAY": "UI",
//             "LIST_HEIGHT": 1,
//             "CAPTION_NO_VALUE": "",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1638357118015": {
//         "type": "file",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1638357118015",
//         "listLabel": "Фотоотчет",
//         "formLabel": "Фотоотчет",
//         "filterLabel": "Фотоотчет",
//         "settings": {
//             "SIZE": 20,
//             "LIST_WIDTH": 0,
//             "LIST_HEIGHT": 0,
//             "MAX_SHOW_SIZE": 0,
//             "MAX_ALLOWED_SIZE": 0,
//             "EXTENSIONS": [],
//             "TARGET_BLANK": "Y"
//         }
//     },
//     "UF_CRM_1638799025": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1638799025",
//         "listLabel": "Тест монтажники",
//         "formLabel": "Тест монтажники",
//         "filterLabel": "Тест монтажники",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 1,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1638861343858": {
//         "type": "boolean",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1638861343858",
//         "listLabel": "Монтаж в разные дни",
//         "formLabel": "Монтаж в разные дни",
//         "filterLabel": "Монтаж в разные дни",
//         "settings": {
//             "DEFAULT_VALUE": 0,
//             "DISPLAY": "CHECKBOX",
//             "LABEL": [
//                 null,
//                 null
//             ],
//             "LABEL_CHECKBOX": {
//                 "ru": "Монтаж в разные дни",
//                 "br": "Монтаж в разные дни",
//                 "de": "Монтаж в разные дни",
//                 "en": "Монтаж в разные дни",
//                 "fr": "Монтаж в разные дни",
//                 "hi": "Монтаж в разные дни",
//                 "id": "Монтаж в разные дни",
//                 "in": "Монтаж в разные дни",
//                 "it": "Монтаж в разные дни",
//                 "ja": "Монтаж в разные дни",
//                 "la": "Монтаж в разные дни",
//                 "ms": "Монтаж в разные дни",
//                 "pl": "Монтаж в разные дни",
//                 "sc": "Монтаж в разные дни",
//                 "tc": "Монтаж в разные дни",
//                 "th": "Монтаж в разные дни",
//                 "tr": "Монтаж в разные дни",
//                 "ua": "Монтаж в разные дни",
//                 "vn": "Монтаж в разные дни"
//             }
//         }
//     },
//     "UF_CRM_1638883663896": {
//         "type": "address",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1638883663896",
//         "listLabel": "Тест адрес",
//         "formLabel": "Тест адрес",
//         "filterLabel": "Тест адрес",
//         "settings": {
//             "SHOW_MAP": "Y"
//         }
//     },
//     "UF_CRM_1640031623": {
//         "type": "employee",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1640031623",
//         "listLabel": "Кто изготавливает ЦП",
//         "formLabel": "Кто изготавливает ЦП",
//         "filterLabel": "Кто изготавливает ЦП",
//         "settings": []
//     },
//     "UF_CRM_1640031676": {
//         "type": "datetime",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1640031676",
//         "listLabel": "Крайний срок сдачи ЦП",
//         "formLabel": "Крайний срок сдачи ЦП",
//         "filterLabel": "Крайний срок сдачи ЦП",
//         "settings": {
//             "DEFAULT_VALUE": {
//                 "TYPE": "NONE",
//                 "VALUE": ""
//             },
//             "USE_SECOND": "Y",
//             "USE_TIMEZONE": "N"
//         }
//     },
//     "UF_CRM_1640168565": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "709",
//                 "VALUE": "Клиент"
//             },
//             {
//                 "ID": "711",
//                 "VALUE": "Поставщик"
//             }
//         ],
//         "title": "UF_CRM_1640168565",
//         "listLabel": "Тип компании",
//         "formLabel": "Тип компании",
//         "filterLabel": "Тип компании",
//         "settings": {
//             "DISPLAY": "UI",
//             "LIST_HEIGHT": 5,
//             "CAPTION_NO_VALUE": "",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1640199620": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "717",
//                 "VALUE": "Да"
//             },
//             {
//                 "ID": "719",
//                 "VALUE": "Нет"
//             }
//         ],
//         "title": "UF_CRM_1640199620",
//         "listLabel": "Печать согласно ЦП?",
//         "formLabel": "Печать согласно ЦП?",
//         "filterLabel": "Печать согласно ЦП?",
//         "settings": {
//             "DISPLAY": "UI",
//             "LIST_HEIGHT": 1,
//             "CAPTION_NO_VALUE": "Выберите значение",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1641921940": {
//         "type": "file",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1641921940",
//         "listLabel": "Файл для изготовления ЦП",
//         "formLabel": "Файл для изготовления ЦП",
//         "filterLabel": "Файл для изготовления ЦП",
//         "settings": {
//             "SIZE": 20,
//             "LIST_WIDTH": 0,
//             "LIST_HEIGHT": 0,
//             "MAX_SHOW_SIZE": 0,
//             "MAX_ALLOWED_SIZE": 0,
//             "EXTENSIONS": [],
//             "TARGET_BLANK": "Y"
//         }
//     },
//     "UF_CRM_1641922664": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1641922664",
//         "listLabel": "Требование к ЦП",
//         "formLabel": "Требование к ЦП",
//         "filterLabel": "Требование к ЦП",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 7,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": "Необходимо подобрать цвет по вееру. В коментах приложить фото или файл с настройками цвета в текстовом виде !"
//         }
//     },
//     "UF_CRM_1648214421632": {
//         "type": "file",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1648214421632",
//         "listLabel": "Счета по сделке",
//         "formLabel": "Счета по сделке",
//         "filterLabel": "Счета по сделке",
//         "settings": {
//             "SIZE": 20,
//             "LIST_WIDTH": 0,
//             "LIST_HEIGHT": 0,
//             "MAX_SHOW_SIZE": 0,
//             "MAX_ALLOWED_SIZE": 0,
//             "EXTENSIONS": [],
//             "TARGET_BLANK": "Y"
//         }
//     },
//     "UF_CRM_1648214438867": {
//         "type": "file",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1648214438867",
//         "listLabel": "Акты по сделке",
//         "formLabel": "Акты по сделке",
//         "filterLabel": "Акты по сделке",
//         "settings": {
//             "SIZE": 20,
//             "LIST_WIDTH": 0,
//             "LIST_HEIGHT": 0,
//             "MAX_SHOW_SIZE": 0,
//             "MAX_ALLOWED_SIZE": 0,
//             "EXTENSIONS": [],
//             "TARGET_BLANK": "Y"
//         }
//     },
//     "UF_CRM_1648543375": {
//         "type": "boolean",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1648543375",
//         "listLabel": "Запуск из БП?",
//         "formLabel": "Запуск из БП?",
//         "filterLabel": "Запуск из БП?",
//         "settings": {
//             "DEFAULT_VALUE": 0,
//             "DISPLAY": "CHECKBOX",
//             "LABEL": [
//                 null,
//                 null
//             ],
//             "LABEL_CHECKBOX": "Запуск из БП?"
//         }
//     },
//     "UF_CRM_1648543694": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "739",
//                 "VALUE": "ИП"
//             },
//             {
//                 "ID": "741",
//                 "VALUE": "ООО"
//             }
//         ],
//         "title": "UF_CRM_1648543694",
//         "listLabel": "Тип документа для формирования",
//         "formLabel": "Тип документа для формирования",
//         "filterLabel": "Тип документа для формирования",
//         "settings": {
//             "DISPLAY": "LIST",
//             "LIST_HEIGHT": 5,
//             "CAPTION_NO_VALUE": "",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1648890534": {
//         "type": "integer",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1648890534",
//         "listLabel": "Количество счетов",
//         "formLabel": "Количество счетов",
//         "filterLabel": "Количество счетов",
//         "settings": {
//             "SIZE": 20,
//             "MIN_VALUE": 0,
//             "MAX_VALUE": 0,
//             "DEFAULT_VALUE": 0
//         }
//     },
//     "UF_CRM_1648896346": {
//         "type": "integer",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1648896346",
//         "listLabel": "id сделки (тех)",
//         "formLabel": "id сделки (тех)",
//         "filterLabel": "id сделки (тех)",
//         "settings": {
//             "SIZE": 20,
//             "MIN_VALUE": 0,
//             "MAX_VALUE": 0,
//             "DEFAULT_VALUE": null
//         }
//     },
//     "UF_CRM_1649178642": {
//         "type": "datetime",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1649178642",
//         "listLabel": "Крайний срок Дизайн",
//         "formLabel": "Крайний срок Дизайн",
//         "filterLabel": "Крайний срок Дизайн",
//         "settings": {
//             "DEFAULT_VALUE": {
//                 "TYPE": "NONE",
//                 "VALUE": ""
//             },
//             "USE_SECOND": "Y",
//             "USE_TIMEZONE": "N"
//         }
//     },
//     "UF_CRM_1652452994190": {
//         "type": "double",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1652452994190",
//         "listLabel": "Площадь оклейки ",
//         "formLabel": "Площадь оклейки ",
//         "filterLabel": "Площадь оклейки ",
//         "settings": {
//             "PRECISION": 2,
//             "SIZE": 20,
//             "MIN_VALUE": 0,
//             "MAX_VALUE": 0,
//             "DEFAULT_VALUE": null
//         }
//     },
//     "UF_CRM_1652453123751": {
//         "type": "double",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1652453123751",
//         "listLabel": "Площадь демонтажа",
//         "formLabel": "Площадь демонтажа",
//         "filterLabel": "Площадь демонтажа",
//         "settings": {
//             "PRECISION": 2,
//             "SIZE": 20,
//             "MIN_VALUE": 0,
//             "MAX_VALUE": 0,
//             "DEFAULT_VALUE": null
//         }
//     },
//     "UF_CRM_1652776209": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "929",
//                 "VALUE": "Да"
//             },
//             {
//                 "ID": "1363",
//                 "VALUE": "Нет"
//             },
//             {
//                 "ID": "1365",
//                 "VALUE": "Частично"
//             }
//         ],
//         "title": "UF_CRM_1652776209",
//         "listLabel": "Счет оплачен полностью?",
//         "formLabel": "Счет оплачен полностью?",
//         "filterLabel": "Счет оплачен полностью?",
//         "settings": {
//             "DISPLAY": "UI",
//             "LIST_HEIGHT": 3,
//             "CAPTION_NO_VALUE": "",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1654540555": {
//         "type": "url",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1654540555",
//         "listLabel": "Ссылка на файл ЦП",
//         "formLabel": "Ссылка на файл ЦП",
//         "filterLabel": "Ссылка на файл ЦП",
//         "settings": {
//             "POPUP": "Y",
//             "SIZE": 20,
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": "нет"
//         }
//     },
//     "UF_CRM_1654542137357": {
//         "type": "rest_139_off_wa_field",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1654542137357",
//         "listLabel": "Написать в Whats App",
//         "formLabel": "Написать в Whats App",
//         "filterLabel": "Написать в Whats App",
//         "settings": []
//     },
//     "UF_CRM_1655918107": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1655918107",
//         "listLabel": "Описание Заказа (Что делаем, сколько, требования, особенности)",
//         "formLabel": "Описание Заказа (Что делаем, сколько, требования, особенности)",
//         "filterLabel": "Описание Заказа (Что делаем, сколько, требования, особенности)",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 9,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1657651541": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "7819",
//                 "VALUE": "простой"
//             },
//             {
//                 "ID": "7821",
//                 "VALUE": "сложный"
//             },
//             {
//                 "ID": "7823",
//                 "VALUE": "отмывка клея"
//             },
//             {
//                 "ID": "7825",
//                 "VALUE": "нет"
//             }
//         ],
//         "title": "UF_CRM_1657651541",
//         "listLabel": "Требуется демонтаж",
//         "formLabel": "Требуется демонтаж",
//         "filterLabel": "Требуется демонтаж",
//         "settings": {
//             "DISPLAY": "UI",
//             "LIST_HEIGHT": 1,
//             "CAPTION_NO_VALUE": "",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1658420239": {
//         "type": "datetime",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1658420239",
//         "listLabel": "Ориентировочная дата сдачи заказ",
//         "formLabel": "Ориентировочная дата сдачи заказ",
//         "filterLabel": "Ориентировочная дата сдачи заказ",
//         "settings": {
//             "DEFAULT_VALUE": {
//                 "TYPE": "NONE",
//                 "VALUE": ""
//             },
//             "USE_SECOND": "Y",
//             "USE_TIMEZONE": "N"
//         }
//     },
//     "UF_CRM_1665924957280": {
//         "type": "double",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1665924957280",
//         "listLabel": "Количество товарных позиций",
//         "formLabel": "Количество товарных позиций",
//         "filterLabel": "Количество товарных позиций",
//         "settings": {
//             "PRECISION": 2,
//             "SIZE": 20,
//             "MIN_VALUE": 0,
//             "MAX_VALUE": 0,
//             "DEFAULT_VALUE": null
//         }
//     },
//     "UF_CRM_1668129559": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "1355",
//                 "VALUE": "Да"
//             },
//             {
//                 "ID": "1357",
//                 "VALUE": "Нет"
//             }
//         ],
//         "title": "UF_CRM_1668129559",
//         "listLabel": "Командировка?",
//         "formLabel": "Командировка?",
//         "filterLabel": "Командировка?",
//         "settings": {
//             "DISPLAY": "UI",
//             "LIST_HEIGHT": 5,
//             "CAPTION_NO_VALUE": "",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1669716775": {
//         "type": "employee",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1669716775",
//         "listLabel": "Ответственный за задачи",
//         "formLabel": "Ответственный за задачи",
//         "filterLabel": "Ответственный за задачи",
//         "settings": []
//     },
//     "UF_CRM_1672744985962": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "1429",
//                 "VALUE": "1"
//             },
//             {
//                 "ID": "1465",
//                 "VALUE": "1,05"
//             },
//             {
//                 "ID": "1431",
//                 "VALUE": "1,2"
//             },
//             {
//                 "ID": "1469",
//                 "VALUE": "1,235"
//             },
//             {
//                 "ID": "1483",
//                 "VALUE": "1,3"
//             },
//             {
//                 "ID": "1433",
//                 "VALUE": "1,26"
//             },
//             {
//                 "ID": "1435",
//                 "VALUE": "1,37"
//             },
//             {
//                 "ID": "1467",
//                 "VALUE": "1,52"
//             },
//             {
//                 "ID": "1485",
//                 "VALUE": "1,6"
//             }
//         ],
//         "title": "UF_CRM_1672744985962",
//         "listLabel": "Ширина пленки",
//         "formLabel": "Ширина пленки",
//         "filterLabel": "Ширина пленки",
//         "settings": {
//             "DISPLAY": "DIALOG",
//             "LIST_HEIGHT": 1,
//             "CAPTION_NO_VALUE": "",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1672839295": {
//         "type": "employee",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1672839295",
//         "listLabel": "МОС",
//         "formLabel": "МОС",
//         "filterLabel": "МОС",
//         "settings": []
//     },
//     "UF_CRM_1674480485": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "1445",
//                 "VALUE": "Да"
//             },
//             {
//                 "ID": "1447",
//                 "VALUE": "Нет "
//             }
//         ],
//         "title": "UF_CRM_1674480485",
//         "listLabel": "Требуется доставка?",
//         "formLabel": "Требуется доставка?",
//         "filterLabel": "Требуется доставка?",
//         "settings": {
//             "DISPLAY": "DIALOG",
//             "LIST_HEIGHT": 5,
//             "CAPTION_NO_VALUE": "",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1680939096355": {
//         "type": "file",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1680939096355",
//         "listLabel": "Файлы рекламации",
//         "formLabel": "Файлы рекламации",
//         "filterLabel": "Файлы рекламации",
//         "settings": {
//             "SIZE": 20,
//             "LIST_WIDTH": 0,
//             "LIST_HEIGHT": 0,
//             "MAX_SHOW_SIZE": 0,
//             "MAX_ALLOWED_SIZE": 0,
//             "EXTENSIONS": [],
//             "TARGET_BLANK": "Y"
//         }
//     },
//     "UF_CRM_1680941225": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1680941225",
//         "listLabel": "Описание рекламации",
//         "formLabel": "Описание рекламации",
//         "filterLabel": "Описание рекламации",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 10,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1684305731": {
//         "type": "employee",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1684305731",
//         "listLabel": "Observers",
//         "formLabel": "Observers",
//         "filterLabel": "Observers",
//         "settings": []
//     },
//     "UF_CRM_1694710116": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "1523",
//                 "VALUE": "Да"
//             },
//             {
//                 "ID": "1525",
//                 "VALUE": "Нет"
//             }
//         ],
//         "title": "UF_CRM_1694710116",
//         "listLabel": "Аренда бокса",
//         "formLabel": "Аренда бокса",
//         "filterLabel": "Аренда бокса",
//         "settings": {
//             "DISPLAY": "UI",
//             "LIST_HEIGHT": 5,
//             "CAPTION_NO_VALUE": "",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1694710433": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1694710433",
//         "listLabel": "ID задачи \"Смета\"",
//         "formLabel": "ID задачи \"Смета\"",
//         "filterLabel": "ID задачи \"Смета\"",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 1,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1694710578": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "1529",
//                 "VALUE": "Наш бокс МСК"
//             },
//             {
//                 "ID": "1533",
//                 "VALUE": "Заказчика"
//             },
//             {
//                 "ID": "7817",
//                 "VALUE": "Аренда бокса МСК"
//             },
//             {
//                 "ID": "1531",
//                 "VALUE": "Аренда НН"
//             },
//             {
//                 "ID": "1537",
//                 "VALUE": "Аренда регионы"
//             },
//             {
//                 "ID": "1535",
//                 "VALUE": "Бокс подрядчика"
//             }
//         ],
//         "title": "UF_CRM_1694710578",
//         "listLabel": "Монтаж на территории",
//         "formLabel": "Монтаж на территории",
//         "filterLabel": "Монтаж на территории",
//         "settings": {
//             "DISPLAY": "UI",
//             "LIST_HEIGHT": 5,
//             "CAPTION_NO_VALUE": "",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1695664525": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "1539",
//                 "VALUE": "Наш"
//             },
//             {
//                 "ID": "1541",
//                 "VALUE": "Заказчика"
//             }
//         ],
//         "title": "UF_CRM_1695664525",
//         "listLabel": "Замер",
//         "formLabel": "Замер",
//         "filterLabel": "Замер",
//         "settings": {
//             "DISPLAY": "UI",
//             "LIST_HEIGHT": 5,
//             "CAPTION_NO_VALUE": "",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1695665700": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": true,
//         "isDynamic": true,
//         "title": "UF_CRM_1695665700",
//         "listLabel": "Какой транспорт и в каком кол-ве",
//         "formLabel": "Какой транспорт и в каком кол-ве",
//         "filterLabel": "Какой транспорт и в каком кол-ве",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 4,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1695666248": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "5677",
//                 "VALUE": "Да"
//             },
//             {
//                 "ID": "5679",
//                 "VALUE": "Нет"
//             },
//             {
//                 "ID": "5681",
//                 "VALUE": "Требуется доработка / Адаптация"
//             }
//         ],
//         "title": "UF_CRM_1695666248",
//         "listLabel": "Есть ли макет?",
//         "formLabel": "Есть ли макет?",
//         "filterLabel": "Есть ли макет?",
//         "settings": {
//             "DISPLAY": "DIALOG",
//             "LIST_HEIGHT": 5,
//             "CAPTION_NO_VALUE": "",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1695666343": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "5683",
//                 "VALUE": "У нас"
//             },
//             {
//                 "ID": "5685",
//                 "VALUE": "У Заказчика"
//             },
//             {
//                 "ID": "5687",
//                 "VALUE": "Требуется Аренда"
//             }
//         ],
//         "title": "UF_CRM_1695666343",
//         "listLabel": "На какой территории монтаж",
//         "formLabel": "На какой территории монтаж",
//         "filterLabel": "На какой территории монтаж",
//         "settings": {
//             "DISPLAY": "DIALOG",
//             "LIST_HEIGHT": 5,
//             "CAPTION_NO_VALUE": "",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1695666652": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1695666652",
//         "listLabel": "Есть ли предпочтение по пленке",
//         "formLabel": "Есть ли предпочтение по пленке",
//         "filterLabel": "Есть ли предпочтение по пленке",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 1,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1695667069": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1695667069",
//         "listLabel": "В какие сроки нужна оклейка?",
//         "formLabel": "В какие сроки нужна оклейка?",
//         "filterLabel": "В какие сроки нужна оклейка?",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 1,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1695667144": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "5689",
//                 "VALUE": "с НДС"
//             },
//             {
//                 "ID": "5691",
//                 "VALUE": "без НДС"
//             },
//             {
//                 "ID": "5693",
//                 "VALUE": "без разницы"
//             },
//             {
//                 "ID": "5695",
//                 "VALUE": "не знает"
//             }
//         ],
//         "title": "UF_CRM_1695667144",
//         "listLabel": "Есть требования к счету?",
//         "formLabel": "Есть требования к счету?",
//         "filterLabel": "Есть требования к счету?",
//         "settings": {
//             "DISPLAY": "DIALOG",
//             "LIST_HEIGHT": 5,
//             "CAPTION_NO_VALUE": "",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1699249912042": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1699249912042",
//         "listLabel": "Переменная 2",
//         "formLabel": "Переменная 2",
//         "filterLabel": "Переменная 2",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 1,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": null
//         }
//     },
//     "UF_CRM_YOOOGI_WIDGET_MINI": {
//         "type": "rest_233_yooogi_widget_mini",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_YOOOGI_WIDGET_MINI",
//         "listLabel": "СДЭК+",
//         "formLabel": "СДЭК+",
//         "filterLabel": "UF_CRM_YOOOGI_WIDGET_MINI",
//         "settings": []
//     },
//     "UF_CRM_1635272559": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "751",
//                 "VALUE": "Используем макеты Заказчика без проверки"
//             },
//             {
//                 "ID": "415",
//                 "VALUE": "Требуется проверка макетов"
//             },
//             {
//                 "ID": "417",
//                 "VALUE": "Требуется Верстка"
//             },
//             {
//                 "ID": "419",
//                 "VALUE": "Требуется ПП (ПреПресс)"
//             },
//             {
//                 "ID": "421",
//                 "VALUE": "Требуется разработка макета"
//             }
//         ],
//         "title": "UF_CRM_1635272559",
//         "listLabel": "Что предоставил Заказчик",
//         "formLabel": "Что предоставил Заказчик",
//         "filterLabel": "Что предоставил Заказчик",
//         "settings": {
//             "DISPLAY": "DIALOG",
//             "LIST_HEIGHT": 3,
//             "CAPTION_NO_VALUE": "",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1637231117": {
//         "type": "crm_status",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "statusType": "DEAL_STAGE",
//         "title": "UF_CRM_1637231117",
//         "listLabel": "Фиксация стадии",
//         "formLabel": "Фиксация стадии",
//         "filterLabel": "Фиксация стадии",
//         "settings": {
//             "ENTITY_TYPE": "DEAL_STAGE"
//         }
//     },
//     "UF_CRM_1637286517": {
//         "type": "enumeration",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "items": [
//             {
//                 "ID": "515",
//                 "VALUE": "Некачественный лид"
//             },
//             {
//                 "ID": "517",
//                 "VALUE": "Нашел другого подрядчика"
//             },
//             {
//                 "ID": "519",
//                 "VALUE": "Перенос срока заказа"
//             }
//         ],
//         "title": "UF_CRM_1637286517",
//         "listLabel": "Причина провала",
//         "formLabel": "Причина провала",
//         "filterLabel": "Причина провала",
//         "settings": {
//             "DISPLAY": "LIST",
//             "LIST_HEIGHT": 5,
//             "CAPTION_NO_VALUE": "",
//             "SHOW_NO_VALUE": "Y"
//         }
//     },
//     "UF_CRM_1687857777": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1687857777",
//         "listLabel": "Что делаем по заказу в целом (для ЗАКАЗ)",
//         "formLabel": "Что делаем по заказу в целом (для ЗАКАЗ)",
//         "filterLabel": "Что делаем по заказу в целом (для ЗАКАЗ)",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 1,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_DATE": {
//         "type": "datetime",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_DATE",
//         "listLabel": "Дата монтажа",
//         "formLabel": "Дата монтажа",
//         "filterLabel": "Дата монтажа",
//         "settings": {
//             "DEFAULT_VALUE": {
//                 "TYPE": "NONE",
//                 "VALUE": ""
//             },
//             "USE_SECOND": "Y",
//             "USE_TIMEZONE": "N"
//         }
//     },
//     "UF_CRM_VAR": {
//         "type": "double",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_VAR",
//         "listLabel": "Переменная",
//         "formLabel": "Переменная",
//         "filterLabel": "Переменная",
//         "settings": {
//             "PRECISION": 2,
//             "SIZE": 20,
//             "MIN_VALUE": 0,
//             "MAX_VALUE": 0,
//             "DEFAULT_VALUE": null
//         }
//     },
//     "UF_CRM_1661089690": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1661089690",
//         "listLabel": "ID задачи на замер",
//         "formLabel": "ID задачи на замер",
//         "filterLabel": "ID задачи на замер",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 1,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1661089717": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1661089717",
//         "listLabel": "ID задачи на производство",
//         "formLabel": "ID задачи на производство",
//         "filterLabel": "ID задачи на производство",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 1,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1661089736": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1661089736",
//         "listLabel": "ID задачи на поспечать",
//         "formLabel": "ID задачи на поспечать",
//         "filterLabel": "ID задачи на поспечать",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 1,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1661089762": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1661089762",
//         "listLabel": "ID задачи на монтаж",
//         "formLabel": "ID задачи на монтаж",
//         "filterLabel": "ID задачи на монтаж",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 1,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1661089782": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1661089782",
//         "listLabel": "ID задачи на закрывающие документы",
//         "formLabel": "ID задачи на закрывающие документы",
//         "filterLabel": "ID задачи на закрывающие документы",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 1,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1661089811": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1661089811",
//         "listLabel": "ID задачи на счет",
//         "formLabel": "ID задачи на счет",
//         "filterLabel": "ID задачи на счет",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 1,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1661089895": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1661089895",
//         "listLabel": "ID задачи \"Передача заказа\"",
//         "formLabel": "ID задачи \"Передача заказа\"",
//         "filterLabel": "ID задачи \"Передача заказа\"",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 1,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1661253202": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1661253202",
//         "listLabel": "ID задачи счет на предоплату/постоплату",
//         "formLabel": "ID задачи счет на предоплату/постоплату",
//         "filterLabel": "ID задачи счет на предоплату/постоплату",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 1,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_URL": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_URL",
//         "listLabel": "Ссылка на элемент",
//         "formLabel": "Ссылка на элемент",
//         "filterLabel": "Ссылка на элемент",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 1,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": null
//         }
//     },
//     "UF_CRM_URL_BB": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_URL_BB",
//         "listLabel": "Ссылка на элемент (BBcode)",
//         "formLabel": "Ссылка на элемент (BBcode)",
//         "filterLabel": "Ссылка на элемент (BBcode)",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 1,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": null
//         }
//     },
//     "UF_CRM_1657845024603": {
//         "type": "address",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1657845024603",
//         "listLabel": "АДРЕС",
//         "formLabel": "АДРЕС",
//         "filterLabel": "АДРЕС",
//         "settings": {
//             "SHOW_MAP": "Y"
//         }
//     },
//     "UF_CRM_CITY": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_CITY",
//         "listLabel": "Город",
//         "formLabel": "Город",
//         "filterLabel": "Город",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 1,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": null
//         }
//     },
//     "UF_CRM_1656421812": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1656421812",
//         "listLabel": "Номер счета",
//         "formLabel": "Номер счета",
//         "filterLabel": "Номер счета",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 1,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": null
//         }
//     },
//     "UF_CRM_1656421972": {
//         "type": "double",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1656421972",
//         "listLabel": "Сумма оплат",
//         "formLabel": "Сумма оплат",
//         "filterLabel": "Сумма оплат",
//         "settings": {
//             "PRECISION": 2,
//             "SIZE": 20,
//             "MIN_VALUE": 0,
//             "MAX_VALUE": 0,
//             "DEFAULT_VALUE": null
//         }
//     },
//     "UF_CRM_1661089657": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1661089657",
//         "listLabel": "ID задачи на дизайн",
//         "formLabel": "ID задачи на дизайн",
//         "filterLabel": "ID задачи на дизайн",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 1,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     },
//     "UF_CRM_1670213131": {
//         "type": "employee",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1670213131",
//         "listLabel": "Менеджер сопровождения",
//         "formLabel": "Менеджер сопровождения",
//         "filterLabel": "Менеджер сопровождения",
//         "settings": []
//     },
//     "UF_CRM_1638967445": {
//         "type": "string",
//         "isRequired": false,
//         "isReadOnly": false,
//         "isImmutable": false,
//         "isMultiple": false,
//         "isDynamic": true,
//         "title": "UF_CRM_1638967445",
//         "listLabel": "Комментарий для Замера",
//         "formLabel": "Комментарий для Замера",
//         "filterLabel": "Комментарий для Замера",
//         "settings": {
//             "SIZE": 20,
//             "ROWS": 10,
//             "REGEXP": "",
//             "MIN_LENGTH": 0,
//             "MAX_LENGTH": 0,
//             "DEFAULT_VALUE": ""
//         }
//     }
// };
