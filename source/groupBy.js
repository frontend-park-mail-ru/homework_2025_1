'use strict'

/**
 * Функция, группирующая объекты из массива по типу
 * @param {Array<Objects>} input - массив объектов
 * @param key - ключ, по которому группируются элементы массива 
 * 
 * @returns {type: {Objects}}
 */
const groupBy = (input, key) => {
    if (typeof(key) != 'string') {
        key = 'category';
    }
    if (!Array.isArray(input)) {
        throw new TypeError('Первый аргумент должен быть массивом объектов');
    }
    const itemsByCategory = input.reduce(function(result, object) {
        if (!result[object[key]]) {
            result[object[key]] = [object];
        } else {
            result[object[key]].push(object);
        }
        return result;
    }, {})
    return itemsByCategory;
}

// function groupBy(input) {
//     return Object.groupBy(input, ({category}) => category);
// }
