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
const compressObject = (obj) => {
    if (Object.prototype.toString.call(obj) != '[object Object]') {
        throw new TypeError(`Expected type \'[object Object]\', but received \'${Object.prototype.toString.call(obj)}\'`);
    }
    
    let result = {};
    Object.entries(obj).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            result[key] = value;
        }
    });

    return result;
};

