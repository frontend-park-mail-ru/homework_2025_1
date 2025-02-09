'use strict';

/**
 * Функция, определяющая максимальное число в массиве
 * @param {Array<String>} numbers - массив строк
 *
 * @example
 * // returns ["fig", "kiwi", "apple", "grape", "banana"]
 * sortByLength(["apple", "banana", "kiwi", "fig", "grape"]);
 *
 *
 * @returns {Array<String>}
 */
const sortByLength = numbers => numbers.sort((a, b) => {
    if (a.length > b.length){
        return 1;
    }
    else if (a.length < b.length){
        return -1;
    }
    return a > b ? 1 : -1
});
