"use strict";
//Ларин Алексей WEB-22

/**
 * Функция разделяет элементы массива на два подмассива: один для элементов, которые удовлетворяют предикату, и другой для элементов, которые не удовлетворяют
 * @param {Array} arr - Исходный массив
 * @param {Function} predicate - Предикат (функция принимающая на вход элемент массива и возвращающее булево значение)
 * 
 * @example
 * // return [[1, 2, 3], [-1]]
 * partition([-1, 1, 2, 3], isPositive);
 * 
 * @returns {Array} - Массив из двух массивов: в первом элементы удовлетворяют предикату, а во втором нет
 */
let partition = (arr, predicate) => {
    const result = [[], []];
    if (!Array.isArray(arr)) {
        throw new Error("Not array");
    }
    arr.forEach(item => {
        if (predicate(item)) {
            result[0].push(item);
        } else {
            result[1].push(item);
        }
    });
    return result;
}
