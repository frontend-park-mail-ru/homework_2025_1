'use strict';

/**
 * Функция, разделяющая массив на два подмассива в зависимости от предиката
 * @param {Array<Item>} items - массив элементов
 * @param {Function} predicate - функция-предикат
 * 
 * @example
 * // returns [[2, 4, 6], [1, 3, 5]]
 * partition([1, 2, 3, 4, 5, 6], num => num % 2 === 0);
 * 
 * @returns {Array<Array>} - двумерный массив, где элементы первого подмассива удовлетворяют предикату, а второго нет
 */
const partition = (items, predicate) => {
    const result = [[], []];
    items.reduce((subarrays, item) => {
        subarrays[predicate(item) ? 0 : 1].push(item);
        return subarrays;
    }, result);
    return result;
};