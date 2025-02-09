'use strict';

/**
 * Функция находит свойства, которые уникальны для каждого из двух объектов, и возвращает их в новом объекте
 *
 * @param {Object} obj1 - первый объект
 * @param {Object} obj2 - второй объект
 *
 * @example
 * const obj1 = { a: 1, b: 2, c: 3 };
 * const obj2 = { b: 2, d: 4 };
 * // returns { a: 1, c: 3, d: 4 }
 * 
 * @returns {Object} объект, содержащий свойства, которые уникальны для obj1 или obj2.
 */
const findUniqueProperties = (obj1, obj2) => {
    const resObj = {};

    for (const key in obj1) {
        if (!(key in obj2)) {
            resObj[key] = obj1[key];
        }
    }

    for (const key in obj2) {     
        if (!(key in obj1)) {
            resObj[key] = obj2[key];
        }
    }

    return resObj;
};