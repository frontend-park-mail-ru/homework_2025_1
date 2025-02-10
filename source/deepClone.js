'use strict';

/**
 * Функция для создания глубокой копии объекта.
 * @param {Object} original - объект для клонирования.
 *
 * @example
 * const obj = { a: 1, b: { c: 2 } };
 * const clonedObj = deepClone(obj);
 * console.log(clonedObj); // { a: 1, b: { c: 2 } }
 *
 * @returns {Object} - глубокая копия переданного объекта.
 */
const deepClone = original => {
    if (original === null || typeof original !== 'object') {
        return original;
    }

    if (original instanceof Date) {
        return new Date(original);
    }

    if (original instanceof RegExp) {
        return new RegExp(original);
    }

    if (original instanceof Map) {
        return new Map(Array.from(original, ([key, value]) => [key, deepClone(value)]));
    }

    if (original instanceof Set) {
        return new Set(Array.from(original, item => deepClone(item)));
    }

    if (Array.isArray(original)) {
        return original.map(item => deepClone(item));
    }

    const clonedObject = {};
    for (const key in original) {
        if (Object.hasOwn(original, key)) {
            clonedObject[key] = deepClone(original[key]);
        }
    }

    return clonedObject;
};