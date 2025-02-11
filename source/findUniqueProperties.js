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
const isObject = value => Object.prototype.toString.call(value) === '[object Object]';

const findUniqueProperties = (objA, objB) => {
    if (!isObject(objA) || !isObject(objB)) {
        throw new Error('Оба аргумента должны быть объектами (не массивами)');
    }

    // Собираем уникальные свойства из objA
    const result = {}
    Object.keys(objA).forEach(key => {
        if (!Object.prototype.hasOwnProperty.call(objB, key)) {
            result[key] = objA[key];
        }
    });

    // Собираем уникальные свойства из objB
    Object.keys(objB).forEach(key => {
        if (!Object.prototype.hasOwnProperty.call(objA, key)) {
            result[key] = objB[key];
        }
    });

    return result;
};