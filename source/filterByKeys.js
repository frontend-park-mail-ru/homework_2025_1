'use strict';

/**
 * Создает новый объект, содержащий только указанные ключи из исходного объекта.
 *
 * @param {Object} obj Исходный объект.
 * @param {Array<string>} keys Массив ключей для включения в новый объект.
 * 
 * @returns {Object} Новый объект, содержащий только указанные ключи.
 * 
 * @example
 * // returns { a: 1, c: 3 }
 * filterObjectByKeys({ a: 1, b: 2, c: 3 }, ['a', 'c']);
 */
const filterObjectByKeys = (obj, keys) => {
    const filteredObj = {};

    for (const key of keys) {
        if (obj.hasOwnProperty(key)) {
            filteredObj[key] = obj[key];
        }
    }

    return filteredObj;
};
