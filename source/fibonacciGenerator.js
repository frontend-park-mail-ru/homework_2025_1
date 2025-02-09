'use strict';

/**
 * Генерирует последовательность Фибоначчи заданной длины.
 * Если n <= 0, возвращается пустой массив.
 * 
 * @param {number} n - Количество элементов в последовательности.
 * 
 * @example
 * // returns [0, 1, 1, 2, 3]
 * fibonacciGenerator(5);
 * 
 * @example
 * // returns []
 * fibonacciGenerator(0);
 * 
 * @example
 * // returns []
 * fibonacciGenerator(-3);
 * 
 * @example
 * // returns [0]
 * fibonacciGenerator(1);
 * 
 * @returns {number[]} - Массив чисел Фибоначчи.
 */
function fibonacciGenerator(n) {
    if (n <= 0) {
        return [];
    }

    const sequence = [0, 1];

    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }

    return sequence.slice(0, n);
}
