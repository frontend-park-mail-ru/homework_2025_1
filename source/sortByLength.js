'use strict';

/**
 * Функция, сортирующая массив строк по их длине
 * @param {Array<String>} str_array - массив строк
 *
 * @example
 * // returns ["fig", "kiwi", "apple", "grape", "banana"]
 * sortByLength(["apple", "banana", "kiwi", "fig", "grape"]);
 *
 * @returns {Array<String>}
 */
const sortByLength = str_array => {
    str_array.forEach((_, i) => {
        str_array.forEach((_, j) => {
            if (j < str_array.length - 1) {
                if (str_array[j].length > str_array[j + 1].length || (str_array[j].length === str_array[j + 1].length && str_array[j] > str_array[j + 1])){
                    [str_array[j], str_array[j + 1]] = [str_array[j + 1], str_array[j]];
                }
            }
        });
    });
    return str_array;
};
