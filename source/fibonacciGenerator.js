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
const fibonacciGenerator = (n) => n <= 0 ? [] : [...Array(n)].reduce((arr, _, i) => [...arr, i < 2 ? i : arr[i - 1] + arr[i - 2]], []);
