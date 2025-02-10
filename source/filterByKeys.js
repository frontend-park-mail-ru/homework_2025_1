'use strict';

/**
 * Создает новый объект, содержащий только указанные ключи из исходного объекта.
 *
 * @param {Object} obj Исходный объект.
 * @param {Array<string>} keys Массив ключей для включения в новый объект.
 * 
 * @returns {Object} Новый объект, содержащий только указанные ключи.
 * @throws {TypeError} Если типы аргументов не соответствуют ожидаемым.
 * 
 * @example
 * // returns { a: 1, c: 3 }
 * filterObjectByKeys({ a: 1, b: 2, c: 3 }, ['a', 'c']);
 */
const filterObjectByKeys = (obj, keys) => {
    if (typeof obj !== "object") {
        throw new TypeError("Первый аргумент функции должен быть объектом")
    }

    if (!Array.isArray(keys)) {
        throw new TypeError("Второй аргумент функции должен быть массивом")
    }

    return keys.reduce((filteredObj, key) => {
        if (key in obj) {
            filteredObj[key] = obj[key];
        }

        return filteredObj;
    }, {});
};
