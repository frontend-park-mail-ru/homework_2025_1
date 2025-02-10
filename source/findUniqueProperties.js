'use strict';

/**
 * Функция, возвращающая объект с уникальными свойствами из двух объектов.
 * @param {Object} obj1 - первый объект
 * @param {Object} obj2 - второй объект
 * 
 * @example
 * // returns {x: 10, z: 30}
 * findUniqueProperties({x: 10, y: 20}, {y: 20, z: 30})
 * 
 * @returns {Object} - объект с уникальными свойствами
 */
const findUniqueProperties = (obj1, obj2) => {
    const result = {};
    for (const key in obj1) {
        if (!obj2.hasOwnProperty(key)) {
            result[key] = obj1[key];
        }
    }

    for (const key in obj2) {
        if (!obj1.hasOwnProperty(key)) {
            result[key] = obj2[key];
        }
    }
    return result;
};