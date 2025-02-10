'use strict';

/**
 * Функция, определяющая факториал числа
 * @param {Number} number - целое число
 * @example
 * // returns 120
 * factorial(5);
 * @returns {Number}
 */
const factorial = (number) => {
    if (number < 0) throw new Error("/Факториал не определен для отрицательных чисел/");
    return number === 0 || number === 1 ? 1 : number * factorial(number - 1);
};
