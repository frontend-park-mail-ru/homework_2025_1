'use strict';

/**
 * @author Лупенков Алексей WEB-21
*/

/**
 * Функция, определяющая факториала неотрицательного целого числа
 * @param {number} n - Неотрицательное целое число
 * 
 * @example
 * // returns 120
 * factorial(5);
 * 
 * @returns {Number}
 */
const factorial = (n) => {
    if (typeof n !== 'number' || !Number.isInteger(n)) {
        throw new Error("Факториал должен быть вызван с целым числом");
    }
    if (n < 0) {
        throw new Error("Факториал не определен для отрицательных чисел");
    }
    let result = 1;
    for (let i = 1; i <= n; ++i) {
        result *= i;
    }
    return result;
}