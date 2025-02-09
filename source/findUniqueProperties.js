'use strict';

/**
 * Выполняет глубокое копирование значения, включая объекты и массивы.
 *
 * @param {*} value - значение, которое нужно скопировать. Может быть примитивом, объектом или массивом
 *
 * @example
 * const obj = { a: 1, b: { c: 2 } };
 * const copy = deepCopy(obj);
 * console.log(copy); // { a: 1, b: { c: 2 } }
 * console.log(copy === obj); // false
 * console.log(copy.b === obj.b); // false
 * 
 * @returns {*} глубокая копия переданного значения. Если значение является примитивом, возвращается само значение
 */
const deepCopy = (value) => {
    if (value === null || typeof value !== 'object') {
        return value;
    }

    if (Array.isArray(value)) {
        return value.map(deepCopy);
    }

    const copy = {};
    for (const key in value) {
        copy[key] = deepCopy(value[key]);
    }

    return copy;
};

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
    if (
        obj1 === null || obj2 === null ||
        obj1 === undefined || obj2 === undefined ||
        typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        throw new TypeError("Передан неверный тип данных.");
    }

    const resObj = {};

    for (const key in obj1) {
        if (!(key in obj2)) {
            resObj[key] = deepCopy(obj1[key]);
        }
    }

    for (const key in obj2) {
        if (!(key in obj1)) {
            resObj[key] = deepCopy(obj2[key]);
        }
    }

    return resObj;
};
