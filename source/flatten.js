'use strict';

/**
 * Функция, преобразующая вложенный массив в одномерный
 * @param {Array<Object>} array - массив объектов
 * 
 * @example
 * // returns [1, 'hello', 'world', 4]
 * flatten([1, [['hello'], 'world', 4]]);
 * 
 * @returns {Array<Object>}
 * 
 * @throws {TypeError} Выбросит ошибку, если аргумент не массив.
 */
const flatten = array => {
    // проверка, что аргумент - массив
    if (!Array.isArray(array)) {
        throw new TypeError('Argument must be an array');
    }

    let flattenedArray = [];
    array.forEach(val => {
        if (Array.isArray(val)) {
            // добавляем все элементы одномерной версии val, если он массив
            flattenedArray.push(...flatten(val));
        } else {
            // добавляем val, если он не массив
            flattenedArray.push(val);
        }
    });

    return flattenedArray;
};
