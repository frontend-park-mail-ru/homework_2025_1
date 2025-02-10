'use strict';

/**
 * Функция, которая приводит вложенные массивы к одному массиву
 * @param {Array<number | Array>} arr - массив чисел, возможно вложенный
 *
 * @example
 * // returns [1, 2, 3, 4, 5]
 * flatten([1, [2, 3, [4, 5]]]);
 *
 * @returns {Array<number>} - массив чисел без вложенности
 * @throws {TypeError} - если передан не массив
 */
function flatten(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError("Ожидался массив");
    }

    return arr.reduce((acc, val) => {
        if (Array.isArray(val)) {
            acc.push(...flatten(val));
        } else {
            acc.push(val);
        }
        return acc;
    }, []);
}
