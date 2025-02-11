'use strict'

/**
 * Функция, группирующая объекты из массива по типу
 * @param {Array<Objects>} input - массив объектов
 * 
 * @returns {type: {Objects}}
 */
const groupBy = (input) => {
    let result = {};
    for (let i of input) {
        let category = i["category"];

        if (category in result) {
            result[category].push(i);
        } else {
            result[category] = [i];
        }
    }
     return result;
}
