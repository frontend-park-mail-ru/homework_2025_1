'use strict';

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
 * @throws {TypeError} If the first argument is not an array.
 * @throws {TypeError} If the key is not a string or a number.
 * @throws {TypeError} If an element in the array is not an object.
 */
const groupBy = (objectsToGroup, key) => {
    if (!Array.isArray(objectsToGroup)) {
        throw new TypeError('The first argument must be an array');
    }

    if (typeof key !== 'string' && typeof key !== 'number') {
        throw new TypeError('The key must be a string or a number');
    }

    return objectsToGroup.reduce((result, element) => {
        const whiteList = ['object'];

        if (!whiteList.includes(typeof element) || element === null || Array.isArray(element) || element instanceof String) {
            throw new TypeError('All elements in the array must be objects');
        }

        const groupKey = element[key];

        if (!result[groupKey]) {
            result[groupKey] = [];
        }

        result[groupKey].push(element);

        return result;
    }, {});
};
