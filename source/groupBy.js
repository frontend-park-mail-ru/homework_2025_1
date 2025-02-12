'use strict';

/**
 * Проверяет, является ли значение обычным объектом (не `null` и не массивом).
 * 
 * @param {any} value - Проверяемое значение
 * @returns {boolean} - `true`, если значение является обычным объектом, иначе `false`
 */
const isObject = (value) => Object.prototype.toString.call(value) === '[object Object]';

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

    const keyValue = key?.valueOf();
    if (typeof keyValue !== 'string' && typeof keyValue !== 'number') {
        throw new TypeError('The key must be a string or a number');
    }

    return objectsToGroup.reduce((result, element) => {
        if (!isObject(element)) {
            throw new TypeError('All elements in the array must be objects');
        }

        const groupKey = element[keyValue];

        if (typeof groupKey === 'object' && !isObject(groupKey)) {
            throw new TypeError('All elements in the array must be objects');
        }

        if (!result[groupKey]) {
            result[groupKey] = [];
        }

        result[groupKey].push(element);

        return result;
    }, {});
};
