'use strict';

/**
 * Функция для вычисления факториала числа.
 * @param {Number} number - Число, для которого нужно вычислить факториал.
 * @returns {Number}
 * @throws {TypeError} Если аргумент не является числом или является отрицательным числом.
 * @throws {RangeError} Если аргумент - отрицательное число или число с плавающей точкой.
 */
const factorial = (number) => {
    if (typeof number !== 'number' || number instanceof Number) {
        throw new TypeError("Input must be a non-negative integer.");
    }
    if (!Number.isInteger(number)) {
        throw new RangeError("Factorial is not defined for non-integer numbers.");
    }
    if (number < 0) {
        throw new RangeError("Factorial is not defined for negative numbers.");
    }
    return number === 0 || number === 1 ? 1 : number * factorial(number - 1);
};

