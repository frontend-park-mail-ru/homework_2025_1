'use strict';

/**
 * Функция, преобразует объект с вложенными свойствами в plain-объект, где ключи представляют собой путь к значению во вложенном объекте, разделенные точками.
 * @param {object} object - Вложенный объект.
 * @param {string} [prefix] - Префикс для ключей, при вложенности. При первой вызове не указывается.
 * 
 * @example
 * // returns {a: 1, 'b.c': 2, 'b.d.e': 3, f: 4}
 * plainify(a: 1, b: {c: 2, d: {e: 3}}, f: 4)
 * 
 * @returns {object}
 */
const plainify = function (object, prefix = '') {
    const plainObject = {};
    for (const key in object) {
        const value = object[key];
        const newKey = prefix === '' ? key : prefix + '.' + key;
        if (typeof value === 'object') {
            const result = plainify(value, newKey);
            for (const key1 in result) {
                plainObject[key1] = result[key1];
            }
        }
        else {
            plainObject[newKey] = value;
        }
    }
    return plainObject;
};