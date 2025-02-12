'use strict';

/**
 * Функция для вычисления факториала числа.
 * @param {number} number - Число, для которого нужно вычислить факториал.
 * @returns {number}
 * @throws {TypeError} Если аргумент не является числом или является отрицательным числом.
 * @throws {RangeError} Если аргумент - отрицательное число или число с плавающей точкой.
 */
const factorial = (number) => {
    const value = number instanceof Number ? +number : number;

    if (!Number.isInteger(value)) {
        throw new TypeError("Factorial is not defined for non-integer numbers.");
    }
    if (value < 0) {
        throw new RangeError("Factorial is not defined for negative numbers.");
    }
    return value === 0 || value === 1 ? 1 : value * factorial(value - 1);
};

