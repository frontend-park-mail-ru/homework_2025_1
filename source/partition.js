'use strict';

/**
 * Разделяет массив на два массива в зависимости от предиката
 * @param {Array} array - Исходный массив
 * @param {Function} predicate - Функция предикат, возвращающая true или false
 * 
 * @example
 * // returns [[2, 4, 6], [1, 3, 5]]
 * partition([1, 2, 3, 4, 5, 6], num => num % 2 === 0);
 * 
 * @returns {Array<Array>} Двумерный массив, где первый массив содержит элементы, удовлетворяющие предикату, а второй — нет
 */
const partition = (array, predicate) => {
    return array.reduce((acc, item) => {
        acc[predicate(item) ? 0 : 1].push(item);
        return acc;
    }, [[], []]);
};

// Экспортируем функцию, если требуется
// module.exports = partition;
