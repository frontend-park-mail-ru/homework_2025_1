'use strict';

/**
 * Группирует массив объектов по указанному ключу.
 * @param {Array<Object>} objectsToGroup - массив объектов для группировки
 * @param {string|number} key - ключ, по которому производится группировка (строка или число)
 * 
 * @example
 * // returns { fruit: [{ id: 1, category: 'fruit', name: 'apple' }], vegetable: [{ id: 3, category: 'vegetable', name: 'carrot' }] }
 * groupBy([{ id: 1, category: 'fruit', name: 'apple' }, { id: 3, category: 'vegetable', name: 'carrot' }], 'category');
 * 
 * @returns {Object} - объект, где ключи — уникальные значения по указанному ключу, а значения — массивы объектов, соответствующих этим ключам
 */
const groupBy = (objectsToGroup, key) => {
    if (!Array.isArray(objectsToGroup)) {
        throw new TypeError('Первый аргумент должен быть массивом');
    }

    if (typeof key !== 'string' && typeof key !== 'number') {
        throw new TypeError('Ключ должен быть строкой или числом');
    }

    return objectsToGroup.reduce((result, element) => {
        const groupKey = element[key];

        if (!result[groupKey]) {
            result[groupKey] = [];
        }

        result[groupKey].push(element);

        return result;
    }, {});
};