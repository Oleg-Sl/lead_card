
export const SMART_ID_PRODUCT = 172;


export const SMART_ID_FABRIC = 149;
export const SMART_FIELDS_FABRICS = {
    upholsteryFabricCollection: "ufCrm23_1706605768",   // МСП - Коллекция и цвет обивочной ткани
    upholsteryFabricCollection_1: "ufCrm23_1706605986", // МСП - Коллекция и цвет обивочной ткани - 1
    upholsteryFabricCollection_2: "ufCrm23_1706606339", // МСП - Коллекция и цвет обивочной ткани - 2 
    price: 'ufCrm17_1705390431',                        // Цена ткани ((Поставщик)
};


export const SMART_ID_MATERIAL = 152;
export const MATERIAL_FIELDS = [
    'MDF6mm',
    'PPU_EL20mm',
    'PPU_EL30mm',
    'PPU_EL40mm',
];
export const SMART_FIELDS_MATERIAL = {
    datePriceValidity: 'ufCrm25_1707304718',  // Дата актуальности цен        Дата	заполняется всегда
    // plywood15mm: 'ufCrm25_1707304769',        // Фанера 15мм (лист)           Число
    // plywood6mm: 'ufCrm25_1708098461',         // Фанера 6мм (лист)            Число
    // plywood3mm: 'ufCrm25_1707304790',         // Фанера 03мм (лист)           Число
    MDF6mm: 'ufCrm25_1708095897',             // МДФ 6мм (лист)               Число   МСП
    // MDF10mm: 'ufCrm25_1708098585',            // МДФ 10мм (лист)              Число
    // MDF25mm: 'ufCrm25_1708098686',            // МДФ 25мм (лист)              Строка	
    PPU_EL20mm: 'ufCrm25_1707305252',         // ППУ ЕЛ 20мм (кв. м)          Число   МСП
    PPU_EL30mm: 'ufCrm25_1707305305',         // ППУ ЕЛ 30мм (кв. м)          Число   МСП
    PPU_EL40mm: 'ufCrm25_1708098751',         // ППУ ЕЛ 40мм (лист)           Число   МСП
    // PPU_EL50mm: 'ufCrm25_1707305332',         // ППУ ЕЛ 50мм (лист)           Число
    // PPU_Elax30mm: 'ufCrm25_1707304812',       // ППУ Елакс 30мм (лист)		Число
    // PPU_Elax40mm: 'ufCrm25_1707305129',       // ППУ Елакс 40мм (лист)		Число
    // PPU_Elax50mm: 'ufCrm25_1707305144',       // ППУ Елакс 50мм (лист)		Число
    // sintepon100: 'ufCrm25_1707305901',        // Синтепон 100 (всегда с ППУ)  Число
    // sintepon100: 'ufCrm25_1708099026',        // Синтепон 200                 Число
    // decor: 'ufCrm25_1707305343',              // Декор                        Число
    // furnitureRubber: 'ufCrm25_1707305355',    // Мебельная резина             Число
    // latex: 'ufCrm25_1707305932',              // Латекс                       Число
};


export const SMART_ID_HISTORY = 145;
export const HISTORY_FIELDS = [
    'fabricNumber1',
    'fabricNumber2',
    'fabricNumber3',
    'decorNumber1',
    'decorNumber2',
    'decorNumber3',
    'otherNumber1',
    'otherNumber2',
];
export const HISTORY_FABRICS_FIELDS = [
    'fabricNumber1',
    'fabricNumber2',
    'fabricNumber3',
];
export const SMART_FIELDS_HISTORY = {
    datePriceValidity: 'ufCrm27_1707313572',              // Дата актуальности цены (на дату расчета) Дата
    datePriceValidityOfToday: 'ufCrm27_1707314281',       // Дата актуальности цен (на сегодня),      Дата
    workRating: 'ufCrm27_1708832160',                     // Работа (общая оценка на работу)          Число
    workComment: 'ufCrm27_1708832266',                    // Работа (комментарии)                     Строка
    costPrice: 'ufCrm27_1708681937',                      // Себестоимость (ИТОГО)                    Число
    comment: 'ufCrm27_1708681913',                        // Общий комментарий                        Строка
    createdBy: 'createdBy',

    MDF6mmValue: 'ufCrm27_1707314359',                    // МДФ 6мм (значение),          Число
    MDF6mmAmount: 'ufCrm27_1707314461',                   // МДФ 6мм (сумма),             Число
    MDF6mmComment: 'ufCrm27_1708661569',                  // МДФ 6мм - комментарии,       Строка
    PPU_EL20mmValue: 'ufCrm27_1708658171',                // ППУ ЕЛ 20мм (значение)       Число
    PPU_EL20mmAmount: 'ufCrm27_1708658231',               // ППУ ЕЛ 20мм (сумма)          Число
    PPU_EL20mmComment: 'ufCrm27_1708831214',              // ППУ ЕЛ 20мм (комментарии)    Строка
    PPU_EL30mmValue: 'ufCrm27_1708658243',                // ППУ ЕЛ 30мм (значение)       Число
    PPU_EL30mmAmount: 'ufCrm27_1708658255',               // ППУ ЕЛ 30мм (сумма)          Строка
    PPU_EL30mmComment: 'ufCrm27_1708831245',              // ППУ ЕЛ 30мм (комментарии)    Строка
    PPU_EL40mmValue: 'ufCrm27_1708658269',                // ППУ ЕЛ 40мм (значение)       Число
    PPU_EL40mmAmount: 'ufCrm27_1708658280',               // ППУ ЕЛ 40мм (сумма)          Число
    PPU_EL40mmComment: 'ufCrm27_1708831295',              // ППУ ЕЛ 40мм (комментарии)    Строка
    fabricNumber1Value: 'ufCrm27_1708658296',             // Ткань №1 (значение)          Число
    fabricNumber1Amount: 'ufCrm27_1708658322',            // Ткань №1 (сумма)             Число
    fabricNumber1Comment: 'ufCrm27_1708831435',           // Ткань №1 (комментарии)       Строка
    fabricNumber2Value: 'ufCrm27_1708658336',             // Ткань №2 (значение)          Число
    fabricNumber2Amount: 'ufCrm27_1708658346',            // Ткань №2 (сумма)             Число
    fabricNumber2Comment: 'ufCrm27_1708831473',           // Ткань №2 (комментарии)       Строка
    fabricNumber3Value: 'ufCrm27_1708658363',             //Ткань №3 (значение)           Число
    fabricNumber3Amount: 'ufCrm27_1708658373',            //Ткань №3 (сумма)              Число
    fabricNumber3Comment: 'ufCrm27_1708831505',           //Ткань №3 (комментарии)        Строка
    decorNumber1Price: 'ufCrm27_1708658618',              // Декор №1 (цена)              Число
    decorNumber1Value: 'ufCrm27_1708661479',              // Декар №1 (значение)          Число
    decorNumber1Amount: 'ufCrm27_1708661548',             // Декор №1 (сумма)             Число
    decorNumber1Comment: 'ufCrm27_1708661656',            // Декор №1 (комментарии)       Строка
    decorNumber2Price: 'ufCrm27_1708661678',              // Декор №2 (цена)              Число
    decorNumber2Value: 'ufCrm27_1708661703',              // Декор №2 (значение)          Число
    decorNumber2Amount: 'ufCrm27_1708661720',             // Декор №2 (сумма)             Число
    decorNumber2Comment: 'ufCrm27_1708661741',            // Декор №2 (комментарии)       Строка
    decorNumber3Price: 'ufCrm27_1708831676',              // Декор №3 (цена)              Число
    decorNumber3Value: 'ufCrm27_1708831717',              // Декор №3 (значение)          Число
    decorNumber3Amount: 'ufCrm27_1708831735',             // Декор №3 (сумма)             Число
    decorNumber3Comment: 'ufCrm27_1708680919',            // Декор №3 (комментарии)       Строка
    otherNumber1Price: 'ufCrm27_1708831948',              // Иное №1 (цена)               Число
    otherNumber1Value: 'ufCrm27_1708831993',              // Иное №1 (значение)           Число
    otherNumber1Amount: 'ufCrm27_1708832019',             // Иное №1 (сумма)              Число
    otherNumber1Comment: 'ufCrm27_1708832035',            // Иное №1 (комментарии)        Строка
    otherNumber2Price: 'ufCrm27_1708832057',              // Иное №2 (цена)               Число
    otherNumber2Value: 'ufCrm27_1708832090',              // Иное №2 (значение)           Число
    otherNumber2Amount: 'ufCrm27_1708832104',             // Иное №2 (сумма)              Число
    otherNumber2Comment: 'ufCrm27_1708661611',            // Иное №2 (комментарии)        Строка
};


export const SMART_ID_COEFFICIENT = 139;
export const COEFFICIENT_FIELDS = [
    'MDF6mm',
    'PPU',
];
export const SMART_FIELDS_COEFFICIENT = {
    MDF6mm: 'ufCrm33_1708830433',               // МДФ 6мм для МСП                          Число
    MDF6mmText: 'ufCrm3_1708830698',            // Что входит в коэф. МДФ 6мм для МСП       Строка
    PPU: 'ufCrm3_1708830476',                   // ППУ для МСП                              Число
    PPUText: 'ufCrm3_1708830738',               // Что входит в коэф. ППУ для МСП           Строка
}
