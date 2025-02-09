'use strict';

/**
 * Функция, которая проверяет, является ли переданное значение plain object.
 * @param {*} value - переданное значение
 * 
 * @example
 * // returns true 
 * isPlainObject({ a: 42 });
 * 
 * @example
 * // returns false 
 * isPlainObject(new Boolean(true));
 * 
 * @returns {boolean}
 */
const isPlainObject = (value) =>
    Object.prototype.toString.call(value) === '[object Object]';

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
