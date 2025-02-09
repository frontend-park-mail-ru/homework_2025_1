'use strict';


/**
 * Функция для рекурсивного преобразования значений в объекте
 * @param {Object} obj - Исходный объект для преобразования
 * @param {Function} transformFn - Функция преобразования, применяемая к значениям
 * 
 * @example
 * // returns { a: 2, b: 4, c: 6 }
 * transform({ a: 1, b: 2, c: 3 }, value => value * 2);
 *
 * @returns {Object} - Новый объект с преобразованными значениями
 */
const transform = (obj, transformFn) => {
    if (typeof transformFn !== 'function') {
        throw new TypeError('transformFn must be a function');
    }

    if (Array.isArray(obj)) {
        return obj.map(item => transform(item, transformFn));
    }

    if (obj !== null && typeof obj === 'object') {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [key, transform(value, transformFn)])
        );
    }

    return transformFn(obj);
};
