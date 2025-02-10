'use strict';

/**
 * Группирует массив объектов по указанному ключу.
 * @param {Array<Object>} array - массив объектов для группировки
 * @param {string} key - ключ, по которому производится группировка
 * 
 * @example
 * // returns { fruit: [{ id: 1, category: 'fruit', name: 'apple' }], vegetable: [{ id: 3, category: 'vegetable', name: 'carrot' }] }
 * groupBy([{ id: 1, category: 'fruit', name: 'apple' }, { id: 3, category: 'vegetable', name: 'carrot' }], 'category');
 * 
 * @returns {Object} - объект, где ключи — уникальные значения по указанному ключу, а значения — массивы объектов, соответствующих этим ключам
 */
function groupBy(array, key) {
    const result = {}; 

    for (const element of array) { 
        const groupKey = element[key]; 

        if (!result[groupKey]) { 
            result[groupKey] = []; 
        }

        result[groupKey].push(element); 
    }

    return result; 
} 