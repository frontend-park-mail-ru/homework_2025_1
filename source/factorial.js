'use strict';

/**
 * Функция, определяющая факториал числа
 * @param {Number} n - массив чисел
 * 
 * @example
 * // returns 120
 * factorial(5);
 * 
 * @example
 * // returns 1
 * factorial(0);
 * 
 * @returns {Number}
 */
function factorial(n) {
    if (typeof(n) !== 'number') {
        throw new Error('Факториал определен только для чисел');
    }
    if (n < 0) {
        throw new Error('Факториал не определен для отрицательных чисел');
    }
    let res = 1;
    for (let i = 1; i <= n; i++) {
        res *= i;
    }
    return res;
}
