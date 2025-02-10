'use strict';

/**
 * Функция, объединяющая два объекта.
 * 
 * Если оба объекта содержат одинаковые ключи, и значения по этим ключам являются объектами, 
 * то они будут объединены рекурсивно. Если значения не являются объектами, значение из второго объекта 
 * перезаписывает значение из первого.
 * 
 * @param {object} source Первый объект.
 * @param {object} target Второй объект.
 * 
 * @returns {object} Объединённый объект.
 * 
 * @throws {TypeError} Один из аргументов не является объектом.
 * 
 * @example
 * // returns { a: 1, b: { x: 10, y: 50, z: 30 }, c: 3, d: 4 }
 * deepMerge({ a: 1, b: { x: 10, y: 20 }, c: 3 }, { b: { y: 50, z: 30 }, d: 4 });
 */
const deepMerge = (source, target) => {
    if (!(Object.prototype.toString.call(source) === '[object Object]')) {
        throw new TypeError('Первый аргумент должен быть объектом');
    }
    if (!(Object.prototype.toString.call(target) === '[object Object]')) {
        throw new TypeError('Второй аргумент должен быть объектом');
    }

    const merged = structuredClone(source);

    for (let key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
            if (Object.prototype.toString.call(target[key]) === '[object Object]' && 
                Object.prototype.toString.call(source[key]) === '[object Object]') {
                merged[key] = deepMerge(source[key], target[key]);
            } else {
                merged[key] = target[key];
            }
        }
    }

    return merged;
};

