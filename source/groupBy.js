'use strict';

/**
 * Проверяет, является ли значение обычным объектом (не `null` и не массивом).
 * 
 * @param {any} value - Проверяемое значение
 * @returns {boolean} - `true`, если значение является обычным объектом, иначе `false`
 */
const isObject = (value) => Object.prototype.toString.call(value) === '[object Object]';

/**
 * Проверяет, является ли ключ строкой или числом.
 * 
 * @param {any} key - Проверяемый ключ
 * @returns {boolean} - `true`, если ключ является строкой или числом, иначе `false`
 */
const isValidKey = (key) => {
    if (key === null || key === undefined) {
        return false;
    }
    const keyValue = key.valueOf();
    return typeof keyValue === 'string' || typeof keyValue === 'number';
};

/**
 * Группирует массив объектов по указанному ключу.
 * 
 * @param {Array<Object>} objectsToGroup - массив объектов для группировки
 * @param {string|number} key - ключ, по которому производится группировка (строка или число)
 * 
 * @example
 * // returns { fruit: [{ id: 1, category: 'fruit', name: 'apple' }], vegetable: [{ id: 3, category: 'vegetable', name: 'carrot' }] }
 * groupBy([{ id: 1, category: 'fruit', name: 'apple' }, { id: 3, category: 'vegetable', name: 'carrot' }], 'category');
 * 
 * @returns {Object} - Объект, где ключами являются уникальные значения указанного ключа, а значениями — массивы объектов, содержащие этот ключ.
 * 
 * @throws {TypeError} Если первый аргумент не является массивом, если ключ не является строкой или числом, или если элемент массива (или значение по ключу) не является обычным объектом.
 */
const groupBy = (objectsToGroup, key) => {
    if (!Array.isArray(objectsToGroup)) {
        throw new TypeError('The first argument must be an array');
    }

    const keyValue = key;  
    if (!isValidKey(keyValue)) {
        throw new TypeError('The key must be a string or a number');
    }

    return objectsToGroup.reduce((result, element) => {
        if (!isObject(element)) {
            throw new TypeError('All elements in the array must be objects');
        }

        const groupKey = element[keyValue]; 

        if (!isValidKey(groupKey)) {
            throw new TypeError('The key value in the object must be a string or a number');
        }

        if (!result[groupKey]) {
            result[groupKey] = [];
        }

        result[groupKey].push(element);

        return result;
    }, {});
};

