'use strict'

/**
 * Функция, группирующая объекты из массива по типу
 * @param {Array<Objects>} input - массив объектов
 * @param key - ключ, по которому группируются элементы массива 
 * 
 * @returns {type: {Objects}}
 */
const groupBy = (input, key) => {
    if (!Array.isArray(input)) () => { throw new TypeError('Первый аргумент должен быть массивом объектов'); }
    
    return input.reduce(function(result, object) {
        const category = object[key]; 

        if (!result[category]) {
            result[category] = [object];
        } else {
            result[category].push(object);
        }
        return result;
    }, {})
}
