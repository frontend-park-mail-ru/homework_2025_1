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
 * @returns {IterableIterator<number>} - Итератор последовательности Фибоначчи.
 */
function* fibonacciGenerator(n) {
    if (typeof n !== 'number' || !Number.isFinite(n) || n <= 0) {
        return; // Генератор просто завершит работу
    }

    let a = 0, b = 1;
    for (let i = 0; i < n; i++) {
        yield a;
        [a, b] = [b, a + b];
    }
}


console.log([...fibonacciGenerator(5)]);