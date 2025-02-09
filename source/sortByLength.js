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
    for (let i = 0;i < str_array.length - 1;i++){
        for (let j = i + 1;j < str_array.length;j++){
            //меняем строки местами, когда длина i-ой > длины j-ой или когда длины равны, но i-ая строка больше j-ой
            if (str_array[i].length > str_array[j].length || (str_array[i].length === str_array[j].length && str_array[i] > str_array[j])) {
                [str_array[i], str_array[j]] = [str_array[j], str_array[i]];
            }
        }
    }
    return str_array;
};
