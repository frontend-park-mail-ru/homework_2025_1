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
