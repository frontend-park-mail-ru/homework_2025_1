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
    if (typeof sourceObj !== 'object' || sourceObj === null) {
        return {};
    }

    return Array.isArray(sourceObj)
        ? sourceObj
            .filter((value) => value !== '' && value !== null &&
                value !== undefined)
            .map((value) => (typeof value === 'object' ? compressObject(value)
                : value))
        : Object
            .entries(sourceObj)
            .reduce((compressedObj, [key, value]) => {
                if (value !== '' && value !== null && value !== undefined) {
                    compressedObj[key] = (typeof value === 'object') ?
                        compressObject(value) : value;
                }
                return compressedObj;
            }, {});
}
