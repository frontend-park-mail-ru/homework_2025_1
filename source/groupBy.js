'use strict'

/**
 * Функция, группирующая объекты из массива по типу
 * @param {Array<Objects>} input - массив объектов
 * 
 * @returns {type: {Objects}}
 */
function groupBy(input) {
    return Object.groupBy(input, ({category}) => category);
}