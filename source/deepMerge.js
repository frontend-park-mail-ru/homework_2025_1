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
function deepMerge(source, target) {

    if (typeof source !== 'object' || source === null || Array.isArray(source)) {
        throw new TypeError('Первый аргумент должен быть объектом');
    }
    if (typeof target !== 'object' || target === null || Array.isArray(target)) {
        throw new TypeError('Второй аргумент должен быть объектом');
    }

    let merged = { ...source };

    for (let key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
            if (
                typeof target[key] === 'object' &&
                target[key] !== null &&
                !Array.isArray(target[key]) &&
                typeof source[key] === 'object' &&
                source[key] !== null &&
                !Array.isArray(source[key])
            ) {
                merged[key] = deepMerge(source[key], target[key]);
            } else {
                merged[key] = target[key];
            }
        }
    }

    return merged;
}
