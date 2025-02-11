'use strict';

/**
 * Функция, возвращающая true, если аргумент функции является объектом, иначе - false
 * @param {any} value - аргумент для проверки
 * 
 * @example
 * // returns true
 * isObject({})
 * 
 * @example
 * // returns false
 * isObject(1)
 * 
 * @returns {Boolean} - true, если аргумент функции является объектом, иначе - false
 */
const isObject = (value) => Object.prototype.toString.call(value) === '[object Object]';

/**
 * Функция, возвращающая объект с уникальными свойствами из двух объектов.
 * @param {Object} objA - первый объект
 * @param {Object} objB - второй объект
 * 
 * @example
 * // returns {x: 10, z: 30}
 * findUniqueProperties({x: 10, y: 20}, {y: 20, z: 30})
 * 
 * @returns {Object} - объект с уникальными свойствами
 * @throws {TypeError} - если хотя бы один аргумент не является объектом
 */
const findUniqueProperties = (objA, objB) => {
    if (!isObject(objA) || !isObject(objB)) {
        throw new TypeError('Оба аргумента должны быть объектами (не массивами)');
    }

    // Собираем уникальные свойства из objA
    const result = {};
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