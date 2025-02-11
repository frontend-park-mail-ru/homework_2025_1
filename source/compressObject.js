'use strict';

/**
 * Функция принимает объект и возвращает новый объект, содержащий только те ключи, которые имеют значения, отличные от null, undefined или пустой строки.
 * @param {Object} obj - объект 
 * 
 * @example
 * // returns { name: "Андрей", country: "Россия" }
 * compressObject({
 *       name: "Андрей",
 *       age: null,
 *       city: "",
 *       country: "Россия",
 *       occupation: undefined
 *   });
 * 
 * @returns {Object}
 */
// const compressObject = (obj) => {
//     if (Object.prototype.toString.call(obj) != '[object Object]')
//         return {};
    
//     let result = {};
//     for (const [key, value] of Object.entries(obj))
//         if (value !== undefined && value !== null && value !== "")
//             result[key] = value;
//     return result;
// };

const compressObject = obj => 
    Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => (value !== undefined && value !== null && value !== ""))
    );