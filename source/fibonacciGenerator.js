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
function* fibonacciGenerator(n) {
    if (!Number.isInteger(n)) {
        return;
    }
    let a = 0, b = 1;
    for (let i = 0; i < n; i += 1) {
        yield a;
        b = a + b;
        a = b - a;
    }
}
