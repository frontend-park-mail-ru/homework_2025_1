'use strict';

/**
 * @author Лупенков Алексей WEB-21
*/

/**
 * Функция, определяющая факториала неотрицательного целого числа
 * @param {Number} n - Неотрицательное целое число
 * 
 * @example
 * // returns 120
 * factorial(5);
 * 
 * @returns {Number|BigInt} Возвращает число или BigInt, если результат слишком велик для Number
 */
const factorial = (n) => {
    if (typeof n !== 'number') {
        throw new Error("Факториал должен быть вызван с числом");
    }
    if (!Number.isInteger(n)) {
        throw new Error("Факториал должен быть вызван с целым числом");
    }
    if (n < 0) {
        throw new Error("Факториал не определен для отрицательных чисел");
    }
    let result = 1;
    for (let i = 1; i <= n; ++i) {
        result *= i;
        if (result > Number.MAX_SAFE_INTEGER) {
            result = BigInt(result);
            for (let j = i + 1; j <= n; ++j) {
                result *= BigInt(j);
            }
            return result;
        }
    }
    return result;
}