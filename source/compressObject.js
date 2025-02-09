'use strict';

/**
 * Функция, которая принимает объект и возвращает новый объект, содержащий
 * только те ключи, которые имеют значения, отличные от null, undefined или
 * пустой строки.
 * @param {Object} sourceObj - исходный объект
 * 
 * @example
 * // returns {a: 42} 
 * compressObject({a: 42, b: null, c: "", d: undefined});
 * 
 * @returns {Object}
 */
const compressObject = (sourceObj) => {
    if (!isPlainObject(sourceObj)) {
        return {};
    }

    return Object
        .entries(sourceObj)
        .reduce((compressedObj, [key, value]) => {
            if (value !== '' && value !== null && value !== undefined) {
                compressedObj[key] = isPlainObject(value) ?
                    compressObject(value) : structuredClone(value);
            }
            return compressedObj;
        }, {});
}
