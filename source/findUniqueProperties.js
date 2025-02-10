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
const findUniqueProperties = (objA, objB) => {
    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return 'Оба аргумента должны быть объектами';
    }
    const result = {};
    for (const key in objA) {
        if (!objB.hasOwnProperty(key)) {
            result[key] = objA[key];
        }
    }

    for (const key in objB) {
        if (!objA.hasOwnProperty(key)) {
            result[key] = objB[key];
        }
    }
    return result;
};