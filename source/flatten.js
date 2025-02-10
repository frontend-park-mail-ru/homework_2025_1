'use strict';

/**
 * Функция, которая приводит вложенные массивы к одному массиву
 * @param {Array<any | Array>} arr - массив элементов любого типа, возможно вложенный
 *
 * @example
 * // returns [1, 2, 3, 4, 5]
 * flatten([1, [2, 3, [4, 5]]]);
 *
 * @example
 * // returns [1, 'a', true, null, { key: 'value' }]
 * flatten([1, ['a', [true, null]], { key: 'value' }]);
 *
 * @returns {Array<any>} - массив элементов без вложенности
 * @throws {TypeError} - если передан не массив
 */
const flatten = (arr) => {
    if (!Array.isArray(arr)) {
        throw new TypeError("Ожидался массив");
    }

    return arr.reduce((acc, val) => {
        if (Array.isArray(val)) {
            acc.push(...flatten(val));
        } else {
            acc.push(val);
        }
        return acc;
    }, []);
};
