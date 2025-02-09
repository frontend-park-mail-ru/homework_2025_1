'use strict';

/**
 * Функция, генерирующая первые n чисел Фибоначчи.
 * @param {Number} n Количество чисел для генерации
 * 
 * @example
 * // returns [0, 1, 1, 2]
 * fibonacciGenerator(4)
 * 
 * @returns {Array<Number>}
 */

const fibonacciGenerator = (n) => {
    if (Number.isInteger(n)) {
        let result = [];
        for (let i = 0; i < n; i += 1) {
            result.push((result[i - 1] ?? 0) + (result[i - 2] ?? i));
        }
        return result;
    }
    return [];
};